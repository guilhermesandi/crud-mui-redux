import { v4 as uuidv4 } from "uuid";
import ModalMUI from '@mui/material/Modal';

import { useAppDispatch } from "../../app/hooks";
import { addUser } from "../../features/users/userSlice";

import { ModalContainer, Title, Input, Button } from "./styles";

interface Props {
  isOpen: boolean;
  setIsOpenModal: Function;
}

export function Modal({ isOpen, setIsOpenModal }: Props) {
  const dispatch = useAppDispatch();

  const handleClose = () => setIsOpenModal(false);

  function onSubmit() {
    dispatch(addUser({
      id: uuidv4(),
      avatar: '',
      name: 'Teste',
      email: 'teste@gmail.com'
    }));

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
        <Title id="modal-modal-title">
          Add user
        </Title>

        <Input label="Avatar URL" variant="outlined" />
        <Input label="Name" variant="outlined" />
        <Input label="Email" variant="outlined" />

        <Button
          variant="contained"
          onClick={onSubmit}
        >
          Add User
        </Button>
      </ModalContainer>
    </ModalMUI>
  )
}