const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
    customer_id: {type: String, required: true},
    restaurant_id: {type: String, required: true},
    sender_id: {type: String, required: true},
    receiver_id: {type: String, required: true},
    customer_name: {type: String, required: true},
    restaurant_name: {type: String, required: true},
    message_content: {type: String, required: true},
    message_time: {type: String, required: true},
},
{
  versionKey: false,
});

module.exports = mongoose.model('message', messageSchema);
