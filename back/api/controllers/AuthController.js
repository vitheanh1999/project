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
// module.exports = {
//     login: async function (req, res) {
//         try {
//             if (req.body.data.username && req.body.data.password) {
//                 const user = req.body.data;
//                 const dataAuth = await Auth.findOne({ username: user.username });
//                 if (dataAuth) {
//                     const comparePassword = await bcrypt.compare(user.password, dataAuth.password);
//                     const comparePassword1 = await Auth.findOne({password:user.password});

//                     if (comparePassword||comparePassword1) {
//                         console.log("comparePassword")
//                         const name = dataAuth.name;
//                         const time = moment(Date.now()).format("HH:mm DD-MM-YYYY");
//                         await Auth.update({ id: dataAuth.id }, { onlineAt: new Date });
//                         const token = jwt.sign({ username: dataAuth.username, name: dataAuth.name, id: dataAuth.id }, key)
                        
//                         res.jsonp({
//                             dataAuth,
//                             token,
//                             time,
//                             content: "Đăng nhập thành công",
//                             success: true
//                         });
//                     } else {
//                         res.jsonp(
//                             {
//                                 content: "Sai mật khẩu",
//                                 success: false
//                             }
//                         )
//                     }
//                 } else {
//                     res.jsonp(
//                         {
//                             content: "Sai tài khoản",
//                             success: false
//                         }
//                     )
//                 }
//             } else {
//                 res.jsonp(
//                     {
//                         content: "Vui lòng nhập thông tin",
//                         success: false
//                     }
//                 )
//             }
//         } catch (err) {
//             res.badRequest(
//                 err

//             )
//         }
//     },
//     registration: async function (req, res) {
//         try {
//             if (req.body.username &&
//                 req.body.password &&
//                 req.body.name &&
//                 req.body.email &&
//                 req.body.confirmpassword
//             ) {
//                 const newUser = req.body;
//                 if (vaildate.checkUser(newUser.username)) {
//                     const checkNameUser = await Auth.findOne({ username: newUser.username });
//                     if (checkNameUser) {
//                         res.jsonp({
//                             content: "User name đã được sử dụng",
//                             success: false
//                         });
//                     } else {
//                         const checkEmail = await Auth.findOne({ email: newUser.email });
//                         if (checkEmail) {
//                             res.jsonp({
//                                 content: "Email đẫ được sử dụng",
//                                 success: false
//                             })
//                         } else {
//                             if (vaildate.checkPassword(newUser.password)) {
//                                 if (vaildate.checkName(newUser.name)) {
//                                     if (vaildate.checkEmail(newUser.email)) {
//                                         if (newUser.confirmpassword == newUser.password) {
//                                             await khoitao.khoitao();
//                                             const hashPassword = await bcrypt.hash(newUser.password, 10);
//                                             const user = await Auth.create({
//                                                 username: newUser.username,
//                                                 password: hashPassword,
//                                                 name: newUser.name,
//                                                 email: newUser.email,
//                                                 role: 2
//                                             });
//                                             res.send({
//                                                 content: "Đăng kí thành công",
//                                                 success: true
//                                             });
//                                         } else {
//                                             res.jsonp({
//                                                 content: "Mật khẩu xác nhận chưa trùng nhau",
//                                                 success: false
//                                             });
//                                         }

//                                     } else {
//                                         res.jsonp({
//                                             content: "Email chưa đúng định dạng. Vd: abc@abc.com.vn ",
//                                             success: false
//                                         });
//                                     }
//                                 } else {
//                                     res.jsonp({
//                                         content: "Tên chưa hợp lệ",
//                                         success: false
//                                     });
//                                 }

//                             } else {
//                                 res.jsonp({
//                                     content: "Mật khẩu sai định dạng : Mật khẩu có độ dài từ 6 đến 16 ký tự có ít nhất 1 số và 1 chữ cái ",
//                                     success: false
//                                 });
//                             }
//                         }

//                     }
//                 } else {
//                     res.jsonp({
//                         content: "Tài khoản cần từ 6 tới 16 ký tự không có ký tự đặc biệt chỉ số và chữ",
//                         success: false
//                     });
//                 }
//             } else {
//                 res.jsonp({
//                     content: "Vui lòng nhập đủ thông tin",
//                     success: false
//                 });
//             }
//         } catch (error) {
//             res.badRequest(
//                 {
//                     error

//                 }
//             );
//         }
//     },
//     getInfor: async function (req, res) {
//         try {
//             const { id } = req.body;
//             if (id) {
//                 const dataAuth = await Auth.findOne({ id: id });
//                 if (dataAuth) {
//                     if(dataAuth.role==2){
//                         const listQ=await Question.find({auth_Id:id})
//                         res.jsonp({
//                             dataAuth,
//                             success: true
//                         })
//                     }
                   
//                 } else {
//                     res.jsonp({
//                         content: "Không có tài khoản cần tìm",
//                         success: false
//                     })
//                 }
//             } else {
//                 res.jsonp({
//                     content: "Không có id",
//                     success: false
//                 })
//             }

