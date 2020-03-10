import React from "react";
import styled from "styled-components";

import { Div, H4, colors } from "./styled";

const TextAlignedDiv = styled(Div)`
  text-align: left;
`;
const Textarea = styled.textarea`
  background: black;
  color: green;
  font-family: monospace;
  resize: none;
  border: none;
  outline: none;
  height: 150px;
  width: 100%;
  display: block;
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;
  &:placeholder {
    color: grey;
  }
`;
const MonospaceH4 = styled(H4)`
  font-family: monospace;
  cursor: pointer;
`;

const GreenSpan = styled.p`
  color: green;
  font-family: monospace;
  background: black;
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
`;

function Codearea(props) {
  const { handleChange, mouseEnter, mouseLeave, showFlex, title, value } = props;
  const handleTextareaChange = e => {
    const val = e.target.value;
    const matchString = val.replace(/[^\w\s;:-]/g, '');
    handleChange(matchString);
  }
  const handleMouseEnter = () => {
    console.log('mouse enter');
    mouseEnter();
  }
  const handleMouseLeave = () => {
    console.log('mouse leave');
    mouseLeave();
  }
  return (
    <>
      <TextAlignedDiv margin="0 8px 8px 0">
        <MonospaceH4 onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} color={colors.mustard} margin="0" fontSize="20px">
          {title}
        </MonospaceH4>
        {showFlex && <GreenSpan>display:flex;</GreenSpan>}
        <Textarea
          value={value}
          onChange={handleTextareaChange}
          placeholder="/* Your CSS here */"
        />
        <MonospaceH4 margin="0" color={colors.mustard} fontSize="20px">
          {"}"}
        </MonospaceH4>
      </TextAlignedDiv>
    </>
  );
}

export default Codearea;
