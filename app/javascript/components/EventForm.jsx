/* eslint-disable no-shadow */
import React, { useState, useRef, useEffect } from "react";
import Pikaday from "pikaday";
import PropTypes from "prop-types";

import "pikaday/css/pikaday.css";
// eslint-disable-next-line no-unused-vars
import { formatDate, isEmptyObject, validateEvent } from "../helpers/helpers";

const EventForm = ({ onSave }) => {
  const [event, setEvent] = useState({
    event_type: "",
    event_date: "",
    title: "",
    speaker: "",
    host: "",
    published: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);

  const updateEvent = (key, value) => {
    setEvent((preEvent) => ({ ...preEvent, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    // updateEvent(name, value);
    setEvent({ ...event, [name]: value });
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>以下の項目のエラーにより、イベントの登録ができませんでした。</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };
  // useEffectで、コンポーネントがマウントされたときに、datepickerを初期化
  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent("event_date", formattedDate);
      },
    });
    // クリーンアップ用の関数を返す
    return () => p.destroy();
  }, []);

  // ユーザー入力をバリデーションし、不足がある場合は、エラーメッセージを出力。正常な場合は、イベントをコンソールログに出力
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(event);
    }
    console.log(event);
  };

  return (
    <section>
      {renderErrors()}

      <h2>新規イベント追加</h2>
      <form className="eventForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_type">
            <strong>イベント類:</strong>
            <input
              type="text"
              id="event_type"
              name="event_type"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>開催日付:</strong>
            <input
              type="text"
              id="event_date"
              name="event_date"
              ref={dateInput}
              autoComplete="off"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>イベント名:</strong>
            <textarea
              cols="30"
              rows="10"
              id="title"
              name="title"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>スピーカー:</strong>
            <input
              type="text"
              id="speaker"
              name="speaker"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>開催者:</strong>
            <input
              type="text"
              id="host"
              name="host"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>公開:</strong>
            <input
              type="checkbox"
              id="published"
              name="published"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">登録</button>
        </div>
      </form>
    </section>
  );
};

export default EventForm;

EventForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};
