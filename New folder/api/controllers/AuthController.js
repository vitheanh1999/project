/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let key = "qa"
module.exports = {
    login: async function (req, res) {
        try {
            if (req.body.username && req.body.password) {
                const user = req.body;
                const dataAuth = await Auth.findOne({ username: user.username });
                if (dataAuth) {
                    const comparePassword = await bcrypt.compare(user.password, dataAuth.password);
                    if (comparePassword) {
                        const name = dataAuth.name;
                        const time = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                        await Auth.update({ id: dataAuth.id }, { onlineAt: new Date });
                        const token = jwt.sign({ username: dataAuth.username, name: dataAuth.name, id: dataAuth.id }, key, { expiresIn: '24h' })
                        res.jsonp({token,time});
                    } else {
                        res.badRequest("Sai mật khẩu")
                    }
                } else {
                    res.badRequest("Sai tài khoản")
                }
            } else {
                res.badRequest("Vui lòng nhập thông tin")
            }
        } catch (err) {
            res.badRequest(
                err
            )
        }
    },
    registration: async function (req, res) {
        try {
            if (req.body.username &&
                req.body.password &&
                req.body.name &&
                req.body.email
            ) {
                const newUser = req.body;
                if (vaildate.checkUser(newUser.username)) {
                    const checkNameUser = await Auth.findOne({ username: newUser.username });
                    if (checkNameUser) {
                        res.badRequest("User name đã được sử dụng");
                    } else {
                        const checkEmail = await Auth.findOne({ email: newUser.email });
                        if (checkEmail) {
                            res.badRequest("Email đẫ được sử dụng")
                        } else {
                            if (vaildate.checkPassword(newUser.password)) {
                                if (vaildate.checkName(newUser.name)) {
                                    if (vaildate.checkEmail(newUser.email)) {
                                        await khoitao.khoitao();  
                                        const hashPassword = await bcrypt.hash(newUser.password, 10);
                                        const user = await Auth.create({
                                            username: newUser.username,
                                            password: hashPassword,
                                            name: newUser.name,
                                            email: newUser.email,
                                            role:2
                                        });
                                        res.send("Đăng kí thành công");
                                    } else {
                                        res.badRequest("Email chưa đúng định dạng. Vd: abc@abc.com.vn ");
                                    }
                                } else {
                                    res.badRequest("Tên chưa hợp lệ");
                                }

                            } else {
                                res.badRequest("Mật khẩu sai định dạng : Mật khẩu có độ dài từ 6 đến 16 ký tự có ít nhất 1 số và 1 chữ cái ");
                            }
                        }

                    }
                } else {
                    res.badRequest("Tài khoản cần từ 6 tới 16 ký tự không có ký tự đặc biệt chỉ số và chữ");
                }
            } else {
                res.badRequest("Vui lòng nhập đủ thông tin");
            }
        } catch (error) {
            res.badRequest(
                error
            );
        }
    },
    getInfor: async function (req,res){
        try {
            const { id } = req.params;
            const dataAuth = await Auth.findOne({ id: id });
        } catch (error) {
            res.badRequest(error);
        }
    }
};

