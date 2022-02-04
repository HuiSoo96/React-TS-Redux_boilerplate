import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Layout, Breadcrumb, Button, Space, Upload, Popconfirm } from 'antd'

import Header from './header/header'
import Footer from './footer/footer'
import Login from './users/Login'
import Register from './users/Register'
import Home from './Home'
import Test from './users/test'
import Board from '../component/board'
import Error from './Error'

import './Layout.css'

const { Content } = Layout

const DefaultLayout = () => {

    return (
        <>
            <Layout>
                <BrowserRouter>
                <Header />
                <Content className="site-layout" style={{ minWidth: '800px', maxWidth: '1200px', padding: '0 50px', margin: '64px auto 0 auto', width: '100%', minHeight: '736px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/board*" component={Board} />
                        <Route path="/tag*" component={Board} />
                        <Route path="/info*" component={Board} />
                        <Route path="/project*" component={Board} />
                        <Route path="*" component={Error} />
                    </Switch>
                    </div>
                </Content>
                <Footer />
                </BrowserRouter>
            </Layout>
        </>
    )
}

export default DefaultLayout