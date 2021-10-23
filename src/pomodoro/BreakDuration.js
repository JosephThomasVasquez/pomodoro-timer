import React from "react";
// SOLUTION: Import helper functions from utils folder for time display
import { minutesToDuration } from "../utils/duration/index";

const BreakDuration = ({ session, durations, handleTimerDuration }) => {
  // SOLUTION: Handler to decrease and increase break duration
  const handleBreakDuration = ({ target }) => {
    if (target.name === "decrease-break" && durations.breakDuration > 1) {
      const updateTime = {
        ...durations,
        breakDuration: durations.breakDuration - 1,
      };

      handleTimerDuration(updateTime);
    }

    if (target.name === "increase-break" && durations.breakDuration < 15) {
      const updateTime = {
        ...durations,
        breakDuration: durations.breakDuration + 1,
      };

      handleTimerDuration(updateTime);
    }
  };

  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            {/* TODO: Update this text to display the current break session duration */}
            {/* SOLUTION: Update break duration and format using minutesToDuration helper function */}
            Break Duration: {minutesToDuration(durations.breakDuration)}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
            {/* SOLUTION: Decreases break duration with onClick and disabled button based ons ession exists */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              name="decrease-break"
              onClick={handleBreakDuration}
              disabled={!session ? false : true}
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
            {/* SOLUTION: Increases break duration with onClick and disabled button based ons ession exists */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              name="increase-break"
              onClick={handleBreakDuration}
              disabled={!session ? false : true}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakDuration;
