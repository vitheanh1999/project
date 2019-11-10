/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: async function(req,res){
        await Topic.create({topic: "cong0"})
        const list= await Topic.find();
        res.jsonp(list);
    }
};

