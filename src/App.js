import './App.css';
import { FaClipboard ,FaTheRedYeti } from 'react-icons/fa';
import { Generator } from './useForm';
import React, { useState } from 'react';
import {getRandomChar} from './Utils';
import {getspecialChar} from './Utils';

function App() {
  const[values,setvalues]=Generator({
    Length: 6,
    letters: true,
    numbers: true,
    specialCharacter: true

  });
  const[result,setresult]= useState('');

  const fieldsArray = [
    {
      field : values.letters,
      getChar:()=> getRandomChar(65,90),
    },
    {
      field : values.numbers,
      getChar: ()=> getRandomChar(48,57),
    },
    {
      field : values.specialCharacter,
      getChar: ()=> getspecialChar(),
    },
  ];
  // console.log(fieldsArray);

  const handelOnSubmit = (e)=>{
    e.preventDefault()
    let generatedPassword ='';
    const checkedFields = fieldsArray.filter(({field})=>field);
    
    for(let i = 0 ; i < values.Length;i++){
      const index = Math.floor(Math.random()*checkedFields.length);
      const letter = checkedFields[index]?.getChar();
      
      if(letter){
        generatedPassword += letter;
      }
    }
    if(generatedPassword){
      setresult(generatedPassword);
    } 
  };

  const handelclipboard =async () => {
    if(result){
      await navigator.clipboard.writeText(result);
    }
  }
  return (
   <section>
    <div className='bigcontain' >
      <form onSubmit = {handelOnSubmit}>
        <div className='contain'  >
          <input type='text' placeholder='min 6 char'
            readOnly value={result}/>
        </div>
        <div className='contain' onClick={handelclipboard} >
            <FaClipboard></FaClipboard>
          </div>
        <div>
          <div className='contain' >
            <label>Length</label>
            <input type="number" min={6} max={15} 
              name='Length' value={values.Length} onChange={setvalues}/>
          </div>
          <div className='contain' >
            <label>letters</label>
            <input type='checkbox' name='letters'
            checked={values.letters} onChange ={setvalues}
            />
          </div>
          <div className='contain' >
            <label>numbers</label>
            <input type='checkbox' name='numbers' 
            checked={values.numbers} onChange ={setvalues} />
          </div>
          <div className='contain' >
            <label>spacialCharacter</label>
            <input type='checkbox' name='specialCharacter' 
            checked={values.specialCharacter} onChange ={setvalues}/>
          </div>
        </div> 
        <div className='contain' >
          <button type='submit'>Generate password</button>
        </div>
      </form>
    </div>
  </section>  
  );
}

export default App;
