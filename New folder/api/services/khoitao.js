module.exports.khoitao = async function () {
    const chude = [
        { topic: "Lịch học" },
        { topic: "Giảng đường" },
        { topic: "Giảng viên" },
        { topic: "Cơ sở vật chất" },
        { topic: "Môn học" },
        { topic: "Chủ đề khác" }
    ]
    const authList = await Auth.find();
    console.log(authList.length)
    const topicList = await Topic.find();
    console.log(topicList.length);
    if (authList.length == 0) {
        await Auth.create({ username: "admin", password: "admin", name: "admin", role: 1 });
    }
    if (topicList.length == 0) {
        await Topic.create(chude)
    }

};