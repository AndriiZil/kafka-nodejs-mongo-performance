'use strict';

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

(async () => {
  try {
    const admin = kafka.admin()

    await admin.connect()

    // await admin.createTopics({
    //   topics: [
    //     { topic: 'test-topic', numPartitions: 1 }
    //   ]
    // });

    console.log(await admin.listTopics());

    await admin.disconnect()
  } catch (err) {
    console.log(err);
  }
})();