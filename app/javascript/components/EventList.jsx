import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, NavLink } from 'react-router-dom';
/* 処理の全体の概要は、イベントオブジェクトの配列をeventsパラメータが受け取り、renderEventsでソート後、
各イベントリスト項目をレンダリング */
const EventList = ({ events }) => {
  const renderEvents = (eventArray) => {
    // 配列を日付の降順でソートしてから、各イベントのリスト項目をレンダリング
    eventArray.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
    return eventArray.map((event) => (
      <li key={event.id}>
        <NavLink to={`/events/${event.id}`}>
          {event.event_date}
          {' - '}
          {event.event_type}
        </NavLink>
      </li>
    ));
  };
  return (
    <section className="eventList">
      <h2>Events</h2>
      <ul>{renderEvents(events)}</ul>
    </section>
  );
};
  // イベントリストの型情報定義
EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    event_type: PropTypes.string,
    event_date: PropTypes.string,
    title: PropTypes.string,
    speaker: PropTypes.string,
    host: PropTypes.string,
    published: PropTypes.bool,
  })).isRequired,
};

export default EventList;
