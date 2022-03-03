import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      newHistory.push(newMode);
      setHistory([...newHistory]);
    } else {

     
      setHistory((prev) => [...prev, newMode]);
      setMode(newMode);
    }

    setMode(newMode);
  }
  function back() {
    if (history.length < 2) {
      return;
    }

    setHistory(history.slice(0, history.length - 1))
    // const newHistory = history;
    // newHistory.pop();
    // setHistory([...newHistory]);
  }
  return { mode: history[history.length - 1], transition, back, history };
}
