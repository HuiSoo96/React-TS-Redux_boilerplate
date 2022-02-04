const { User } = require('../routes/users')

let auth = (req, res, next) => {
    let token = req.cookie.auth_token

    User.findUserByToken(token, (error, user) => {
        if (err) throw error
        if (!user) return res.json({ isAuth: false, error: true  })

        req.token = token
        req.user = user

        next()
    })
}

module.exports = { auth }