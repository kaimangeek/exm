import { Button } from '@mui/material'
import { ErrorPageContainer } from './errorPage.ts'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <ErrorPageContainer>
        <h1>Упс!</h1>
        <p>Вы не вошли в аккаунт :(</p>
        <Button variant="contained" onClick={() => navigate('/login')} color="primary">
          перейти на страницу авторизации
        </Button>
      </ErrorPageContainer>
    </>
  )
}
