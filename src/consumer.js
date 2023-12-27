'use strict';

const { Kafka } = require('kafkajs');
const { establishConnection } = require('../mongo-connector');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

async function main() {
  try {
    const consumer = kafka.consumer({ groupId: 'test-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test', fromBeginning: true });
    const collection = await establishConnection();

    let totalTime = 0;
    let start = 0
    let end = 0;

    const { START_BATCH_PROCESS, END_BATCH_PROCESS } = consumer.events;

    consumer.on(START_BATCH_PROCESS, async (data) => {
      start = Date.now();
    });

    consumer.on(END_BATCH_PROCESS, async (data) => {
      end = Date.now();
      totalTime += end - start;
      console.log(`Total Time: ${totalTime / 1000} sec`);
    });

    await consumer.run({
      autoCommit: true,
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const msg = message.value.toString();

          // Insert the document into the collection
          const result = await collection.insertOne({
            value: msg
          });

          // Log the result
          console.log(`Document inserted with _id: ${result.insertedId}`);
          console.log({
            value: msg,
            partition,
          });
        } catch (err) {
          console.log(err);
        }
      },
    });
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  await main();
})();