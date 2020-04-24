var mongoose= require("mongoose");

var sellerSchema = new mongoose.Schema({
	seller_id: String,
	owner: String,
	phone: String,
	shop: String,
	desc: String,
	address: String,
    latitude: Number,
	longitude: Number,
	newOrder:[{
			type: mongoose.Schema.Types.ObjectId,
			ref: "newOrder"
		}],

	payPending:[{
			type: mongoose.Schema.Types.ObjectId,
			ref: "payPending"
		}],

	completed:[{
			type: mongoose.Schema.Types.ObjectId,
			ref: "completed"
		}]	
	
	
});


module.exports = mongoose.model("Seller", sellerSchema);