import styled from "styled-components";
import { noise } from './utils';

export const colors = {
    mustard: '#daad46',
    yellowPeach: '#efd397',

}

export const Div = styled.div`
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  width: ${props => props.width || "auto"};
`;

export const Flex = styled.div`
    display: flex;
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    margin: ${props => props.margin || 0};
    padding: ${props => props.padding || 0};
    width: ${props => props.width || "auto"};
`;

export const P = styled.p`
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  font-size: ${props => props.fontSize || '12px'};
  color: ${props => props.color};
`;

export const H1 = styled.h1`
margin: ${props => props.margin || 0};
padding: ${props => props.padding || 0};
font-size: ${props => props.fontSize || '36px'};
color: ${props => props.color};
`;

export const H4 = styled.h4`
margin: ${props => props.margin || 0};
padding: ${props => props.padding || 0};
font-size: ${props => props.fontSize || '12px'};
color: ${props => props.color};
`;


export const WorkingContainer = styled.div`
  height: 60vh;
  width: 100%;
  position: absolute;
  z-index: 99;
  background: #358626;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 101;
    background-image: url(${noise});
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: repeating-linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 80px,
      transparent 80px,
      transparent 160px
    );
  }
  ${props => props.newStyle}
`;