//         } catch (error) {
//             res.badRequest(
//                 error
//             );
//         }
//     }
// };

module.exports = {
    login: async function (req, res) {
        try {
            if (req.body.data.username && req.body.data.password) {
                const user = req.body.data;
                const dataAuth = await Auth.findOne({ username: user.username });
                if (dataAuth) {
                    const comparePassword = await bcrypt.compare(user.password, dataAuth.password);
                    if (comparePassword) {
                        const name = dataAuth.name;
                        const time = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                        await Auth.update({ id: dataAuth.id }, { onlineAt: new Date(), date: time });
                        
                        const token = jwt.sign({ username: dataAuth.username, name: dataAuth.name, id: dataAuth.id }, key)
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
                                                role: 3
                                            });
                                            res.send({
                                                content: "Đăng kí người dùng thành công",
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
            const idAuth = req.body.id;
            if (idAuth) {
                const dataAuth = await Auth.findOne({ id: idAuth });
                if (dataAuth) {
                    const queryA = `SELECT a.id,a.username,a.name,a.onlineAt,a.email,a.createdAt,a.date,
                    (SELECT r.name_role From role r WHERE a.role=r.id) role,
                    (SELECT COUNT(*) FROM section s WHERE s.auth_id=a.id) countS,
                    (SELECT COUNT(*) FROM question q WHERE q.auth_Id=a.id) countQ
                    FROM auth a 
                    where id=${idAuth}`
                    const queryQ = `SELECT q.*,a.name,
                    (SELECT count(*)FROM answer anw where anw.idQuestion=q.id) as countA FROM question q
                    inner join auth a on a.id=q.auth_Id
                    where auth_id=${idAuth}`
                    const queryS = `SELECT a.name,t.topic,s.*,
                    (SELECT count(*) From question q where q.section_id=s.id ) as countQ FROM section s 
                    inner join auth a on s.auth_id=a.id 
                    inner join topic t on t.id = s.topic_id
                    where auth_id=${idAuth}
                    ORDER BY s.updatedAt DESC`
                    Auth.query(queryA, [''], function (err, A) {
                        if (err) {
                            res.badRequest(err)
                        } else {
                            Section.query(queryS, [''], function (err, listS) {
                                if (err) {
                                    return res.badRequest(err);
                                } else {
                                    Question.query(queryQ, [''], function (err, listQ) {
                                        if (err) {
                                            return res.badRequest(err);
                                        } else {

                                            res.jsonp({
                                                A,
                                                listS,
                                                listQ,
                                                content: "Thành công",
                                                success: true
                                            });
                                        }

                                    });
                                }

                            });

                        }

                    })
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
    },
    myauth: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const queryA = `SELECT a.id,a.username,a.name,a.onlineAt,a.email,a.createdAt,a.date,
            (SELECT r.name_role From role r WHERE a.role=r.id) role,
            (SELECT COUNT(*) FROM section s WHERE s.auth_id=a.id) countS,
            (SELECT COUNT(*) FROM question q WHERE q.auth_Id=a.id) countQ
            FROM auth a 
            where id=${idAuth}`
            const queryQ = `SELECT q.*,a.name,
            (SELECT count(*)FROM answer anw where anw.idQuestion=q.id) as countA FROM question q
            inner join auth a on a.id=q.auth_Id
            where auth_id=${idAuth}`
            const queryS = `SELECT a.name,t.topic,s.*,
            (SELECT count(*) From question q where q.section_id=s.id ) as countQ FROM section s 
            inner join auth a on s.auth_id=a.id 
            inner join topic t on t.id = s.topic_id
            where auth_id=${idAuth}
            ORDER BY s.updatedAt DESC`
            Auth.query(queryA, [''], function (err, A) {
                if (err) {
                    res.badRequest(err)
                } else {
                    Section.query(queryS, [''], function (err, listS) {
                        if (err) {
                            return res.badRequest(err);
                        } else {
                            Question.query(queryQ, [''], function (err, listQ) {
                                if (err) {
                                    return res.badRequest(err);
                                } else {

                                    res.jsonp({
                                        A,
                                        listS,
                                        listQ,
                                        content: "Thành công",
                                        success: true
                                    });
                                }

                            });
                        }

                    });

                }

            })
        } catch (error) {
            res.badRequest(error)
        }
    },
    getAll: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const auth = await Auth.findOne({ id: idAuth })
            if (auth) {
                if (auth.role == 1) {
                    const query = `SELECT a.id,a.username,a.name,a.onlineAt,a.email,a.createdAt,a.date,
                    (SELECT r.name_role From role r WHERE a.role=r.id) role,
                    (SELECT COUNT(*) FROM section s WHERE s.auth_id=a.id) countS,
                    (SELECT COUNT(*) FROM question q WHERE q.auth_Id=a.id) countQ
                    FROM auth a`
                    Auth.query(query, [''], function (err, listA) {
                        if (err) {
                            res.badRequest(err)
                        } else {
                            res.jsonp({
                                listA,
                                content: "Thành công",
                                success: true
                            })
                        }
                    })
                } else {
                    res.jsonp({
                        conntent: "Bạn không phải là admin",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    conntent: "Không có tài khoản",
                    success: false
                })
            }

        } catch (error) {
            res.badRequest(error)
        }
    },
    changeRole: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const auth = await Auth.findOne({ id: idAuth })
            const id = req.body.id
            if (auth) {
                if (auth.role == 1) {
                    if (id) {
                        const authChange = await Auth.findOne({ id: id });
                        if (authChange) {
                            if (authChange.role == 1) {
                                res.jsonp({
                                    conntent: "Không được thay đổi quyền admin",
                                    success: false
                                })
                            } else {
                                if (authChange.role == 2) {
                                    await Auth.update({ id: id }, { role: 3 })
                                    res.jsonp({
                                        conntent: "Đã được thay đổi quyền từ chủ tọa thành người dùng",
                                        success: true
                                    })
                                } else {
                                    if (authChange.role == 3) {
                                        await Auth.update({ id: id }, { role: 2 })
                                        res.jsonp({
                                            conntent: "Đã được thay đổi quyền từ người dùng thành chủ tọa",
                                            success: true
                                        })
                                    }
                                }
                            }

                        } else {
                            res.jsonp({
                                conntent: "Chưa có id tài khoản cần thay đổi",
                                success: false
                            })
                        }

                    } else {
                        res.jsonp({
                            conntent: "Không có id người dùng cần thay đổi",
                            success: false
                        })
                    }

                } else {
                    res.jsonp({
                        conntent: "Không phải là admin",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    conntent: "Không có tài khoản",
                    success: false
                })
            }

        } catch (error) {
            res.badRequest(error)
        }
    },
    create: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const auth = await Auth.findOne({ id: idAuth })
            if (auth.role == 1) {
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
                                                const hashPassword = await bcrypt.hash(newUser.password, 10);
                                                const user = await Auth.create({
                                                    username: newUser.username,
                                                    password: hashPassword,
                                                    name: newUser.name,
                                                    email: newUser.email,
                                                    role: 2
                                                });
                                                res.send({
                                                    content: "Tạo chủ tọa thành công",
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
            } else {
                res.jsonp({
                    conntent: "Không có quyền",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error)
        }

    },
    editpassword: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const idA = req.body.id;
            if (idA) {
                const editpasswordAuth = await Auth.findOne({ id: idA })
                if (editpasswordAuth) {
                    if (idA == idAuth) {
                        const { oldpassword, password, confirmpassword } = req.body
                        if (oldpassword && password && confirmpassword) {
                            const comparePassword = await bcrypt.compare(oldpassword, editpasswordAuth.password);
                            if (comparePassword) {
                                if (vaildate.checkPassword(password)) {
                                    if (password == confirmpassword) {
                                        const hashPassword = await bcrypt.hash(password, 10);
                                        await Auth.update({ id: idA }, { password: hashPassword })
                                        res.jsonp({
                                            content: "Thay đổi thành công",
                                            success: true
                                        })
                                    } else {
                                        res.jsonp({
                                            content: "Mật khẩu không trùng khớp với nhau",
                                            success: false
                                        })
                                    }
                                } else {
                                    res.jsonp({
                                        content: "Mật khẩu sai định dạng : Mật khẩu có độ dài từ 6 đến 16 ký tự có ít nhất 1 số và 1 chữ cái",
                                        success: false
                                    })
                                }
                            } else {
                                res.jsonp({
                                    content: "Nhập sai mật khẩu cũ",
                                    success: false
                                })
                            }
                        } else {
                            res.jsonp({
                                content: "Nhập đủ thông tin",
                                success: false
                            })
                        }
                    } else {
                        res.jsonp({
                            content: "Không có quyền sửa",
                            success: false
                        })
                    }
                } else {
                    res.jsonp({
                        content: "Không có tài khoản cần sửa mật khẩu",
                        success: false
                    })

                }
            } else {
                res.jsonp({
                    content: "Không có id tài khoản càn sửa",
                    success: false
                })
            }

        } catch (error) {
            res.badRequest(error)
        }

    },
    resetpassword: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const authreset = await Auth.findOne({ id: idAuth })
            const idA = req.body.id;
            if (idA) {
                const resetpasswordAuth = await Auth.findOne({ id: idA })
                if (resetpasswordAuth) {
                    if (authreset.role == 1) {
                        const password = resetpasswordAuth.username;
                        const hashPassword = await bcrypt.hash(password, 10);
                        await Auth.update({ id: idA }, { password: hashPassword })
                        res.jsonp({
                            content: "Đã reset mật khẩu",
                            success: true
                        })
                    } else {
                        res.jsonp({
                            content: "Bạn không phải admin",
                            success: false
                        })
                    }
                } else {
                    res.jsonp({
                        content: "Không có tài khoản cần reset mật khẩu",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Không có id tài khoản càn sửa",
                    success: false
                })
            }

        } catch (error) {
            res.badRequest(error)
        }

    }
};
