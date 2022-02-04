import * as React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { BoardDelete, BoardRead, BoardUpdate } from '../actions/board'
import { RootState } from '../reducers'
import { BoardReadState } from '../reducers/board'
import { Cookies } from 'react-cookie'

import styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import Swal from 'sweetalert2'

const cookies = new Cookies()

interface ParamsType {
    id: string
}

const Update: React.FC = () => {

    const [editorContent, setEditorContent] = useState<EditorState>(EditorState.createEmpty())
    const [titleState, setTitleState] = useState("")

    const history = useHistory()
    const dispatch = useDispatch()

    const { data } = useSelector<RootState, BoardReadState>(state => state.readBoard)
    const { id } = useParams<ParamsType>()
    const params = useParams()
    
    useEffect(() => {
        const temp = id.substr(1, id.length)
        const idData = {
            id: temp
        }
        dispatch(BoardRead(idData))

        console.log(data, '데이터')
        setTitleState(data!.title)
        setEditorContent(EditorState.createWithContent(convertFromRaw(JSON.parse(data!.content))))
        console.log(titleState, '타이틀')

        // if (data!.userid !== localStorage.getItem('nickname')) {
        //     onTitle()
        // }
        
    }, [id])

    const onTitle = () => {
        alert('로그인 정보가 없습니다.')
        history.push('/boardList')
    }

    const onFinish = () => {
        const convertContent = convertToRaw(editorContent.getCurrentContent())

        const updateData = {
            title: titleState,
            content: JSON.stringify(convertContent),
            userid: id.substr(1, id.length)
        }

        dispatch(BoardUpdate(updateData))
    }

    const onDelte = () => {
        Swal.fire({
            title: '삭제하시겠습니까?',
            confirmButtonText: '네',
            cancelButtonText: '아니요',
            showCancelButton: true,
        }).then(result => {
            if (result.isConfirmed) {
                if (localStorage.getItem('nickname') !== null) {
                    const nickname = localStorage.getItem('nickname')!
                    const deleteData = {
                        boardId: id.substr(1, id.length),
                        nickname: nickname,
                        isConfirm: result.isConfirmed
                    }
                    dispatch(BoardDelete(deleteData))
                }
            }
        })
    }

    return (
        <>
            {
                data ?
                    data.userid === cookies.get('user').nickname ?
                        (<Form onFinish={onFinish} layout="horizontal">
                            <Form.Item>
                                <Input  value={titleState} onChange={(e) => { setTitleState(e.target.value) }}  />
                            </Form.Item>
                            <Form.Item>
                                <EditorDiv>
                                    <Editor 
                                        initialContentState={convertToRaw(EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))).getCurrentContent())}
                                        defaultContentState={convertToRaw(EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))).getCurrentContent())}
                                        contentState={convertToRaw(EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))).getCurrentContent())}
                                        editorClassName="editor"
                                        wrapperClassName="wrapper-class"
                                        toolbarClassName="toolbar-class"
                                        editorState={editorContent}
                                        onEditorStateChange={(content: any) => {
                                            setEditorContent(content)
                                        }}
                                        wrapperStyle={ed}
                                    />
                                </EditorDiv>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit">
                                    수정하기
                                </Button>
                                <Button onClick={() => {
                                    history.goBack()
                                }}>
                                    취소
                                </Button>
                                <Button onClick={onDelte}>
                                    삭제
                                </Button>
                            </Form.Item>
                        </Form>)
                    : '(onTitle())'
                    : '(onTitle())'

            }
        </>
    )
}

const EditorDiv = styled.div`
.wrapper-class {
    margin: 0 auto;
}

.editor {
    height: 450px;
    border: 1px solid #f1f1f1;
    padding: 5px !important;
    border-radius: 2px !important;
}

.toolbar-class {
    width: 100%;
}
`

const ed = {
    width: "100%",
    height: "100%",
}

export default Update