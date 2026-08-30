import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './ReportInputPage.module.css'

import type {
    Element,
    ReportLayout
} from '../types/report'

type selectReport = {
    reportCode: number;
    reportName: string;
}

export default function ReportInputPage() {

    const location = useLocation();
    const detailId = location.state;
    const [elements, setElements] = useState<Element[]>([]);

    //レポート一覧
    const [layouts, setLayouts] = useState<ReportLayout[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getreportlayout`,{
            credentials: "include"
        })
        .then(reponse => reponse.json())
        .then(data => {
            if (data) {
                const reports = data.map((report: any) => ({
                    reportCode: report.reportCode,
                    reportName: report.reportName
                }))
                console.log(reports);
                setLayouts(reports);
            }
        })
    }, [])

    const [selectReport, setSelectReport] = useState<selectReport>();

    //レポートレイアウト
    const [selectedLayout, setSelectedLayout] = useState<ReportLayout | null>(null);
    //入力値保存
    const [inputValues, setInputValues] = useState<{[key:number]: string}>({});

    

    //選択した新規レポートの呼び出し
    useEffect(() => {
        const savedData = localStorage.getItem("reportLayouts");

        if (savedData) {
            setLayouts(JSON.parse(savedData));
        }
    }, [])

    useEffect(() => {
        if (!selectReport) {
            setSelectedLayout(null);
            setElements([]);
            return;
        }

        const params = new URLSearchParams({
            reportCode: String(selectReport.reportCode)
        });

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getreportlayoutdetail?${params}`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            setSelectedLayout(data);
            setElements(data.elements);
        });
    }, [selectReport]);

    //入力項目変更時にオブジェクトに追加していく
    const handleInputChange = (
        elementId: number,
        value: string
    ) => {
        setInputValues(prev => ({
            ...prev,
            [elementId]: value
        }));

        console.log(setInputValues);
    }

    const saveReport = () => {
        if (!selectedLayout) {
            alert("帳票を選択してください。");
            return;
        }

        const report = {
            id: Date.now(),
            layoutId: selectedLayout.reportCode,
            detailId: detailId,
            values: inputValues
        }
        console.log(report);

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/saveReport`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(report)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        })

        

        // const savedData = localStorage.getItem("reports");
        // const reports = savedData
        //     ? JSON.parse(savedData)
        //     : [];

        // reports.push(report);

        // localStorage.setItem(
        //     "reports",
        //     JSON.stringify(reports)
        // );

        // alert("帳票を保存しました。")
    }


    return (
        <div>
            <h2>帳票入力</h2>

            <select
                onChange={(e) => {
                    setSelectReport({
                        reportCode: Number(e.target.value),
                        reportName: e.target.options[e.target.selectedIndex].text
                    });
                }}
            >
                <option value="">帳票を選択してください</option>

                {layouts.map(layout => (
                    <option
                        key={layout.reportCode}
                        value={layout.reportCode}
                    >
                        {layout.reportName}
                    </option>
                ))}
            </select>
            <button onClick={saveReport}>
                保存
            </button>

            <div className={styles.paper}>
                {elements.map(element => (
                    <div
                        key={element.detailId}
                        style={{
                            position: "absolute",
                            left: `${element.x}px`,
                            top: `${element.y}px`,
                            width: `${element.width}px`,
                            height: `${element.height}px`
                        }}
                    >
                        {element.type === "text" ? (
                            element.text
                            ) : (
                                <div>
                                    <span>{element.label}</span>
                                    <input
                                        type={element.inputType}
                                        onChange={(e) => handleInputChange(element.detailId, e.target.value)}
                                    />
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}
