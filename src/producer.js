'use strict';

const { hugePayload } = require('../payload');
const { prepareMessages } = require('../prepareMessages');
const { Kafka, Partitioners: { LegacyPartitioner } } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});


(async () => {
  try {
    const producer = kafka.producer({
      createPartitioner: LegacyPartitioner,
    });

    await producer.connect();

    const maxCount = 8000;
    const messages = prepareMessages(maxCount, 12, hugePayload);

    const requests = [];

    for (let i = 0; i < maxCount; i++) {
      requests.push(producer.send({
        topic: 'test',
        acks: -1,
        messages: [
          messages[i],
        ],
      }));
    }

    console.time('Success');

    const result = await Promise.allSettled(requests);

    console.log({result});

    console.timeEnd('Success');

    await producer.disconnect();
  } catch (err) {
    console.log(err);
  }
})();
