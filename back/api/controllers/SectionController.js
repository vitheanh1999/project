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
                    listSec,
                    success: true
                });
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
            const Sections = await Section.find();
            res.jsonp({
                Sections,
                content: "Thành công",
                success: true
            })
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
                    const q = await Question.find({ section_id: idSec });
                    res.jsonp({
                        content: "Thành công",
                        sec, q,
                        success: true
                    })
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
                        const sec = req.body;
                        if (sec.title && sec.content) {
                            await Section.update({ id: idSec }, { title: sec.title, content: sec.content })
                            const s = await Section.findOne({ id: idSec });
                            res.jsonp({
                                content: "Sửa thành công",
                                s,
                                success: true
                            })
                        } else {
                            res.jsonp({
                                content: "Vui lòng nhập đủ thông tin",
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
                    await Section.update({ id: idSec }, { open: 0 })
                    res.jsonp({
                        content: "Đóng phiên thành công",
                        success: true
                    })
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
                    await Section.update({ id: idSec }, { open: 1 })
                    res.jsonp({
                        content: "Mở phiên thành công",
                        success: true
                    })
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

