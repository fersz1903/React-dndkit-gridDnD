import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import "bootstrap/dist/css/bootstrap.min.css";
import Draggable from "./Draggable";
import { useEffect } from "react";

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    //child: props.child,
    //data: props.data,
  });

  const { draggableMarkup } = props;
  // console.log("draggablemarkup: ", draggableMarkup);
  // console.log("draggablemarkupdata: ", draggableMarkup.children);

  const style = {
    width: "200px",
    height: "200px",
    border: "2px dashed #ccc",
    backgroundColor: isOver ? "gray" : "transparent", // Renk değişikliği için
  };

  return (
    <div
      id={props.id}
      ref={setNodeRef}
      className={props.className}
      style={style}
    >
      {props.children}
      {draggableMarkup.data ? (
        <Draggable id={`${draggableMarkup.id}`}>
          {/* {draggableMarkupChild} */}
          {draggableMarkup.data.current}
        </Draggable>
      ) : (
        "boş"
      )}
    </div>
  );
}

export default Droppable;
