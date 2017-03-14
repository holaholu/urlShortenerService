var express         = require('express')
var app             = express();
var mongoose        = require("mongoose");

var url = process.env.MONGOURL
 mongoose.connect(url);

app.set("view engine","ejs");
app.use (express.static("public"));
var store  = require("./model/webstore");

var myjson=[
        
        "This Shortened site does not exist on this server.Please use the format :",
        "https://little-url.herokuapp.com/new/https://www.google.com (to create new shortened url ) OR",
        "https://fcc-codes-memristor.c9users.io/10073 (if you know your short url)"
    ]

app.get('/', function (req, res) {

           res.render("index");

})



app.get('/:id', function (req, res) { 
   
    
    
    var id=req.params.id;
    if (/^[0-9]{4}$/g.test(id)|| /^[0-9]{5}$/g.test(id)) {
        
     
      store.find({code:id},function (err,result){
          if (err){
              console.log() } else {
                   if(result.length > 0){
               
                  res.redirect(result[0].websitename)
                   }else {
    
                 res.json(myjson);
                   }
              }})
     }
    else {
       
    
    
    res.json(myjson);
    }
    
    
});









app.get('/new/:id//:id2', function (req, res) {              
               var id=req.params.id;
               var resultjson;
                                        //check it is an http
               
               
               var id2=req.params.id2; 
               id=id+"//"+id2; //get full url
               
            var myjson ="";
               
               CreateSite ();
               function CreateSite (){
                 
                 store.find({websitename:id},function(error,website){
                     if (error) {
                         console.log(error);
                     }else {
                         
                          if(website.length > 0){
                              //site already exist,provide link
                               resultjson= {
                                              "original_url": id,
                                              "short_url": "https://fcc-codes-memristor.c9users.io/"+ website[0].code
                                      }
              
                              res.json(resultjson);
                            
                          }else{
                              //make new site
                            
                               var rand= myRandGen();
                               rand = CreateNew(rand,id);
                                   var newStore = { websitename: id, code:rand};
                       //create item in database
                          
                         store.create(newStore,function(err,storeval){
                             if (err){
                                 console.log(err);
                             }else 
                             {
                              
                           
                               
                                resultjson= {
                                              "original_url": id,
                                              "short_url": "https://fcc-codes-memristor.c9users.io/"+ storeval.code
                                      }
              
                              res.json(resultjson);
                             }
                             
                         });
                            
                          }
                          
                    
                     } })}
                 
                  
   } 




);


app.get("*", function (req, res) {
    
    
    
    res.json(myjson);
    
})

 function myRandGen() {
    var myrand =[];
    for(var i=0;i<4;i++){
        var rand =Math.round(Math.random()*10);
        myrand.push(rand);
        
    }
    myrand=myrand.join("");
    return myrand;
   
}

  function CreateNew (rand,id){
                 
                 store.find({code:rand},function(error,site){
                     if (error) {
                         console.log(error);
                     }else {
                         
                         if(site.length>0){
                              rand= myRandGen();
                             
                             rand=CreateNew (rand,id);
                              
                         }
                     }
                  });
                 
               return rand ; 
            }

app.listen(process.env.PORT, function () {
  console.log('Server is up and running!')
})