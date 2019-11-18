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
            if (req.body.data.username && req.body.data.password) {
                const user = req.body.data;
                const dataAuth = await Auth.findOne({ username: user.username });
                if (dataAuth) {
                    const comparePassword = await bcrypt.compare(user.password, dataAuth.password);
                    const comparePassword1 = await Auth.findOne({password:user.password});

                    if (comparePassword||comparePassword1) {
                        console.log("comparePassword")
                        const name = dataAuth.name;
                        const time = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                        await Auth.update({ id: dataAuth.id }, { onlineAt: new Date });
                        const token = jwt.sign({ username: dataAuth.username, name: dataAuth.name, id: dataAuth.id }, key, { expiresIn: '24h' })
                        
                        res.jsonp({
                            dataAuth,
                            token,
                            time,
                            content: "Đăng nhập thành công",
                            success: true
                        });
                    } else {
                        res.jsonp(
                            {
                                content: "Sai mật khẩu",
                                success: false
                            }
                        )
                    }
                } else {
                    res.jsonp(
                        {
                            content: "Sai tài khoản",
                            success: false
                        }
                    )
                }
            } else {
                res.jsonp(
                    {
                        content: "Vui lòng nhập thông tin",
                        success: false
                    }
                )
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
                req.body.email &&
                req.body.confirmpassword
            ) {
                const newUser = req.body;
                if (vaildate.checkUser(newUser.username)) {
                    const checkNameUser = await Auth.findOne({ username: newUser.username });
                    if (checkNameUser) {
                        res.jsonp({
                            content: "User name đã được sử dụng",
                            success: false
                        });
                    } else {
                        const checkEmail = await Auth.findOne({ email: newUser.email });
                        if (checkEmail) {
                            res.jsonp({
                                content: "Email đẫ được sử dụng",
                                success: false
                            })
                        } else {
                            if (vaildate.checkPassword(newUser.password)) {
                                if (vaildate.checkName(newUser.name)) {
                                    if (vaildate.checkEmail(newUser.email)) {
                                        if (newUser.confirmpassword == newUser.password) {
                                            await khoitao.khoitao();
                                            const hashPassword = await bcrypt.hash(newUser.password, 10);
                                            const user = await Auth.create({
                                                username: newUser.username,
                                                password: hashPassword,
                                                name: newUser.name,
                                                email: newUser.email,
                                                role: 2
                                            });
                                            res.send({
                                                content: "Đăng kí thành công",
                                                success: true
                                            });
                                        } else {
                                            res.jsonp({
                                                content: "Mật khẩu xác nhận chưa trùng nhau",
                                                success: false
                                            });
                                        }

                                    } else {
                                        res.jsonp({
                                            content: "Email chưa đúng định dạng. Vd: abc@abc.com.vn ",
                                            success: false
                                        });
                                    }
                                } else {
                                    res.jsonp({
                                        content: "Tên chưa hợp lệ",
                                        success: false
                                    });
                                }

                            } else {
                                res.jsonp({
                                    content: "Mật khẩu sai định dạng : Mật khẩu có độ dài từ 6 đến 16 ký tự có ít nhất 1 số và 1 chữ cái ",
                                    success: false
                                });
                            }
                        }

                    }
                } else {
                    res.jsonp({
                        content: "Tài khoản cần từ 6 tới 16 ký tự không có ký tự đặc biệt chỉ số và chữ",
                        success: false
                    });
                }
            } else {
                res.jsonp({
                    content: "Vui lòng nhập đủ thông tin",
                    success: false
                });
            }
        } catch (error) {
            res.badRequest(
                {
                    error

                }
            );
        }
    },
    getInfor: async function (req, res) {
        try {
            const { id } = req.body;
            if (id) {
                const dataAuth = await Auth.findOne({ id: id });
                if (dataAuth) {
                    if(dataAuth.role==2){
                        const listQ=await Question.find({auth_Id:id})
                        res.jsonp({
                            dataAuth,
                            success: true
                        })
                    }
                   
                } else {
                    res.jsonp({
                        content: "Không có tài khoản cần tìm",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Không có id",
                    success: false
                })
            }

        } catch (error) {
            res.badRequest(
                error
            );
        }
    }
};

