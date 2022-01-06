import config from "../config";

const formReducer = (state, action) => {
  switch (action.type) {
    case "addCard":
      const items = Array.from(state.questions);
      items.push({ type: 0, question: null });
      return {
        ...state,
        questions: items,
      };
    case "removeCard":
      if (action.i !== null) {
        return {
          ...state,
          questions: state.questions
            .slice(0, action.i)
            .concat(state.questions.slice(action.i + 1)),
        };
      }
      return state;
    case "changeQuetion":
      if (action.i !== null) {
        const items = Array.from(state.questions);
        items[action.i].question = action.newQuetion;
        return {
          ...state,
          questions: items,
        };
      }
      return state;
    case "changeOptions":
      if (action.i !== null) {
        const items = Array.from(state.questions);
        items[action.i].options = action.options;
        if (
          items[action.i].options[items[action.i].options.length - 1] === ""
        ) {
          items[action.i].options.splice(-1, 1);
        }
        return {
          ...state,
          questions: items,
        };
      }
      return state;
    case "changeType":
      if (action.i !== null && action.newType !== null) {
        if (action.i !== null) {
          const items = Array.from(state.questions);
          items[action.i].type = action.newType;
          if (action.newType === 2) {
            items[action.i].options = [];
          } else {
            items[action.i].options = null;
          }
          return {
            ...state,
            questions: items,
          };
        }
      }
      return state;

    case "changeOrder":
      if (action.result !== null) {
        if (
          !action.result.destination ||
          !state.questions[action.result.source.index].question ||
          !state.questions[action.result.destination.index].question
        )
          return state;
        const items = Array.from(state.questions);
        const [reorderedItem] = items.splice(action.result.source.index, 1);
        items.splice(action.result.destination.index, 0, reorderedItem);
        return { ...state, questions: items };
      }
      return state;
    case "changeFormName":
      if (action.newFormName !== null) {
        if (action.newFormName === "") {
          return { ...state, name: config.untitledFormName };
        }
        return { ...state, name: action.newFormName };
      }
      return state;
    default:
      throw new Error();
  }
};

export default formReducer;
