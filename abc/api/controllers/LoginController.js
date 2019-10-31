/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const tokenList = {};

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

module.exports = {
  // register: function(req, res) {
  //   return res.view("register");
  // },
  create: async function (req, res) {
    try {
      const userInfo = req.body;
      console.log(req.body);
      if (
        !userInfo.username ||
        !userInfo.password ||
        !userInfo.name ||
        !userInfo.confirmpassword
      ) {
        return res.jsonp({content : "Vui lòng điền đầy đủ thông tin!" , success: false});
      } else {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(userInfo.username).toLowerCase())) {
          const checkExist = await Auth.findOne({
            username: userInfo.username
          });
          if (!checkExist) {
            const pass = /^(?=.*[a-z])(?=.*\d).{6,10}$/;
            if (userInfo.password.match(pass)) {
              if (userInfo.password === userInfo.confirmpassword) {
                const hashPassword = await bcryptjs.hash(userInfo.password, 10);
                const newUser = await Auth.create({
                  ...userInfo,
                  password: hashPassword
                });
                const userGetId = await Auth.findOne({
                  username: userInfo.username
                });
                const userUpdateId = await Auth.update(
                  { username: userInfo.username },
                  { authId: userGetId.id }
                );
                const response = {
                  user: userUpdateId,
                  success: true
                };

                return res.created(response);
              }
              else {
                return res.jsonp({content:"Xác nhận mật khẩu không đúng",success:false})
              }
            } else {
              return res.jsonp(
                "Password phải chứa 6-10 kí tự và bao gồm số!",
                { success: false }
              );
            }
          } else {
            return res.jsonp( {content:"Email đã tồn tại!", success: false });
          }
        } else {
          return res.jsonp({content:"Email chưa hợp lệ!",  success: false });
        }
      }
    } catch (error) {
      return res.notFound({ success: false });
    }
  },
  // login: function(req, res) {
  //   return res.view("login");
  // },
  userLogin: async function (req, res) {
    try {
      const loginInfo = req.body;

      if (!loginInfo.username || !loginInfo.password) {
        return res.jsonp({ content: "Vui lòng điền đầy đủ thông tin!", success: false });
      } else {
        console.log(loginInfo)
        const user = await Auth.findOne({
          username: loginInfo.username
        });
        if (!user) {
          return res.jsonp({ content: "User không tồn tại!", success: false });
        } else {
          const comparePassword = await bcryptjs.compare(
            loginInfo.password,
            user.password
          );

          if (comparePassword) {
            const token = jwt.sign(
              { username: user.username, authId: user.id },
              "secretkey",
              {
                expiresIn: "24h"
              }
            );
            const refreshToken = jwt.sign(
              { authId: user.id },
              "refreshTokenSecret",
              {
                expiresIn: "24h"
              }
            );

            const checkToken = await Token.findOne({ authId: user.id });
            let expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + 1);
            // const newToken = await Token.create({
            //   authId: user.id,
            //   expiredAt: expiredDate,
            //   token: token,
            //   refreshToken: refreshToken
            // });
            if (!checkToken) {
              const newToken = await Token.create({
                authId: user.id,
                expiredAt: expiredDate,
                token: token,
                refreshToken: refreshToken
              });
            } else {
              await Token.update(
                { authId: user.id },
                {
                  expiredAt: expiredDate,
                  token: token,
                  refreshToken: refreshToken
                }
              );
            }
            const response = {
              message: "Logged in",
              success: true,
              username: user.username,
              authId: user.authId,
              token: token,
              refreshToken: refreshToken
            };
            tokenList[refreshToken] = response;
            const userLogin = await Auth.update(
              { username: user.username },
              {
                onlineAt: new Date()
              }
            );

            // localStorage.setItem("token",token);

            let checkTime = false;
            const interval = setInterval(async () => {
              const expiredUser = await Token.findOne({
                authId: user.id
              });
              if (expiredUser) {
                if (Date.now() > expiredUser.expiredAt.getTime()) {
                  const deleteToken = await Token.destroy({
                    authId: user.id
                  });
                  checkTime = true;
                }
                if (checkTime === true) {
                  clearInterval(interval);
                }
              } else {
                clearInterval(interval);
              }
            }, 60000);

            return res.ok({ content: response, success: true });
          } else {
            // failed
            let data = {
              content: "Sai mật khẩu!",
              success: false
            }
            return res.jsonp(data);
          }
        }
      }
    } catch (error) {
      return res.notFound({ content: "Server Error!", success: false });
    }
  },

  token: (req, res) => {
    // refresh token
    const postData = req.body;
    // if refresh token exists
    console.log(tokenList);
    if (postData.refreshToken && postData.refreshToken in tokenList) {
      try {
        const user = {
          username: tokenList[postData.refreshToken].username,
          authId: tokenList[postData.refreshToken].id
        };
        const token = jwt.sign(user, "secretkey", {
          expiresIn: "24h"
        });
        const response = {
          token: token
        };
        // update the token in the list
        tokenList[postData.refreshToken].token = token;
        return res.ok(response);
      } catch (error) {
        throw error;
        return res.jsonp("Invalid refresh token");
      }
    } else {
      return res.jsonp("Invalid request");
    }
  },

  logout: async function (req, res) {
    try {
      const authData = req.authData;
      const deleteToken = await Token.destroy({
        authId: authData.authId
      });
      localStorage.clear();
      if (!deleteToken.length) {
        return res.jsonp("Error!");
      } else {
        return res.redirect("/");
      }
    } catch (error) {
      res.notFound(error.message);
    }
  }
};
