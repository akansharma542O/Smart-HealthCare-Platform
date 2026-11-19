require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Backend test
app.get('/', (req, res) => {
    res.send('MediSync Backend is Running!');
});

// Database test
app.get('/test-db', (req, res) => {
    db.query('SHOW TABLES', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// SIGNUP
app.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        if (password.length < 8) {
             return res.status(400).json({
               message: 'Password must be at least 8 characters.'
             });
    }
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (name, email, phone, password_hash)
                     VALUES (?, ?, ?, ?)`;

        db.query(sql, [name, email, phone, hashedPassword], (err, result) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            res.status(201).json({
                message: 'Account created successfully!',
                userId: result.insertId
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed.' });
    }
});

// DASHBOARD STATS
app.get('/dashboard-stats/:userId', (req, res) => {
    const userId = req.params.userId;

    const queries = [
        `SELECT COUNT(*) AS total FROM appointments 
         WHERE user_id = ? AND status IN ('Pending', 'Confirmed') 
         AND appointment_date >= CURDATE()`,

        `SELECT COUNT(*) AS total FROM medical_records WHERE user_id = ?`,

        `SELECT COUNT(*) AS total FROM medicines 
         WHERE user_id = ? AND (end_date IS NULL OR end_date >= CURDATE())`
    ];

    Promise.all(
        queries.map(query =>
            new Promise((resolve, reject) => {
                db.query(query, [userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0].total);
                });
            })
        )
    )
    .then(results => {
        res.json({
            appointments: results[0],
            records: results[1],
            medicines: results[2]
        });
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

// GET ALL DOCTORS
app.get('/doctors', (req, res) => {
    const sql = 'SELECT * FROM doctors ORDER BY name ASC';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json(results);
    });
});

// GET AVAILABLE APPOINTMENT SLOTS
app.get('/available-slots', (req, res) => {
  const { doctor_id, date } = req.query;

  const allSlots = [
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30'
  ];

  const sql = `
    SELECT appointment_time FROM appointments
    WHERE doctor_id = ?
    AND appointment_date = ?
    AND (status IS NULL OR status != 'Cancelled')
  `;

  db.query(sql, [doctor_id, date], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    const bookedSlots = results.map(
      item => String(item.appointment_time).slice(0, 5)
    );

    const availableSlots = allSlots.filter(
      slot => !bookedSlots.includes(slot)
    );

    res.json(availableSlots);
  });
});

// BOOK APPOINTMENT
app.post('/appointments', (req, res) => {
    const { user_id, doctor_id, appointment_date, appointment_time, reason } = req.body;

    const checkSql = `
        SELECT id FROM appointments
        WHERE doctor_id = ?
        AND appointment_date = ?
        AND appointment_time = ?
        AND (status IS NULL OR status != 'Cancelled')
    `;

    db.query(checkSql, [doctor_id, appointment_date, appointment_time], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (results.length > 0) {
            return res.status(409).json({
                message: 'This appointment slot is already booked. Please select another time.'
            });
        }

        const sql = `INSERT INTO appointments
        (user_id, doctor_id, appointment_date, appointment_time, reason)
        VALUES (?, ?, ?, ?, ?)`;

        db.query(sql, [user_id, doctor_id, appointment_date, appointment_time, reason], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            res.status(201).json({
                message: 'Appointment booked successfully!'
            });
        });
    });
});

// GET USER APPOINTMENTS
app.get('/appointments/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT a.*, d.name AS doctor_name, d.specialty
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.user_id = ?
        ORDER BY a.appointment_date DESC
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json(results);
    });
});

// CANCEL APPOINTMENT
app.put('/appointments/cancel/:id', (req, res) => {
  const sql = "UPDATE appointments SET status = 'Cancelled' WHERE id = ?"

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message })

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found.' })
    }

    res.json({ message: 'Appointment cancelled successfully!' })
  })
})

// RESCHEDULE APPOINTMENT
app.put('/appointments/reschedule/:id', (req, res) => {
  const { appointment_date, appointment_time } = req.body;
  const appointmentId = req.params.id;

  const checkSql = `
    SELECT id FROM appointments
    WHERE doctor_id = (
      SELECT doctor_id FROM appointments WHERE id = ?
    )
    AND appointment_date = ?
    AND appointment_time = ?
    AND id != ?
    AND (status IS NULL OR status != 'Cancelled')
  `;

  db.query(checkSql, [
    appointmentId,
    appointment_date,
    appointment_time,
    appointmentId
  ], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length > 0) {
      return res.status(409).json({
        message: 'This slot is already booked. Please select another slot.'
      });
    }

    const sql = `
      UPDATE appointments
      SET appointment_date = ?, appointment_time = ?
      WHERE id = ? AND (status IS NULL OR status != 'Cancelled')
    `;

    db.query(sql, [appointment_date, appointment_time, appointmentId], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Appointment not found or cancelled.' });
      }

      res.json({ message: 'Appointment rescheduled successfully!' });
    });
  });
});

// SEND PASSWORD RESET OTP
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  db.query('SELECT id FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error.' });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Email not registered.' });
    }

    try {
      const otp = crypto.randomInt(100000, 1000000).toString();
      const otpHash = await bcrypt.hash(otp, 10);

      db.query('DELETE FROM password_resets WHERE email = ?', [email], (err) => {
        if (err) return res.status(500).json({ message: 'Database error.' });

        db.query(
          `INSERT INTO password_resets (email, otp_hash, expires_at)
           VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))`,
          [email, otpHash],
          async (err) => {
            if (err) return res.status(500).json({ message: 'Database error.' });

            try {
              await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'MediSync - Password Reset OTP',
                text: `Your password reset OTP is ${otp}. It is valid for 5 minutes.`
              });

              res.json({ message: 'OTP sent successfully to your email!' });
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Unable to send OTP email.' });
            }
          }
        );
      });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  });
});
// VERIFY OTP AND RESET PASSWORD
app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  db.query(
    'SELECT * FROM password_resets WHERE email = ? ORDER BY id DESC LIMIT 1',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error.' });

      if (results.length === 0) {
        return res.status(400).json({ message: 'Please request an OTP first.' });
      }

      const reset = results[0];

      if (new Date(reset.expires_at) <= new Date()) {
        return res.status(400).json({ message: 'OTP expired. Request a new one.' });
      }

      const isValid = await bcrypt.compare(otp, reset.otp_hash);

      if (!isValid) {
        return res.status(400).json({ message: 'Invalid OTP.' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      db.query(
        'UPDATE users SET password_hash = ? WHERE email = ?',
        [hashedPassword, email],
        (err) => {
          if (err) return res.status(500).json({ message: 'Password update failed.' });

          db.query('DELETE FROM password_resets WHERE email = ?', [email]);

          res.json({ message: 'Password reset successful!' });
        }
      );
    }
  );
});

// LOGIN
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found.' });
        }

        try {
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password.' });
            }

            res.json({
                message: 'Login successful!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Login failed.' });
        }
    });
});

const PORT = 5000;

app.post('/records', upload.single('file'), (req, res) => {
  const { user_id } = req.body
  const record_name = req.file.originalname
  const record_type = path.extname(req.file.originalname)
  const file_path = req.file.filename

  const sql = `INSERT INTO medical_records 
  (user_id, record_name, record_type, file_path)
  VALUES (?, ?, ?, ?)`

  db.query(sql, [user_id, record_name, record_type, file_path], (err) => {
    if (err) return res.status(500).json({ message: err.message })
    res.json({ message: 'Record uploaded successfully!' })
  })
})

app.get('/records/:userId', (req, res) => {
  db.query(
    'SELECT * FROM medical_records WHERE user_id = ? ORDER BY upload_date DESC',
    [req.params.userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message })
      res.json(results)
    }
  )
})

app.post('/medicines', (req, res) => {
  const { user_id, medicine_name, dosage, frequency, time, times } = req.body;

  const scheduleTimes = times || [time];

  const sql = `INSERT INTO medicines 
  (user_id, medicine_name, dosage, frequency)
  VALUES (?, ?, ?, ?)`;

  db.query(sql, [user_id, medicine_name, dosage, frequency], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    const values = scheduleTimes.map(t => [result.insertId, t]);

    db.query(
      'INSERT INTO medicine_schedules (medicine_id, dose_time) VALUES ?',
      [values],
      (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Medicine added successfully!' });
      }
    );
  });
});

app.get('/medicines/:userId', (req, res) => {
  const sql = `
    SELECT m.*, s.dose_time, s.reminder_enabled
    FROM medicines m
    LEFT JOIN medicine_schedules s ON m.id = s.medicine_id
    WHERE m.user_id = ?
  `

  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message })
    res.json(results)
  })
})
// DELETE MEDICINE
app.delete('/medicines/:id', (req, res) => {
  const medicineId = req.params.id;

  db.query(
    'DELETE FROM medicine_schedules WHERE medicine_id = ?',
    [medicineId],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      db.query(
        'DELETE FROM medicines WHERE id = ?',
        [medicineId],
        (err, result) => {
          if (err) return res.status(500).json({ message: err.message });

          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Medicine not found.' });
          }

          res.json({ message: 'Medicine deleted successfully!' });
        }
      );
    }
  );
});

// MARK MEDICINE AS TAKEN
app.post('/medicines/taken/:id', (req, res) => {
  db.query(
    'INSERT INTO medicine_logs (medicine_id) VALUES (?)',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: 'Medicine marked as taken!' });
    }
  );
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});