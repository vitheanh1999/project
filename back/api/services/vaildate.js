module.exports.checkUser = function (userName) {
    const regexUser = /^(?=.{6,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    if (userName.match(regexUser)) {
        return true;
    } else {
        return false;
    }
};
module.exports.checkPassword = function (passWord) {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
    if (passWord.match(regexPassword)) {
        return true;
    } else {
        return false
    }
}
module.exports.checkName = function (name) {
    const regexName = "^[^-\s][a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (name.match(regexName)) {
        return true;
    } else {
        return false;
    }
}

module.exports.checkContent = function (nameClass) {
    const regexName = "^[^-\s][a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (nameClass.match(regexName)) {
        return true;
    } else {
        return false;
    }
}
module.exports.checkEmail = function (email) {
    const regexEmail = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"
    if (email.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}
module.exports.checkSurvey = function (q) {
    let kt = true;
    // for (let question of q) {
    //     if (kt == true) {
    //         if (question.question && question.style) {
    //             if (vaildate.checkContent(question.question)) {
    //                 const a = question.data[0].answer;
    //                 console.log( question.data[0].answer)
    //                 for (let anw of a) {
    //                     console.log(anw)
    //                     if (!anw.content) {
    //                         kt = false
    //                         break
    //                     } else {
    //                         if ((vaildate.checkContent(anw.content))) {
    //                         } else {
    //                             kt = false
    //                             break
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 kt = false
    //             }

    //         } else {
    //             kt = false
    //         }
    //     } else {
    //         break
    //     }
    // }
    return kt;
}