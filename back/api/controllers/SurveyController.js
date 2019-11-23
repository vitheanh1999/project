/**
 * SurveyController
 *
 * @description :: Server-side logic for managing surveys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
module.exports = {
    create: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const section_id = req.body.id
            if (section_id) {
                const s = await Section.findOne({ id: section_id })
                if (s) {
                    if (s.auth_id == idAuth) {
                        if (s.open == true) {
                            const survey = req.body
                            if (survey.title && survey.description) {
                                if (vaildate.checkContent(survey.title) && vaildate.checkContent(survey.description)) {
                                    if (vaildate.checkSurvey(survey.content)) {
                                        const newSurvey = await Survey.create({
                                            title: survey.title,
                                            description: survey.description,
                                            section_id: section_id,
                                            auth_id: idAuth,
                                            open: true
                                        })
                                        for (let q of survey.content) {
                                            const newQ = await Questionsurvey.create({
                                                survery_id: newSurvey.id,
                                                content: q.question,
                                                type: q.style
                                            })
                                            let a
                                            if (q.style == 1) {
                                                 a = q.data[0].answer
                                            } else {
                                                 a = q.data[0].answer1
                                            }
                                            for (let anw of a) {
                                                await Answersurvey.create({
                                                    question_id: newQ.id,
                                                    content: anw.content
                                                })
                                            }
                                        }
                                        res.jsonp({
                                            content: "Tạo thành công",
                                            newSurvey,
                                            success: true
                                        })
                                    } else {
                                        res.jsonp({
                                            content: "Nhập đủ và đúng nội dung câu hỏi và câu trả lời",
                                            success: false
                                        })
                                    }
                                } else {
                                    res.jsonp({
                                        content: "Nhập đúng nội dùng mô tả của khảo sát ",
                                        success: false
                                    })
                                }


                            } else {
                                res.jsonp({
                                    content: "Nhập đủ nội dùng mô tả của khảo sát ",
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
                            content: "Bạn không có quyền tạo cuộc khảo sát",
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

    viewsurvey: async function (req, res) {
        try {
            const idSurvey = req.body.id;
            if (idSurvey) {
                const surveyView = await Survey.findOne({ id: idSurvey });
                if (surveyView) {
                    const listQ = [];
                    const list = await Questionsurvey.find({ survery_id: idSurvey })
                    for (let q of list) {
                        const listA = await Answersurvey.find({ question_id: q.id })
                       

                        listQ.push({ q: q, a: listA })
                    }
                    res.jsonp({ surveyView, listQ });
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

    },
    open: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const idSurvey = req.body.id;
            if (idSurvey) {
                const openSurvey = await Survey.findOne({ id: idSurvey })
                if (openSurvey) {
                    if (openSurvey.auth_id == idAuth) {
                        if (openSurvey.open == true) {
                            res.jsonp({
                                content: "Khảo đang mở",
                                success: false
                            })
                        } else {
                            await Survey.update({ id: idSurvey }, { open: true })
                            res.jsonp({
                                content: "Mở cuộc khảo sát thành công",
                                success: true
                            })
                        }
                    } else {
                        res.jsonp({
                            content: "Không có quyền mở khảo sát",
                            success: false
                        })
                    }
                } else {
                    res.jsonp({
                        content: "Không có cuộc khảo sát cần mở",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Chưa có id cuộc khảo sát",
                    success: false
                })
            }

        } catch (error) {
            res.badRequest(error)
        }
    },
    close: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const idSurvey = req.body.id;
            if (idSurvey) {
                const closeSurvey = await Survey.findOne({ id: idSurvey })
                if (closeSurvey) {
                    if (closeSurvey.auth_id == idAuth) {
                        if (closeSurvey.open == false) {
                            res.jsonp({
                                content: "Khảo sát đang đóng",
                                success: false
                            })
                        } else {
                            await Survey.update({ id: idSurvey }, { open: false })
                            res.jsonp({
                                content: "Đóng cuộc khảo sát thành công",
                                success: true
                            })
                        }
                    } else {
                        res.jsonp({
                            content: "Không có quyền đóng khảo sát",
                            success: false
                        })
                    }
                } else {
                    res.jsonp({
                        content: "Không có cuộc khảo sát cần đóng",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Không có id khảo sát cần đóng",
                    success: false
                })
            }

        } catch (error) {
            res.badRequest(error)
        }
    },
    doSurvey: async function (req, res) {
        try {
            const headers = req.headers['authorization'];
            const idAuth = await taikhoan.getId(headers);
            const listQ = req.body.listQ
            const idSurvey = req.body.id
            const checkdoSurvey = await AuthChooseSurvey.findOne({ survey_id: idSurvey, auth_id: idAuth })
            if (checkdoSurvey) {
                res.jsonp({
                    content: "Đã tham gia khảo sát",
                    success: false
                })
            } else {

                await AuthChooseSurvey.create({
                    survey_id: idSurvey,
                    auth_id: idAuth
                })
                _.forEach(listQ, async function (value, index) {
                    if (_.get(Object.keys(value), 'length')) {
                        _.forEach(value, async function (t, a) {
                            await AuthChooseAnswer.create({ auth_id: idAuth, answer_id: a })
                            console.log(Number(a))
                        })

                    } else {
                        console.log(value)
                        await AuthChooseAnswer.create({ auth_id: idAuth, answer_id: value })
                    }
                })
                const listA = await AuthChooseAnswer.find();
                res.jsonp({
                    content: "Tham gia thành công",
                    listA,
                    success: true
                })
            }

        } catch (error) {
            res.badRequest(error)
        }
    },
    statistics: async function (req, res) {
        try {
            const idSurvey = req.body.id;
            if (idSurvey) {
                const s = await Survey.findOne({ id: idSurvey })
                if (s) {
                    const listQ = await Questionsurvey.find({ survery_id: idSurvey })
                    let result = []
                    for (let q of listQ) {
                        const listA = await Answersurvey.find({ question_id: q.id })
                        let alist = []
                        for (let a of listA) {
                            const answerCount = await AuthChooseAnswer.find({ answer_id: a.id })
                            alist.push({ id: a.id, content: a.content, count: answerCount.length })
                        }
                        result.push({q:q,alist})
                    }
                    res.jsonp({
                        result,
                        content:"Thành công",
                        success:true
                    })
                } else {
                    res.jsonp({
                        content: "Không có survey cần thông kê",
                        success: false
                    })
                }
            } else {
                res.jsonp({
                    content: "Không có id survey",
                    success: false
                })
            }
        } catch (error) {
            res.badRequest(error)
        }
    }
};


