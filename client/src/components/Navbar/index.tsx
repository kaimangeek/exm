import {LogOut, NavbarLinks, NavbarRoot} from './navbar.ts'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { clearAuth } from '../../__redux__/slice/userSlice.ts'
import {Burger} from "./burger";
import './navbar.css'
import {LogoutOutlined} from "@mui/icons-material";

export const Navbar = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const {isAuth} = useSelector(state => state.userSlice);

  const handleExit = () => {
    dispath(clearAuth());
    navigate('/login');
  }

  return (
      <NavbarRoot>
          <Link className="navbarLink" to={'/applications'}>
              Нарушениям.Нет
          </Link>
          <NavbarLinks>
              {isAuth ? (
                  <>
                      <Link className="navbarLink" to={'/applications'}>
                          Заявления
                      </Link>
                      <Link className="navbarLink" to={'/applications/create'}>
                          Пожаловаться
                      </Link>
                      <LogOut>
                          <LogoutOutlined onClick={handleExit}/>
                      </LogOut>
                  </>
              ) : (
                 <>
                     <Link className="navbarLink" to={'/login'}>
                         Войти/Регистрация
                     </Link>
                 </>
              )}

          </NavbarLinks>
          {isAuth && <Burger/>}
      </NavbarRoot>
  )
}
