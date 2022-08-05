import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useAppSelector } from "../../app/hooks";

import { Table } from "../../components/Table"
import { Modal } from "../../components/Modal";

import { Container, Button } from "./styles";

export function Home() {
  const userList = useAppSelector((state) => state.user.userList);

  const [isOpenModal, setIsOpenModal] = useState(false);
  
  function handleOpen() {
    setIsOpenModal(true)
  };

  return (
    <Container>
      <div>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </div>
      <Table users={userList} />
      <Modal
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </Container>
  )
}