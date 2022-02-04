import * as React from 'react'
import { FC } from 'react'
import { Route } from 'react-router-dom'

import BoardList from './List'
import BoardCreate from './Create'
import BoardDetail from './Detail'
import BoardUpdate from './Update'
import TagSearch from './Tag'
import InfoList from './InfoList'
import InfoCreate from './InfoCreate'
import Error from '../Error'

const Board:FC = () => {

    return (
        <>
            <Route path="/boardList" component={BoardList} />
            <Route path="/boardCreate" component={BoardCreate} />
            <Route path="/boardDetail/:id" component={BoardDetail} />
            <Route path="/boardUpdate/:id" component={BoardUpdate} />
            <Route path="/tagSearch" component={TagSearch} />
            <Route path="/infoList" component={InfoList} />
            <Route path="/infoCreate" component={InfoCreate} />
        </>
    )
}

export default Board