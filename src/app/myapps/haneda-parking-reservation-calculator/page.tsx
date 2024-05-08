'use client';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import dayjs from 'dayjs';

const PerPage = 10;

interface Props {
  params: {
    page: string;
  };
}

function format(day: dayjs.Dayjs) {
  return day.format('YYYY年M月D日');
}

export default function HanedaParkingReservationCalculatorPage({
  params,
}: Props) {
  const [departureDate, setDepartureDate] = useState(dayjs()); // 設定してもらう出発日、デフォルトを今日ににしておく
  const [arrivalDate, setArrivalDate] = useState(dayjs().add(7, 'days')); // 設定してもらう到着日、デフォルトを7日後にしておく

  // 最初の予約
  const firstReservationDate = departureDate.subtract(43, 'days'); // 最初の予約が可能になる日
  const firstReservationDepartureDate = departureDate.subtract(13, 'days'); // 最初の予約をするときに設定する出発日
  const firstReservationArrivalDate = departureDate; // 最初の予約をするときに設定する到着日 これを本来の出発日にする

  // 1回目の予約変更
  const firstChangeReservationDate = arrivalDate.subtract(43, 'days'); // 1回目の予約変更を行う日
  const firstChangeDepartureDate = arrivalDate.subtract(13, 'days'); // 1回目の予約変更を行うときに設定する出発日
  const firstChangeArrivalDate = arrivalDate; // 1回目の予約変更を行うときに設定する到着日 これを本来の到着日にする

  // 2回目の予約変更（一般人が行うのと同じ結果、本来の日付になる）
  const secondChangeReservationDate = departureDate.subtract(30, 'days');
  const secondChangeDepartureDate = departureDate;
  const secondChangeArrivalDate = arrivalDate;

  const handleDepartureDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartureDate(dayjs(event.target.value));
  };

  const handleArrivalDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setArrivalDate(dayjs(event.target.value));
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      予約システムのルールや変更ポリシーをよく理解し、注意深く行動してください。この予約方法は予約システムの利用規約に反する可能性があるため、本データを参照したことによるトラブル等については一切責任を負えませんのでご了承ください。
      <input
        type="date"
        value={departureDate.format('YYYY-MM-DD')}
        onChange={handleDepartureDateChange}
      />
      <input
        type="date"
        value={arrivalDate.format('YYYY-MM-DD')}
        onChange={handleArrivalDateChange}
      />
      <div>
        <h2>1. 最大予約日数分確保する</h2>
        <p>
          {format(firstReservationDate)}
          の10時に予約します
        </p>
        <p>
          {format(firstReservationDepartureDate)}
          から
          {format(firstReservationArrivalDate)}
          で予約してください。時間は実際に駐車場へ到着する予定時刻くらいで大丈夫です。
        </p>
        <h2>2. 終了日をあわせる（1回目の予約変更）</h2>
        <p>
          {arrivalDate.diff(departureDate, 'days')}日後の、
          {format(firstChangeReservationDate)}の10時に変更操作します
        </p>
        <p>
          {format(firstChangeDepartureDate)}
          から
          {format(firstChangeArrivalDate)}
          で予約してください
        </p>
        <h2>3. 実際の予約期間にする（2回目の予約変更）</h2>
        <p>
          さらに
          {secondChangeReservationDate.diff(firstChangeReservationDate, 'days')}
          日後、
          {format(secondChangeReservationDate)}の10時に変更操作します
        </p>
        <p>
          {format(secondChangeDepartureDate)}
          から
          {format(secondChangeArrivalDate)}
          で予約してください
        </p>
      </div>
    </section>
  );
}
