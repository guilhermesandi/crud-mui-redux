import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import ModalMUI from '@mui/material/Modal';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addUser, updateUser } from '../../features/users/userSlice';

import { ModalContainer, Title, Input, Button } from './styles';

interface Props {
  id?: string;
  isOpen: boolean;
  setIsOpenModal: Function;
}

const userFormValidationSchema = yup.object({
  avatar: yup.string(),
  name: yup.string().required(),
  email: yup.string().email().required(),
})

type UserFormData = yup.InferType<typeof userFormValidationSchema>

export function Modal({ id, isOpen, setIsOpenModal }: Props) {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormValidationSchema),
  });

  const userData = useAppSelector((state) =>
    state.user.userList.find((user) => user.id === id)
  );

  function handleClose() {
    setIsOpenModal(false)
    reset();
  };

  function onSubmit(data: UserFormData) {
    setIsLoading(true);
    setTimeout(() => {
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
      setIsLoading(false);

      handleClose();
    }, 1500);
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

          <Input
            defaultValue={userData?.avatar}
            label="Avatar URL"
            variant="outlined"
            error={!!errors.avatar}
            helperText={errors.avatar?.message}
            {...register("avatar")}
          />
          <Input
            defaultValue={userData?.name}
            label="Name"
            variant="outlined"
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <Input
            defaultValue={userData?.email}
            label="Email"
            variant="outlined"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <Button
            variant="contained"
            loading={isLoading}
            type="submit"
          >
            Add User
          </Button>
        </form>
      </ModalContainer>
    </ModalMUI>
  )
}