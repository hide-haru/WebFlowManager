import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

import TextInput from '../../components/TextInput'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'

import styles from './ReservationDetailPage.module.css'

function dateText(StartDate: Date) {
    return StartDate.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}

function timeText(StartDate: Date) {
    return StartDate.toLocaleTimeString("ja-JP", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false
    });
}

export default function ReservationDetailPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const isEdit = location.pathname.includes("reservationdetail");

    const [id] = useState<number | null>(
        location.state?.id ?? null
    );
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!location.state) {
            navigate("/calendar");
            return;
        }

        var StartDateTime, EndDateTime;
        //isEdit: 更新
        if (!isEdit) {
            StartDateTime = new Date(location.state.date);
            EndDateTime = new Date(location.state.date);
        } else {
            StartDateTime = new Date(location.state.startTime);
            EndDateTime = new Date(location.state.endTime);
            setTitle(location.state.title);
            setDescription(location.state.description);
        }

        setStartDate(dateText(StartDateTime));
        setStartTime(timeText(StartDateTime));
        setEndDate(dateText(EndDateTime));
        setEndTime(timeText(EndDateTime));
    }, [])


    const handleEdit = async() => {
        
        const formSend = {
            id: Number(id),
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            title: title,
            description: description
        };

        if (!isEdit) {
            //POST:新規
            const response = await fetch(
                `http://localhost:8080/api/postnewevent`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formSend),
                    credentials: "include"
                }
            );

            const data = await response.json();
            if (data.success) {
                alert(data.message);
            }
        } else {
            //POST:更新
            const response = await fetch(
                `http://localhost:8080/api/postaddevent`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formSend),
                    credentials: "include"
                }
            );

            const data = await response.json();
            if (data.success) {
                alert(data.message);
            }
        }
    }


    const handleDelete = () => {

        const formSend = {
            id: Number(id),
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            title: title,
            description: description
        };

        fetch("http://localhost:8080/api/deleteevent",{
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formSend)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
    }

    return (
        <div className={styles.reservationDetailPage}>
            <h2>{!isEdit ? "【新規】予約フォーム" : "【編集】予約フォーム"}</h2>
            <div>
                <form className={styles.form}>
                    <div className={styles.container}>
                        <TextInput
                            label="開始日時"
                            name="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className1={styles.label}
                            className3={styles.input}
                        />
                        <TextInput
                            name="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className3={styles.input}
                        />
                    </div>

                    <div className={styles.container}>
                        <TextInput
                            label="終了日時"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className1={styles.label}
                            className3={styles.input}
                        />
                        <TextInput
                            name="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className3={styles.input}
                        />
                    </div>

                    <div className={styles.container}>
                        <div className={styles.container2}>
                            <TextInput
                                label="タイトル"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className1={styles.label}
                                className3={styles.input}
                            />
                            <Textarea
                                label="詳細"
                                name="description"
                                value={description}
                                rows={2}
                                onChange={(e) => setDescription(e.target.value)}
                                className1={styles.label}
                                className3={styles.textarea}
                            />
                        </div>

                    </div>

                    <div className={styles.container}>
                        <div className={styles.buttonArea}>
                            <Button
                            name={!isEdit? "登録" : "更新"}
                            onClick={handleEdit}
                            />
                            {!isEdit ?
                                ""
                                :
                                <Button
                                    name="削除"
                                    className1={styles.button}
                                    onClick={handleDelete}
                                />
                            }
                            
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    )
};
