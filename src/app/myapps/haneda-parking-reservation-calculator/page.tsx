'use client';
import { notFound, redirect } from 'next/navigation';

import { getSortedPostsMeta } from '@libs/posts';

import { PostCard } from '@components/PostCard';
import { Pagination } from '@components/Pagination';
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
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [arrivalDate, setArrivalDate] = useState(dayjs().add(7, 'days'));

  const canStartReservationDate = departureDate.subtract(43, 'days');
  const startReservationDate = departureDate.subtract(13, 'days');

  const canChangedStartReservationDate = arrivalDate.subtract(43, 'days');
  const changedStartReservationDate = arrivalDate.subtract(13, 'days');

  const canFinalStartReservationDate = departureDate.subtract(30, 'days');

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
          {format(canStartReservationDate)}
          の10時に予約します
        </p>
        <p>
          {format(startReservationDate)}
          から
          {format(departureDate)}
          で予約してください。時間は実際に駐車場へ到着する予定時刻くらいで大丈夫です。
        </p>
        <h2>2. 終了日をあわせる</h2>
        <p>
          {arrivalDate.diff(departureDate, 'days')}日後の、
          {format(canChangedStartReservationDate)}の10時に変更操作します
        </p>
        <p>
          {format(changedStartReservationDate)}
          から
          {format(arrivalDate)}
          で予約してください
        </p>
        <h2>3. 実際の予約期間にする</h2>
        <p>
          さらに
          {canFinalStartReservationDate.diff(
            canChangedStartReservationDate,
            'days'
          )}
          日後、
          {format(canFinalStartReservationDate)}の10時に変更操作します
        </p>
        <p>
          {format(departureDate)}
          から
          {format(arrivalDate)}
          で予約してください
        </p>
      </div>
    </section>
  );
}
