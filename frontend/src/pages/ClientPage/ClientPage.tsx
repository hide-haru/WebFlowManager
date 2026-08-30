import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Table, {type Cell, type Row} from '../../components/Table'
import Button from '../../components/Button'
import styles from './ClientPage.module.css'


type id = number;

const columns: Cell[] = [
    { value: "コード"},
    { value: "会社名" },
    { value: "カテゴリ" },
    { value: "タイトル"},
    { value: "内容" },
    { value: "作業日時" },
    { value: "報告書作成者" },
    { value: "報告書" },
    { value: "作成日時" },
    { value: "更新日時" },
    { value: "編集" }
];

const worktimeConvert = (startdate: string, enddate: string) => {
    let result = ""
    const start_d = new Date(startdate);
    const end_d = new Date(enddate);
    result = `${start_d.getFullYear()}/${String(start_d.getMonth() + 1).padStart(2, "0")}/${String(start_d.getDate()).padStart(2, "0")} ${String(start_d.getHours()).padStart(2, "0")}:${String(start_d.getMinutes()).padStart(2, "0")}`;
    result += " ー "
    result += `${end_d.getFullYear()}/${String(end_d.getMonth() + 1).padStart(2, "0")}/${String(end_d.getDate()).padStart(2, "0")} ${String(end_d.getHours()).padStart(2, "0")}:${String(end_d.getMinutes()).padStart(2, "0")}`;

    return result;
};

const datetimeConvert = (date: string) => {
    const d = new Date(date);
    if (date === null) {
        return;
    }
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
};

export default function ClientPage() {

    const location = useLocation();
    const pageClientCode = location.state.clientCode;
    const pageClientName = location.state.clientName;
    const navigate = useNavigate();

    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {

        const params = new URLSearchParams({
            clientCode: pageClientCode
        });

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getclientdetaillist?${params}`,{
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            const rows: Row[] = data.map((detail: any) => ({
                cells: [
                    {value: detail.id},
                    {value: detail.clientName},
                    {value: detail.category},
                    {value: detail.title},
                    {value: detail.memo},
                    {value: worktimeConvert(detail.workStartTime, detail.workEndTime)},
                    {value: detail.name},
                    {value: detail.reportRelation == null ? "なし" : "あり"},
                    {value: datetimeConvert(detail.createdAt)},
                    {value: datetimeConvert(detail.updatedAt)},
                    {value: <Button name="編集" onClick={() => handleClick(Number(detail.id) as id)}/>},
                ]
            }))
            console.log(rows);
            setRows(rows);
        })
    }, [])


    const handleClick = (id: number) => {
        console.log("チケットコード：" + id);
        navigate("/clientdetailpageadd", {state:id})
    }


    const handleCreate = () => {
        navigate("/clientdetailpagenew", {state: {clientCode: pageClientCode, clientName: pageClientName}})
    }

    return (
        <div className={styles.clientPage}>
            <Button
                name="新規作成"
                onClick={handleCreate}
                className1={styles.button}
            />

            <div className={styles.table}>
                <Table
                    columns={columns}
                    rows={rows}
                />
            </div>
        </div>
    )
}
