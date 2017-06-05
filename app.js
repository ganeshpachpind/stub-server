const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/reviews.json', function (req, res) {
  var jsonObj = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf8'));
  var responseObj= {
    status: jsonObj.status,
    total_reviews: jsonObj.total_reviews,
    data:[]
  }
    if(req.query){
      var page = req.query['page'];
      if(page) {
        var start = page * 10;
        for( var i = start  ; i < (start+10) && jsonObj.data.length; i++) {
            if(jsonObj.data[i]){
             responseObj.data.push(jsonObj.data[i]);
            }
        }
        res.send(responseObj);
        return;
      }
    }
  res.send(jsonObj);
})

app.post('/review', function (req, res) {
  console.log(req.body);
  // your JSON
    var review = {
      title: req.body.review.title,
      message:req.body.review.message,
      rating:req.body.review.rating,
      author:req.body.review.author,
      foreignLanguage:req.body.review.foreignLanguage,
      country:req.body.review.country
    }
  res.send(review);
  }
);

app.listen(process.env.PORT || 8000, function () {
  console.log('stub app started')
})
