import * as React from 'react'
import { Layout, Menu } from 'antd'

import styled from 'styled-components'

const { Footer } = Layout

const HomeFooter = () => {

    return (
        <FooterDiv>
            <Footer className='footer'>Ant Design ©2018 Created by Ant UED</Footer>
        </FooterDiv>
    )
}

const FooterDiv = styled.div`
.footer {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background: #e9e9e9;
}
`

export default HomeFooter