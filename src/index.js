import Chart from 'chart.js/auto';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoAPI from './crypto.js';

let currencies = [];

function getElements(response) {
  if(response[0].id) {
    $("#box1").append(`<h2 class="cryptoCurrencies">Top Cryptocurrencies by Market Cap</h2>`);
    for (let i = 0; i < 10; i ++) {
      $("#box1").append(`<div><img src='${response[i].logo_url}'> <span class='name'>${response[i].name}</span>, <span class='blue'>ID</span>: ${response[i].id}, <span class='green'>Price:</span> $${Math.floor((response[i].price*1000))/1000}, <span class='rank'>Rank:</span> ${response[i].rank} <span class='high'>High:</span> $${Math.floor((response[i].high)*100)/100}</div>`);
      currencies.push(response[i].price);
    } 
  } else {
    $(".showErrors").text(`There was an error: ${response}`);
  }
}

function exchange(currency1, currency2) {
  let num1 = currencies[currency1];
  let num2 = currencies[currency2];
  let output = num1 / num2;
  $('#exchange-output').text(`The exchange rate is ${output}`);
}

function displayChart(responseOT) {
  const xValues = [];
  const yValues = [];
  for(let i=1; i <1501; i++) {
    xValues.push(i);
    yValues.push(responseOT[i].rate);
  }
  new Chart("chart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(255,0,0,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{ticks: {beginAtZero: true}}],
      }
    }
  });
}

async function makeApiCall() {
  const response = await CryptoAPI.getCurrencyAndPrice();
  const responseOT = await CryptoAPI.valueOverTime();
  getElements(response);
  displayChart(responseOT);
}

$('document').ready(function(){
  makeApiCall();
  $("#exchange-btn").on("click", function(){
    let currency1 = parseInt($("#choice1").val());
    let currency2 = parseInt($("#choice2").val());
    exchange(currency1, currency2);
  });
});