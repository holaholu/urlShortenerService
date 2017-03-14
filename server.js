var express = require('express')
var app = express()
app.set("view engine","ejs");
app.use (express.static("public"));

app.get('/', function (req, res) {

           res.render("index");

})


app.get('/:id', function (req, res) {              
               
});



app.listen(process.env.PORT, function () {
  console.log('Server is up and running!')
})