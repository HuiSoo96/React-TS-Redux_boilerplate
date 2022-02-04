import * as React from 'react'
import * as ReactDom from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import './client.css'

import Home from './component/DefaultLayout'
import { store, persistor } from './store'


const Hot = hot(Home)

ReactDom.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Hot />
        </PersistGate>
    </Provider>
, document.querySelector('#root'))