/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Event = ({ events, onDelete }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  return (
    <div className="eventContainer">
      <h2>
        {event.event_date}
        {" - "}
        {event.event_type}
        <button
          className="delete"
          type="button"
          onClick={() => onDelete(event.id)}
        >
          イベント削除
        </button>
      </h2>
      <ul>
        <li>
          <strong>イベント類:</strong> {event.event_type}
        </li>
        <li>
          <strong>開催日付:</strong> {event.event_date}
        </li>
        <li>
          <strong>イベント名:</strong> {event.title}
        </li>
        <li>
          <strong>スピーカー:</strong> {event.speaker}
        </li>
        <li>
          <strong>開催者:</strong> {event.host}
        </li>
        <li>
          <strong>公開:</strong> {event.published ? "yes" : "no"}
        </li>
      </ul>
    </div>
  );
};

Event.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      event_type: PropTypes.string.isRequired,
      event_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Event;
