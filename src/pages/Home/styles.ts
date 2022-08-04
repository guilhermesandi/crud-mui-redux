import styled from "styled-components";
import { Button as ButtonMUI } from '@mui/material';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

export const Button = styled(ButtonMUI)`
  && {
    margin-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
