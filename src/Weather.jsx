import Error from './Error';
import Info from './Info';
import { useState } from 'react';
import loader from '../img/loader.svg';

function Weather() {
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState({});
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const chaveApi = "7d895dabbca5ae53eb53aa483f2ac654";

  async function pesquisar() {
    setDados({});
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveApi}&lang=pt_br`;
    const dados = await fetch(apiWeatherUrl).then(resp => resp.json());  
    setErro(dados.cod === 200 ? false : true);
    setDados(dados);
  }

  async function submit(e) {
    e.preventDefault();
    setCidade("");
    setErro(false);
    setLoading(true);
    await pesquisar();

    setLoading(false);
  }

  return (
    <div className="weather">
      <h1>Confira o clima de cidades no mundo todo!</h1>
      <form className="bloco_pesquisa" onSubmit={submit}>
        <input 
          onChange={(e)=> setCidade(e.target.value)}
          type="text" 
          placeholder="Nome da cidade" 
          maxLength={60}
          value={cidade}
          />
        <button id="pesquisar">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className='container'>
        {loading && <img className='loader' src={loader}/>}

        {dados.name && <Info nome={dados.name} temperatura={parseInt(dados.main.temp)} umidade={dados.main.humidity} vento={parseInt(dados.wind.speed)} clima={dados.weather[0].description} pais={dados.sys.country} icon={dados.weather[0].icon} />}

        {erro && <Error tipo={Number(dados.cod)} />}
      </div>
    </div>
  );
}

export default Weather;