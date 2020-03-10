import React, { useReducer, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import GuideChild from "./GuideChild";
import Codearea from "./Codearea";
import Instructions from "./Instructions";
import Hints from "./Hints";
import CompleteState from "./CompleteState";
import LevelSwitcher from "./LevelSwitcher";

import { Div, Flex, WorkingContainer } from "./styled";

import { questions } from "./questions";

import "./App.css";

const initialState = {
  clientBounds: [],
  staticBounds: [],
  currentParentStyles: ""
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#105754"
    }
  },
  status: {
    danger: "red"
  },
});

const HoldContainers = styled.div`
  position: relative;
  height: 60vh;
`;

const ParentContainer = styled.div`
  height: 60vh;
  width: 100%;
  position: absolute;
  background: #358626;
  display: flex;
  ${props => props.newStyle}
`;

const CrossAxis = styled.div`
  position: absolute;
  z-index: 5000;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 0;
  left: 22px;
  border: 2px solid #c2e1f5;
  background: #c2e1f588;
  width: 40vh;
  div {
    position: relative;
    padding-left: 40px;
    text-shadow: 0px 0px 0px black;
    font-weight: bold;
    text-transform: uppercase;
  }
  div:after,
  div:before {
    top: 50%;
    left: 100%;
    border: solid green;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    z-index: 5001;
  }
  div:after {
    border-color: rgba(136, 183, 213, 0);
    border-left-color: #88b7d5;
    border-width: 22px;
    margin-top: -22px;
  }
  div:before {
    border-color: rgba(194, 225, 245, 0);
    border-left-color: #c2e1f5;
    border-width: 22px;
    margin-top: -22px;
  }
`;

const MainAxis = styled.div`
  position: absolute;
  z-index: 5000;
  transform-origin: top left;
  top: 0;
  left: 0;
  border: 2px solid #c2e1f588;
  background: #c2e1f588;
  width: 60%;
  div {
    position: relative;
    padding-left: 40px;
    text-shadow: 0px 0px 0px black;
    font-weight: bold;
    text-transform: uppercase;
  }
  div:after,
  div:before {
    top: 50%;
    left: 100%;
    border: solid green;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    z-index: 5001;
  }
  div:after {
    border-color: rgba(136, 183, 213, 0);
    border-left-color: #88b7d5;
    border-width: 22px;
    margin-top: -22px;
  }
  div:before {
    border-color: rgba(194, 225, 245, 0);
    border-left-color: #c2e1f5;
    border-width: 22px;
    margin-top: -22px;
  }
`;

const replaceInArray = (arr, itemToReplace) => {
  if (arr.find(el => el.id === itemToReplace.id)) {
    const newArr = arr.filter(el => el.id !== itemToReplace.id);
    newArr.push(itemToReplace);
    return newArr;
  }
  const newArr = arr;
  newArr.push(itemToReplace);
  return newArr;
};

function reducer(state, action) {
  switch (action.type) {
    case "client_bounds":
      const { bounds } = action;
      const { clientBounds } = state;
      const newArr = replaceInArray(clientBounds, bounds);
      return { ...state, clientBounds: newArr };
    case "static_bounds":
      const newBounds = action.bounds;
      const { staticBounds } = state;
      const newStaticArr = replaceInArray(staticBounds, newBounds);
      return { ...state, staticBounds: newStaticArr };
    case "clear_bounds":
      return { ...state, staticBounds: [], clientBounds: [] };
    default:
      throw new Error();
  }
}

const KEY_PREFIX = "FB_SPOR";

const getLocalStorage = key => {
  return JSON.parse(localStorage.getItem(`${KEY_PREFIX}-${key}`));
};

const setLocalStorage = (key, data) => {
  console.log("set local stroage!", key, data);
  localStorage.setItem(`${KEY_PREFIX}-${key}`, JSON.stringify(data));
};

