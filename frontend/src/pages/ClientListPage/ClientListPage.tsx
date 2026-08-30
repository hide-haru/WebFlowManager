import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import Table, {type Cell, type Row} from '../../components/Table'

import styles from './ClientListPage.module.css'

//テーブルカラム
const columns: Cell[] = [
    { value: "コード", align:"center"},
    { value: "会社名" },
    { value: "担当者" },
    { value: "電話番号"},
    { value: "住所" },
    { value: "契約日" },
    { value: "更新日時" }
];

type SearchArea = {
    companyName: string;
    pic: string;
}

type NewClient = {
    companyName: string;
    pic: string;
    tel: string;
    address: string;
    contractDay: string
}

const dateConvert = (date: string) => {
    const d = new Date(date);

    return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, "0")}月${String(d.getDate()).padStart(2, "0")}日`;
};

const datetimeConvert = (date: string) => {
    const d = new Date(date);

    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
};


export default function ClientListPage() {

    const navigate = useNavigate();

    const [searchArea, setSearchArea] = useState<SearchArea>({companyName: "", pic: ""});
    const [isAdding, setIsAdding] = useState(false);
    const [rows, setRows] = useState<Row[]>([]);
    
    const [newClient, setNewClient] = useState<NewClient>({
        companyName: "",
        pic: "",
        tel: "",
        address: "",
        contractDay: ""
    });

    const newRow: Row = {
        cells: [
            { value: "" },
            { value: newClient.companyName, isInput: true },
            { value: newClient.pic, isInput: true },
            { value: newClient.tel, isInput: true },
            { value: newClient.address, isInput: true },
            { value: newClient.contractDay, isInput: true },
            { value: "" }
        ]
    };

    const displayRows = isAdding ? [newRow, ...rows] : rows;

    //ページ読み込み
    useEffect(() => {
        const params = new URLSearchParams({
            companyName: searchArea.companyName,
            pic: searchArea.pic
        });

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getclientlist?${params}`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            const rows: Row[] = data.map((client: any) => ({
                cells: [
                    {value: client.clientCode, align:"center"},
                    {value: client.clientName},
                    {value: client.pic},
                    {value: client.tel},
                    {value: client.address},
                    {value: dateConvert(client.contractDay)},
                    {value: datetimeConvert(client.updatedAt)}
                ]
            }))

            setRows(rows);
        })
    }, [searchArea])

    
    return (
        <div className={styles.clientListPage}>
            <div className={styles.searchArea}>

                <span>ー検索エリアー</span>

                <div className={styles.searchBox}>
                    <TextInput
                        label="会社名"
                        name="companyName"
                        value={searchArea.companyName}
                        onChange={(e) =>
                            setSearchArea({
                                ...searchArea,
                                companyName: e.target.value
                            })
                        }
                    />

                    <TextInput
                        label="担当者"
                        name="pic"
                        value={searchArea.pic}
                        onChange={(e) =>
                            setSearchArea({
                                ...searchArea,
                                pic: e.target.value
                            })
                        }
                    />
                </div>
            </div>

            <div className={styles.clientList}>
                <div className={styles.boxTtitle}>
                    <span>ークライアント一覧ー</span>
                    <Button
                        name={isAdding ? "更新" : "新規作成"}
                        onClick={() => setIsAdding(!isAdding)}
                    />
                </div>
                <Table
                    columns={columns} rows={displayRows}
                    onRowClick={(row) => {
                        navigate("/clientpage", {state: {clientCode: row.cells[0].value, clientName: row.cells[1].value}})
                    }}
                    onCellChange={(rowIndex, cellIndex, value) => {
                        if (rowIndex !== 0) return;

                        if (cellIndex === 1) {
                            setNewClient({
                                ...newClient,
                                companyName: value
                            });
                        }

                        if (cellIndex === 2) {
                            setNewClient({
                                ...newClient,
                                pic: value
                            });
                        }

                        if (cellIndex === 3) {
                            setNewClient({
                                ...newClient,
                                tel: value
                            });
                        }

                        if (cellIndex === 4) {
                            setNewClient({
                                ...newClient,
                                address: value
                            });
                        }
                    }}
                />
            </div>
        </div>
    );
}
