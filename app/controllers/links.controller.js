const Links = require('../models/links.model');

exports.create = async (req, res) => {
    const newLink = new Links(req.body);
    await newLink.save((err) => {
        if(err){
            res.status(500).send({
                message: "Something went wrong!"
            })
        }else{
            res.status(200).send("Link created successfully!")
        }
    })
}

exports.get = async (req, res) => {
    await Links.find({}, (err, result) =>{
        if(err){
            res.status(500).send({
                message: "Something went wrong!"
            })
        }else{
            res.status(200).send({
                message: "Links fetched successfully!",
                result
            })
        }
    })
}

exports.update = async (req, res) => {
    await Links.updateOne({_id: req.params.id}, {pathname: req.body.pathname}, (err, result) => {
        if(err){
            res.status(500).send({
                message: "Something went wrong!"
            })
        }else{
            res.status(200).send({
                message: "Link udpated successfully!",
                result
            })
        }
    })
}

exports.delete = async (req, res) => {
    await Links.updateOne({_id: req.params.id}, (err, result) => {
        if(err){
            res.status(500).send({
                message: "Something went wrong!"
            })
        }else{
            res.status(200).send({
                message: "Link deleted successfully!",
                result
            })
        }
    })
}


