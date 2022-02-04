import * as React from 'react'
import { useState, useEffect, useCallback, FC } from 'react'
import { Form, Input, Select, Button, Col, Row } from 'antd'
import ReCAPTCHA from 'react-google-recaptcha'
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios'
import CSS from 'csstype'
import IDCheck from './IDCheck';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers'
import { UserIDCheckState, UserRegisterState } from '../reducers/user'
import { actions } from '../actions/user'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components';

const { Option } = Select

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const genderList = ["Male", "FeMale"];

const Register: FC = () => {
    const [form] = Form.useForm();

    // 아이디 및 아이디 중복확인
    const [userID, setUserID] = useState("");
    const [IDCheckButton, setIDCheckButton] = useState(false);

    // 비밀번호
    const [userPw, setUserPw] = useState("");

    // 닉네임
    const [userName, setUserName] = useState("");

    // 주소 변수
    const [isOpenPost, setIsOpenPost] = useState(false);
    const [isAddress, setIsAddress] = useState("");
    // const [isZoneCode, setIsZoneCode] = useState();
    const [isDetailAddress, setIsDetailAddress] = useState("");

    // 전화번호 인증 및 타임아웃 변수
    const [phoneNumber, setPhoneNumber] = useState('');
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);
    const [authButton, setAuthButton] = useState(true);
    const [confirmNumber, setConfirmNumber] = useState('');
    const [confirmInputNumber, setConfirmInputNumber] = useState('');

    // 성별
    const [userGender, setUserGender] = useState("");

    const [verify, setVerify] = useState(false);

    const { isLoggingIn, data } = useSelector<RootState, UserRegisterState>(state => state.registerUser)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (authButton === false) {
            const countdown = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1)
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        setAuthButton(false)
                        clearInterval(countdown)
                    } else {
                        setMinutes(minutes - 1)
                        setSeconds(59)
                    }
                }
            }, 1000)
            return () => clearInterval(countdown)
        }
    }, [minutes, seconds, authButton])

    const onFinish = (e: React.FormEvent<HTMLFormElement>) => {

        const RegisterData = {
            "id": userID,
            "password": userPw,
            "nickname": userName,
            "address": isAddress + "/" + isDetailAddress,
            "cellNumber": phoneNumber,
            "gender": userGender,
            "isDelete": false,
            "isAdmin": 0,
        }

        if (!userID || !userPw || !userName || !isAddress || !isDetailAddress || !phoneNumber || !confirmInputNumber || !userGender || verify === false ) {
            alert("빈 칸이 있습니다. 채워주세요.")
            // console.log(userID, userPw, userName, isAddress, isDetailAddress, phoneNumber, confirmInputNumber, userGender, verify)
            
        } else if (userPw.length < 4) {
            alert("패스워드 4자리 이상 입력해주세요.")
        } else {
            alert("전부 완성 맞음?")
            dispatch(actions.register(RegisterData))

            setTimeout(() => {
                history.push('/login')
            }, 500)
            
        }
    };

    const UserVerify = async () => {
        await axios("http://localhost:4001/api/naverapi/sms/" + phoneNumber, {
            params: {
                phone: phoneNumber,
            }
        }).then(res => {
            if (res.data.message) {
                alert(`${res.data.message}`)
                setAuthButton(true)
            } else {
                setConfirmNumber(res.data.auth)
                setMinutes(3)
                setSeconds(0)
                setAuthButton(false)
            }
        })
    }

    const postfixSelector = (
        <Form.Item name="postfix" noStyle>
            <Button onClick={UserVerify}
                style={{ width: 100, border: "none", background: "#FAFAFA" }}>
                휴대폰인증
            </Button>
        </Form.Item>
    );

    const postfixConfirm = (
        <Form.Item name="postfix" noStyle>
            <Button disabled={authButton === true ? true : false} 
                onClick={() => { if (confirmNumber === confirmInputNumber) { alert("인증번호가 확인되었습니다!"); setAuthButton(true) } }}
                style={{ width: 100, border: "none", background: "#FAFAFA" }}>
                인증번호확인
            </Button>
        </Form.Item>
    );

    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        // setIsZoneCode(data.zonecode);
        setIsAddress(fullAddress);
        setIsOpenPost(false);
    };

    const IDCheckUse = () => {
        setIDCheckButton(true)
    }

    const useButton = (props: any) => {
        if (!props) {
            setIDCheckButton(false)
        } else {
            setUserID(props)
            setIDCheckButton(false)
        }
    }

    const modalVisible = (props: any) => {
        setIDCheckButton(false)
    }

    const onReCaptcha = () => {
        setVerify(!verify)
    }

    const postfixAddressSearch = (
        <Form.Item name="postfix" noStyle>
            <Button onClick={e => { setIsOpenPost(!isOpenPost) }}
                style={{ width: 100, border: "none", background: "#FAFAFA" }}>
                주소검색
            </Button>
        </Form.Item>
    );

    const postCodeStyle: CSS.Properties = {
        display: "block",
        top: "50%",
        width: "400px",
        height: "500px",
        position: "absolute",
        border: "solid 1px",
        zIndex: 2,
    };

    return (
        <RegisterDiv>
            <Form
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                initialValues={{
                    prefix: '82',
                }}
                scrollToFirstError
            >
                <Form.Item
                    label="ID"
                >
                    <Input value={userID} id='id-input' /><Button onClick={IDCheckUse}>중복확인</Button>
                    <IDCheck visible={IDCheckButton} useButton={useButton} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    hasFeedback
                >
                    <Input.Password  value={userPw} onChange={e => setUserPw(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (userPw === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Nickname"
                    rules={[{ whitespace: true }]}
                >
                    <Input value={userName} onChange={e => setUserName(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="address"
                >
                    <Input value={isAddress} addonAfter={postfixAddressSearch} onClick={e => { setIsOpenPost(!isOpenPost) }} id='addr-button-l-input' />
                    <Input value={isDetailAddress} onChange={e => setIsDetailAddress(e.target.value)} />
                    {
                        isOpenPost ? <DaumPostcode style={postCodeStyle} onComplete={handleComplete} /> : null
                    }
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    id='tel-form-item'
                >

                    <Input addonAfter={postfixSelector} style={{ width: '100%', marginBottom: '10px' }}
                        id="tel-button-l-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <Input disabled={authButton} addonAfter={postfixConfirm} value={confirmInputNumber} onChange={e => setConfirmInputNumber(e.target.value)}
                        id="tel-conf-button-l-input" suffix={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`} />
                </Form.Item>

                <Form.Item
                    label="Gender"
                >
                    <Select placeholder="select your gender" onChange={(e => setUserGender(`${e}`))}>
                        {
                            genderList.map((item) => (
                                <Option key={item} value={item}>{item}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                        <Col span={12}>
                            <ReCAPTCHA sitekey={TEST_SITE_KEY} onChange={onReCaptcha} />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item {...tailFormItemLayout} style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" >
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </RegisterDiv>
    )
}

const RegisterDiv = styled.div`
    #id-input {
        width: 75%;
    }

    #postfix {
        padding 4px 0;
    }

    div.ant-col {
        max-width: 40%;
    }

    div.ant-col input {
        height: 36px;
    }

    div.ant-col button {
        height: 34px;
        float: right;
    }

    span.ant-input-affix-wrapper > input.ant-input {
        height: 26px;
    }

    span.ant-input-wrapper {
        margin-bottom: 5px;
    }

    span.ant-input-group-addon {
        border: 1px solid #d9d9d9;
    }

    #addr-button-l-input,
    #tel-button-l-input,
    .ant-input-wrapper > .ant-input-affix-wrapper {
        width: 98%
    }

    div button.ant-btn-primary {
        width: 50%;
        height: 40px;
        font-size: 20px;
        float: none;
        margin: 0 auto;
    }
`

export default Register