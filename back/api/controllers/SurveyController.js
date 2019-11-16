/**
 * SurveyController
 *
 * @description :: Server-side logic for managing surveys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const section_id = req.body.id
            if (section_id) {
                const s = await Section.findOne({ id: section_id })
                if (s) {
                    if (s.open == true) {
                        const { survey, q } = req.body
                        if (survey.title && survey.description) {
                            if (vaildate.checkSurvey(q)) {
                                const createSurvey = await Survey.create({
                                    title: survey.title,
                                    description: survey.description,
                                    section_id: section_id,
                                    auth_id: idAuth
                                });
                                for (let item of q) {
                                    const createQuestion = await Questionsurvey.create({
                                        ...item,
                                        survery_id: createSurvey.id
                                    })
                                    for (let anw of item.a) {
                                        const createAnswer = await Answersurvey.create({
                                            ...anw,
                                            question_id: createQuestion.id

                                        })
                                    }
                                }
                                res.jsonp({
                                    content: "thành công",
                                    createSurvey,
                                    success: true
                                })
                            } else {
                                res.jsonp({
                                    content: "Nhập đủ nội dung câu hỏi và câu trả lời",
                                    success: false
                                })
                            }
                        } else {
                            res.jsonp({
                                content: "Nhập đủ nội mô tả của khảo sát ",
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
                        content: "Không có phiên",
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
    viewsuvey: async function (req, res) {
        try {
            const idSurvey = req.body.id;
            if (idSurvey) {
                const surveyView = await Survey.findOne({ id: idSurvey });
                if (surveyView) {
                    const query = `SELECT ans.*   FROM questionsurvey qs inner join answersurvey ans  on qs.id=ans.question_id inner join survey s on qs.survery_id=s.id where s.id=${idSurvey}`
                    const listQ = await Questionsurvey.find({ survery_id: idSurvey })
                    Questionsurvey.query(query, [''], function (err, anw) {
                        if (err) { return res.badRequest(err); }
                        res.jsonp({ surveyView, listQ, anw });
                    });
                } else {
                    res.jsonp({
                        content: "Không có survey",
                        success: false
                    })
                }

            } else {
                res.jsonp({
                    content: "Chưa có id của survey",
                    success: false
                })
            }

        } catch (error) {
            res.badRequest(error)
        }


    },
    listsurvey: async function (req, res) {
        try {
            const section_id = req.body.id;
            if (section_id) {
                const listS = await Survey.find({ section_id: section_id });
                res.jsonp({
                    listS,
                    success: true
                })
            } else {
                res.jsonp({
                    content: "Chưa có id của section",
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
            const idSurvey = req.body.id;
            if (idSurvey) {
                const editSurvey = await Survey.findOne({
                    id: idSurvey
                })
                if (editSurvey) {
                    const sec = await Section.findOne({
                        id: editSurvey.section_id
                    })
                    if (sec.open == true) {
                        if (editSurvey.auth_id == idAuth) {
                            const { survey, q } = req.body
                            if (survey.title && survey.description) {
                                if (vaildate.checkSurvey(q)) {
                                    await Survey.update({ id: idSurvey }, {
                                        title: survey.title,
                                        description: survey.description,
                                    });
                                    for (let item of q) {
                                        const editQuestion = await Questionsurvey.update({ id: item.id }, {
                                            ...item
                                        })
                                        console.log(item.id)
                                        for (let anw of item.a) {
                                            const editAnswer = await Answersurvey.update({ id: anw.id }, {
                                                ...anw
                                            })
                                        }
                                    }
                                    res.jsonp({
                                        content: "đã sửa thành công",
                                        editSurvey,
                                        success: true
                                    })
                                }
                            }

                        } else {
                            res.jsonp({
                                content: "Không có quyền sửa",
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
                        content: "Không có suvery",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Không có id suvery",
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
            const idSurvey = req.body.id;
            if (idSurvey) {
                await Survey.destroy({ id: idSurvey })
                res.jsonp({
                    content: "đã xóa thành công",
                    success: true
                })
            } else {
                res.jsonp({
                    content: "Không có id suvery",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error)
        }

    }
};


