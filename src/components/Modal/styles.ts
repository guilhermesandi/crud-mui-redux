import styled from "styled-components";
import { Box, Typography, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 24px;
  padding: 2rem;
`;

export const Title = styled(Typography)`
  && {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const Input = styled(TextField)`
  && {
    margin-bottom: 1rem;
    width: 100%;
  }
`;

export const Button = styled(LoadingButton)`
  && {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
