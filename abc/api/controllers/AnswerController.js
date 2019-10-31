/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: async function (req, res) {
        console.log(req.params);
        const {idQuestion} = req.body;
        console.log(idQuestion);
        const { content } = req.body;
        await Answer.create({ content: content, idQuestion: idQuestion });
        const a = await Answer.find({ idQuestion: idQuestion });
        console.log(a)
        res.jsonp(a);
    }
};

