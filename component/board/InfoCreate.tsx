import * as React from 'react'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers'
import { BoardCreateState } from '../reducers/board'
import { BoardCreate } from '../actions/board'
import { useHistory } from 'react-router-dom'
import { Cookies } from 'react-cookie'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import styled from 'styled-components'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import css from 'csstype'

import { Form, Input, Button, Row, Col, Divider, Tag } from 'antd'

const cookies = new Cookies()

const { CheckableTag } = Tag
const { TextArea } = Input

const tagData = [
    'HTML5', 'JavaScript', 'ReactJS', 'jQuery', 'CSS', 'Ajax', 'Redux', 'TypeScript', 'VueJS', 'AngularJS', 'Redux-Saga', 'MobX'
]

const Create: FC = () => {

    const [title, setTitle] = useState('')
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
    const [selectedTag, setSelectedTag] = useState<string[]>([])

    const { data } = useSelector<RootState, BoardCreateState>(state => state.createBoard)
    const dispatch = useDispatch()
    const history = useHistory()

    React.useEffect(() => {
        console.log(cookies.get('user'))
        console.log(selectedTag)
    }, [])

    const onFinish = () => {
        const convertContent = editorState instanceof EditorState ? convertToRaw(editorState.getCurrentContent()) : editorState

        const objId = cookies.get('user').ObjectId
        const nickname = cookies.get('user').nickname
        
        const date = String(Date.now())

        const searchCh = date.indexOf('T', 0)

        const YMD = date.substr(2, searchCh - 2)
        const HM = date.substr(searchCh + 1, 5)

        const boardData = {
            ObjectId: objId,
            nickname: nickname,
            class: 'information',
            title: title,
            content: JSON.stringify(convertContent),
            tag: selectedTag,
            date: date,
        }

        if (objId !== null && nickname !== null) {
            if (title !== "" && editorState.getCurrentContent().getPlainText() !== "" && selectedTag !== []) {
                dispatch(BoardCreate(boardData))
            } else {
                alert("빈 칸이 있습니다. 채워주세요.")
            }
        } else {
            
        }

        
    }

    const onEditorStateChange = (editorStateData: any) => {
        setEditorState(editorStateData)
    }

    const tagChange = (tag: string, checked: boolean) => {
        const nextSelectedTag = checked ? [...selectedTag, tag] : selectedTag.filter(t => t !== tag)
        setSelectedTag(nextSelectedTag)
    }

    return (
        <CreateTag>
            <Divider className='divider'>
                <h2>
                    정보 글 작성
                </h2>
            </Divider>
            <Form onFinish={onFinish} >
                <Form.Item style={{height: "40px"}}>
                    <Row justify="space-between">
                        <Col style={{fontSize: "16px", lineHeight: "40px"}}>
                            제목
                        </Col>
                        <Col span={23}>
                            <Input value={title} onChange={e => setTitle(e.target.value)} style={{height: "100%"}} />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <EditorBlock>
                    <Editor 
                        wrapperClassName="wrapper-class"
                        editorClassName="editor"
                        toolbarClassName="toolbar-class"
                        toolbar={{
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: false },
                          }} 
                          placeholder="내용을 작성해주세요."
                          localization={{
                            locale: 'ko',
                          }}
                          editorState={editorState}
                          onEditorStateChange={onEditorStateChange}
                        />
                        </EditorBlock>
                </Form.Item>
                <Form.Item>
                    <span className='selected-tags'>
                        태그 : &nbsp;
                    </span>
                        {
                            selectedTag.map(selected => (
                                <CheckableTag 
                                key={selected}
                                checked={selectedTag.indexOf(selected) > -1}
                                onChange={() => {
                                    
                                }}
                                >
                                        {selected}
                                </CheckableTag>    
                            ))
                        }
                    <span className='tag-items'>
                    {
                        tagData.map(tag => (
                            <CheckableTag 
                                key={tag}
                                checked={selectedTag.indexOf(tag) > -1}
                                onChange={checked => tagChange(tag, checked)}
                                >
                                {tag}
                            </CheckableTag>
                        ))
                    }
                    </span>
                </Form.Item>
                <Form.Item>
                    <Row justify="space-around">
                        <Col span={8}>
                          <Button type="primary" htmlType="submit" style={ButtonStyle}>
                            글 등록
                          </Button>
                        </Col>
                        <Col span={8}>
                          <Button type="primary" style={ButtonStyle} onClick={() => {
                              history.push('/infoList')
                          }}>
                              취소
                          </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </CreateTag>
    )
}

const EditorBlock = styled.div`
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

const CreateTag = styled.div`
    .divider {
        margin-top: -30px
    }

    .selected-tags {
        margin-bottom: 10px;
        display: inline-block;
    }

    .tag-items {
        display: block;
        margin-top: 10px;
    }

    span.ant-tag {
        text-align: center;
        display: inline-block;
        width: auto;
    }
`

const ButtonStyle = {
    width: "100%",
    height: "35px",
    fontSize: "16px",
}

export default Create;