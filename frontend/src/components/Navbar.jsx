import React from 'react'
import styled from 'styled-components';

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
    height: 66px;
    justify-content: center;
    padding: 10px;
    width: 59px;
`

const MainButton = styled.button`
    align-items: flex-start;
    background: #486581;
    border-radius: 30px;
    color: #fff;
    display: flex;
    flex-direction: row;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size: 16px;
    height: 34px;
    justify-content: center;
    line-height: 18px;
    padding: 8px 16px;
    text-align: center;
    width: 119px;
`

function Navbar() {
  return (
    <MainNav>
        <LeftNav>
            <a style={{textDecoration: "none"}} href="/">
                <LiveLogo>
                    <img src="https://images-platform.99static.com//s1qDo0Uc8Cw-_4Tbz6_GgW2m_WA=/0x0:2000x2000/fit-in/500x500/99designs-contests-attachments/100/100861/attachment_100861073" alt='logo' />
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