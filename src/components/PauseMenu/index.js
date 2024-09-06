import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { SERVICE_TYPE } from "../../utils/constants";

const getDropdownItem = (serviceType) => {
  return (
    <Dropdown.Item eventKey={serviceType}>
      SERVICE_LABELS[serviceType]
    </Dropdown.Item>
  );
};

const PauseMenu = ({ onPauseMenuSelect }) => {
  return (
    <DropdownButton
      onSelect={onPauseMenuSelect}
      title="PAUSE"
      variant="secondary"
      size="sm"
    >
      {Object.keys(SERVICE_TYPE).forEach(function (key) {
        console.log(key);
        getDropdownItem(key);
      })}
    </DropdownButton>
  );
};

export default PauseMenu;

/*<Dropdown.Item eventKey={SERVICE_TYPE.PAUSE_TOMORROW}>
        Tomorrow
      </Dropdown.Item>
      <Dropdown.Item eventKey={SERVICE_TYPE.PAUSE_IN_BETWEEN}>
        IN BETWEEN
      </Dropdown.Item>
      <Dropdown.Item eventKey={SERVICE_TYPE.PAUSE_INDEFINITE}>
        INDEFINITE
      </Dropdown.Item>
      <Dropdown.Item eventKey={SERVICE_TYPE.PAUSE_CUSTOM}>CUSTOM</Dropdown.Item>*/
