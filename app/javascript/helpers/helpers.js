import { error } from './notifications';

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateEvent = (event) => {
  const errors = {};

  if (event.event_type === '') {
    errors.event_type = 'イベントタイプを入力してください。';
  }

  if (event.event_date === '') {
    errors.event_date = '有効な日付を入力してください。';
  }

  if (event.title === '') {
    errors.title = 'イベントのタイトルを入力してください。';
  }

  if (event.speaker === '') {
    errors.speaker = 'スピーチする人の名前を入力してください。';
  }

  if (event.host === '') {
    errors.host = '主催者の名前を入力してください。';
  }

  return errors;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.error(err);
};
// Dateオブジェクトを受け取って、YYYY-MM_DD形式の文字を返す
export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY} - ${MM} - ${DD}`;
};
