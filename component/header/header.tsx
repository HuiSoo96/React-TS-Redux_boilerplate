import * as React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Row, Col } from 'antd'

const { SubMenu } = Menu

import './header.css'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const { Header } = Layout

const HomeHeader = () => {

    const [nickname, setNickname] = useState('')

    const history = useHistory()

    useEffect(() => {
        if (cookies.get('user')) {
            setNickname(cookies.get('user').nickname)
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem("com.naver.nid.oauth.state_token")

        if (cookies.get('user')) {
            cookies.remove('user')
            cookies.remove('provider')
        }

        setNickname('')

        window.location.href = "/"
    }

    return (
        <>
            <Header style={{ width: '100%', display: "flex" }}>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} id="left-menu" style={{ maxWidth: "1200px" }}>
                                    <Menu.Item key="1" className='menu-item'>
                                        <div onClick={() => setTimeout(() => {
                                            history.push('/')
                                            
                                        }, 150)}>Home</div>
                                    </Menu.Item>
                                    <Menu.Item key="2" className='menu-item'>
                                        <div onClick={() => setTimeout(() => {
                                            history.push('/boardList')
                                        }, 150)}>질문</div>
                                    </Menu.Item>
                                    <Menu.Item key="3" className='menu-item'>
                                        <div onClick={() => setTimeout(() => {
                                            history.push('/infoList')
                                        }, 150)}>정보공유</div>
                                    </Menu.Item>
                                    <Menu.Item key="5" className='menu-item'>
                                        <div onClick={() => setTimeout(() => {
                                            history.push('/tagSearch')
                                        }, 150)}>태그</div>
                                    </Menu.Item>
                        { 
                            !cookies.get("user") ?
                            <>
                                <Menu.Item key="6" className="right-menu-align menu-item">
                                    <span onClick={() => history.push('/login')}>로그인</span>
                                </Menu.Item>
                                <Menu.Item key="7" className='menu-item'>
                                    <span onClick={() => history.push('/register')}>회원가입</span>
                                </Menu.Item>
                            </>
                            :
                            <>
                                <SubMenu key="8" title={nickname} className="right-menu-align menu-item">
                                    <Menu.Item key="sub1" onClick={logOut} style={{color: "#001529", fontStyle: "Bold"}} >
                                        로그아웃
                                    </Menu.Item>
                                </SubMenu>
                                {cookies.get('provider') ?
                                <></>
                                :
                                <Menu.Item key="9" className='menu-item'>
                                    <span>마이페이지</span>
                                </Menu.Item>}
                            </>
                        }
                    </Menu>
            </Header>
        </>
    )
}

export default HomeHeader