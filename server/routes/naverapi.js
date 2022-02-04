const express = require('express');
const router = express.Router();
var CryptoJS = require("crypto-js")
var SHA256 = require("crypto-js/sha256")
var Base64 = require("crypto-js/enc-base64");
var request = require('request')

router.get("/sms/:phone", (req, res) => {
    console.log('Server success')
    console.log("=====")

    var user_phone_number = req.params.phone;
    var user_auth_number = ""
    
    var resultCode = 404;
    
    const date = Date.now().toString();
    const uri = "ncp:sms:kr:256065670971:ts-board";
    const secretKey = "jZK0w1SnMFofWLpztDN2qrgv8MK7wwmcY37boNDj";
    const accessKey = "uX4Qmlhk1blGWsFTPErU";
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
	const url2 = `/sms/v2/services/${uri}/messages`;
    
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    
    if (req.params.phone.length == 10 || req.params.phone.length == 11) {
        for (let i = 0; i < 6; i++) {
            user_auth_number += Math.floor(Math.random() * 10)
        }
    } else {
        user_auth_number = null
    }

    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    
    request({
        method: method,
        json: true,
        uri: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        body: {
            type: "SMS",
            countryCode: "82",
            from: `${user_phone_number}`,
            content: `인증번호 [${user_auth_number}]를 입력해주세요.`,
            messages: [ 
                { 
                    to: `${user_phone_number}`, 
                }, 
            ],
        },
    }, (err, res, html) => {
        resultCode = 200;
        if (err) console.log(err)
        else {
            if (html.status) {
                console.log("failed");
            } else if (html.statusCode) {
                console.log("success");
            }
            console.log(html, "html")
        }
    },
    )
    if (user_auth_number == null) {
        res.json({
            message: "휴대폰 10자리 또는 11자리로 입력하세요."
        })
    } else {
        res.json({
            'code': resultCode,
            'auth': user_auth_number,
        })
    }
})

module.exports = router;