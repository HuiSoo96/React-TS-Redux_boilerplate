import * as React from 'react'
import { useState, useEffect, FC } from 'react'
import axios from 'axios'

declare global {
    interface Window {
        naver: any,
    }
}

const { naver } = window

const NaverLogin: FC = (props: any) => {

    const naverConfig = () => {
        const naverLoginSet = new naver.LoginWithNaverId({
            clientId: 'GxQwXe6cI8ihSdPVpaGI',
            callbackUrl: 'http://localhost:4001/api/users/naverLogin/callback',
            callbackHandle: true,
            loginButton: {
                color: 'green',
                type: 3,
                height: 40,
            },
            isPopup: false,
        })

        naverLoginSet.init()
    }

    useEffect(naverConfig, [])

    return (
        <>
            <div id="naverIdLogin"></div>
        </>
    )
}

export default NaverLogin