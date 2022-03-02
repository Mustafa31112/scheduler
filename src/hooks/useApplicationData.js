import  { useState, useEffect } from "react";
//import Appointment from "components/Appointment";
import axios from "axios";
import "components/Application.scss";




export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState({
        ...state,
        appointments,
      });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState({
        ...state,
        appointments,
      });
    });
  }
  // const dailyAppointments = getAppointmentsForDay(state, state.day);
  // const schedule = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //       interviewers={getInterviewersForDay(state, state.day)}
  //       bookInterview={bookInterview}
  //       cancelInterview={cancelInterview}
  //     />
  //   );
  // });
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
      //const [first, second, third] = all;

      
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
}
