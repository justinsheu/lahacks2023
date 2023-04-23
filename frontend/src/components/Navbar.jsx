import React from 'react'
import styled from 'styled-components';
import MainButton from './Button'

const MainNav = styled.div`
    align-items: center;
    background: #FFF;
    border-bottom: solid #bcccdc;
    display: flex;
    flex-direction: row;
    gap: 24px;
    height: 86px;
    justify-content: space-between;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 12px 40px 8px;
    position: fixed;
    scrollbar-width: none;
    top: 0;
    width: 100%;
    z-index: 999;
`

const LeftNav = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 60px;
    height: 66px;
    padding: 0;
`

const LiveLogo = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 149px;
    justify-content: center;
    padding: 10px;
    width: 145px;
`

function Navbar() {
  return (
    <MainNav>
        <LeftNav>
            <a style={{textDecoration: "none"}} href="/">
                <LiveLogo>
                    <img src="/logo.png" alt='logo' />
                </LiveLogo>
            </a>
        </LeftNav>
        <a href='/'>
            <MainButton>Button</MainButton>
        </a>
    </MainNav>
  )
}

export default Navbar