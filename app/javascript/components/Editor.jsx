/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import EventList from './EventList';
import Event from './Event';
// 全体の処理の概要として、APIに接続し、イベントリストを取得し、それをEventListに渡してWebページ上に表示できるようにしている。
const Editor = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  // データのフェッチが終了したら、isLoadingをfalseに設定される。
  return (
    <>
      <Header />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <EventList events={events} />

          <Routes>
            <Route path=":id" element={<Event events={events} />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default Editor;
