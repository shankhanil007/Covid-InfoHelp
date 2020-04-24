var mongoose = require("mongoose");

var billSchema = new mongoose.Schema({
    shop:{type: String},
    phone:{type: String},
    address:{type: String},
    id: {type: String},
    buyer: {type: String},
    phone:{type: String},
    address: {type: String},
    item: {type: Array},
    qty: {type: Array},
    created: { type: Date, default: Date.now}
    
});



module.exports = mongoose.model("Bill", billSchema);