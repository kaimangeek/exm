import styled from 'styled-components'

export const NavbarRoot = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #BBC6C8;
    justify-content: space-between;
`

export const NavbarLinks = styled.div`
    display: flex;
    @media (max-width: 650px) {
        display: none;
    }
`

export const LogOut = styled.div`
    cursor: pointer;
    padding: 10px;
    color: #469597;
`


