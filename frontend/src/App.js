
import './App.css';
import React,{useState} from 'react';

function App() {


  const [filas,setFilas] = useState("")
  const [asientos,setAsientos] = useState("")

  const [reservados,setReservados] = useState([])


  function Guardar(filas_temporales, asientos_temporales){
    setReservados([...reservados,[filas_temporales, asientos_temporales]]);
    console.log(reservados)
  }

  return (
    <div className='container'>
      <div className='form'>
        <input type='text' placeholder='Ingrese Fila' onChange={(e) => setFilas(e.target.value)}></input>
        <input type='text' placeholder='Ingrese asiento' onChange={(e) => setAsientos(e.target.value)}></input>
        <button type='button' onClick={(e)=>Guardar(filas, asientos)}>Guardar</button>
      </div>
      <div className='report'>
          <h1>Reporte de Asientos</h1>
          <table>
            <tr>
              <th>Asientos</th>
              <th>Filas</th>
            </tr>
          </table>
      </div>
    </div>
  );
}

export default App;
