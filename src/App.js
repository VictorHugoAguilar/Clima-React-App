import React, { Fragment, useState, useEffect } from 'react';
// Importamos los componentes personalizados
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';


function App() {
  // del formulario de busqueda
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  // extraemos los datos
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    console.log(busqueda);
    const consultaAPI = async () => {
      if (consultar) {
        const appId = 'fa13bf0bb17417bb7cc0a8e5128b69ef';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&units=metric`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);

        // comprobamos que se han encontrado resultados
        if( resultado.cod === '404' ){
          setError(true);
        }else{
          setError(false);
        }
      }
    }
    consultaAPI();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  }else{
    componente = <Clima
    resultado={resultado}
    />
  }


  return (
    <Fragment>
      <Header titulo='Clima React App' />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
                {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
