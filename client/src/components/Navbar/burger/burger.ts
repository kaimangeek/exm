import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export const HeaderIconButton = styled(IconButton)`
    && {
        background-color: #469597;
        color: #E5E3E4;
        max-height: 50px;

        &:hover {
            background-color: #137769;
        }
    }
`;

export const HeaderBurger = styled.div`
  position: relative;
  font-family: 'Jost', sans-serif;

  display: none;

  @media (max-width: 650px) {
    display: block;
  }
`;

export const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px 30px 30px 0;
  height: 1000%;
`;

export const DrawerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DrawerListItem = styled.li`
  font-size: 20px;
  list-style: none;
  text-align: end;
`;

export const DrawerItemLink = styled(Link)`
  text-decoration: none;
  color: #469597;
`;

export const DrawerLogout = styled(Link)`
  text-decoration: none;
  color: #469597;
  padding-left: 40px;
  font-size: 20px;
  text-align: end;
`;
