const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const express = require('express');
const PORT = 8000;
const URL = 'https://www.nedgame.nl/zoek/systeem:playstation-4/overig:aanbiedingen/&aantal=299';

const app = express();
axios(URL)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html)
    const list = [];
    $('.productShopHeader' ,html).each(function () {
      let title = $(this).find('.title').find('h3').text();
      let price = $(this).find('.currentprice').text();
      list.push({ title: title, price: price})
    })
    console.log(list);
    console.log(list.length);
  }).catch(err => console.log(err));

app.listen(PORT, () => console.log('listening on port ' + PORT));

