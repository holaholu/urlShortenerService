var express = require('express')
var app = express()
app.set("view engine","ejs");
app.use (express.static("public"));

app.get('/', function (req, res) {

           res.render("index");

})


app.get('/new/:id', function (req, res) {              
               var id=req.params.id;
               var myjson= {
                              "original_url": id,
                              "short_url": "shortened here"
                            }
               
               res.json(myjson);
});



app.listen(process.env.PORT, function () {
  console.log('Server is up and running!')
})