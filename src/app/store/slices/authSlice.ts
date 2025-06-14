import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  email: string;
}

const getInitialEmail = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('email') || '';
  }
  return '';
};

const initialState: AuthState = {
  email: getInitialEmail(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('email', state.email);
      }
    },
  },
});

export const { setEmail } = authSlice.actions;
export default authSlice.reducer;
