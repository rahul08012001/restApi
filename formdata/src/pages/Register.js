

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
} from '../redux/Actions';

function Register({
  loading,
  error,
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
}) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    type: "",
    image: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    type: "",
    image: ""
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setState((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (!state.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!state.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!state.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (state.password.trim().length < 8) {
      newErrors.password = 'Password should be at least 8 characters long';
      isValid = false;
    }

    if (!state.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(state.mobile.trim())) {
      newErrors.mobile = 'Invalid mobile number';
      isValid = false;
    }

    if (!state.type.trim()) {
      newErrors.type = 'Type\'s name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", state.name);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("type", state.type);
    formData.append("image", state.image);

    if (validate()) {
      try {
        const url = "http://localhost:8080/upload";
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });

        if (response.data.status === 401) {
          console.log("Email is exist");
        }

        if (response.data.status === 200) {
          console.log("success");
          navigate('/Login');
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>

          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder='Enter Name'
              value={state.name}
              onChange={handleInputChange}
            />
            <span style={{ color: 'red' }}>{errors.name}</span>
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder='Enter Email'
              value={state.email}
              onChange={handleInputChange}
            />
            <span style={{ color: 'red' }}>{errors.email}</span>
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder='Enter Password'
              value={state.password}
              onChange={handleInputChange}
            />
            <span style={{ color: 'red' }}>{errors.password}</span>
          </div>

          <div className="form-group mt-3">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder='Enter Mobile'
              value={state.mobile}
              onChange={handleInputChange}
            />
            <span style={{ color: 'red' }}>{errors.mobile}</span>
          </div>

          <div className="form-group mt-3">
            <label>Type</label>
            <input
              type="text"
              name="type"
              placeholder='Enter Type'
              value={state.type}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mt-3">
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
            />
          </div>
          <span style={{ color: 'red' }}>{errors.type}</span>

          <div className="form-control">
            <label></label>
            <button type="submit">Submit</button>
          </div>
          <p className="text-center">Already have an account? <Link to="/Login">Login Here</Link></p>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
});

export default connect(mapStateToProps, {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
})(Register);
