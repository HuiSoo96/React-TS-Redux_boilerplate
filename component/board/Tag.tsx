import * as React from 'react'
import { useState, useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { Tag, Table } from 'antd'
import { SmallDashOutlined, EllipsisOutlined, CloseOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'

import { RootState } from '../reducers'
import { BoardListState } from '../reducers/board'
import { BoardList } from '../actions/board'
import { BoardListType } from '../model/board'
import { DateFormat1 } from '../format/format'

import styled from 'styled-components'

interface locationData {
    state: {
        searchWord: string
    }
}

const { CheckableTag } = Tag

const TagList = [
    'HTML5', 'JavaScript', 'ReactJS', 'jQuery', 'CSS', 'Ajax', 'Redux', 'TypeScript', 'VueJS', 'AngularJS', 'Redux-Saga', 'MobX'
]

const tags: FC = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation<locationData>()

    const [searchWord, setSearchWord] = useState(!location.state ? '' : location.state.state.searchWord)
    const [selectedTag, setSelectedTag] = useState<string[]>([])
    const [classData, setClassData] = useState('')

    const { data, isLoggingIn } = useSelector<RootState, BoardListState>(state => state.listBoard)

    const columns: ColumnsType<BoardListType> = [
        {
            title: '',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: '제목',
            dataIndex: ['title', 'id'],
            render: (text:string, record) => {
              const id = record.id
              return <a onClick={() => {
                  history.push('/boardDetail/:'+id)
              }}>{record.title}</a>
            },
            key: 'title'
        },
        {
            title: '조회수',
            dataIndex: 'views',
            key: 'views'
        },
        {
            title: '일자',
            dataIndex: 'date',
            render: (date: string) => (
              DateFormat1(date) 
            ),
            key: 'date'
        },
      ];

      useEffect(() => {
        const searchData = {
            word: searchWord,
            tag: selectedTag,
            classData: classData
        }
        
        dispatch(BoardList(searchData))
      }, [searchWord, selectedTag, classData, location])

      const search = () => {
        const searchData = {
            word: searchWord,
            tag: selectedTag,
            classData: classData
        }
        
        console.log(searchData)
        dispatch(BoardList(searchData))
    }

    const tagChange = (tag: string, checked: boolean) => {
        const nextSelectedTag = checked ? [...selectedTag, tag] : selectedTag.filter(t => t !== tag)
        setSelectedTag(nextSelectedTag)
        search()
    }

    

    const catSearch = (cat: string) => () => {
        switch (cat) {
            case 'all':
                setClassData('')
                break;
            case 'question':
                setClassData('question')
                break;
            case 'information':
                setClassData('information')
                break;
            default: alert(cat);
        }

        search()
    }

    return (
        <TagDiv>
            <div className='inputDiv' onChange={search}>
                <input type="text" className='input' value={searchWord} onChange={e => setSearchWord(e.target.value)} />
                {
                    selectedTag.map(selected => (
                        <CheckableTag
                            key={selected}
                            checked={true}
                            onChange={checked => tagChange(selected, checked)}
                        >
                            {selected}
                        </CheckableTag>
                    ))
                }
            </div>
            <div className='TagDiv'>
                {
                    TagList.map(list => (
                        <CheckableTag
                            key={list}
                            checked={selectedTag.indexOf(list) > -1}
                            onChange={checked => tagChange(list, checked)}
                            className='select-tag'
                        >
                            {list}
                        </CheckableTag>
                    ))
                }
            </div>
            <div className="restr">
                <span onClick={catSearch('all')}>전체</span>
                <span className='bar'></span>
                <span onClick={catSearch('question')}>질문</span>
                <span className='bar'></span>
                <span onClick={catSearch('information')}>정보공유</span>
            </div>
            {
                isLoggingIn ?
                <Table columns={columns} dataSource={undefined} />
                : data 
                ?
                <Table columns={columns} dataSource={data} rowKey={data => data.date} />
                :
                <Table columns={columns} dataSource={undefined} />
            }
        </TagDiv>
    )
}

const TagDiv = styled.div`
    div.ant-table-wrapper {
        margin-top: 50px
    }

    .bar {
        height: 0px;
        border: 1px solid;
        margin: 0 5px;
        opacity: 0.5;
    }

    .restr {
        float: right;
    }

    .inputDIv {
        margin-bottom: 20px;
    }

    .input {
        margin-right: 15px;
    }

    .select-tag {
        border: 1px solid rgba(255, 0, 0, 0.5);
        border-radius: 3px;
    }

    span.ant-tag {
        width: auto;
    }
`

export default tags