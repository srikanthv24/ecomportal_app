import React from "react";
import { SERVICE_LABELS } from "../../utils/constants";

const MenuList = React.memo(
  ({ list, onMenuSelect, id, cancelSubscription }) => {
    return (
      <ul className="list-unstyled">
        {list.map((listItem) => (
          <li>
            <a onClick={() => onMenuSelect(listItem, id)}>
              {SERVICE_LABELS[listItem]}
            </a>
          </li>
        ))}
        <li>
          <a onClick={() => cancelSubscription(id)}>Cancel Subscrition</a>
        </li>
      </ul>
    );
  }
);

export default MenuList;
