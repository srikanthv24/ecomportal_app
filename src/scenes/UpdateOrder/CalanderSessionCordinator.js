import React, { useState } from "react";
import SessionCalander from "./SessionCalander";
import { getDatesByStatus } from "./updateOrder.utils";

const CalanderSessionCordinator = React.memo(
  ({
    sessionCodes,
    onSessionChange,
    selectedSessions,
    disabled = false,
    orderDates,
    handleCalendarChange,
    addressList,
    ...rest
  }) => {
    const [sessions, setSessions] = useState(
      selectedSessions ? selectedSessions : []
    );
    const onSessionClick = (e) => {
      const selectedCode = e.target.name;
      const updatedSessionCodes = sessions?.includes(selectedCode)
        ? sessions?.filter((code) => code !== selectedCode)
        : [...sessions, selectedCode];
      setSessions(updatedSessionCodes);
      onSessionChange(updatedSessionCodes);
    };
    return (
      <>
        {selectedSessions?.length > 0 &&
          selectedSessions.map((sessionCode, index) => {
            const completedDates = getDatesByStatus(orderDates, index, "F");
            const remainingDates = getDatesByStatus(orderDates, index, "S");
            return (
              <SessionCalander
                {...rest}
                onSessionClick={onSessionClick}
                checked={selectedSessions?.includes(sessionCode)}
                disabled={!selectedSessions?.includes(sessionCode)}
                completedDates={completedDates}
                remainingDates={remainingDates}
                sessionCode={sessionCode}
                handleCalendarChange={handleCalendarChange}
                sessionIndex={index}
                address={addressList[index]}
              />
            );
          })}
      </>
    );
  }
);

export default CalanderSessionCordinator;
