import React from 'react';

import EventItem from './EventItem/EventItem';
import './EventList.css';

const eventList = props => {
  const events = props.events.map(event => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        place = {event.place}
        price={event.price}
        date={event.date}
        imageUrl = {event.imageUrl}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
        onDelete={props.onDelete}
      />
    );
  });

  return <ul className="event__list">{events}</ul>;
};

export default eventList;