/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require("moment");
module.exports = {
    list: async function (req, res) {
        const list = await Question.find({});
        res.jsonp(list);
    },
    viewquestion: async function (req, res) {
        const { id } = req.body;
        const q = await Question.find({ id: id });
        const a = await Answer.find({ idQuestion: id });
        res.jsonp({ q, a });
    },
    create: async function (req, res) {
        const { chude, content } = req.body;
        const date = moment(Date.now()).format("HH:mm DD-MM-YYYY");
        await Question.create({ chude: chude, content: content, date: date });
        const list = await Question.find({});
        res.jsonp(list);
    }
};

