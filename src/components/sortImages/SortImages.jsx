import React, { useState } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";

const SortImages = ({images}) => {
  const [items, setItems] = useState(images);

  const onSortEnd = (oldIndex, newIndex) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex));
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="list"
      draggedItemClassName="dragged"
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="item">{item}</div>
        </SortableItem>
      ))}
    </SortableList>
  );
};

export default SortImages;
