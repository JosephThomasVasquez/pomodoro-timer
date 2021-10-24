import React, { useState } from "react";
import useInterval from "../utils/useInterval";

// SOLUTION: Imported child components
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
import TransportControls from "./TransportControls";
import SessionDisplay from "./SessionDisplay";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.

  // SOLUTION: Make an object of initital default focus and break duration values
  const defaultDurations = {
    focusDuration: 25,
    breakDuration: 5,
  };

  // SOLUTION: Set state for focus and break durations with initial values
  const [timerDurations, setTimerDurations] = useState(defaultDurations);

  // SOLUTION: Update timer durations state so it can be passed as props to child components
  const handleTimerDurations = (newDuration) => {
    setTimerDurations(newDuration);
  };

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(
          nextSession(
            timerDurations.focusDuration,
            timerDurations.breakDuration
          )
        );
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            // SOLUTION: set focus timer to use value from timerDurations.focusDuration state
            return {
              label: "Focusing",
              timeRemaining: timerDurations.focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  // SOLUTION: Handler to reset session and timerRunning state to default
  const handleStopSession = () => {
    setIsTimerRunning(false);
    setSession(null);
  };

  return (
    <div className="pomodoro">
      <div className="row">
        {/* SOLUTION: Pulled out the Focus Duration DOM elements into its own FocusDuration component */}
        <FocusDuration
          session={session}
          durations={timerDurations}
          handleTimerDuration={handleTimerDurations}
        />
        {/* SOLUTION: Pulled out the Break Duration DOM elements into its own BreakDuration component */}
        <BreakDuration
          session={session}
          durations={timerDurations}
          handleTimerDuration={handleTimerDurations}
        />
      </div>
      <div className="row">
        {/* SOLUTION: Pulled out the Play & Stop Controls DOM elements into its own TransportControls component */}
        <TransportControls
          session={session}
          playPause={playPause}
          handleStopSession={handleStopSession}
          isTimerRunning={isTimerRunning}
        />
      </div>
      {/* SOLUTION: Pulled out the Session Display DOM elements into its own SessionDisplay component */}
      <SessionDisplay session={session} durations={timerDurations} />
    </div>
  );
}

export default Pomodoro;
