import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { SESSION_TYPES } from "../../utils/constants";

const getSessionCheckBoxes = (sessionCodes, onChange) => {
  return sessionCodes.map((sessionCode) => {
    return (
      <Form.Check
        type="checkbox"
        name={sessionCode}
        label={SESSION_TYPES[sessionCode]}
        onChange={onChange}
      />
    );
  });
};

const SessionCordinator = ({ withDate, sessionCodes, onSessionChange }) => {
  const [sessions, setSessions] = useState([]);
  const onChange = (e) => {
    const selectedCode = e.target.name;
    const updatedSessionCodes = sessions.includes(selectedCode)
      ? sessions.filter((code) => code !== selectedCode)
      : [...sessions, selectedCode];
    setSessions(updatedSessionCodes);
    onSessionChange(updatedSessionCodes);
  };
  return <>{withDate ? null : getSessionCheckBoxes(sessionCodes, onChange)}</>;
};

export default SessionCordinator;
