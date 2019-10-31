/**
 * Auth.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    username: {
      type: "string",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      required: true
    },
    // confirmpassword: {
    //   type:"string",
    //   required:true
    // },
    name: {
      type: "string"
    },
    authId: {
      type: "string"
    },
    numberLogin: {
      type: "string"
    },
    onlineAt: { type: "Date" }
  },
  connection: "someMysqlServer" 
};
