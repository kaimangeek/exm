import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Navbar} from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { setIsAuth, setUser } from './__redux__/slice/userSlice'
import { useCheckUserQuery } from './__redux__/services/user'
import { LoadingSpinnerPage } from './pages/LoadingSpinnerPage'
import AppRouter from "./components/AppRouter/AppRouter.tsx";

function App() {
  const dispatch = useDispatch();
  const {data, isLoading} = useCheckUserQuery();

  const {isAuth} = useSelector(state => state.userSlice);

  console.log(isAuth);

  if (isLoading) {
    return <LoadingSpinnerPage />
  }
  if (!isLoading && data) {
    const decodeUser = jwtDecode(data.token);
    console.log(decodeUser);
    dispatch(setUser(decodeUser));
    dispatch(setIsAuth(true));
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRouter/>
      </BrowserRouter>
    </>
  )
}

export default App
