import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: props.id,
      data: props.children,
    });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <div className="buttondivi" onClick={() => handleClick()}>
      <button
        id={props.id}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {props.children}
      </button>
    </div>
  );
}

export default Draggable;
