import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
 
  return (
    <ul>
      {
        props.days.map(day => ( 
          <DayListItem key = {day.name} {...day} selected = {props.value === day.name} setDay = {props.setDay}/>
        ))
        
      }
    </ul>
  )
}