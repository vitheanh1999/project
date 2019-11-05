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
            const idQuestion = req.params.id;
            if (idQuestion) {
                const { content } = req.body;
                if (content) {
                    if (vaildate.checkContent(content)) {
                        await Answer.create({ content: content, idQuestion: idQuestion, auth_Id: idAuth });
                        const a = await Answer.find({ idQuestion: idQuestion });
                        res.jsonp(a);
                    } else {
                        res.badRequest("Nội dung câu trả lời nhập vào chưa hợp lệ")
                    }

                } else {
                    res.badRequest("Vui lòng nhập thông tin")
                }

            } else {
                res.badRequest("Không có id")
            }
        } catch (error) {
            res.badRequest(error)
        }


    },
    edit: async function (req, res) {
        try {
            const { idAnswer } = req.params;
            const { content } = req.body;
            await Answer.update({ id: idAnswer }, { content: content });
            const a = await Answer.find({ id: idAnswer });
            res.jsonp(a);
        } catch (error) {
            res.badRequest(error)
        }
    },
    delete: async function (req, res) {
        try {
            const { idAnswer } = req.params;
            if (idAnswer) {
                const answersDelete = await Answer.find({ id: idAnswer });
                if (answersDelete) {
                    await Answer.destroy({ id: id });
                    res.jsonp("Xóa câu hỏi thành công");
                } else {
                    res.jsonp("Không có câu hỏi cần xóa")
                }
            }


        } catch (error) {

        }

    }
};

