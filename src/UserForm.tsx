import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/UserForm.css'; // Import your CSS file

function UserForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Save user details to localStorage
    localStorage.setItem('userDetails', JSON.stringify({ name, phoneNumber, email }));
    // Navigate to the second page
    navigate('/second-page');
  };

  return (
    <div className="user-form-container">
        <h2  className='login'>First you have to login</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
