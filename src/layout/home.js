import React, { useReducer } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsFillPlusCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

import Card from "../components/card";
import FormName from "../components/formName";
import formReducer from "../reducers/form";
import config from "../config";

const initialState = {
  name: config.untitledFormName,
  quetions: [{ type: 0, quetion: null }],
};

export default function Home() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const submit = () => {
    console.log(state);
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
              {state.quetions.map((val, index) => {
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
                          quetion={val.quetion}
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
