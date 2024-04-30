import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
    DrawerItemLink,
    DrawerList,
    DrawerListItem,
    DrawerLogout,
    DrawerWrapper,
    HeaderBurger,
    HeaderIconButton
} from './burger.ts';
import Drawer from '@mui/material/Drawer';

type Link = {
    text: string;
    url: string;
};

export const Burger = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const links: Link[] = [
        {text: 'Заявления', url: '/'},
        {text: 'Пожаловаться', url: '/create'},
    ];

    const linkElements = links.map((link) => (
        <DrawerListItem key={link.text}>
            <DrawerItemLink to={link.url} onClick={handleMenuToggle}>
                {link.text}
            </DrawerItemLink>
        </DrawerListItem>
    ));

    return (
        <HeaderBurger>
            <HeaderIconButton size='large' edge='start' onClick={handleMenuToggle}>
                <MenuIcon/>
            </HeaderIconButton>
            <Drawer
                anchor='right'
                open={isMenuOpen}
                onClose={handleMenuToggle}
                PaperProps={{
                    sx: {
                        backgroundColor: '#BBC6C8',
                        width: '250px',
                        borderRadius: '35px 0px 0px 35px'
                    }
                }}
            >
                <DrawerWrapper>
                    <DrawerList>{linkElements}</DrawerList>
                    <DrawerLogout to={'#'} onClick={handleMenuToggle}>
                        Выйти
                    </DrawerLogout>
                </DrawerWrapper>
            </Drawer>
        </HeaderBurger>
    );
};
