import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { v4 as uuidv4 } from "uuid";

export interface UserProps {
  id: string;
  avatar: string;
  name: string;
  email: string;
}

type initialStateType = {
  userList: UserProps[];
};

const userList: UserProps[] = [
  {
    id: uuidv4(),
    avatar: 'https://avatars.githubusercontent.com/u/38008649?v=4',
    name: 'Guilherme Sandi',
    email: 'guilherme_sandi@hotmail.com'
  },
  {
    id: uuidv4(),
    avatar: '',
    name: 'Fulano',
    email: 'fulano@email.com'
  },
]

const initialState: initialStateType = {
  userList,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserProps>) => {
      state.userList.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<UserProps>) => {
      const {
        payload: { id, avatar, name, email },
      } = action;

      state.userList = state.userList.map((user) =>
        user.id === id ? { ...user, avatar, name, email } : user
      );
    },
    removeUser: (state, action: PayloadAction<{ id: string }>) => {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },
});

export const { addUser, updateUser, removeUser } =
  userSlice.actions;
export const getUserList = (state: RootState) => state.user.userList;

export default userSlice.reducer;