export const AppDispatch = React.createContext(null);
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [parentInput, setParentInput] = useState("");
  const [childInput, setChildInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [parentStyles, setParentStyles] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showAxis, setShowAxis] = useState(false);
  const [axisColumn, setAxisColumn] = useState(false);
  useEffect(() => {
    const localCurrentQuestion = getLocalStorage("currentQuestion");
    console.log(localCurrentQuestion, "local data?");
    if (localCurrentQuestion !== undefined && localCurrentQuestion !== null) {
      const answer = getAnswerForLevel(parseInt(localCurrentQuestion));
      console.log(answer);
      if (answer) {
        setParentInput(answer.parentInput);
        setChildInput(answer.childInput);
      }
      setCurrentQuestion(parseInt(localCurrentQuestion, 10));
    }
  }, []);
  useEffect(() => {
    setParentStyles(questions[currentQuestion].parentStyles);
  }, [currentQuestion]);

  useEffect(() => {
    const what = state.staticBounds.filter(el => {
      const { x, y, id } = el;
      const otherEl = state.clientBounds.find(el => el.id === id);
      if (!otherEl) return false;
      return otherEl.x === x && otherEl.y === y;
    });
    if (what.length === questions[currentQuestion].numberOfEl) {
      setHasWon(true);
    } else {
      setHasWon(false);
    }
  }, [state.clientBounds, state.staticBounds, currentQuestion]);

  useEffect(() => {
    if(parentInput.includes('column') && parentInput.includes('flex-direction')) {
      setAxisColumn(true);
    } else {
      setAxisColumn(false);
    }
  }, [parentInput])
  const handleShowAxis = () => {
    setShowAxis(true);
  };
  const handleHideAxis = () => {
    setShowAxis(false);
  }
  const handleChange = str => {
    console.log("handle parent change");
    setParentInput(str);
  };

  const handleChildChange = str => {
    console.log("handle child change");
    setChildInput(str);
  };

  const saveQuestionData = () => {
    setLocalStorage("currentQuestion", currentQuestion);
    const answers = getLocalStorage("answers") || [];
    const newAnswer = {
      question: currentQuestion,
      parentInput,
      childInput
    };
    answers.push(newAnswer);
    setLocalStorage("answers", answers);
  };

  const handleNextQuestion = () => {
    dispatch({ type: "clear_bounds" });
    setParentInput("");
    setChildInput("");
    setHasWon(false);
    saveQuestionData();
    if (questions.length <= currentQuestion + 1) {
      setComplete(true);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const getAnswerForLevel = level => {
    const answers = getLocalStorage("answers");
    const answer = answers.find(a => parseInt(a.question, 10) === level);
    return answer;
  };

  const handleChangeLevel = level => {
    if (currentQuestion === level) {
      return;
    }
    dispatch({ type: "clear_bounds" });
    const answer = getAnswerForLevel(level);
    setParentInput(answer.parentInput || "");
    setChildInput(answer.childInput || "");
    setCurrentQuestion(level);
  };

  const elementsToCreate = new Array(
    questions[currentQuestion].numberOfEl
  ).fill("el");
  const levels = [...Array(questions.length).keys()];
  const { highlightedEls, highlightedElsStyle } = questions[currentQuestion];

  return (
    <AppDispatch.Provider value={dispatch}>
      <ThemeProvider theme={theme}>
        <Div className="App" margin="20px 20px">
          <Instructions />
          <Flex>
            <Div width="30%">
              <Flex justify="space-between" margin="0 10px 0 0">
                <LevelSwitcher
                  levels={levels}
                  handleLevelChange={handleChangeLevel}
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!hasWon}
                  onClick={handleNextQuestion}
                >
                  Next Play!
                </Button>
              </Flex>
              <Div margin="20px 10px 0 0">
                <Hints
                  parentHints={questions[currentQuestion].hintRules}
                  childHints={questions[currentQuestion].hintChildRules}
                />
              </Div>
              {complete ? null : (
                <>
                  <Codearea
                    title=".flex-parent {"
                    value={parentInput}
                    handleChange={handleChange}
                    showFlex
                    mouseEnter={handleShowAxis}
                    mouseLeave={handleHideAxis}
                  />
                  <Codearea
                    title=".flex-child {"
                    value={childInput}
                    handleChange={handleChildChange}
                    mouseEnter={() => {}}
                    mouseLeave={() => {}}
                  />
                </>
              )}
            </Div>
            <Div width="70%">
              <HoldContainers>
                {showAxis && (
                  <>
                    <MainAxis>
                      <div>{axisColumn ? 'Cross Axis' : 'Main Axis'}</div>
                    </MainAxis>
                    <CrossAxis>
                      <div>{axisColumn ? 'Main Axis': 'Cross Axis'}</div>
                    </CrossAxis>
                  </>
                )}
                {complete ? (
                  <CompleteState />
                ) : (
                  <>
                    <WorkingContainer newStyle={parentStyles}>
                      {elementsToCreate.map((_, i) => {
                        const addStyles = highlightedEls.includes(i);
                        return (
                          <GuideChild
                            actionType="static_bounds"
                            type="static"
                            parentInput={parentStyles}
                            childInput={highlightedElsStyle}
                            color="rgba(0, 0, 0, 0.5)"
                            stylesToAdd={addStyles ? highlightedElsStyle : null}
                            key={i}
                            id={i}
                          />
                        );
                      })}
                    </WorkingContainer>
                    <ParentContainer newStyle={parentInput}>
                      {elementsToCreate.map((_, i) => {
                        const addStyles = highlightedEls.includes(i);
                        return (
                          <GuideChild
                            parentInput={parentInput}
                            childInput={childInput}
                            color={null}
                            stylesToAdd={addStyles ? childInput : null}
                            key={i}
                            id={i}
                            actionType="client_bounds"
                            type="input"
                          />
                        );
                      })}
                    </ParentContainer>
                  </>
                )}
              </HoldContainers>
            </Div>
          </Flex>
        </Div>
      </ThemeProvider>
    </AppDispatch.Provider>
  );
}

export default App;

// When user input changes
// call a callback that returns bounds to be compared to other bounds.
