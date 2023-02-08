import React, {useState, useEffect} from "react";
import Header from './Header';
import EventList from './EventList';
// 全体の処理の概要として、APIに接続し、イベントリストを取得し、それをEventListに渡してWebページ上に表示できるようにしている。
const Editor = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => { // fetchData関数は、/api/eventsエンドポイントにFetchAPIでアクセスする。有効なJSONレスポンスを返したら、ステートのevents変数に保存する。
        try {
          const response = await window.fetch('/api/events');
          if (!response.ok) throw Error(response.statusText);
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
        {isError && <p>Something went wrong. Check the console.</p>}
        {isLoading ? <p>Loading...</p> : <EventList events={events} />}
      </>
    );
  };
  
  export default Editor;
