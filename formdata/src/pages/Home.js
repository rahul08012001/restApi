//  function Home() {
//     return (
//         <div className="App">
//             <h1>Home Page</h1>
//         </div>
//     );
// }

// export default Home


// import React, { useEffect } from "react";
// import Axios from 'axios';

// export default function App() {

//     const [list, setList] = React.useState([]);


//     useEffect(()=> {  
      
//         Axios.get('http://localhost:8010/api/shoes')
//         .then((res)=> setList(res.data));
//     }, []);


//  let val = list.map((item)=>{
//         return <li key={item.id}>{item.name}</li>
//     });
    
//     return (
//         <div>
//             <h1>hello world</h1>
//             <p>i live in this world</p>
//             <ol>
//                 {val}
//             </ol>
//         </div>
//     )
// }