
import React, { useState } from 'react';

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import './Login.css'
function Login() {
 const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
});

    const [errors, setErrors] = useState({
         email: '',
         password: '',
    });

    const handleChange = (event) => {
    const { name, value } = event.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};
        
  if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
  }

  if (!loginData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
  }

      setErrors(newErrors);
      return isValid;
  };

    const handleSubmit = async (event) => {
        event.preventDefault();

  if (validateForm()) {
   try {
      const url = 'http://localhost:8080/Login';
        const response = await axios.post(url, loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('reopsdfjiopsdjf', response.status);
        localStorage.setItem('token',JSON.stringify(response.data.token))
        
         console.log("response------",response.data);
         
       


  if (response.data.status === 200) {

         console.log('Login successful');
         navigate("/Admin");
         
  }
  else if(response.data.status === 404){
          console.log('Invalid credentials');
         
  }
    } catch (error) {
        console.log('Error:', error);
       
      }
    }


  };
  

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
       <div className="Auth-form-content">
        <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
             <label>
               Email Address:
             <input className="form-control mt-1" type="email" name="email" placeholder='Enter Email' value={loginData.email} onChange={handleChange} />
           <span style={{ color: 'red' }}>{errors.email}</span>
         </label>
        <br />
       </div>
   <div className="form-group mt-3">
     <label>
        Enter Password:
       <input type="text" name="password" placeholder='Enter Password' value={loginData.password} onChange={handleChange} />
      <span style={{ color: 'red' }}>{errors.password}</span>
     </label>
   </div>
      <br />
        <div className="d-grid gap-2 mt-3">
          <button type="submit"className="btn btn-primary">Login</button>
            </div>
              <div className="d-grid gap-2">
                <p className="forgot-password text-right mt-2">Don't have account? <Link to="/Register">Register here</Link></p>
              </div>
           </div>
         </form>
      </div>
  );
}

export default Login;