/**
 * 发布订阅模式
 */
const debug = require('debug')('findNearestValue');

const pubsub = {};
let subUid = -1;
const topics = {};

pubsub.subscribe = function (topic, callback) {
  if (!topics[topic]) {
    topics[topic] = [];
  }

  const token = (++subUid).toString();
  topics[topic].push({
    token,
    callback,
  });

  return token;
};

pubsub.publish = function (topic, args) {
  if (!topics[topic]) return false;

  const subscribers = topics[topic];
  let len = subscribers.length;

  while (len--) {
    subscribers[len].callback(topic, args);
  }

  return this;
};

pubsub.unsubscribe = function (token) {
  Object.keys(topics).forEach((topic) => {
    if (topics[topic]) {
      for (let i = 0, len = topics[topic].length; i < len; i++) {
        if (topics[topic][i].token === token) {
          topics[topic].splice(i, 1);
          return token;
        }
      }
    }
  });
  // for (let m in topics) {
  //   if (topics[m]) {
  //     for (let i = 0, len = topics[m].length; i < len; i++) {
  //       if (topics[m][i].token === token) {
  //         topics[m].splice(i, 1);
  //         return token;
  //       }
  //     }
  //   }
  // }
  return this;
};