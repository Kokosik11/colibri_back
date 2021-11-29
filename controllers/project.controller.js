const Project = require('../models/project.model');

module.exports.getAll = (req, res, next) => {
    Project.find({}, (err, project) => {
        if(err) return res.status(411).json({ "err": err });
        if(project.length === 0) return res.status(502).json({ "message": "projects is empty" });
        return res.status(200).json({ "projects": project })
    })
}


module.exports.create = (req, res, next) => {
    if(!req.body.title) return res.status(411).json({ "err": "Title is required" })
    if(!req.body.link) return res.status(411).json({ "err": "Link is required" })
    if(!req.body.imageURL) return res.status(411).json({ "err": "ImageURL is required" })
    
    let project = new Project({
        title: req.body.title,
        link: req.body.link,
        imageURL: req.body.imageURL,
    })

    project.save((err, project) => {
        if(err) return res.status(411).json({ "err": err });
        console.log(project);
        res.status(200).json({ "message": project });
    })
}