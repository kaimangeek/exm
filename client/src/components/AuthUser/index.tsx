import { Link, TextField, Typography } from "@mui/material";
import { FormContainer, PageContainer } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegistrationMutation } from "../../__redux__/services/user";
import { setIsAuth, setUser } from "../../__redux__/slice/userSlice";
import { jwtDecode } from "jwt-decode";
import { LoadingButton } from "@mui/lab";

interface ErrorState {
    login?: string;
    fio?: string;
    phone?: string;
    email?: string;
    password?: string;
}

const AuthUser = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const isRegistrationForm = location.pathname === '/registration';

    const [login, setLogin] = useState<string>('');
    const [fio, setFio] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<ErrorState>({});

    const dispatch = useDispatch();
    const [registration, {isLoading}] = useRegistrationMutation();
    const [authorization] = useLoginMutation();

    const validateForm = () => {
        let tempErrors: ErrorState = {};
        if (isRegistrationForm) {
            if (!login) tempErrors.login = 'Логин обязателен';
            if (!fio) tempErrors.fio = 'ФИО обязательно';
            if (!phone) tempErrors.phone = 'Номер телефона обязателен';
            if (!/^\+7 \d{3} \d{3} \d{2} \d{2}$/.test(phone)) tempErrors.phone = 'Номер телефона должен быть в формате +7 999 999 99 99';
            if (!email) tempErrors.email = 'Email обязателен';
            if (!email.includes('@')) tempErrors.email = 'Email должен содержать @';
        }
        if (!password) tempErrors.password = 'Пароль обязателен';
        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const clearForm = () => {
        setLogin('');
        setFio('');
        setPhone('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = () => {
        if (validateForm()) {
            if (isRegistrationForm) {
                registration({login, fio, phone, email, password}).then((response: any) => {
                    localStorage.setItem('token', response.data);
                    const user = jwtDecode(response.data)
                    dispatch(setUser(user))
                    dispatch(setIsAuth(true));
                    clearForm();
                    navigate('/applications');
                });
            } else {
                authorization({login, password}).then((response: any) => {
                    localStorage.setItem('token', response.data);
                    const user = jwtDecode(response.data)
                    dispatch(setUser(user))
                    dispatch(setIsAuth(true));
                    clearForm();
                    navigate('/applications');
                });
            }
        }
    };

    return (
        <PageContainer>
        <FormContainer>
            <Typography sx={{ fontSize: '20px', fontWeight: '450' }}>
                {isRegistrationForm ? 'Регистрация' : 'Вход'}
            </Typography>
            {
                isRegistrationForm && (
                    <>
                        <TextField error={!!errors.login} helperText={errors.login} onChange={(event) => setLogin(event.target.value)} label="Логин" />
                        <TextField error={!!errors.fio} helperText={errors.fio} onChange={(event) => setFio(event.target.value)} type="text" label="ФИО" />
                        <TextField error={!!errors.phone} helperText={errors.phone} onChange={(event) => setPhone(event.target.value)} label="Номер телефона" />
                        <TextField error={!!errors.email} helperText={errors.email} onChange={(event) => setEmail(event.target.value)} type="email" label="Email" />
                        <TextField error={!!errors.password} helperText={errors.password} onChange={(event) => setPassword(event.target.value)} type="password" label="Пароль" />
                    </>
                )
            }
            {
                !isRegistrationForm && (
                    <>
                        <TextField error={!!errors.login} helperText={errors.login} onChange={(event) => setLogin(event.target.value)} label="Логин" />
                        <TextField error={!!errors.password} helperText={errors.password} onChange={(event) => setPassword(event.target.value)} type="password" label="Пароль" />
                    </>
                )
            }
            <LoadingButton loading={isLoading} onClick={handleSubmit} variant="contained" sx={{ p: '8px 16px' }}>
                {isRegistrationForm ? 'Зарегистрироваться'  : 'Войти'}
            </LoadingButton>
            <Typography>
                {
                    isRegistrationForm ?
                    'Уже есть аккаунт? ' :
                    'Нет аккаунта? '
                }
                <Link
                    onClick={() => navigate(isRegistrationForm ? '/login' : '/registration')}
                >
                    {isRegistrationForm ? 'Войти' : 'Зарегистрироваться'}
                </Link>
            </Typography>
        </FormContainer>
        </PageContainer>
    );
};


export default AuthUser;