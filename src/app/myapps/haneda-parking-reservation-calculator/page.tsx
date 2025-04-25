'use client';
import { useState } from 'react';
import dayjs from 'dayjs';

const PerPage = 10;

interface Props {
  params: { page: string };
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
    <section className="mx-auto max-w-2xl space-y-8 px-4 py-8">
      <div
        className="border-l-4 border-yellow-600 bg-yellow-950/30 p-4 text-yellow-600"
        role="alert"
      >
        <p className="font-bold">注意</p>
        <p>
          予約システムのルールや変更ポリシーをよく理解し、注意深く行動してください。この予約方法は予約システムの利用規約に反する可能性があるため、本データを参照したことによるトラブル等については一切責任を負えませんのでご了承ください。
        </p>
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="flex-1">
          <label
            htmlFor="departureDate"
            className="mb-1 block text-sm font-medium text-gray-200"
          >
            出発日
          </label>
          <input
            id="departureDate"
            type="date"
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={departureDate.format('YYYY-MM-DD')}
            onChange={handleDepartureDateChange}
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="arrivalDate"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            到着日
          </label>
          <input
            id="arrivalDate"
            type="date"
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={arrivalDate.format('YYYY-MM-DD')}
            onChange={handleArrivalDateChange}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-200">
            1. 最大予約日数分確保する
          </h2>
          <p className="mb-1">
            <span className="font-medium">{format(firstReservationDate)}</span>{' '}
            の <span className="font-medium">10時</span> に予約操作を行います。
          </p>
          <p>
            予約期間は{' '}
            <span className="font-medium">
              {format(firstReservationDepartureDate)}
            </span>{' '}
            から{' '}
            <span className="font-medium">
              {format(firstReservationArrivalDate)}
            </span>{' '}
            で予約してください。時間は実際に駐車場へ到着する予定時刻くらいで大丈夫です。
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-200">
            2. 終了日をあわせる（1回目の予約変更）
          </h2>
          <p className="mb-1">
            <span className="font-medium">
              {arrivalDate.diff(departureDate, 'days')}
            </span>{' '}
            日後の{' '}
            <span className="font-medium">
              {format(firstChangeReservationDate)}
            </span>{' '}
            の <span className="font-medium">10時</span> に変更操作を行います。
          </p>
          <p>
            予約期間を{' '}
            <span className="font-medium">
              {format(firstChangeDepartureDate)}
            </span>{' '}
            から{' '}
            <span className="font-medium">
              {format(firstChangeArrivalDate)}
            </span>{' '}
            に変更してください。
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-200">
            3. 実際の予約期間にする（2回目の予約変更）
          </h2>
          <p className="mb-1">
            さらに{' '}
            <span className="font-medium">
              {secondChangeReservationDate.diff(
                firstChangeReservationDate,
                'days'
              )}
            </span>{' '}
            日後の{' '}
            <span className="font-medium">
              {format(secondChangeReservationDate)}
            </span>{' '}
            の <span className="font-medium">10時</span> に変更操作を行います。
          </p>
          <p>
            予約期間を{' '}
            <span className="font-medium">
              {format(secondChangeDepartureDate)}
            </span>{' '}
            から{' '}
            <span className="font-medium">
              {format(secondChangeArrivalDate)}
            </span>{' '}
            に変更してください。
          </p>
        </div>
      </div>
    </section>
  );
}
