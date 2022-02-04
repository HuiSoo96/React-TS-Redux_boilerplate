import * as React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers'
import { UserLoginState } from '../reducers/user'
import { actions } from '../actions/user'
import { useHistory } from 'react-router-dom'

import NaverLogin from './NaverLogin'

import styled from 'styled-components';

const Login = () => {

    const [userID, setUserID] = useState("");
    const [userPw, setUserPw] = useState("");

    const { isLoggingIn, data } = useSelector<RootState, UserLoginState>(state => state.logInUser)
    const dispatch = useDispatch()
    const history = useHistory()

    const onFinish = (e: React.FormEvent<HTMLFormElement>) => {

        const loginData = {
            id: userID,
            password: userPw
        }

        dispatch(actions.logIn(loginData))
    }

    return (
        <LoginDiv>
            <div id='login-form-div'>
                <Form
                        name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            value={userID} 
                            placeholder="ID를 입력해주세요." 
                            onChange={e => setUserID(e.target.value)} 
                            className='login-input' 
                            />
                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            value={userPw}
                            placeholder="비밀번호를 입력해주세요."
                            onChange={e => setUserPw(e.target.value)}
                            className='login-input'
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item className='login-form'>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            아이디로 로그인
                        </Button>
                        <NaverLogin />
                    </Form.Item>
                </Form>
            </div>
        </LoginDiv>
    );
};

const LoginDiv = styled.div`
    #naverIdLogin {
        max-width: 30%;
        margin: 0 auto;
    }

    #naverIdLogin img {
        width: 100%;
        height: 50px;
    }
    
    #login-form-div {
        display: flex;
        align-items: center;
        height: 640px;
    }

    .login-form-button {
        width: 30%;
        height: 50px;
        font-size: 20px;
        margin-bottom: 10px;
    }

    .login-form {
        text-align: center;
        width: 100%
    }
    
    .login-input {
        width: 30%;
        height: 50px;
    }

    .ant-divider {
        width: 30%;
        min-width: 30%;
        margin: 30px auto;
    }
`

export default Login