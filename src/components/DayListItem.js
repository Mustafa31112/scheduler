import React from "react";
import "./DayListItem.scss"
import classNames from "classnames";



export default function DayListItem(props) {
  
  const dayClass = classNames('day-list__item', { 
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0 
  
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}



function formatSpots(spot) {
  if (spot === 0 || spot > 1) {
    return `${spot === 0 ? 'no' : spot} spots remaining`
  }
  return `${spot} spot remaining`
}
