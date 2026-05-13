import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

const Footer = () => {
  const [name, setName] = useState("");
   useEffect(() => {
     const username = localStorage.getItem("username");
     axios.get(`http://localhost:5000/users/${username}`)
       .then((response) => {
         setName(response.data.fullName);
       });
   }, []);

  return (
    <div className="bg-dark text-light text-center mt-auto py-2">
      <p className='mt-auto'>Welcome to our App, <b><i>{name}</i></b></p>
    </div>
  )
}

export default Footer
