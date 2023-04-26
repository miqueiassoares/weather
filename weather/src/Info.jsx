function Info({ nome, temperatura, umidade, vento, clima, pais, icon }) {
  return (
    <div className="info">
      <h2 className="cidade">
        <i className="fa-solid fa-location-dot"></i>
        {nome}
        <img src={`https://flagcdn.com/w320/${pais.toLowerCase()}.png`} alt={pais} />
      </h2>
      <p className="temperatura">{temperatura}°C</p>
      <p className="clima">
        {clima}
        <img src={`http://openweathermap.org/img/wn/${icon}.png`}/>
      </p>
      <p className="dados_adicionais">
        <span className="umidade">
          <i className="fa-solid fa-droplet"></i>
          {umidade}%
        </span>
        <span className="vento">
          <i className="fa-solid fa-wind"></i>
          {vento}km/h
        </span>
      </p>
    </div>
  );
}

export default Info;