const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var bookingSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String, 
        // required: true,
    },
    razorpay_payment_id: {
        type: String, 
        // required: true,
    },
    razorpay_signature: {
        type: String, 
        // required: true,
    },
    user_id:{
        type:String,
        // required:true,
    },
    venue_id:{
        type:String,
        // required:true,
    },
    date:{
        type:String,
        // required:true,
    },
    startTime:{
        type:String,
        // required:true,
    },
    duration:{
        typea:String,
        // required:true,
    },
    sport:{
        type:String,
        // required:true,
    },
    court:{
        type:String,
        // required:true,
    },
    amount:{
        type:String,
        // required:true,
    },

});

//Export the model
module.exports = mongoose.model('Booking', bookingSchema);