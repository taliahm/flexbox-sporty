import React from "react";
import styled from 'styled-components';

import GuideChild from "./GuideChild";
import { Div, WorkingContainer } from "./styled";

const RelativeDiv = styled(Div)`
    position: relative;
    height: 60vh;
`;

const Overlay = styled.div` 
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.7);
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;

    .fa-trophy {
        font-size: 40px;
        transform: rotate(10deg);
        color: goldenrod;
    }
`;
function CompleteState() {
  const fakeGuideChildren = [
    { id: 1, style: "align-self: flex-end" },
    { id: 2, style: "align-self: center" },
    { id: 3, style: "align-self: flex-start" },
    { id: 4, style: "align-self: flex-end" },
    { id: 5 },
    { id: 6, style: "align-self: center" },
    { id: 7, style: "align-self: flex-end" },
    { id: 0 }
  ];
  return (
    <RelativeDiv>
        <Overlay>
            <div>
                <i class="fas fa-trophy"></i>
                <h2>You've won! Great job coach!</h2>
            </div>
        </Overlay>
      <WorkingContainer newStyle="display: flex; justify-content: center;">
        {fakeGuideChildren.map(item => {
          return (
            <GuideChild
              actionType="static_bounds"
              type="input"
              parentInput={""}
              childInput={""}
              color={null}
              stylesToAdd={item.style}
              key={item.id}
              id={item.id}
              isAnimated
            />
          );
        })}
      </WorkingContainer>
    </RelativeDiv>
  );
}

export default CompleteState;
