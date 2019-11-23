var bcrypt = require('bcrypt');
module.exports.khoitao = async function () {
    const chude = [
        { topic: "Lịch học" },
        { topic: "Giảng đường" },
        { topic: "Giảng viên" },
        { topic: "Cơ sở vật chất" },
        { topic: "Môn học" },
        { topic: "Chủ đề khác" }
    ]
    const role = [
        { name_role: "Admin" },
        { name_role: "Chủ tọa" },
        { name_role: "Người dùng" },
        
    ]
    const authList = await Auth.find();
    const topicList = await Topic.find();
    const roleList = await Role.find()
    if (authList.length == 0) {
        const hashPassword = await bcrypt.hash('admin', 10);
        await Auth.create({ username: "admin", password: hashPassword, name: "admin", role: 1 });
    }
    if (topicList.length == 0) {
        await Topic.create(chude)
    }
    if (roleList.length == 0) {
        await Role.create(role)
    }

};