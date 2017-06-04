const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.get('/reviews.json', function (req, res) {
  var jsonObj = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf8'));
  var responseObj= {
    status: jsonObj.status,
    total_reviews: jsonObj.total_reviews,
    data:[]
  }
  console.log();
    if(req.query){
      var page = req.query['page'];
      if(page) {
        var start = page * 10;
        for( var i = start  ; i < (start+10) && jsonObj.data.length; i++) {
           responseObj.data.push(jsonObj.data[i]);
        }
      }
    }
  res.send(responseObj);
})

app.listen(process.env.PORT || 8000, function () {
  console.log('stub app started')
})
