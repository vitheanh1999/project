/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {
    create: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const idQuestion = req.body.id;
            if (idQuestion) {
                const { content } = req.body;
                if (content) {
                    if (vaildate.checkContent(content)) {
                        
                        await Answer.create({ content: content, idQuestion: idQuestion, auth_Id: idAuth });
                        const q = await Question.findOne({ id: idQuestion });
                        const a = await Answer.find({idQuestion: idQuestion});
                        res.jsonp({
                            q,
                            a,
                            content: "Thêm thành công",
                            success: true
                        });
                    } else {
                        res.jsonp(
                            {
                                content: "Nội dung câu trả lời nhập vào chưa hợp lệ",
                                success: false
                            })
                    }

                } else {
                    res.jsonp({
                        content: "Vui lòng nhập thông tin",
                        success: false
                    })

                }

            } else {

                res.jsonp({
                    content: "Không có id câu hỏi",
                    success: false
                })

            }
        } catch (error) {
            res.badRequest(error)
        }


    },
    edit: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const idAnswer = req.body.id;
            if (idAnswer) {
                const answerEdit = Answer.findOne({ id: idAnswer });
                if (answerEdit) {
                    if (answerEdit.auth_Id == idAuth) {
                        const { content } = req.body;
                        if (content) {
                            await Answer.update({ id: idAnswer }, { content: content });
                            const a = await Answer.find({ id: idAnswer });
                            res.jsonp({
                                content: "Đã Sửa",
                                a,
                                success: true
                            });
                        } else {
                            res.jsonp({
                                content: "Vui lòng nhập nội dung câu trả lời",
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
                        content: "Không có câu hỏi cần sửa",
                        success: false
                    })
                }

            } else {
                res.jsonp({
                    content: "Chưa có id câu hỏi sửa",
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
            const { idAnswer } = req.body;
            if (idAnswer) {
                const answersDelete = await Answer.find({ id: idAnswer });
                if (answersDelete) {
                    if (answersDelete.auth_Id == idAuth) {
                        await Answer.destroy({ id: id });
                        res.jsonp({
                            content: "Xóa câu trả lời thành công",
                            success: true
                        });
                    } else {
                        res.jsonp({
                            content: "Không có quyền xóa",
                            success: true
                        });
                    }

                } else {
                    res.jsonp({
                        content: "Không có trả lời cần xóa",
                        success: false
                    })
                }

            } else {
                res.jsonp({
                    content: "Không có id câu hỏi",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error)
        }

    }
};

