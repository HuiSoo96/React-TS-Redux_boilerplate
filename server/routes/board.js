const express = require('express')
const router = express.Router()
const Board = require('../model/board')
const User = require('../model/user')

router.post("/create", (req, res) => {

    const board = new Board(req.body)
    
    console.log(board)

    board.save((err, doc) => {
        if (err) return res.json({ success: false, message: "서버 에러!!"})

        if (board.title !== "" && board.content !== "" && board.ObejctId !== "" && board.nickname !== "") {
            return res.json({
                success: true,
                message: "보드 작성에 성공하였습니다."
            })
        } else {
            return res.json({
                success: false,
                message: "빈 칸을 확인해주세요."
            })
        }
    })
})

router.post("/lists", (req, res) => {
    console.log(req.body.data.classData)
    if (req.body.data.classData === '') {
        if (req.body.data.tag.length === 0) {
            Board.find({title: { $regex: req.body.data.word }}, (err, list) => {
                let boardList = []
                if (list === undefined) {
                    return res.status(400).json({
                        success: false,
                        messsage: '데이터가 없습니다.'
                    })
                } else {
                    return res.json({
                        "data": list
                    })
                }
            })
        } else {
            Board.find({title: { $regex: req.body.data.word }, tag: { $all: req.body.data.tag }}, (err, list) => {
                console.log(list)
                let boardList = []
                for (var i = 0; i < list.length; i++) {
                    boardList += list[i]
                }
                res.json({
                    "data": list
                })
            })
        }
    } else {
        if (req.body.data.tag.length === 0) {
            Board.find({class: req.body.data.classData, title: { $regex: req.body.data.word}}, (err, list) => {
                let boardList = []
                console.log(list)
                for (var i = 0; i < list.length; i++) {
                    boardList += list[i]
                }
                res.json({
                    "data": list
                })
            })
        } else {
            Board.find({class: req.body.data.classData, title: { $regex: req.body.data.word}, tag: { $all: req.body.data.tag }}, (err, list) => {
                console.log(list)
                let boardList = []
                for (var i = 0; i < list.length; i++) {
                    boardList += list[i]
                }
                res.json({
                    "data": list
                })
            })
        }
    }
})

router.post("/read", (req, res) => {
    Board.findOneAndUpdate({ _id: req.body.id }, {
        $inc: {
            views: 1
        }
    }, null , (err, update) => {
        if (err) res.json({ success: false, message: "Server Error!" })
        Board.find({_id: req.body.id}, (err, data) => {
            res.json({
                success: true,
                message: "성공 후 반환",
                "data": data
            })
        })
    })
})

router.post("/update", (req, res) => {
    console.log(req.body)
    

    Board.findOneAndUpdate({
        _id: req.body.userid
    },{
        $set: {
            title: req.body.title,
            content: req.body.content
        }
    }, null, (err, update) => {
        if (err) res.json({ success: false, message: "Server Error!" })

        res.json({
            success: true,
            message: "성공"
        })
    } )
})

router.post('/delete', (req, res) => {

    console.log(req.body)

    Board.deleteOne({
        _id: req.body.boardId
    }, (err, result) => {
        if (err) res.json({ success: false, message: "서버 에러!" })
        console.log(result)
        res.json({
            success: true,
            message: "성공!",
            isConfirm: req.body.isConfirm
        })
    })
})

router.post('/home/infoList', (req, res) => {

    Board.find({class: req.body.data}).sort({date: -1}).limit(5).find({}, (err, list) => {
        if (err) res.json({ success: false, message: "서버오류" })
        console.log(list)
        res.json({
            'data': list
        })
    })
})

module.exports = router;