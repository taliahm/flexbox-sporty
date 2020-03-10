export const questions = [
  {
    parentStyles: "justify-content: flex-end; display: flex;",
    numberOfEl: 3,
    highlightedEls: [],
    highlightedElsStyle: "",
    hintRules: ["justify-content"],
    hintChildRules: []
  },
  {
    parentStyles: "align-items: center; display: flex;",
    numberOfEl: 3,
    highlightedEls: [],
    highlightedElsStyle: "",
    hintRules: ["align-items"],
    hintChildRules: []
  },
  {
    parentStyles: "justify-content: flex-end; display: flex; flex-wrap: wrap",
    numberOfEl: 20,
    highlightedEls: [],
    highlightedElsStyle: "",
    hintRules: ["justify-content", "align-content", "flex-wrap"],
    hintChildRules: []
  },
  {
    parentStyles: "display: flex;",
    numberOfEl: 3,
    highlightedEls: [0],
    highlightedElsStyle: "align-self: flex-end",
    hintRules: [],
    hintChildRules: ["align-self"]
  },
  {
    parentStyles: "justify-content: flex-end; display: flex; flex-wrap: wrap",
    numberOfEl: 20,
    highlightedEls: [1],
    highlightedElsStyle: "align-self: flex-end",
    hintRules: ["justify-content", "align-content", "flex-wrap"],
    hintChildRules: ["align-self"]
  }
];
