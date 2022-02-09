import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoAPI from './crypto.js';

function getElements(response) {
  if(response) {
    for (let i = 0; i < 10; i ++) {
      $("#box1").append(`<div><img src='${response[i].logo_url}'> <span class='name'>${response[i].name}</span>, <span class='blue'>ID</span>: ${response[i].id}, <span class='green'>Price:</span> $${Math.floor((response[i].price*1000))/1000}, <span class='red'>High:</span> $${Math.floor((response[i].high)*100)/100}</div>`);
    } 
  } else {
    $(".showErrors").text(`There was an error: ${response}`);
  }
}


function exchange(response, currency) {
  let output = ((response[0].price) / response[currency].price);
  if (response) {
    $('#exchange-output').text(Math.floor(output*100)/100+" "+response[currency].name);
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
    let currency = parseInt($("#currency").val());
    makeSecondCall(currency);
  });
});