import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Table, Button, Divider } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import Create from './Create'
import { RootState } from '../reducers'
import { BoardListState } from '../reducers/board'
import { BoardList } from '../actions/board'
import { BoardListType } from '../model/board'
import { DateFormat1 } from '../format/format'

import styled from 'styled-components'

const List:FC = () => {

    const history = useHistory()

    const { data } = useSelector<RootState, BoardListState>(state => state.listBoard)
    const dispatch = useDispatch()

    const [ld, setLd] = useState<{ title: string, views: number, date: number, id: string }[]>([])

    const columns: ColumnsType<BoardListType> = [
        {
            title: '',
            dataIndex: 'no',
        },
        {
            title: '제목',
            dataIndex: ['title', 'id'],
            render: (text:string, record) => {
              const id = record.id
              return <a onClick={() => {
                history.push('/boardDetail/:'+id)
              }}>{record.title}</a>
            }
        },
        {
            title: '조회수',
            dataIndex: 'views',
        },
        {
            title: '일자',
            dataIndex: 'date',
            render: (date: string) => (
              DateFormat1(date) 
            )
        },
      ];

      useEffect(() => {
        const listData = {
            word: '',
            tag: [],
            classData: 'question'
        }
        dispatch(BoardList(listData))
      }, [])

    return (
        <ListTag>
            <Divider className='divider'>
                <h2>
                    질문&대답
                </h2>
            </Divider>
            <Button onClick={() => {
                history.push('/boardCreate')
            }} className='question-create' >글작성</Button>
            {
              !data ?
                    <Table columns={columns} dataSource={undefined} />
                    : 
                    <Table columns={columns} dataSource={data} rowKey={ld => ld.date} />
            }
        </ListTag>
    )
}

const ListTag = styled.div`
    .divider {
        margin-top: -30px
    }

    .question-create {
        float: right;
        margin-bottom: 10px
    }
`


export default List 