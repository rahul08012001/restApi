
import React, { useState,useEffect} from "react";
import axios from "axios"
import { useParams,useNavigate } from 'react-router-dom'

function Update() {
 const navigate =useNavigate();
 // const {id} = useParams();
  const[values,setValues]=useState({
   
    name:"",
    email:"",
    password:"",
    mobile:"",
    type:""
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  
  };
  let {id}  = useParams();
  useEffect(()=> {  
       
   const response= axios.get(`http://localhost:8080/getUser/${id}`)
      .then((res)=> setValues({values,name:res.data.name,email:res.data.email,mobile:res.data.mobile,type:res.data.type}))
  .catch((error)=>{
console.log("error",error)
console.log(response)
  })
  }, []);

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('userData:', values);
  try {
    const url = `http://localhost:8080/Update/${id}`;
    const response = await axios.put(url, { ...values }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("res", response);
    if (response.data.status === 200) {
      console.log('User update');
      navigate('/Admin')
    }
  } catch (error) {
    console.log('Error:', error);
  }
};
   return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
        <h3 className="Auth-form-title">Update Data</h3>

        <div className="form-group mt-3">
          <label>Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
             onChange={handleChange}
            /> 
            </div>
         
        <div className="form-group mt-3">
           <label>Email</label>
             <input
                type="text"
                name="email"
                value={values.email}
               
                onChange={handleChange}
              />
                  </div>
       
       
       <div className="form-group mt-3">
           <label>Mobile</label>
              <input
                  type="text"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
             />
               </div>
   
        
        <div className="form-group mt-3">
          <label>Type</label>
             <input
                type="text"
                name="type"
                value={values.type}
                onChange={handleChange}
              />
                 </div>
        
      
            
        <div className="form-control">
                <label></label>
                <button type="submit">Update</button>
                </div>
                
        </div>
      </form>
    </div>
  );
}
export default Update