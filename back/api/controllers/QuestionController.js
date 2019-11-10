/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');

module.exports = {

    list: async function (req, res) {
        try {
            const sectionId = req.body.id;
            if (sectionId) {
                const list = await Question.find({ section_id: sectionId });
                res.jsonp({
                    list,
                    success: true
                });
            } else {
                res.jsonp({
                    content: "Không có id phiên"
                })
            }

        } catch (error) {
            res.badRequest(
                error
            )
        }

    },

    viewquestion: async function (req, res) {
        try {
            const idQuestion = req.body.id;
            if (idQuestion) {
                const q = await Question.findOne({ id: idQuestion });
                if (q) {
                    const a = await Answer.find({ idQuestion: idQuestion });
                    res.jsonp({
                        q, a,
                        success: true
                    });
                } else {
                    res.jsonp({
                        success: false,
                        content: "Không có câu hỏi"
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

    create: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const id = await taikhoan.getId(headers);
            const sectionId = req.body.id;
            const { content } = req.body;
            if (sectionId) {
                if (content) {
                    if (vaildate.checkContent(content)) {
                        const date = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                        await Question.create({ content: content, date: date, section_id: sectionId, count_like: 0, auth_Id: id });
                        const list = await Question.find({ section_id: sectionId });
                        res.jsonp({ list, success: true });
                    } else {
                        res.jsonp({
                            content: "Nội dung nhập vào chưa hợp lệ",
                            success: false
                        })
                    }
                } else {
                    res.json({
                        content: "Vui lòng nhập đủ thông tin",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Chưa có id phiên",
                    success: false
                })
            }


        } catch (error) {
            res.badRequest(
                error

            )
        }
    },

    edit: async function (req, res) {
        try {
            const idQuestion = req.body.idQuestion;
            if (idQuestion) {
                const questionEdit = await Question.findOne({ id: idQuestion });
                if (questionEdit) {
                    const headers = req.headers['authorization'];
                    const idAuth = await taikhoan.getId(headers);
                    if (questionEdit.id == idAuth) {
                        const { content } = req.body.content;
                        if (content) {
                            if (vaildate.checkContent(content)) {
                                const date = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                                await Question.update({ id: idQuestion }, { content: content, date: date })
                                const q = await Question.find({ id: idQuestion })
                                res.jsonp({
                                    q,
                                    success: true
                                });
                            } else {
                                res.jsonp({
                                    content: "Nội dung nhập vào chưa hợp lệ"
                                    , success: false
                                })
                            }

                        } else {
                            res.jsonp({
                                content: "Vui lòng nhập đủ hông tin",
                                success: false
                            })
                        }
                    } else {
                        res.jsonp({
                            content: "Không có quyền sửa",
                            success: false
                        });
                    }
                } else {
                    res.json({
                        content: "Không có câu hỏi cần sửa",
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
    delete: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const { id } = req.body;
            if (id) {
                const questionDelete = await Question.findOne({ id: id });
                if (questionDelete) {
                    if (questionDelete.auth_Id == idAuth) {

                        await Question.destroy({ id: id });
                        const answerDelete = await Answer.find({ idQuestion: id });
                        const listQuestion = await Question.find();
                        if (answerDelete) {
                            await Answer.destroy({ idQuestion: id });
                        }
                        res.jsonp(
                            {
                                content: "Xóa thành công",
                                success: true,
                                listQuestion

                            }
                        )
                    } else {

                        res.jsonp({
                            content: "Không có quyên xóa",
                            success: false
                        })
                    }
                }
                else {
                    res.jsonp({
                        content: "Không có câu hỏi cần xóa",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Chưa có id",
                    success: false
                });
            }

        } catch (error) {
            res.badRequest(
                error
            )
        }


    },
    viewauth: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const id = await taikhoan.getId(headers);
            const listQuestion = await Question.find({ auth_Id: id });
            res.jsonp({
                listQuestion,
                success: true
            });
        } catch (error) {
            res.badRequest(error)
        }
    }
    // like: async function (req, res) {
    //     const { id } = req.body;
    //     const q = await Question.findOne({ id: id })
    //     const like = q.count_like + 1;
    //     console.log(like);
    //     await Question.update({ id: id }, { count_like: like });
    //     res.jsonp(q);
    // }
};

