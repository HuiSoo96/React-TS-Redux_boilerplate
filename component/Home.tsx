import * as React from 'react'
import { useState, useEffect, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './reducers'
import { BoardListState } from './reducers/board'
import { BoardList } from './actions/board'
import { HomeInfo, HomeQN } from './actions/home'
import { HomeInfoListState, HomeQNListState } from './reducers/home' 

import styled from 'styled-components'
import { QuestionOutlined, InfoOutlined, RightCircleOutlined } from '@ant-design/icons'
import './css/Home.css'
import { Input } from 'antd'
import InfoList from './board/InfoList'

const { Search } = Input
 
const Home: FC = () => {

    const [searchWord, setSearchWord] = useState('')
    
    const { data } = useSelector<RootState, BoardListState>(state => state.listBoard)
    const { qnData } = useSelector<RootState, HomeQNListState>(state => state.homeQN)
    const { infoData } = useSelector<RootState, HomeInfoListState>(state => state.homeInfo)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const getList = {
            word: '',
            tag: [],
            classData: ''
        }
        dispatch(BoardList(getList))
        dispatch(HomeQN('question'))
        dispatch(HomeInfo('information'))
   }, [])

    const onSearchPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            history.push('/tagSearch', {
                state: {
                    searchWord: searchWord
                }
            })
        }
    }

    return (
        <HomeDiv>
            <div>
                <Search value={searchWord} onChange={e => setSearchWord(e.target.value)} onKeyPress={onSearchPress} />
            </div>
            <div id="question">
                <div className='subtitle'>
                    <span>최근에 올라온 질문</span>
                    <span className='plus'>
                        <a href="/boardList">더보기</a>
                    </span>
                </div>
                <div>
                    <ul>
                        {
                            qnData ?
                            qnData.map(list => (
                                <li key={list.no} className='lists' ><a onClick={() => history.push('/boardDetail/:'+list.id)}>{list.title}</a></li>
                            ))
                            : <li>데이터가 없습니다.</li>
                        }
                    </ul>
                </div>
            </div>
            <div id="information">
                <div className='subtitle'>
                    <span>정보공유</span>
                    <span className='plus'>
                        <a href="/infoList">더보기</a>
                    </span>
                </div>
                <div>
                    <ul>
                        {
                            infoData ?
                                infoData.map(list => (
                                    <li key={list.no} className='lists' ><a onClick={() => history.push('/boardDetail/:'+list.id)}>{list.title}</a></li>
                                ))
                            : <li>데이터가 없습니다.</li>
                        }
                    </ul>
                </div>
            </div>
            <div className='SKO'>
                    <ul>
                        <li>
                            <div>
                                <a href="/boardList">
                                    <QuestionOutlined width='100%'/>
                                    <p>질문게시판</p>
                                    <span>바로가기<RightCircleOutlined /></span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="/infoList">
                                    <InfoOutlined width='100%' />
                                    <p>정보게시판</p>
                                    <span>바로가기<RightCircleOutlined /></span>
                                </a>
                            </div>
                        </li>
                    </ul>
            </div>
        </HomeDiv>
    )
}

const HomeDiv = styled.div`
    span.ant-input-wrapper {
        height: 40px;
        margin-bottom: 50px
    }

    input.ant-input {
        border-radius: 20px 0 0 20px;
        height: 100%
    }

    button.ant-btn-icon-only, .ant-input-search > .ant-input-group > .ant-input-group-addon:last-child .ant-input-search-button {
        border-radius: 0 20px 20px 0;
        height: 100%;
        width: 50px;
    }
`

export default Home