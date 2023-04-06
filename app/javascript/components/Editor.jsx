/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import EventList from './EventList';
import Event from './Event';
// eslint-disable-next-line import/no-named-as-default
import EventForm from './EventForm';

// 全体の処理の概要として、APIに接続し、イベントリストを取得し、それをEventListに渡してWebページ上に表示できるようにしている。
const Editor = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // const [isError, setIsError] = useState(false);
  useEffect(() => {
    // fetchData関数は、/api/eventsエンドポイントにFetchAPIでアクセスする。有効なJSONレスポンスを返したら、ステートのevents変数に保存する。
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/events');
        if (!response.ok) throw Error(response.statusText);
        // console.log(response);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      // 作成したイベントをDBに保存する処理
      const response = await window.fetch('/api/events.json', {
        method: 'POST',
        boduy: JSON.stringify(newEvent),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.status.Text);

      const savedEvent = await response.json();
      const newEvents = [...events, savedEvent];
      setEvents(newEvents);
      window.alert('イベントを追加しました！');
      navigate(`/events/${savedEvent.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // イベント削除の処理をするファンクション
  const deleteEvent = async (eventID) => {
    const sure = window.confirm('本当に削除しますか？');

    if (sure) {
      try {
        const response = await window.fetch(`/api/events/${eventID}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        window.alert('イベントを削除しました!');
        navigate('/events');
        setEvents(events.filter((event) => event.id !== eventID));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // データのフェッチが終了したら、isLoadingをfalseに設定される。
  return (
    <>
      <Header />
      <div className="grid">
        {isLoading ? (
          // eslint-disable-next-line react/no-unknown-property
          <p className="loading">Loading...</p>
        ) : (
          <>
            <EventList events={events} />

            <Routes>
              <Route path="new" element={<EventForm onSave={addEvent} />} />
              <Route path=":id" element={<Event events={events} onDelete={deleteEvent} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};
export default Editor;
