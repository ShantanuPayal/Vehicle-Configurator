import React, { useState } from 'react';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
    telephone: '',
    gstNumber: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('your-backend-api-url/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Handle response, e.g., show success message or redirect
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input type="text" name="companyName" id="companyName" className="form-control" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input type="text" name="addressLine1" id="addressLine1" className="form-control" placeholder="Address Line 1" value={formData.addressLine1} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input type="text" name="addressLine2" id="addressLine2" className="form-control" placeholder="Address Line 2" value={formData.addressLine2} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" name="city" id="city" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input type="text" name="state" id="state" className="form-control" placeholder="State" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" name="pincode" id="pincode" className="form-control" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Telephone</label>
              <input type="tel" name="telephone" id="telephone" className="form-control" placeholder="Telephone" value={formData.telephone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="gstNumber">GST Number</label>
              <input type="text" name="gstNumber" id="gstNumber" className="form-control" placeholder="GST Number" value={formData.gstNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" className="form-control" placeholder="Username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
           
};

export default UserRegistration;
