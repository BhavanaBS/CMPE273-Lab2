# CMPE273-Lab2
Yelp recreation using REST (Node.js), React JS, Redux, Passport, MongoDB and Kafka.

## Steps to execute the system on local server

1. Install node.js in the syatem.
2. Clone the git repository's FrontEnd, BackEnd and Kafka-Backend folders into separate folders on your system using the command 'git clone'.
3. Install all the dependencies using the command "npm install" in each folder.

### FrontEnd

1. Update the 'backend' variable in 'FrontEnd/src/components/common/serverDetails.js' file with the backend server's IP address and port.
2. Run the frontend server using the command 'npm start'.
3. You will be navigated to the application landing page in the browser.
4. If not, manually navigate to the browser type in the FrontEnd server's IP address and Port number to find the landing page.

### BackEnd

1. Update the app.js file with frontend server's IP address and port.
2. Run the backend server using the command 'node index.js' or 'nodemon index.js'.

### KafkaBackend

1. Clone the kafka setup from the repository and open a terminal in the location of bin.
2. Start the zookeeper and kafka server one after the other in two terminals using the commands:

        bin/zookeeper-server-start.sh config/zookeeper.properties
        bin/kafka-server-start.sh config/server.properties
3. Create kafka topics using the commands:

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
        bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic orders
        bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic dishes
        bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic messages
        bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic follow
4. Update 'mongoDB' variable in 'BackEnd/config/configuration.js' file with MongoDB database connection details.
5. Run the KafkaBackend server using the command 'node index.js' or 'nodemon index.js'.
