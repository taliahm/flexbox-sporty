import styled, { keyframes } from 'styled-components';
 
export const swap = keyframes`
0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

export const swapBack = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
`;