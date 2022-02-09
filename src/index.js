import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoAPI from './crypto.js';

function getElements(response) {
  if(response) {
    for (let i = 0; i < 10; i ++) {
      $("#box1").append(`<li>${response[i].name}, ID: ${response[i].id}, Price: $${Math.floor((response[i].price*1000))/1000}</li>`);
    } 
  } else {
    $(".showErrors").text(`There was an error: ${response}`);
  }
}
function exchange(response, currency) {
  if (response) {
    $('#exchange-output').text(`${(response[0].price) / response[parseInt(currency)].price} ${response[currency].name}`);
  } else {
    $(".showErrors").text(`There was an error: ${response}`);
  }
}

async function makeApiCall() {
  const response = await CryptoAPI.getCurrencyAndPrice();
  getElements(response);
}
async function makeSecondCall(currency) {
  const response = await CryptoAPI.getExchange();
  exchange(response, currency);
}

$('document').ready(function(){
  makeApiCall();
  $("#exchange-btn").on("click", function(event){
    event.preventDefault();
    let currency = $("#currency").val();
    makeSecondCall(currency);
  })
});