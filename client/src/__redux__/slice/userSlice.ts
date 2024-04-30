import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  id: "",
  name: "",
  surName: "",
  lastName: "",
  role: "",
  phone: "",
  email: ""
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      const [name, surname, lastName] = action.payload.fio.split('');
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.name = name;
      state.surName = surname;
      state.lastName = lastName;
      state.role = action.payload.role;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    clearAuth: () => {
      localStorage.removeItem('token');
      return { ...initialState };
    }
  }
});

export const { setUser, setIsAuth, clearAuth } = userSlice.actions;
export const userReduce = userSlice.reducer;
