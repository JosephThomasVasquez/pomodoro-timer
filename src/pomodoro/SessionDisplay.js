import React from "react";
// SOLUTION: Import helper functions from utils folder for time display
import { minutesToDuration, secondsToDuration } from "../utils/duration/index";

const SessionDisplay = ({ session, durations }) => {
  // Handles progressbar conversion from miliseconds to percentage of focus or break session
  const handleProgressBar = (durationType) => {
    const getMins = session.timeRemaining / 60;

    if (durationType === "Focusing") {
      return 100 - (getMins / durations.focusDuration) * 100;
    } else if (durationType === "On Break") {
      return 100 - (getMins / durations.breakDuration) * 100;
    } else {
      return 0;
    }
  };

  return (
    session && (
      <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        {/* SOLUTION: Renders session Display only if session exists */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            {/* SOLUTION: Ternary condition for session exists and session type i.e. Focusing or On Break */}
            <h2 data-testid="session-title">
              {session && session.label} for{" "}
              {minutesToDuration(
                session.label === "Focusing"
                  ? durations.focusDuration
                  : durations.breakDuration
              )}{" "}
              minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            {/* SOLUTION: Shows timeRemaining if session exists */}
            <p className="lead" data-testid="session-sub-title">
              {session ? secondsToDuration(session.timeRemaining) : null}{" "}
              remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              {/* SOLUTION: run handleProgressBar based on session type */}
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={handleProgressBar(session.label)} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${handleProgressBar(session.label)}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SessionDisplay;
