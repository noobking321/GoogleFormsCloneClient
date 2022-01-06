import React, { useReducer } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsFillPlusCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

import { postForm } from "../axios";
import Card from "../components/formCreate/card";
import FormName from "../components/formCreate/formName";
import formReducer from "../reducers/formCreate";
import config from "../config";

const initialState = {
  name: config.untitledFormName,
  questions: [{ type: 0, question: null }],
};

export default function Home() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const submit = () => {
    postForm(state).then((res) => {
      alert(res.data.id);
    });
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <FormName formName={state.name} dispatch={dispatch} />
      </div>
      <DragDropContext
        onDragEnd={(result) => {
          dispatch({ type: "changeOrder", result });
        }}
      >
        <Droppable droppableId="cards">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {state.questions.map((val, index) => {
                return (
                  <Draggable key={index} draggableId={`${index}`} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex flex-col items-center"
                      >
                        <Card
                          i={index}
                          type={val.type}
                          question={val.question}
                          dispatch={dispatch}
                          type_options={config.type_options}
                          options={val.options}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <div className="fixed bottom-20 right-20 ">
          <div className="flex">
            <button className="text-4xl m-auto drop-shadow-lg" onClick={submit}>
              <BsFillCheckCircleFill />
            </button>
            <button
              className="text-4xl m-auto drop-shadow-lg px-2"
              onClick={() => {
                dispatch({ type: "addCard" });
              }}
            >
              <BsFillPlusCircleFill />
            </button>
          </div>
        </div>
      </DragDropContext>
    </>
  );
}
