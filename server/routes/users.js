const express = require('express')
const router = express.Router()
const User = require('../model/user')
const { auth } = require("../middleware/auth")

var passport = require('passport')
var NaverStrategy = require('passport-naver').Strategy
const config = require("../config/naver");

// 서버에서 클라이언트로 가는게 없기에 지금 연결이 안됨.
// 로그인 부분 데이터 확인.
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        id: req.user.userid,
        nickname: req.user.nickname,
        address: req.user.address,
        cellNumber: req.user.cellNumber,
        gender: req.user.gender,
        isDelete: req.user.delete,
        isAdmin: req.user.admin === 0 ? false : true,
    })
})

router.post("/admin", (req, res) => {

    const user = new User();

    user.id = "admin"
    user.nickname = "관리자"
    user.password = "admin"
    user.address = ""
    user.cellNumber = ""
    user.gender = "male"
    user.isDelete = false
    user.isAdmin = 1

    user.save((err, doc) => {
        if (err) return res.json({ success: false})
        return res.json({
            success: true
        })
    })

})

router.get("/idcheck", (req, res) => {
    
    let userid = `${req.query.userid}`;
    
    // console.log(userid.query.userid) // get 일 때 사용
    // console.log(userid.body.params.userid) // post 일 때 사용

    let num = /[0-9]/
    let allowLetter = /^[a-z0-9]+$/g

    User.find({id: userid}, (err, list) => {
        console.log(list, "리스트")
        let tempId;
        let value;
        if (num.test(userid.charAt(0))) {
            res.json({
                check: "NumUnavailable",
                message: "아이디의 첫번째 글자가 숫자로 시작합니다.",
            })
        } else if (allowLetter.test(userid)) {
            if (list.length === 0) {
                value = "available"
                tempId = userid
            }
            for(var i = 0;i < list.length; i++) {
                if(list[i].id === userid) {
                    value = "existance"
                    tempId = list[i].id
                } else if (!list) {
                    value = "available"
                    tempId = userid
                } else {
                    value = "available"
                    tempId = userid
                }
            }
            switch (value) {
                case "existance":
                    res.json({
                        check: "existance",
                        message: "이미 사용중인 아이디입니다.",
                        "id": tempId
                    })
                    break;
                case "available":
                    res.json({
                        check: "available",
                        message: "사용 가능한 아이디입니다.",
                        "id": tempId
                    })
                    break;
                default :
                    res.json({
                        message: "오류 발생"
                    })
            }
        } else {
            res.json({
                check: "unavailable",
                message: "공백 또는 특수문자, 한글이 들어갑니다."
            })
        }
    })
})

router.post("/register", (req, res) => {

    console.log("회원가입!@!@!@!@!@!@")
    console.log(req.body)

    const { id } = req.body

    User.find({id: id}, (err, alreadyUser) => {
        if(err) {
            return res.json({
                success: false,
                message: err + 'Error: Server error'
            })
        }
        
        if (alreadyUser.length > 0) {
            console.log(alreadyUser)
            return res.json({
                success: false,
                message: 'Error: ID already exist'
            })
        } else {
            const newUser = new User(req.body);
            console.log(newUser)
            newUser.save((err, doc) => {
            if (err) {
                console.log(err) 
                return res.json({ success: false, err})
            }
            return res.json({
                success: true
            })
        })
        }
    })
    
})

router.post("/login", (req, res) => {
    console.log("로그인!!@!@!@!!@!@!@!@!@!")

    console.log(req.body)
    const {id, password} = req.body

    console.log(id, password)

    User.findOne({id: id, password: password}, (err, list) => {
        console.log(list, "list")
        console.log(!list, list !== null, "부정", "null test");

        if (err)
        res.json({
            success:false,
            message: err+"서버 오류"
        })

        if (list !== null) {
            res.json({
                success: true,
                message: "로그인 성공!",
                "ObjectId": list._id,
                "nickname": list.nickname
            })
        } else {
            res.json({
                success: false,
                message: "로그인 실패!"
            })
        }
    }) 
})

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((req, user, done) => {
    // console.log(req)
    req.session.sid = user.name
    // console.log("Session check : " + req.session.sid)
    done(null, user)
})

passport.use(new NaverStrategy({
    clientID: config.authLogin.naver.client_id,
    clientSecret: config.authLogin.naver.secret_id,
    callbackURL: config.authLogin.naver.callback_url,
    session: true
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        var user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.displayName,
            provider: 'naver',
            naver: profile._json
        }

        User.find({nickname: user.username}, (err, alreadyUser) => {
            if (err) done(err)
            
            if (alreadyUser.length > 0) {
                done({message: "이미 있는 아이디입니다."})
            } else {
                const snsUser = new User()

                snsUser.id = user.email
                snsUser.nickname = user.username
                snsUser.isDelete = false
                snsUser.isAdmin = 0
                snsUser.isSNS = 'naver'

                snsUser.save((doc, err) => {
                    if (err) {
                        done(err)
                        console.log(err)
                    }

                    done(null, snsUser, {provider: 'naver'})
                })
            }
        })
    })
}))

router.get('/naverLogin', passport.authenticate('naver', null), (req, res) => {
    console.log('/main/naver')
})

router.get('/naverLogin/callback', (req, res, next) => {
    passport.authenticate('naver', (err, user, provider) => {
        console.log(provider)
        res.cookie('provider', provider)
        res.cookie('user', user)
        if (err) res.redirect('http://localhost:4000/login')
        res.redirect('http://localhost:4000/')
    })(req, res)
})

module.exports = router;