import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsArrowsMove } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

export default function Dropdown(props) {
  const opts = props.options ? Array.from(props.options) : [];
  if (!opts.length || opts[opts.length - 1]) {
    opts.push("");
  }
  const option_change = (e) => {
    const items = Array.from(opts);
    const index = parseInt(e.target.getAttribute("index"));
    items[index] = e.target.value;
    if (index === props.options.length - 1) {
      items.push("");
    } else if (!e.target.value) {
      items.splice(index, 1);
    }
    props.dispatch({ type: "changeOptions", i: props.i, options: items });
  };
  const option_delete = (e) => {
    const index = parseInt(e.target.parentNode.getAttribute("index"));
    const items = Array.from(props.options);
    items.splice(index, 1);
    props.dispatch({ type: "changeOptions", i: props.i, options: items });
  };
  const on_drag_handle = (result) => {
    if (
      !result.destination ||
      !opts[result.source.index] ||
      !opts[result.destination.index]
    )
      return;
    const items = Array.from(opts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    props.dispatch({ type: "changeOptions", i: props.i, options: items });
  };
  return (
    <div>
      <div className="flex">
        <DragDropContext onDragEnd={on_drag_handle}>
          <Droppable droppableId="options">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {opts.map((val, index) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={`${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <>
                          <li
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {val || !index ? (
                              <button
                                className="text-xl md:ml-5 p-2"
                                {...provided.dragHandleProps}
                              >
                                <BsArrowsMove className="drop-shadow-lg dark:text-white" />
                              </button>
                            ) : (
                              <button
                                className="text-3xl md:ml-6 px-4"
                                disabled={true}
                                {...provided.dragHandleProps}
                              ></button>
                            )}
                            <input
                              index={index}
                              className="m-2 md:mr-10 text-l border border-dotted border-slate-800 rounded-md p-2 text-slate-500 outline-0 dark:bg-slate-700 dark:text-slate-300 dark:border-white"
                              value={val}
                              placeholder={`Option ${index + 1}`}
                              onChange={option_change}
                            ></input>
                            {val && (
                              <>
                                <button onClick={option_delete} index={index}>
                                  <FaTrash className="text-l drop-shadow-lg dark:text-white" index={index} />
                                </button>
                              </>
                            )}
                          </li>
                        </>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
