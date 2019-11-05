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
            const list = await Question.find({});
            res.jsonp(list);
        } catch (error) {
            res.badRequest(error)
        }

    },

    viewquestion: async function (req, res) {
        const { id } = req.params;
        const q = await Question.findOne({ id: id });
        const a = await Answer.find({ idQuestion: id });
        res.jsonp({ q, a });
        khoitao.khoitao();
    },

    create: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const id = await taikhoan.getId(headers);
            const { topic_id, content } = req.body;
            if (topic_id && content) {
                if (vaildate.checkContent(content)) {
                    const date = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                    await Question.create({ content: content, date: date, topic_id: topic_id, count_like: 0, auth_Id: id });
                    const list = await Question.find({});
                    res.jsonp(list);
                } else {
                    res.badRequest("Nội dung nhập vào chưa hợp lệ")
                }
            } else {
                res.badRequest("Vui lòng nhập đủ thông tin")
            }

        } catch (error) {
            res.badRequest(error)
        }
    },

    edit: async function (req, res) {
        try {
            const { id } = req.params;
            if (id) {
                const questionEdit = await Question.findOne({ id: id });
                const headers = req.headers['authorization'];
                const idAuth = await taikhoan.getId(headers);
                if (questionEdit.id == idAuth) {
                    const { content } = req.body;
                    if (content) {
                        if (vaildate.checkContent(content)) {
                            const date = moment(Date.now()).format("HH:mm DD-MM-YYYY");
                            await Question.update({ id: id }, { content: content, date: date })
                            const q = await Question.find({ id: id })
                            res.jsonp(q);
                        } else {
                            res.badRequest("Nội dung nhập vào chưa hợp lệ")
                        }

                    } else {
                        res.badRequest("Vui lòng nhập đủ hông tin")
                    }
                } else {
                    res.badRequest("Không có quyền sửa");
                }
            } else {
                res.badRequest("Chưa có id")
            }

        } catch (error) {
            res.badRequest(error)
        }

    },
    delete: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const { id } = req.params;
            if (id && idAuth) {
                const questionDelete = await Question.findOne({ id: id });
                if (questionDelete) {
                    if (questionDelete.auth_Id == idAuth) {

                        await Question.destroy({ id: id });
                        const answerDelete = await Answer.find({ idQuestion: id });
                        if (answerDelete) {
                            await Answer.destroy({ idQuestion: id });
                        }
                        res.jsonp("Xóa thành công");
                    } else {

                        res.badRequest("Không có quyên xóa")
                    }
                }
                else {
                    res.badRequest("Không có câu hỏi cần xóa")
                }
            } else {
                res.badRequest("Chưa có id");
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
            res.jsonp(listQuestion);
        } catch (error) {
            res.badRequest(error)
        }
    }
    // like: async function (req, res) {
    //     const { id } = req.params;
    //     const q = await Question.findOne({ id: id })
    //     const like = q.count_like + 1;
    //     console.log(like);
    //     await Question.update({ id: id }, { count_like: like });
    //     res.jsonp(q);
    // }
};

