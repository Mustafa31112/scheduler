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
    console.log("resuly", result)
    return result
  } else {
    return result;
  }
}
