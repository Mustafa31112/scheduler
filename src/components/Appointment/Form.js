import React, { useState } from 'react';

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  function reset() {
    setStudent("") 
    setInterviewer("")
  }
  function cancel(){
    reset()
    props.onCancel()
  }
  function save() {
    props.onSave(student, interviewer)
  }
  return (<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      
      <input
        value={student}
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setStudent(event.target.value)}
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList 
    interviewerId={interviewer}
    setInterviewer={setInterviewer}
    interviewers={props.interviewers}
    />
     
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={save}>Save</Button>
    </section>
  </section>
</main>)
}
