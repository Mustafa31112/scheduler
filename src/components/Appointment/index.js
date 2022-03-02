import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    console.log("name", name);
    if (name === null || name === "") {
      console.log("no name provided");
      back();
      return;
    }
    if (interviewer === null) {
      console.log("no interviewer selected");
      back();
      return;
    }
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function onDelete() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === CREATE && (
        <Form onCancel={back} interviewers={props.interviewers} onSave={save} />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={onDelete} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          
      {mode === EDIT && <Form onCancel={back} interviewers={props.interviewers} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id} />}

    </article>
  );
}
