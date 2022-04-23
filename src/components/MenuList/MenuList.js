import React from "react";
import { SERVICE_LABELS } from "../../utils/constants";

const MenuList = React.memo(
  ({ list, onMenuSelect, id, cancelSubscription }) => {
    return (
      <ul className="list-unstyled">
        {list.map((listItem) => (
          <li>
            <a href="#" onClick={() => onMenuSelect(listItem, id)}>
              <span className="icon"></span>
              {SERVICE_LABELS[listItem]}
            </a>
          </li>
        ))}
        <li>
          <a href="#" onClick={() => cancelSubscription(id)}><span className="icon"></span>Cancel Subscription</a>
        </li>
      </ul>
    );
  }
);

export default MenuList;
