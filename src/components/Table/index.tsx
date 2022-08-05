import { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableMUI from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { UserProps, removeUser } from '../../features/users/userSlice';
import { useAppDispatch } from '../../app/hooks';

import { Modal } from '../../components/Modal';

import { Button } from './styles';

interface UsersProps {
  users: UserProps[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function Table({ users }: UsersProps) {
  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userId, setUserId] = useState('');

  function handleOpen() {
    setIsOpenModal(true)
  };

  function handleEditUser(id: string) {
    setUserId(id);
    handleOpen();
  }

  return (
    <TableContainer component={Paper}>
      <TableMUI>
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.avatar ? (
                  <Avatar alt={user.name} src={user.avatar} />
                ) : (
                  <Avatar>{user.name.charAt(0)}</Avatar>
                )}
              </StyledTableCell>
              <StyledTableCell align="left">{user.name}</StyledTableCell>
              <StyledTableCell align="left">{user.email}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="outlined"
                  onClick={() => handleEditUser(user.id)}
                >
                  Edit
                </Button>
                <IconButton 
                  aria-label="delete"
                  color="error"
                  onClick={() => dispatch(removeUser({ id: user.id}))}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <Modal
            id={userId}
            isOpen={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
}