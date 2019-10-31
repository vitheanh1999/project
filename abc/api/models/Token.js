/**
 * Token.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    token: {
      type: "string"
    },
    refreshToken: {
      type: "string"
    },
    authId: {
      type: "string"
    },
    device: {
      type: "string"
    },
    expiredAt: { type: "Date" }
  },
  connection: "someMysqlServer"
};
