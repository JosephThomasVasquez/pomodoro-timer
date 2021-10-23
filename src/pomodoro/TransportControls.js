import React from "react";
// SOLUTION: Imported classnames helper function to handle dynamic css styling
import classNames from "../utils/class-names";

const TransportControls = ({
  session,
  playPause,
  handleStopSession,
  isTimerRunning,
}) => {
  // SOLUTION: Handler to update session state in the parent pomodoro component
  const handleStop = () => {
    handleStopSession();
  };

  return (
    <div className="col">
      <div
        className="btn-group btn-group-lg mb-2"
        role="group"
        aria-label="Timer controls"
      >
        <button
          type="button"
          className="btn btn-primary"
          data-testid="play-pause"
          title="Start or pause timer"
          onClick={playPause}
        >
          <span
            className={classNames({
              oi: true,
              "oi-media-play": !isTimerRunning,
              "oi-media-pause": isTimerRunning,
            })}
          />
        </button>
        {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
        {/* TODO: Disable the stop button when there is no active session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="stop"
          title="Stop the session"
          disabled={session === null ? true : false} // SOLUTION: Ternary condition to set disabled state based on session exists
          onClick={handleStop} // SOLUTION: On click handler for Stop button
        >
          <span className="oi oi-media-stop" />
        </button>
      </div>
    </div>
  );
};

export default TransportControls;
