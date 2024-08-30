// Location: src/components/DemoRequestForm.js
// Demo Request Form Component

import React, { useState } from 'react';

const DemoRequestForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, saving to a database later
    console.log({ name, email, message });
  };

  return (
    <section className="demo-request">
      <h2>Request a Demo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default DemoRequestForm;
