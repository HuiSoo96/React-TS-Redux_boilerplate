import * as React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { BoardRead } from '../actions/board'
import { RootState } from '../reducers'
import { BoardReadState } from '../reducers/board'
import { Cookies } from 'react-cookie'

import { Button, Form, Tag, Divider } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import domPurify from 'dompurify'
import styled from 'styled-components'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const { CheckableTag } = Tag

const cookies = new Cookies()

interface ParamsType {
    id: string
}

const BoardDetail = () => {

    const [editorContent, setEditorContent] = useState<EditorState>(EditorState.createEmpty())

    const history = useHistory()
    const dispatch = useDispatch()

    const { data } = useSelector<RootState, BoardReadState>(state => state.readBoard)
    const { id } = useParams<ParamsType>()
    const params = useParams()
    
    useEffect(() => {
        const temp = id.substr(1, id.length)
        const getData = {
            id: temp
        }
        dispatch(BoardRead(getData))
    }, [id, editorContent])

    return (
        <DetailDiv>
            {
                data ?
                (
                <Form layout="horizontal">
                     <Form.Item style={{float: 'right'}}>
                        {
                            cookies.get('user') && data.userid === cookies.get('user').nickname ?
                                (<div>
                                    <Button onClick={() => {
                                        history.push(`/boardUpdate/${id}`)
                                    }} >수정</Button>
                                    <Button onClick={() => {
                                        history.push('/boardList')
                                    }} >목록</Button>
                                </div>)
                                :
                                <div>
                                    <Button onClick={
                                        () => {
                                            history.push('/boardList')
                                        }
                                    }>목록</Button>
                                </div>

                        }
                    </Form.Item>
                    <Form.Item style={{width: '100%'}}>
                        <a href="/boardList" className='qna-list'>질문</a>
                        <h2>
                            {data.title}
                        </h2>
                        <Divider />
                        <UserOutlined className='detail-class' />
                        <span className='detail-class'>
                            {data.userid}
                        </span>
                        <span className='detail-class'>
                            조회 &nbsp; {data.views}
                        </span>
                        <span className="detail-class">
                            {data.date}
                        </span>
                        <Divider />
                    </Form.Item>
                    <Form.Item>
                        <EditorDiv>
                            <Editor 
                                initialContentState={convertToRaw(EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))).getCurrentContent())}
                                readOnly
                                toolbarHidden
                                editorClassName="editor"
                                wrapperClassName='wrapper-class'
                                wrapperStyle={ed}
                            />
                        </EditorDiv>
                    </Form.Item>
                    <Form.Item>
                        {
                            data.tag.map(tag => (
                                <Tag color="#3498DB">
                                    {tag}
                                </Tag>
                            ))
                        }
                    </Form.Item>
                </Form>
                )
                :
                (<Form title="데이터 오류" layout="horizontal">
                    <Form.Item>
                        내용이 삭제되었거나 오류가 생겼습니다.
                        <Editor 
                            defaultEditorState={editorContent}
                            readOnly
                            toolbarHidden
                            editorClassName="editor-class"
                            wrapperStyle={ed}
                        />
                    </Form.Item>
                </Form>)
            }
        </DetailDiv>
    )
}

const EditorDiv = styled.div`
.wrapper-class {
    margin: 0 auto;
}

.editor {
    height: auto;
    padding: 5px !important;
    border-radius: 2px !important;
}
`

const DetailDiv = styled.div`
.detail-class {
    margin-right: 20px;
}
`

const ed = {
    width: "100%",
    height: "100%",
}

export default BoardDetail