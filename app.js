const express = require('express')
const path = require('path');
const app = express()

app.get('/reviews.json', function (req, res) {
  // res.send('Hello World!')
   res.sendFile(path.normalize(__dirname + '/reviews.json'))
})

app.listen(process.env.PORT || 8000, function () {
  console.log('Example app listening on port 8000!')
})
