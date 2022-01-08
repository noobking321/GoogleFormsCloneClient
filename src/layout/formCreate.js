import React, { useReducer, useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsFillPlusCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { postForm } from "../axios";
import Card from "../components/formCreate/card";
import FormName from "../components/formCreate/formName";
import formReducer from "../reducers/formCreate";
import config from "../config";

const initialState = {
  name: config.untitledFormName,
  questions: [{ type: 0, question: null }],
};

export default function FormCreate() {
  const navigate = useNavigate();

  const user = useContext(AuthContext);
  useEffect(() => {
    if (!user.user) {
      navigate("../");
    }
  }, [user, navigate]);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    postForm(state)
      .then((res) => {
        navigate(`/viewform/${res.data.id}`);
      })
      .catch((err) => {
        setLoading(false);
        if (
          err.response.data.errors &&
          err.response.data.errors.authorization
        ) {
          alert("Session Expired");
          user.logout();
        } else if (err.response.data.error) {
          alert(err.response.data.error);
        }
      });
  };
  return (
    <>
      {loading && (
        <div className="w-full h-full fixed block top-0 left-0 bg-black opacity-75 z-50">
          <span
            className="text-white top-1/2 my-0 mx-auto block relative w-0 h-0"
            style={{ top: "50%" }}
          >
            <ImSpinner2 className="animate-spin text-5xl" />
          </span>
        </div>
      )}
      <div className="md:flex flex-col items-center p-5">
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
                        className="md:flex flex-col items-center"
                      >
                        <Card
                          provided={provided}
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
        <div className="fixed bottom-8 right-8 md:bottom-20 md:right-20">
          <div className="flex">
            <button
              className="text-4xl md:text-5xl m-auto drop-shadow-lg"
              onClick={submit}
            >
              <BsFillCheckCircleFill />
            </button>
            <button
              className="text-4xl md:text-5xl m-auto drop-shadow-lg px-2"
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
