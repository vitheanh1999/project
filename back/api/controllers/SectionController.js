/**
 * SectionController
 *
 * @description :: Server-side logic for managing sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {
    create: async function (req, res) {
        try {
            const sec = req.body;
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            if (sec.title && sec.content && sec.topic_id) {
                if (vaildate.checkContent(sec.title)) {
                    if (vaildate.checkContent(sec.content)) {
                        const date = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                        await Section.create({
                            title: sec.title,
                            content: sec.content,
                            open: 1,
                            date: date,
                            topic_id: sec.topic_id,
                            auth_id: idAuth
                        });
                        const listSec = await Section.find();
                        res.jsonp({
                            content: "Tạo thành công",
                            listSec,
                            success: true
                        });
                    } else {
                        res.jsonp({
                            content: "Vui lòng nhập đúng nội dung",
                            success: false
                        })
                    }

                } else {
                    res.jsonp({
                        content: "Vui lòng nhập đúng tiêu đề",
                        success: false
                    })
                }

            } else {
                res.jsonp({
                    content: "Vui lòng nhập đủ thông tin",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error);
        }

    },
      list: async function (req, res) {
        try {
            const { topic_id } = req.body;
            let whereQuery;
            if (topic_id) {
                whereQuery = `where s.topic_id=${topic_id}`
            } else {
                whereQuery = " "
            }
            let query = `SELECT a.name,t.topic,s.*,
            (SELECT count(*) From question q where q.section_id=s.id ) as countQ FROM section s 
            inner join auth a on s.auth_id=a.id 
            inner join topic t on t.id = s.topic_id
            ${whereQuery}
            ORDER BY s.updatedAt DESC   `
            Section.query(query, [''], function (err, sec) {
                if (err) {
                    return res.badRequest(err);
                } else {

                    res.jsonp({
                        sec,
                        content: "Thành công",
                        success: true
                    });
                }

            });
        } catch (error) {
            res.badRequest(error)
        }
    },

    viewsec: async function (req, res) {
        try {
            const idSec = req.body.id;
            if (idSec) {
                const sec = await Section.findOne({ id: idSec });
                if (sec) {
                    const listSurvey= await Survey.find({section_id: idSec})
                    let query = `SELECT a.name,t.topic,s.*,
                    (SELECT count(*) From question q where q.section_id=s.id ) as countQ FROM section s 
                    inner join auth a on s.auth_id=a.id 
                    inner join topic t on t.id = s.topic_id
                    where s.id=${idSec}
                    `
                    Section.query(query, [''], function (err, sec) {
                        if (err) {
                            return res.badRequest(err);
                        } else {
                            let queryQ = `SELECT q.*,a.name,
                            (SELECT count(*)FROM answer anw where anw.idQuestion=q.id) as countA FROM question q
                            inner join auth a on a.id=q.auth_Id
                            where q.section_id=${idSec} 
                            ORDER BY q.updatedAt DESC `;
                            // let queryQ = `SELECT q.*,a.name,
                            // (SELECT count(*)FROM answer anw where anw.idQuestion=q.id) as countA FROM question q
                            // inner join auth a on a.id=q.auth_Id
                            // where q.section_id=${idSec}`;
                            Question.query(queryQ, [''], function (err, listQ) {
                                if (err) {
                                    return res.badRequest(err);
                                } else {
                                    res.jsonp({
                                        sec,
                                        listQ,
                                        listSurvey,
                                        content: "Thành công",
                                        success: true
                                    });
                                }
                            });
                        }

                    });

                } else {
                    res.jsonp({
                        content: "Không có phiên câu hỏi",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Chưa có id",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error)
        }
    },
    edit: async function (req, res) {
        try {
            const idSec = req.body.id;
            if (idSec) {
                const secEdit = await Section.findOne({ id: idSec })
                if (secEdit) {
                    const headers = req.headers['authorization'];
                    const idAuth = await taikhoan.getId(headers);
                    if (secEdit.auth_id == idAuth) {
                        if (secEdit.open == true) {
                            const sec = req.body;
                            if (sec.title && sec.content) {
                                if (vaildate.checkContent(sec.title)) {
                                    if (vaildate.checkContent(sec.content)) {
                                        const date = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                                        await Section.update({ id: idSec }, { title: sec.title, content: sec.content, date:date})
                                        const s = await Section.findOne({ id: idSec });
                                        res.jsonp({
                                            content: "Sửa thành công",
                                            s,
                                            success: true
                                        })
                                    } else {
                                        res.jsonp({
                                            content: "Vui lòng nhập đúng nội dung",
                                            success: false
                                        })
                                    }

                                } else {
                                    res.jsonp({
                                        content: "Vui lòng nhập đúng tiêu đề",
                                        success: false
                                    })
                                }

                            } else {
                                res.jsonp({
                                    content: "Vui lòng nhập đủ thông tin",
                                    success: false
                                })
                            }
                        } else {
                            res.jsonp({
                                content: "Phiên đã đóng",
                                success: false
                            })
                        }
                    } else {
                        res.jsonp({
                            content: "Bạn không có quyền sửa",
                            success: false
                        })
                    }
                } else {
                    res.jsonp({
                        content: "Không tìm được phiên cần sửa",
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
            res.badRequest(error)
        }

    },
    delete: async function (req, res) {
        try {
            const idSec = req.body.id;
            if (idSec) {
                const secDelete = await Section.findOne({ id: idSec });
                if (secDelete) {
                    const headers = req.headers['authorization'];
                    const idAuth = await taikhoan.getId(headers);
                    if (idAuth == secDelete.auth_id) {
                        await Section.destroy({ id: idSec });
                        await Question.destroy({ section_id: idSec })
                        await Survey.destroy({ section_id: idSec })
                        const listSec = await Section.find();
                        res.jsonp({
                            content: "Xóa thành công",
                            success: true,
                            listSec
                        })
                    } else {
                        res.jsonp({
                            content: "Bạn không có quyền xóa",
                            success: false
                        })
                    }

                } else {
                    res.jsonp({
                        content: "Không có phiên cần xóa",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Chưa có id",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error)
        }
    },
    closesec: async function (req, res) {
        try {
            const idSec = req.body.id;
            if (idSec) {
                const secClose = await Section.findOne({ id: idSec });
                if (secClose) {
                    const headers = req.headers['authorization'];
                    const idAuth = await taikhoan.getId(headers);
                    if (secClose.auth_id == idAuth) {
                        if (secClose.open == false) {
                            res.jsonp({
                                content: "Phiên đã đóng",
                                success: false
                            })
                        } else {
                            await Section.update({ id: idSec }, { open: 0 })
                            res.jsonp({
                                content: "Đóng phiên thành công",
                                success: true
                            })
                        }
                    } else {
                        res.jsonp({
                            content: "Bạn không có quyền đóng",
                            success: false
                        })
                    }
                } else {
                    res.jsonp({
                        content: "Không có phiên cần đóng",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Chưa có id",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error);
        }
    },
    opensec: async function (req, res) {
        try {
            const idSec = req.body.id;
            if (idSec) {
                const secopen = await Section.findOne({ id: idSec });
                if (secopen) {
                    const headers = req.headers['authorization'];
                    const idAuth = await taikhoan.getId(headers);
                    if (secopen.auth_id == idAuth) {
                        if (secopen.open == true) {
                            res.jsonp({
                                content: "Phiên đang mở",
                                success: false
                            })
                        } else {
                            await Section.update({ id: idSec }, { open: 1 })
                            res.jsonp({
                                content: "Mở phiên thành công",
                                success: true
                            })
                        }
                    } else {
                        res.jsonp({
                            content: "Bạn không có quyền mở",
                            success: false
                        })
                    }


                } else {
                    res.jsonp({
                        content: "Không có phiên cần mở",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Chưa có id",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error);
        }
    }
};

