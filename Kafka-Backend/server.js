var connection = new require('./kafka/connection');
//topics files
var Passport = require('./services/passport');
var Signup = require('./services/signup');
var Login = require('./services/login');
var CustomerProfile = require('./services/customerProfile');
var RestaurantProfile = require('./services/restaurantProfile');
var ImageUpload = require('./services/uploads');
var Restaurants = require('./services/restaurants');
var Reviews = require('./services/reviews');
var Events = require('./services/events');

const { mongoDB } = require('./config/configuration');
const mongoose = require('mongoose');
// const fs = require('fs');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 500,
    bufferMaxEntries: 0
  };

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

// fs.readdirSync(__dirname + '/dbSchema').forEach(filename => {
//     if (~filename.indexOf('.js')) {
//         require(__dirname + '/dbSchema/' + filename)
//     }
// });

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Server is running ');
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log('DATA', data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("authentication", Passport);
handleTopicRequest("signup", Signup);
handleTopicRequest("login", Login);
handleTopicRequest("custProfile", CustomerProfile);
handleTopicRequest("restProfile", RestaurantProfile);
handleTopicRequest("imageUpload", ImageUpload);
handleTopicRequest("restaurants", Restaurants);
handleTopicRequest("reviews", Reviews);
handleTopicRequest("events", Events);

/*

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic authentication
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic custProfile
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic restProfile
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic imageUpload
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic restaurants
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic reviews
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic events

bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic authentication
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic signup
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic login
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic custProfile
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic restProfile
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic response_topic
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic imageUpload
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic restaurants
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic reviews
bin/kafka-topics.sh --zookeeper localhost:2181 --delete --topic events

*/