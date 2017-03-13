var express = require('express')
var app = express()
app.set("view engine","ejs");
app.use (express.static("public"));

app.get('/', function (req, res) {

res.render("index");

 
})


app.get('/:id', function (req, res) {              
var id= req.params.id;
var myjson={};

if (/^[0-9]/g.test(id)) {                     ////checks that provided format is unix


var natdate= unixToDateConverter(id);

myjson={
  "unix": id,
  "natural": natdate
}

myjson=JSON.stringify(myjson)
 res.send(myjson);
}
else 

if ((/^[A-Z]/gi.test(id))) {               //checks that provided format is natural
    var day, year,month="";
    
   
   var check= id.match(/[0-9]*/g);                   //gets the numbers in the query.
    var store=check.filter(function(value){           //filter the number for month & year
      if(/^[0-9]/g.test(value)){
          return value;
      }
    })
   
    if ( store.length==1){
        var newstore=store[0].split("")
        if(newstore.length==6){
        day=newstore[0]+newstore[1];
        year=newstore[2]+newstore[3]+newstore[4]+newstore[5];
        }else {
             day=0+newstore[0];
        year=newstore[1]+newstore[2]+newstore[3]+newstore[4];
            
            
        }
         
            
            
        } else 
    
    if ( store.length==2){
        day=0+store[0];
        year=store[1];
        
    }else{}
   
    var check2= id.match(/[A-Z]*/gi);
    var newcheck2= check2[0];
    var monthnames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
 
     if (monthnames.indexOf(newcheck2)>=0&&day&&year){                //checks that valid month is entered
        month = monthnames.indexOf(newcheck2)+1; 
    var unixtime = dateToUnixConverter(year,month,day)
     
                                  myjson={
                              "unix": unixtime,
                              "natural": id
                            }
                            
                            myjson=JSON.stringify(myjson)
                             res.send(myjson);

                  }else{                                    //for month that does not exist
                                          myjson={
                                      "unix": null,
                                      "natural": null
                                    }
                                    
                                    myjson=JSON.stringify(myjson)
                                     res.send(myjson);
                 
                  }
    
    
}
else {                 //for every other bad query
    
    
                      myjson={
                  "unix": null,
                  "natural": null
                }
                
                myjson=JSON.stringify(myjson)
                 res.send(myjson);
    
}

    //res.send(month);
 })




function unixToDateConverter(id){
  var a = new Date(id * 1000);
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = month + ' ' + date + ', ' + year  ;
  return time;
}


function dateToUnixConverter(year,month,day){
    
    var combine= "'"+year+"."+month+"."+day+"'";
    //'2012.08.10'

var result= (new Date(combine).getTime() / 1000).toFixed(0)
   return result; 
}



app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})