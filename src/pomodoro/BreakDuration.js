import React from "react";
// SOLUTION: Import helper functions from utils folder for time display
import { minutesToDuration } from "../utils/duration/index";

const BreakDuration = ({ session, durations, handleTimerDuration }) => {
  // SOLUTION: Handlers to decrease and increase break duration
  const handleDecreaseBreak = ({ currentTarget }) => {
    if (!currentTarget.dataset.testid || currentTarget.dataset.testid === undefined)
      return null;

    if (
      currentTarget.dataset.testid === "decrease-break" &&
      durations.breakDuration > 1
    )
      handleTimerDuration({
        ...durations,
        breakDuration: durations.breakDuration - 1,
      });
  };

  const handleIncreaseBreak = ({ currentTarget }) => {
    if (!currentTarget.dataset.testid || currentTarget.dataset.testid === undefined)
      return null;

    if (
      currentTarget.dataset.testid === "increase-break" &&
      durations.breakDuration < 15
    )
      handleTimerDuration({
        ...durations,
        breakDuration: durations.breakDuration + 1,
      });
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
              onClick={handleDecreaseBreak}
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
              onClick={handleIncreaseBreak}
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
