import { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const spotUpdate = (weekday, day, variable) => {
    let spot = day.spots;
    if (weekday === day.name && variable === "REMOVE_SPOT") {
      return spot - 1;
    } else if (weekday === day.name && variable === "ADD_SPOT") {
      return spot + 1;
    } else {
      return spot;
    }
  };

  const updateSpots = (weekday, days, variable) => {
    if (variable === "REMOVE_SPOT") {
      const updatedStateDayArray = days.map(day => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable)
        };
      });
      return updatedStateDayArray;
    }
    if (variable === "ADD_SPOT") {
      const updatedStateDayArray = days.map(day => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable)
        };
      });
      return updatedStateDayArray;
    }
  };
  

   const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        const spotUpdate = updateSpots(state.day, state.days, "REMOVE_SPOT");
        setState({
          ...state,
          days: spotUpdate,
          appointments
        });
      });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const spotUpdate = updateSpots(state.day, state.days, "ADD_SPOT");
        setState({
          ...state,
          days: spotUpdate,
          appointments
        });
      });
  };
  return { state, setDay, bookInterview, cancelInterview };
}
