import * as React from 'react'
import { FC } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Button, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers'
import { UserIDCheckState } from '../reducers/user'
import { actions } from '../actions/user'


import CSS from 'csstype'
import '../css/user/IDCheck.css'

interface Props {
    visible: boolean | undefined;
    useButton: any;
    // modalVisible: any;
}

const IDCheck: FC<Props> = (props) => {

    let { visible } = props;

    const [ID, setID] = useState("")


    const { isLoggingIn, data } = useSelector<RootState, UserIDCheckState>(state => state.idCheckUser)
    const dispatch = useDispatch()

    const useButton = () => {
        props.useButton()
    }

    const onIDCheck = () => {
        const loginData = {
            id: ID,
        }
        dispatch(actions.idCheck(loginData))
    }

    const modalCodeStyle: CSS.Properties = {
        width: "440px",
        height: "270px",
        font: "9px"
    }

    const modalBodyCodeStlye: CSS.Properties = {
        height: "100%",
        width: "100%",
        padding: "20px 20px 60px",
        display: "block"
    }

    const listCodeStyle: CSS.Properties = {
        listStyle: "none",
        padding: "0px",
        marginTop: "18px",
    }

    return (
        <>
            <Modal title="IDCheck" visible={visible} footer={null} centered onCancel={useButton} style={modalCodeStyle} bodyStyle={modalBodyCodeStlye} >
                <p>아이디는 영문(소문자), 숫자 4~16자 이내로 입력해주세요.</p>
                <div id="idcheck">
                    <input type="text" value={ID} onChange={e => setID(e.target.value)} /><button onClick={onIDCheck} >중복확인</button>
                </div>
                <ul style={listCodeStyle}>
                    {
                        !data
                            ? (
                                <li>
                                    <p>공백 또는 특수문자가 포함된 아이디는 사용할 수 없습니다. </p>
                                    <p>숫자로 시작하거나, 숫자로만 이루어진 아이디는 사용할 수 없습니다.</p>
                                </li> 
                            ) :
                            data.message === "NumUnavailable" ?
                            <p>아이디의 첫번째 글자가 숫자로 시작합니다.</p> :
                            data.message === "unavailable" ?
                            <p>공백 또는 특수문자, 한글이 들어갑니다.</p> :
                            data.message === "existance" ?
                            <p>{data.id} 는 이미 사용중인 아이디입니다.</p> :
                            data.message === "available" ?
                            <p>{data.id} 는 사용 가능한 아이디입니다.</p> :
                            (
                                <li>공백 또는 특수문자가 포함된 아이디는 사용할 수 없습니다.</li> &&
                                <li>숫자로 시작하거나, 숫자로만 이루어진 아이디는 사용할 수 없습니다.</li>
                            )
                    }
                </ul>
                {
                    !data ?
                    <Button disabled>
                        사용하기
                    </Button>
                    :
                    <Button onClick={() => {
                        props.useButton(data.id)
                    }}>
                        사용하기
                    </Button>
                }
            </Modal>
        </>
    )

}


export default IDCheck