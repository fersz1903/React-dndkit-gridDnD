import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [parent, setParent] = useState(null);
  var [draggableMarkup, setDraggableMarkup] = useState(null);
  var [containerA, setContainerA] = useState([]);
  const containers = ["A", "B", "C"];
  // const [containers, setContainers] = useState({
  //   A: [],
  //   B: [],
  //   C: [],
  // });
  const draggables = [
    <Draggable key="draggable1" id="draggable1">
      Drag me1
    </Draggable>,
    <Draggable key="draggable2" id="draggable2">
      Drag me2
    </Draggable>,
    <Draggable key="draggable3" id="draggable3">
      Drag me3
    </Draggable>,
  ];

  // const handleDragStart = (item) => {
  //   //console.log(item.active);
  //   setDraggableMarkup(item.active);
  //   console.log(draggableMarkup);
  // };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div id="dnd-contextCont">
        <div id="sidebar">{parent === null ? draggables : null}</div>
        <div id="main" className="container text-center">
          {containers.map((id) => (
            <Droppable key={id} id={id} className="col-sm">
              {/* {parent !== null && parent.id === id
                ? draggableMarkup
                : "Drop here"} */}
            </Droppable>
          ))}
          {/* <div className="row">
            <Droppable id="droppable" className="col-sm">
              {parent === "droppable" ? draggableMarkup : "Drop here"}
            </Droppable>
          </div> */}
          {/* <Droppable id="droppable1" className="col-sm">
              {parent === "droppable1" ? draggable : "Drop here"}
            </Droppable>
          </div>
          <div className="row">
            <Droppable id="droppable2" className="col-sm">
              {parent === "droppable2" ? draggable : "Drop here"}
            </Droppable>
            <Droppable id="droppable3" className="col-sm">
              {parent === "droppable3" ? draggable : "Drop here"}
            </Droppable>
            <Droppable id="droppable4" className="col-sm">
              {parent === "droppable4" ? draggable : "Drop here"}
            </Droppable>
            <Droppable id="droppable5" className="col-sm">
              {parent === "droppable5" ? draggable : "Drop here"}
            </Droppable>
          </div>
          <div className="row">
            <Droppable id="droppable6" className="col-sm">
              {parent === "droppable6" ? draggable : "Drop here"}
            </Droppable>
            <Droppable id="droppable7" className="col-sm">
              {parent === "droppable7" ? draggable : "Drop here"}
            </Droppable>
            <Droppable id="droppable8" className="col-sm">
              {parent === "droppable8" ? draggable : "Drop here"}
            </Droppable>
          </div> */}
        </div>
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    //console.log("drop here idsi", over.id);
    if ((active && over) !== null) {
      if (active.id !== over.id) {
        draggableMarkup = active;
        console.log("dragend-draggablemu", draggableMarkup);
        setParent(over ? over.id : null);
      }
    }
  }

  function handleDragStart(event) {
    const { active } = event;
    console.log("sürüklenen nesne", active);

    setDraggableMarkup(active);
    console.log("draggableMarkup:", draggableMarkup);
  }

  function handleDragOver(event) {
    // over : droppable
    // active : draggable
    const { over, active } = event;
    console.log(over, active);
    //setParent(over ? over.id : null);
  }
}

export default App;
