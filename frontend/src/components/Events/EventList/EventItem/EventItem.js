import React from 'react';
import './EventItem.css';

const EventItem = (props) => (
  <div className="event-item">
    <div className="event-item__image">
      <img src={props.imageUrl} alt={props.title} />
    </div>
    <div className="event-item__content">
      <h2>{props.title}</h2>
      <h3>${props.price} - {new Date(props.date).toLocaleDateString()}</h3>
      <p>{props.description}</p>
    </div>
    <div className="event-item__actions">
      {props.userId === props.creatorId ? (
        <>
          
          <button className="btn" onClick={props.onDelete.bind(this,props.eventId)}>Delete</button>
          <p>You are the owner of this event.</p>
        </>
      ) : (
        <button
          className="btn"
          onClick={() => props.onDetail(props.eventId, props.place, props.imageUrl)}
        >
          View Details
        </button>
      )}
    </div>
  </div>
);

export default EventItem;