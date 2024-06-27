import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';

function App() {


  const [filas,setFilas] = useState("")
  const [asientos,setAsientos] = useState("")

  const [reservados,setReservados] = useState([])

  function Imprimir(){
    console.log(filas)
    console.log(asientos)
  }

  return (
    <div className='container'>
      <div className='form'>
        <input type='text' placeholder='Ingrese Fila' onChange={(e) => setFilas(e.target.value)}></input>
        <input type='text' placeholder='Ingrese asiento' onChange={(e) => setAsientos(e.target.value)}></input>
        <button type='button' onClick={(e)=>Imprimir()}>Guardar</button>
      </div>
      <div className='report'>
          
      </div>
    </div>
  );
}

export default App;
