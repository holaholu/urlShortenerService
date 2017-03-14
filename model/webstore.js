var mongoose        = require("mongoose");



var StoreSchema = new mongoose.Schema({
     websitename: String, 
  
     code:String,
    
  });
  
 
  
  
 module.exports  = mongoose.model("Store",StoreSchema);