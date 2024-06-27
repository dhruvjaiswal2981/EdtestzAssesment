const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, User, Appointment } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const jwtSecret = 'your_secret_key';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/appointments', authenticateJWT, async (req, res) => {
  const { date, time } = req.body;
  const userId = req.user.id;
  try {
    const appointment = await Appointment.create({ userId, date, time });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: 'Unable to book appointment' });
  }
});

app.get('/appointments', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const appointments = await Appointment.findAll({ where: { userId } });
  res.json(appointments);
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
