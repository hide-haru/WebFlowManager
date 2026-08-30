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

    const [hoverEvent, setHoverEvent] = useState<{
        title: string;
        start: string;
        end: string;
        extendedProps: {
            description: string
        },
        x: number;
        y: number;
    } | null>(null)

    const handleEventMouseEnter = (info: any) => {
        const rect = info.el.getBoundingClientRect();

        const modalWidth = 250;
        const modalHeight = 150;
        const margin = 10;

        // 基本はイベントの右側
        let x = rect.right + margin;
        let y = rect.top;

        //右側に表示
        if (x + modalWidth > window.innerWidth - margin) {
            //右に入らない → 左側
            x = rect.left - modalWidth - margin;
        }

        //左にも入らない場合 → 画面左端に合わせる
        if (x < margin) {
            x = margin;
        }
        //下側にはみ出す場合
        if (y + modalHeight > window.innerHeight) {
            y = window.innerHeight - modalHeight - margin;
        }

        //上側にはみ出す場合
        if (y < margin) {
            y = margin;
        }

        setHoverEvent({
            title: info.event.title,
            start: info.event.start?.toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"}) ?? "",
            end: info.event.end?.toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"}) ?? "",
            extendedProps: {
                description: info.event.extendedProps.description
            },
            x,
            y,
        });
    };

    const handleEventMouseLeave = () => {
        setHoverEvent(null);
    };

    //イベントデータの取得
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getevent`, {
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
                select={() => {
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

                eventMouseEnter={handleEventMouseEnter}
                eventMouseLeave={handleEventMouseLeave}

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
            {hoverEvent && (
                <div
                    className={styles.eventModal}
                    style={{
                        left: hoverEvent.x,
                        top: hoverEvent.y,
                    }}
                >
                    <div>{hoverEvent.title}</div>
                    <div>詳細：{hoverEvent.extendedProps.description}</div>
                    <div>開始：{hoverEvent.start}</div>
                    <div>終了：{hoverEvent.end}</div>
                </div>
            )}
        </div>
    );
}
