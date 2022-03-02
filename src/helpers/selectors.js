export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const dayDetails = state.days.find((element) => element.name === day);
  if (!dayDetails) {
    return [];
  }
  const appointmentIds = dayDetails.appointments;
  const appointmentsForDay = appointmentIds.map((appointmentId) => {
    return state.appointments[appointmentId];
  });
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  let result = null;

  if (!interview) {
    return result;
  }
  const interviewerId = interview.interviewer;
  const interviewerObj = state.interviewers[interviewerId];
  result = { ...interview, interviewer: interviewerObj };
  return result;
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const dayDetails = state.days.find((element) => element.name === day);
  if (!dayDetails) {
    return [];
  }
  const interviewerIds = dayDetails.interviewers;
  const interviewersForDay = interviewerIds.map((appointmentId) => {
    return state.interviewers[appointmentId];
  });
  return interviewersForDay;
}
