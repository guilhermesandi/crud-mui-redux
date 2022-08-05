import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form'
import ModalMUI from '@mui/material/Modal';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addUser, updateUser } from '../../features/users/userSlice';

import { ModalContainer, Title, Input, Button } from './styles';

interface Props {
  id?: string;
  isOpen: boolean;
  setIsOpenModal: Function;
}

interface AddUserFormData {
  avatar: string;
  name: string;
  email: string;
}

export function Modal({ id, isOpen, setIsOpenModal }: Props) {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<AddUserFormData>();

  const userData = useAppSelector((state) =>
    state.user.userList.find((user) => user.id === id)
  );
  console.log('userData', userData)

  function handleClose() {
    setIsOpenModal(false)
    reset();
  };

  function onSubmit(data: AddUserFormData) {
    console.log('data', data)
    if (id) {
      dispatch(updateUser({
        id,
        avatar: data.avatar,
        name: data.name,
        email: data.email
      }));
    } else {
      dispatch(addUser({
        id: uuidv4(),
        avatar: data.avatar,
        name: data.name,
        email: data.email
      }));
    }

    handleClose();
  }

  return (
    <ModalMUI
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title id="modal-modal-title">
            Add user
          </Title>

          {userData?.name}

          <Input
            defaultValue={userData?.avatar}
            label="Avatar URL"
            variant="outlined"
            {...register("avatar")}
          />
          <Input
            defaultValue={userData?.name}
            label="Name"
            variant="outlined"
            {...register("name")}
          />
          <Input
            defaultValue={userData?.email}
            label="Email"
            variant="outlined"
            {...register("email")}
          />

          <Button
            variant="contained"
            type="submit"
          >
            Add User
          </Button>
        </form>
      </ModalContainer>
    </ModalMUI>
  )
}