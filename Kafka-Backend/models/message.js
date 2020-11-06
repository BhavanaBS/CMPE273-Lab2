const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  restaurant_id:{type: Schema.ObjectId, ref: 'rest_profile'},
  // restaurant_name: {type: String, required: true},
  customer_messages:[{
    customer_id: {type: Schema.ObjectId, ref: 'cust_profile'},
    // customer_name: {type: String, required: true},
    msg: [{
      sender_id: {type: String, required: true},
      receiver_id: {type: String, required: true},
      message_content: {type: String, required: true},
      message_time: {type: String, required: true},
    }],
  }],
},
{
  versionKey: false,
});

module.exports = messageSchema;
