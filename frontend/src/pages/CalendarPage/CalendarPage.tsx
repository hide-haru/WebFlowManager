import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import type { EventInput } from '@fullcalendar/core';

import styles from './CalendarPage.module.css';

type CalendarPageProps = {
    isOpen: boolean
};

export default function CalendarPage({isOpen}:CalendarPageProps) {

    const calendarRef = useRef<FullCalendar>(null);
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventInput[]>([]);

    //カレンダーページのリサイズ（SideMenu対策）
    useEffect(() => {
        setTimeout(() => {
            calendarRef.current?.getApi().updateSize();
        }, 350)
    }, [isOpen])

    //イベントデータの取得
    useEffect(() => {
        fetch("http://localhost:8080/api/getevent", {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            const calendarEvents = data.map((reservation: any) => ({
                id: reservation.id,
                title: reservation.title,
                start: reservation.startdatetime,
                end: reservation.enddatetime,
                extendedProps: {
                    description: reservation.description
                }
            }))
            setEvent(calendarEvents);
        })
    }, [])

    return (
        <div className={styles.calendarContainer}>
            <FullCalendar
                ref={calendarRef}               //リサイズ時の再ページ読み込み
                locale={jaLocale}               //日本語化
                contentHeight={700}

                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin
                ]}
                
                initialView="dayGridMonth"
                headerToolbar={{                //カレンダーヘッダーのレイアウト
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}

                selectable={true}
                select={(info) => {
                    // console.log(info.start);
                    // console.log(info.end);
                }}

                events={event}                 //イベントはテーブルに格納する
                eventContent={(eventInfo) => (
                    <div className={styles.event}>
                        <div>{eventInfo.event.start?.toLocaleTimeString("ja-JP", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            {eventInfo.event.title}
                        </div>
                        <div>詳細：{eventInfo.event.extendedProps.description}</div>
                    </div>
                )}

                dateClick={(info) => {
                    //新規イベント登録ページ
                    navigate("/reservationadd", {
                        state: {
                            date: info.dateStr
                        }
                    });
                }}

                eventClick={(info) => {
                    //イベント更新 ・ 削除ページ
                    navigate("/reservationdetail", {
                        state: {
                            id: info.event.id,
                            startTime: info.event.start,
                            endTime: info.event.end,
                            title: info.event.title,
                            description: info.event.extendedProps.description
                        }
                    });
                }}
            />
        </div>
    );
}
