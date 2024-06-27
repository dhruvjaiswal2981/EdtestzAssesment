import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:3000/appointments',
        { date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Appointment booked successfully');
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Booking;
