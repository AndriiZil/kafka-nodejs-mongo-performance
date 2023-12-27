'use strict';

/**
 * Get message for payload sending to the Kafka
 */
function prepareMessages(maxCount, partCount = 0, getDataPaload) {
  const messages = [];
  let partitionNum = 0;

  for (let i = 1; i <= maxCount; i++) {
    if (partCount === 0) {
      messages.push({
        partition: partitionNum,
        value: JSON.stringify({ id: i, data: getDataPaload() }),
      });
    }

    if (partCount >= 2) {
      if (partitionNum < partCount) {
        messages.push({
          partition: partitionNum,
          value: JSON.stringify({ id: i, data: getDataPaload() }),
        });

        partitionNum += 1;
      }

      if (partitionNum === partCount) {
        partitionNum = 0;
      }
    }
  }

  return messages;
}

module.exports = { prepareMessages };
