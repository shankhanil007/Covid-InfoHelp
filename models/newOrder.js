var mongoose = require("mongoose");

var neworderSchema = new mongoose.Schema({

            buyer: {type: String},
			phone:{type: String},
			address: {type: String},
			item: {type: Array},
			qty: {type: Array},
			desc: {type: Array},
			created: { type: Date, default: Date.now}
			
            
});



 module.exports = mongoose.model("newOrder", neworderSchema);