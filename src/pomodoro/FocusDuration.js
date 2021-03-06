import React from "react";
// SOLUTION: Import helper functions from utils folder for time display
import { minutesToDuration } from "../utils/duration/index";

const FocusDuration = ({ session, durations, handleTimerDuration }) => {
  // SOLUTION: Handlers to decrease and increase focus duration
  const handleDecreaseFocus = ({ currentTarget }) => {
    
    if (!currentTarget.dataset.testid || currentTarget.dataset.testid === undefined)
      return null;

    if (
      currentTarget.dataset.testid === "decrease-focus" &&
      durations.focusDuration > 5
    )
      handleTimerDuration({
        ...durations,
        focusDuration: durations.focusDuration - 5,
      });
  };

  const handleIncreaseFocus = ({ currentTarget }) => {
    if (!currentTarget.dataset.testid || currentTarget.dataset.testid === undefined)
      return null;

    if (
      currentTarget.dataset.testid === "increase-focus" &&
      durations.focusDuration < 60
    )
      handleTimerDuration({
        ...durations,
        focusDuration: durations.focusDuration + 5,
      });
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
            onClick={handleDecreaseFocus}
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
            onClick={handleIncreaseFocus}
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
