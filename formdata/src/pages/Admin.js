

import React, { useEffect } from "react";
import {Link, } from "react-router-dom"
import axios from 'axios';


import './Admin.css'

export default function App() {
  
  const [list, setList] = React.useState([]);

  const Data =async ()=>{
    axios.get('http://localhost:8080/getall')
    .then((res)=>setList(res.data))
  }

  const handleSubmit = async (id) => {
    // event.preventDefault();
    console.log("ID----->", id);
    try {
      const url = `http://localhost:8080/delete/${id}`;
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log(response);
      if (response.data.status === 200) {
        Data()
        console.log('User deleted');
  
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

useEffect(()=>{
  Data()
},[]);





return (
     <div>
        <h1>hello Admin</h1>
          <p>i live in this world</p>
           <table >
             <thead>
               <tr>
               
                  <th>Name</th>
                  <th>email</th>
                  <th>mobile</th>
                  <th>Type</th>
                  <th>image</th>
                  <th>Update Data</th>
                  <th>Delete Data</th>
               </tr>
             </thead>
           <tbody>
          {list.map((value, key) => {
 return (
        <tr key={key}>
             {/* <td>{value.id}</td> */}
            <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.mobile}</td>
                <td>{value.type}</td>
                <td>{value.image}</td>
            
             <td> <button><Link to ={`/Update/${value._id}`}>Edit </Link> </button> </td>
            

<button  onClick={()=> handleSubmit(value._id)}>Delete</button>
           </tr>
         
            );
       
          })}
        </tbody>
      </table>
    </div>
  )
}