import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import { v4 as uuid } from "uuid";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

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

  const [droppablesMap, setDroppablesMap] = useState({});
  const [activeDraggable, setActiveDraggable] = useState(null);
  const [swappedItem, setSwappedItem] = useState(null);
  const handleDragStart = (event) => {
    setActiveDraggable(event.active);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    setActiveDraggable(null);

    // itemi kopyala ve kopyalanmış itemin idsi ile işlem yap.
    // New unique id
    const unique_id = uuid();

    // Get first 8 characters using slice
    const small_id = unique_id.slice(0, 8);
    const newDraggable = (
      <Draggable
        key={small_id}
        id={small_id}
        data={{ current: active.data.current }}
      >
        {active.data.current}
      </Draggable>
    );
    // console.log("new draggable", newDraggable);

    if (over) {
      const { id } = over;
      // over var ise draggable droppable üzerindedir
      // over var ise droppalesmap içerisinde aktif itemin idsi var mı kontrol et
      const { result } = checkDroppablesMapIfFull(active.id);

      if (result) {
        // aktif item droppablesmap içerisinde var ise yeni item oluşturma
        console.log("droppablesmap içerisinde aktif item bulundu:", active.id);
        // if over içerisinde draggable var ise swap else delete and drop
        if (checkDroppable(over.id)) {
          // componentlerin swap işlemini gerçekleştir.
          const { droppableId } = checkDroppablesMapIfFull(active.id);
          swapItems(over.id, droppableId);
        } else {
          console.log("delete and drop new area");
          deleteItemDroppablesMapIfHasActiveItem(active.id);
          setDroppablesMap((prevMap) => ({
            ...prevMap,
            [id]: {
              draggableMarkup: active,
            },
          }));
        }
      } else {
        console.log("droppablesmap içerisinde aktif item bulunamadı");
        setDroppablesMap((prevMap) => ({
          ...prevMap,
          [id]: {
            draggableMarkup: newDraggable.props,
          },
        }));
      }
    } else {
      const { result, droppableId } = checkDroppablesMapIfFull(active.id);
      console.log("RESULT", result);
      console.log("droppableid", droppableId);

      if (result) {
        console.log("delete item droppable id: ", droppableId);
        deleteItem(droppableId);
      }
    }
  };

  const deleteItem = async (droppableId) => {
    // Yeni bir harita oluşturarak mevcut durumu güncelle
    const updatedDroppablesMap = { ...droppablesMap };

    // İlgili id'ye sahip öğeyi kaldır
    delete updatedDroppablesMap[droppableId];

    // Güncellenmiş haritayı durum olarak ayarla
    setDroppablesMap(updatedDroppablesMap);
  };

  const checkDroppablesMapIfFull = (Id) => {
    for (const key in droppablesMap) {
      if (droppablesMap.hasOwnProperty(key)) {
        const draggableId = droppablesMap[key].draggableMarkup.id;
        if (draggableId === Id)
          return { result: draggableId === Id, droppableId: key };
      }
    }
    return { result: false, droppableId: null };
  };

  const deleteItemDroppablesMapIfHasActiveItem = async (activeId) => {
    for (const key in droppablesMap) {
      if (droppablesMap.hasOwnProperty(key)) {
        const draggableId = droppablesMap[key].draggableMarkup.id;
        if (draggableId === activeId) {
          await deleteItem(key);
        }
      }
    }
  };

  const checkDroppable = (Id) => {
    console.log("ceckdroppable", Id);
    if (droppablesMap.hasOwnProperty(Id)) {
      console.log("hasownprop yes");
      return true;
    }
    return false;
  };

  const swapItems = (id1, id2) => {
    console.log("ITEMS SWAP:", id1, id2);
    // İlk olarak, değişim yapılacak öğelerin değerlerini saklayın
    const temp = droppablesMap[id1];

    // Birinci öğenin değerini ikinci öğenin değeriyle değiştirin
    droppablesMap[id1] = droppablesMap[id2];

    // İkinci öğenin değerini ilk öğenin değeriyle değiştirin
    droppablesMap[id2] = temp;

    // Güncellenmiş haritayı durum olarak ayarlayın
    setDroppablesMap({ ...droppablesMap });
  };

  const handleDragOver = (event) => {
    // console.log("drag over, event:", event);
  };

  console.log("droppables map: ", droppablesMap);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <DragOverlay>
        {activeDraggable && (
          <Draggable id={activeDraggable.id}>
            {activeDraggable.data.current}
          </Draggable>
        )}

        {swappedItem && (
          <Draggable id={swappedItem.id}>{swappedItem.data.current}</Draggable>
        )}
      </DragOverlay>

      <div id="dnd-contextCont">
        <div id="sidebar">{draggables}</div>
        <div id="main" className="container text-center">
          <div className="row">
            <Droppable
              id="droppable1"
              draggableMarkup={
                droppablesMap["droppable1"]?.draggableMarkup || []
              }
              className="col-sm gridPart"
            />
            <Droppable
              id="droppable2"
              draggableMarkup={
                droppablesMap["droppable2"]?.draggableMarkup || []
              }
              className="col-sm gridPart"
            />
          </div>
          <div className="row">
            <Droppable
              id="droppable3"
              draggableMarkup={
                droppablesMap["droppable3"]?.draggableMarkup || []
              }
              className="col-sm gridPart"
            />
          </div>
          <div className="row">
            <Droppable
              id="droppable4"
              draggableMarkup={
                droppablesMap["droppable4"]?.draggableMarkup || []
              }
              className="col-sm gridPart"
            />
            <Droppable
              id="droppable5"
              draggableMarkup={
                droppablesMap["droppable5"]?.draggableMarkup || []
              }
              className="col-sm gridPart"
            />
            <Droppable
              id="droppable6"
              draggableMarkup={
                droppablesMap["droppable6"]?.draggableMarkup || []
              }
              className="col-sm gridPart"
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
