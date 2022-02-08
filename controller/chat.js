/*const { Chat } = require("../models/chatModel.js");

// get all messages functionality
const getMessage = async (req, res, next) => {
    try {
        let data = await Chat.find({}, (message, err) => {
            return (err ? err.message : message);
        })
        res.send(data)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }

}

// post new messages
const postMessage = (req, res, next) => {
    try {
        let message = new Chat(req.body);
        message.save()
            .then(resp => {
                res.status(200).send(resp);
            }).catch(err => {
                res.status(400).json({ message: `Bad Request ${err.message}` })
            })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}

// get  messages by user functionality
const getMessageByUser = async (req, res) => {
    try {
        let data = await Chat.find({
            $or: [
                { $and: [{ sender: req.params.user }, { receiver: req.params.receiver }] },
                { $and: [{ sender: req.params.receiver }, { receiver: req.params.user }] }
            ]
        }, (message, err) => {
            return (err ? err : message);
        })
        res.status(200).send(data)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }

}

// del messages by id
const delMessage = (req, res) => {
    let id = req.params.sender;
    Chat.deleteMany({ sender: id }, (err) => {
        if (err)
            res.status(400).send("Bad Request");
        else
            res.status(200).json({ message: "Messages Deleted Successfully" });
    })
}

module.exports = { getMessage, postMessage, getMessageByUser, delMessage }*/
