
import './App.css';
import React,{useState} from 'react';

function App() {


  const [filas,setFilas] = useState("")
  const [asientos,setAsientos] = useState("")

  const [reservados,setReservados] = useState([])



  function Guardar(filas_temporales, asientos_temporales){
    const alreadyReserved = reservados.some(([fila, asiento]) => fila === filas_temporales && asiento === asientos_temporales);
    if (alreadyReserved) {
      return alert("Error, el asiento ya ha sido reservado")
    }else{
      
    
   setReservados([...reservados,[filas_temporales, asientos_temporales]]);
   console.log(reservados)
  }
  }

  return (
    <div className='container'>
      <div className='form'>
        <input className="" type='text' placeholder='Ingrese Fila' onChange={(e) => setFilas(e.target.value)}></input>
        <input className='' type='text' placeholder='Ingrese asiento' onChange={(e) => setAsientos(e.target.value)}></input>
        <button type='button' onClick={(e)=>Guardar(filas, asientos)}>Guardar</button>
      </div>
      <div className='report'>
          <h1>Reporte de Asientos</h1>
          <table>
            <tr>
              <th>Filas</th>
              <th>Asientos</th>
            </tr>
            {reservados.map((reservados, i) =>
              <tr>
                <td>{reservados[0]}</td>
                <td>{reservados[1]}</td>
              </tr>
            )}
          </table>
      </div>
    </div>
  );
}

export default App;
