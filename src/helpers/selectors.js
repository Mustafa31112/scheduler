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
  let interviewerId;
  let temp = {};
  let result = null;

  if (interview) {
    interviewerId = interview.interviewer;
    temp = state.interviewers[`${interviewerId}`];

    result = {
      interviewer: {
        id: temp.id,
        name: temp.name,
        avatar: temp.avatar,
      },
      student: interview.student,
    }; 
    
    return result
  } else {
    return result;
  }
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

