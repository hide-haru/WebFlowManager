import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import TextInput from '../../components/TextInput'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'

import styles from './ClientDetailPage.module.css'

type Data = {
    id: string;
    clientCode: number;
    category: string;
    clientName: string;
    title: string;
    memo: string;
    workStartTime: string;
    workEndTime: string;
    name: string;
    reportRelation: number;
    createdAt: string;
    updatedAt: string;
}

const datetimeConvert = (date: string) => {
    const d = new Date(date);
    if (date == null) {
        return;
    }
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};


export default function ClientDetailPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const addView = location.pathname.includes("pageadd");
    const [data, setData] = useState<Data | null>(null);
    const executedRef = useRef(false);

    useEffect(() => {
        if (executedRef.current) {
            return;
        }

        executedRef.current = true;

        if (!addView) {
            const newData ={
                id: "",
                clientCode: location.state.clientCode,
                category: "",
                clientName: String(location.state.clientName),
                title: "",
                memo: "",
                workStartTime: "",
                workEndTime: "",
                name: "",
                reportRelation: 0,
                createdAt: "",
                updatedAt: "",
            };

            setData(newData);

            fetch(`${import.meta.env.VITE_API_BASE_URL}/api/newclientdetail`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData({
                    ...data
                    ,clientName: String(location.state.clientName),
                });
            });
            
            return;
        }

        const params = new URLSearchParams({
            detailId: String(location.state)
        });
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getclientdetail?${params}`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            setData({
                ...data,
                workStartTime: datetimeConvert(data.workStartTime),
                workEndTime: datetimeConvert(data.workEndTime),
                createdAt: datetimeConvert(data.createdAt),
                updatedAt: datetimeConvert(data.updatedAt),
            });

            console.log(data);
        })

    }, [])


    const handleEdit = () => {

        const convertData = {
            ...data,
            workStartTime: data?.workStartTime
                ? data.workStartTime.replace(/\//g, "-").replace(" ", "T").length === 16
                    ? data.workStartTime.replace(/\//g, "-").replace(" ", "T") + ":00"
                    : data.workStartTime.replace(/\//g, "-").replace(" ", "T")
                : "",
            workEndTime: data?.workEndTime
                ? data.workEndTime.replace(/\//g, "-").replace(" ", "T").length === 16
                    ? data.workEndTime.replace(/\//g, "-").replace(" ", "T") + ":00"
                    : data.workEndTime.replace(/\//g, "-").replace(" ", "T")
                : ""
        };

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/postclientdetailadd`, {
            credentials: "include",
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(convertData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            if (data.success) {
                navigate("/clientlist");
            }
        })
    }


    const handleDelete = () => {
        console.log(data?.id);
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/postclientdetaildelete`, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: Number(data?.id)})
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            if (data.success) {
                navigate("/clientlist");
            }
        })
    }

    return(
        <div className={styles.detailPage}>
            <h2>{!addView ? "新規" : "編集"}</h2>

            <div className={styles.containts}>
                <div className={styles.section}>
                    {!addView ?
                        ""
                        :
                        <div className={styles.flexArea}>
                            <span className={styles.label}>id</span>
                            <span className={styles.box}>{data?.id}</span>
                        </div>
                    }
                    
                    <div>
                        <span className={styles.label}>クライアント名</span>
                        <span className={styles.box}>{data?.clientName}</span>
                    </div>                
                </div>
                <div className={styles.section}>
                    <div>
                        <span className={styles.label}>カテゴリ</span>
                        <select name="category" value={data?.category ?? ""} onChange={(e) => setData(prev => prev? {...prev, category: e.target.value} : null)}>
                            <option value="">カテゴリを選択</option>
                            <option value="往訪作業">往訪作業</option>
                            <option value="作業報告">作業報告</option>
                            <option value="契約">契約</option>
                        </select>
                    </div>
                </div>
                <div className={styles.section}>
                    <TextInput
                        label="タイトル"
                        name="title"
                        value={data?.title ? data?.title : ""}
                        onChange={(e) => setData(prev => prev ? {...prev, title: e.target.value} : null)}
                        className1={styles.label}
                        className3={styles.input}
                    />
                </div>
                <div className={styles.section}>
                    <Textarea
                        label="内容"
                        name="memo"
                        value={data?.memo ? data?.memo : ""}
                        onChange={(e) => setData(prev => prev ? {...prev, memo: e.target.value} : null)}
                        className1={styles.label}
                        className3={styles.textarea}
                    />
                </div>
                <div className={styles.section}>
                    <div>
                        <TextInput
                            label="開始時間"
                            name="workStartTime"
                            value={data?.workStartTime ? data?.workStartTime : ""}
                            onChange={(e) => setData(prev => prev ? {...prev, workStartTime: e.target.value} : null )}
                            className1={styles.label}
                            className3={styles.input}
                        />
                    </div>
                    
                    <div>
                        <TextInput
                            label="終了時間"
                            name="workEndTime"
                            value={data?.workEndTime ? data?.workEndTime : ""}
                            onChange={(e) => setData(prev => prev ? {...prev, workEndTime: e.target.value} : null)}
                            className1={styles.label}
                            className3={styles.input}
                        />
                    </div>
                    
                </div>
                <div className={styles.section}>
                    <span className={styles.label}>報告者</span>
                    <span  className={styles.box}>{data?.name ? data?.name : ""}</span>
                    {addView &&
                        (data?.reportRelation == null ?
                            <a onClick={() => navigate("/reportinput", {state: data?.id})} className={styles.a}>報告書を作成する</a>
                            :
                            <Button
                                name="報告書"
                                onClick={() => {navigate("/calendar", {state: data?.reportRelation})}}
                            />
                        )
                    }
                    
                </div>
                <div className={styles.section}>
                    {!addView ?
                        ""
                        :
                        <div>
                            <div>
                                <span className={styles.label}>作成日時：</span>
                                <span>{data?.createdAt}</span>
                            </div>
                            <div>
                                <span className={styles.label}>更新日時：</span>
                                <span>{data?.updatedAt}</span>
                            </div>
                        </div>
                    }
                    
                </div>

                <div className={styles.section}>
                    {!addView ?
                        <Button
                            name="作成"
                            onClick={handleEdit}
                            className1={styles.button}
                        />
                        :
                        <div>
                            <Button
                                name="更新"
                                onClick={handleEdit}
                                className1={styles.button}
                            />
                            <Button
                                name="削除"
                                onClick={handleDelete}
                                className1={styles.button}
                            />
                        </div>
                        }
                    
                </div>
            </div>
        </div>
    )
}
