/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAT: false,
  autoUpdatedAT: false,
  attributes: {
    chude: {
      type: "string"
    },
    content: {
      type: "string"
    },
    topic_id: {
      type: "int"
    },
    date:
    {
      type:"string"
    }
  }
  // ,connection: 'monggodb'
  , connection: 'someMysqlServer'
};

