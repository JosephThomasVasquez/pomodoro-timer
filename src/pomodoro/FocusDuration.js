import React from "react";
// SOLUTION: Import helper functions from utils folder for time display
import { minutesToDuration } from "../utils/duration/index";

const FocusDuration = ({ session, durations, handleTimerDuration }) => {
  // SOLUTION: Handler to decrease and increase focus duration
  const handleFocus = ({ target }) => {
    if (target.name === "decrease-focus" && durations.focusDuration > 5) {
      const updateTime = {
        ...durations,
        focusDuration: durations.focusDuration - 5,
      };

      handleTimerDuration(updateTime);
    }

    if (target.name === "increase-focus" && durations.focusDuration < 60) {
      const updateTime = {
        ...durations,
        focusDuration: durations.focusDuration + 5,
      };

      handleTimerDuration(updateTime);
    }
  };

  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* TODO: Update this text to display the current focus session duration */}
          {/* SOLUTION: Update focus duration and format using minutesToDuration helper function */}
          Focus Duration: {minutesToDuration(durations.focusDuration)}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          {/* SOLUTION: Decreases focus duration with onClick and disabled button based ons ession exists */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            name="decrease-focus"
            onClick={handleFocus}
            disabled={!session ? false : true}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
          {/* SOLUTION: Increases focus duration with onClick and disabled button based ons ession exists */}
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            name="increase-focus"
            onClick={handleFocus}
            disabled={!session ? false : true}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusDuration;
