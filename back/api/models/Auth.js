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
    },
    password: {
      type: "string",
    },
    name: {
      type: "string",
    },
    onlineAt: {
      type: "Date"
    },
    email: {
      type: "string"
    },
    role: {
      type: "integer"
    }
  },
   connection: 'someMysqlServer'
};
async function khoitao() {
  
  await Auth.create({username:"admin",password:"admin",name:"admin",role:1,id:1});
}

