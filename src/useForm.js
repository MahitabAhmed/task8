import  React, { useState } from 'react';

export function Generator(initialValues){
  const[values,setvalues]= useState(initialValues);
  
  return[
    values,
    (e)=> {
      console.log(e.target.type);
      setvalues({
        ...values,
        [e.target.name]:e.target.type === 
        'checkbox'? e.target.checked : e.target.value,
      
      });
    },
  ];

};

 