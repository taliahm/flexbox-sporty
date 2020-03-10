import React, { useRef, useEffect, useContext } from "react";
import styled, { css } from "styled-components";

import { AppDispatch } from "./App";

import PlayerIcon from "./PlayerIcon";

const ChildDiv = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 5px;
  background: ${props => props.color};
  margin: 2px;
  ${props =>
    props.isHigh &&
    css`
      position: relative;
      z-index: 104;
    `}
  ${props => props.isAnimated &&
    css`
      @keyframes move {
        0% {
          transform: translateX(5px);
        }
        50% {
          transform: translateX(10px);
        }
        100% {
            transform: translateX(5px);
        }
      }
      animation-name: move;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    `}
  ${props => props.styles};
`;

function GuideChild(props) {
  const guideChild = useRef(null);
  const {
    parentInput,
    childInput,
    stylesToAdd,
    color,
    id,
    actionType,
    type,
    isAnimated
  } = props;
  const dispatch = useContext(AppDispatch);
  const handleResize = () => {
    const bounds = guideChild.current.getBoundingClientRect();
    dispatch({
      type: actionType,
      bounds: { x: bounds.x, y: bounds.y, id: id }
    });
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    console.log('what has changed though?');
    const bounds = guideChild.current.getBoundingClientRect();
    dispatch({
      type: actionType,
      bounds: { x: bounds.x, y: bounds.y, id: id }
    });
  }, [parentInput, childInput, id, dispatch]);

  return (
    <ChildDiv
      isHigh={type === "input"}
      styles={stylesToAdd}
      ref={guideChild}
      color={color}
      isAnimated={isAnimated}
    >
      {type === "input" && <PlayerIcon
        hasBall={id === 0}
        color={type === "input" ? "#c7d5df" : "rgba(0, 0, 0, 0.5)"}
      />}
    </ChildDiv>
  );
}

export default GuideChild;
