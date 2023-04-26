function Error({ tipo }) {
  return (
    <>
      {tipo === 400 && (
        <div className="erro erro400">
          <p>Você precisa digitar o nome da cidade!</p>
        </div>
      )}
      {tipo === 404 && (
        <div className="erro erro404">
          <p>Você digitou um nome incorreto! Por favor, digite o nome da cidade corretamente!</p>
        </div>
      )}
    </>
  );
}

export default Error;