import React from 'react';
import styled from 'styled-components';

import { Div, Flex, H1, P, colors } from './styled';

const Ul = styled.ul`
  color: ${colors.yellowPeach};
  margin: 0;
`;

function Instructions() {
    return (
        <Flex align="flex-start">
          <Div width="40%">
        <H1 margin="10px 0 0 0" color={colors.mustard}>
          Welcome Coach!
        </H1>
        <P color={colors.yellowPeach} margin="0" fontSize="16px">
          Thank goodness you're here! Our sporting team needs someone to
          call the plays, get the ball in the net and other sports things! Using, flexbox, please help the players get into proper formation
          on the field.
        </P>
        </Div>
        <Div width="60%" margin="20px 0 0 0" padding="20px 40px 0 20px">
        <P color={colors.yellowPeach} fontSize="16px" margin="8px 0 0 0">
        A few things to get you started:
        </P>
        <Ul>
          <li>
            Using CSS's flexbox, move the outlined players into the boxes.
          </li>
          <li>
            Code inputted into the .flex-parent textarea will be applied to
            the element containing all the other elements (the flex parent).
          </li>
          <li>
            Code inputted into the .flex-child textarea will be applied to
            one or possibly more of the child elements (the flex chidren).
          </li>
          <li>
            If you need a hint or a reminder about how any of these
            properties work, feel free to click the hints button or checkout
            this flexbox cheatsheet here.
          </li>
        </Ul>
        <P color={colors.yellowPeach} fontSize="16px" margin="8px 0 20px 0">
          That's it! Have fun! Be safe! Give 110%! Go Sports!
        </P>
        </Div>
      </Flex>
    );
}

export default Instructions;