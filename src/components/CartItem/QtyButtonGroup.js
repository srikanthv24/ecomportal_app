import React from "react";
import { GrAdd, GrSubtract } from "react-icons/gr";

const QtyButtonGroup = ({
  productIndex,
  itemId,
  quantity,
  loading,
  onQtyDecrement,
  onQtyIncrement,
}) => {
  return (
    <div className="btn-group btn-group-sm" role="group">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => onQtyDecrement(productIndex, itemId, quantity)}
        disabled={loading}
      >
        <GrSubtract />
      </button>
      <button type="button" className="btn btn-outline-primary" disabled>
        {quantity}
      </button>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => onQtyIncrement(productIndex, itemId, quantity)}
        disabled={loading}
      >
        <GrAdd />
      </button>
    </div>
  );
};

export default QtyButtonGroup;
