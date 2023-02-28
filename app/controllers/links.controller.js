
const db = require("../models");
const Links = db.links;

exports.create = (req, res) => {
    console.log(req)
    // try {
    //     Links.find({ link: req.body.link }, (err, links) => {
    //         if (!err) {
    //             res.status(409).send("Link not available!")
    //         } else {
    //             Links.create({ link: req.body.link, username: req.body.link }, (err1, result) => {
    //                 if (err1) {
    //                     console.log(err1)
    //                     res.status(500).send("Internal server error!")
    //                 } else {
    //                     res.status(200).send("Link created successfully!")
    //                 }
    //             })
    //         }

    //     });
    // } catch (error) {
    //     console.log("---->", error)
    //     res.status(500).send("Internal server error!")
    // }
}


