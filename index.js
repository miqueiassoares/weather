"use strict";

const chaveApi = "";

const inputCidade = document.querySelector("#inputCidade");
const buttonPesquisar = document.querySelector("#pesquisar");
const erro404 = document.querySelector(".erro404");
const loader = document.querySelector(".carregando");
const dadosDisplay = document.querySelector(".dados");

async function procurarDados() {
  const cidade = inputCidade.value;
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveApi}&lang=pt_br`;
  const dados = await fetch(apiWeatherUrl).then((data) => data.json());
  return dados;
}

function exibir(dados) {
  const cidade = document.querySelector("#city");
  const temperatura = document.querySelector(".temperatura span");
  const descricao = document.querySelector(".descricao__texto");
  const umidade = document.querySelector("#umidade span");
  const vento = document.querySelector("#vento span");
  const dadosDisplay = document.querySelector(".dados");
  const paisIcon = document.querySelector("#pais");
  const climaIcon = document.querySelector("#clima-icone");
  dadosDisplay.classList.remove = "hidden";
  cidade.textContent = dados.name;
  temperatura.textContent = parseInt(dados.main.temp);
  descricao.textContent = dados.weather[0].description;
  umidade.textContent = dados.main.humidity+"%";
  vento.textContent = parseInt(dados.wind.speed)+"km/h";
  climaIcon.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
  );
  paisIcon.setAttribute(
    "src",
    `https://flagcdn.com/w320/${(dados.sys.country).toLowerCase()}.png`
  );
}

function toggleLoading(componente) {
  componente.classList.toggle("hidden");
}

function sucesso(dados) {
  inputCidade.value = "";
  toggleLoading(loader);
  toggleLoading(dadosDisplay);
  exibir(dados);
}

function falha() {
  toggleLoading(loader);
  toggleLoading(erro404);
}

buttonPesquisar.addEventListener("click", async (evento) => {
  evento.preventDefault();
  loader.classList.remove("hidden");
  erro404.classList.add("hidden");
  dadosDisplay.classList.add("hidden");
  const dados = await procurarDados();
  if (dados.cod !== "404" && dados.cod !== "400") {
    sucesso(dados);
  } else {
    falha();
  }
});