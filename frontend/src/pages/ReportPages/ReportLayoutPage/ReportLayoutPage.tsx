import { useState, useRef, useEffect } from 'react'

import styles from './ReportLayoutPage.module.css'

import type {
    InputType,
    Element,
    ReportLayout
} from '../types/report'

type ResizeDirection =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

type reportCode = number;

export default function ReportLayout() {

    //帳票一覧の状態管理
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
    }, [layouts])

    //オブジェクト一覧の状態管理
    const [elements, setElements] = useState<Element[]>([]);
    //オブジェクトの選択状態管理
    const [selectedId, setSelectedId] = useState<number | null>(null);
    //オブジェクト選択のプロパティを取得
    const selectedElement = elements.find(
        element => element.detailId === selectedId
    );

    //選択したレポートの明細を取得
    const [reportCode, setReportCode] = useState<reportCode>(0);


    //ツールクリック時に新しいオブジェクトを生成
    //ボタン：text
    const addText = () => {
        const newElements: Element = {
            detailId: Date.now(),
            type: "text",
            text: "テキスト",
            label: "",
            inputType: "text",
            x: 50,
            y: 50,
            width: 100,
            height: 40,
            fontSize: 20,
            textAlign: "left",
        };
        setElements(prev => [...prev, newElements])
    }
    //ボタン：input
    const addInput = () => {
        const newElements: Element = {
            detailId: Date.now(),
            type: "input",
            text: "",
            label: "項目名",
            inputType: "text",
            x: 50,
            y: 100,
            width: 200,
            height: 40,
            fontSize: 20,
            textAlign: "left",
        }

        setElements(prev => [...prev, newElements]);
        setSelectedId(newElements.detailId);
    };


    //現在ドラッグしているオブジェクトのIDを保持
    const draggingId = useRef<number | null>(null);
    //現在リサイズしているオブジェクトのID
    const resizingId = useRef<number | null>(null);
    //現在リサイズしている方向
    const resizingDirection = useRef<ResizeDirection | null>(null);


    //オブジェクトをクリックした位置を保持
    const dragOffset = useRef({
        x: 0,
        y:0
    });

    // リサイズ開始時の情報
    const resizeStart = useRef({
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });


    //マウスボタンを押した時の処理
    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement>,
        element: Element
    ) => {

        const paper = e.currentTarget.parentElement;

        if (!paper) {
            return;
        }

        const rect = paper.getBoundingClientRect();

        setSelectedId(element.detailId);
        
        draggingId.current = element.detailId;
        dragOffset.current = {
            x: e.clientX - rect.left - element.x,
            y: e.clientY - rect.top - element.y
        };
    };


    //オブジェクトをドラッグしている間の処理
    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        //リサイズ中
        if (resizingId.current !== null) {
            const id = resizingId.current;
            const direction = resizingDirection.current;

            const diffX = e.clientX - resizeStart.current.mouseX;
            const diffY = e.clientY - resizeStart.current.mouseY;

            setElements(prev => 
                prev.map(element => {

                    if (element.detailId !== id) {
                        return element;
                    }

                    let newX = resizeStart.current.x;               //横座標
                    let newY = resizeStart.current.y;               //縦座標
                    let newWidth = resizeStart.current.width;       //横幅
                    let newHeight = resizeStart.current.height;     //縦幅

                    //左側操作
                    if (direction === "top-left" || direction ===  "bottom-left") {
                        newX = resizeStart.current.x + diffX;   //例) newX = 100 + (-50)
                        newWidth = resizeStart.current.width - diffX;   //例) newWidth = 100 - (-50)
                    }
                    //右側操作
                    if (direction === "top-right" || direction === "bottom-right") {
                        newWidth = resizeStart.current.width + diffX;
                    }
                    //上側操作
                    if (direction === "top-left" || direction === "top-right") {
                        newY = resizeStart.current.y + diffY;
                        newHeight = resizeStart.current.height - diffY;
                    }
                    //下側操作
                    if (direction === "bottom-left" || direction === "bottom-right") {
                        newHeight = resizeStart.current.height + diffY;
                    }

                    const minWidth = 20;
                    const minHeight = 20;
                    const finalWidth = Math.max(minWidth, newWidth);
                    const finalHeight = Math.max(minHeight, newHeight);

                    // 左側から縮めた場合のX補正
                    if (direction === "top-left" || direction === "bottom-left") {
                        newX = resizeStart.current.x + (resizeStart.current.width - finalWidth);
                    }
                    // 上側から縮めた場合のY補正
                    if (direction === "top-left" || direction === "top-right") {
                        newY = resizeStart.current.y + (resizeStart.current.height - finalHeight);
                    }

                    return {
                        ...element,
                        x: newX,
                        y: newY,
                        width: finalWidth,
                        height: finalHeight
                    };
                })
            );

            return;
        }

        //オブジェクト移動中
        if (draggingId.current === null) {
            return;
        }

        const paper = e.currentTarget;
        const rect = paper.getBoundingClientRect();

        const id = draggingId.current;

        const newX = e.clientX - rect.left - dragOffset.current.x;
        const newY = e.clientY - rect.top - dragOffset.current.y;

        setElements(prev =>
            prev.map(element => 
                element.detailId === id ? {
                    ...element,
                    x: newX,
                    y: newY
                }
                : element
            )
        );
    };


    //マウスボタンを離した時の処理
    const handleMouseUp = () => {
        draggingId.current = null;
        resizingId.current = null;
        resizingDirection.current = null;
    };


    //リサイズ処理
    const handleResizeMouseDown = (
        e: React.MouseEvent<HTMLDivElement>,
        element: Element,
        direction: ResizeDirection
    ) => {

        e.stopPropagation();

        resizingId.current = element.detailId;
        resizingDirection.current = direction;

        resizeStart.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            x: element.x,
            y: element.y,
            width: element.width,
            height: element.height
        }
    };


    //プロパティからのオブジェクト更新用
    const updateElement = (
        id: number,
        property: keyof Element,
        value: string | number
    ) => {
        setElements(prev => 
            prev.map(element =>
                element.detailId === id
                    ? {
                        ...element,
                        [property]: value
                    }
                    : element
            )
        )
    };


    //オブジェクトの削除
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLDivElement>
    ) => {
        if (e.key !== "Delete") {
            return;
        }
        if (selectedId === null) {
            return;
        }

        setElements(prev =>
            prev.filter(element =>
                element.detailId !== selectedId
            )
        );

        setSelectedId(null);

    };


    //オブジェクトの複製
    const dupulicateElement = () => {
        if (!selectedElement) {
            return;
        }

        //選択中のオブジェクトをコピー
        const newElement: Element = {
            ...selectedElement,
            //新しいIDを取得
            detailId: Date.now(),
            x: selectedElement.x + 20,
            y: selectedElement.y + 20
        }

        //オブジェクト一覧に追加
        setElements(prev => [
            ...prev,
            newElement
        ]);

        //複製したオブジェクトを選択状態にする
        setSelectedId(newElement.detailId);
    }


    //レイアウトの保存
    const saveLayout = async() => {

        const name = window.prompt("レイアウト名を入力してください。");
        if (!name) {
            return;
        }

        const newLayout: ReportLayout = {
            reportCode: Date.now(),
            reportName: name,
            elements: elements
        };
        console.log(newLayout);
        // const savedData = localStorage.getItem("reportLayouts");
        // const layouts: ReportLayout[] =
        //     savedData
        //         ? JSON.parse(savedData)
        //         : [];

        // layouts.push(newLayout);

        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/savelayout`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newLayout),
                credentials: "include"
            }
        )

        const data = await response.json();
        console.log(data);

        // localStorage.setItem(
        //     "reportLayouts",
        //     JSON.stringify(layouts)
        // );

        setLayouts(layouts);
        console.log(`${name}を保存しました。`);
    }

    useEffect(() => {
        if (reportCode === 0) {
            setElements([]);
            return;
        };
        console.log("loadLayout:" + reportCode);
        const params = new URLSearchParams({
            reportCode: String(reportCode)
        });

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/getreportlayoutdetail?${params}`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setElements(data.elements);
            setSelectedId(null);
        })
    }, [reportCode])


    return (
        <div className={styles.editor}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className={styles.selectLayout}>
                <h2>レイアウト作成</h2>
                {/* レイアウト一覧 */}
                <div className={styles.layoutList}>
                    <select
                        onChange={(e) => {
                            setReportCode(Number(e.target.value) as reportCode);
                        }}
                    >
                        <option value="">レイアウトを選択してください</option>
                        {layouts.map(layout => (
                            <option key={layout.reportCode}
                                value={layout.reportCode}
                            >
                                {layout.reportName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.editorBody}>
                {/* ツール */}
                <div className={styles.toolbar}>
                    <h3>ツール</h3>
                    <button onClick={addText}>テキスト</button>
                    <button onClick={addInput}>入力項目</button>
                    <button>線</button>
                    <button>表</button>
                    <button onClick={saveLayout}>保存</button>
                </div>
            
                {/* レイアウト本体 */}
                <div className={styles.paper}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseDown={() => setSelectedId(null)}
                >
                    {elements.map(element => (
                        <div
                            key={element.detailId}
                            className={`${styles.textElement}
                                ${selectedId === element.detailId ? styles.selected : ""}`}
                            style={{
                                left: `${element.x}px`,
                                top: `${element.y}px`,
                                width: `${element.width}px`,
                                height: `${element.height}px`,
                                fontSize: `${element.fontSize}px`,
                                textAlign: 'center'
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                handleMouseDown(e, element);
                            }}
                        >
                            {element.type === "text" ? (
                                element.text
                                ) : (
                                    <div className={styles.inputElement}>
                                        <span>{element.label}</span>
                                        <input type={element.inputType} disabled />
                                    </div>
                                )
                            }

                            {/* オブジェクトの四隅 */}
                            {selectedId === element.detailId && (
                                <>
                                    <div className={`${styles.resizeHandle} ${styles.topLeft}`}
                                        onMouseDown={(e) => {
                                            e.stopPropagation();

                                            handleResizeMouseDown(
                                                e,
                                                element,
                                                "top-left"
                                            )
                                        }}
                                    />

                                    <div className={`${styles.resizeHandle} ${styles.topRight}`}
                                        onMouseDown={(e) => {
                                            e.stopPropagation();

                                            handleResizeMouseDown(
                                                e,
                                                element,
                                                "top-right"
                                            )
                                        }}
                                    />

                                    <div className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                                        onMouseDown={(e) => {
                                            e.stopPropagation();

                                            handleResizeMouseDown(
                                                e,
                                                element,
                                                "bottom-left"
                                            )
                                        }}
                                    />

                                    <div className={`${styles.resizeHandle} ${styles.bottomRight}`}
                                        onMouseDown={(e) => {
                                            e.stopPropagation();

                                            handleResizeMouseDown(
                                                e,
                                                element,
                                                "bottom-right"
                                            )
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* プロパティ */}
                <div className={styles.properties}>
                    <div className={styles.propertyTitle}>
                        <h3>プロパティ</h3>
                        <button onClick={dupulicateElement}>複製</button>
                    </div>

                    {selectedElement ? (
                        <>
                            <div className={styles.propertyItem}>
                                <div className={styles.detailId}>
                                    <span>ID：</span>
                                    <span>
                                        {selectedElement.detailId}
                                    </span>
                                </div>
                                
                            </div>

                            {selectedElement.type === "text" ? (
                                <div className={styles.propertyItem}>
                                    <label>テキスト</label>
                                    <input
                                        type="text"
                                        value={selectedElement.text}
                                        onChange={(e) =>
                                            updateElement(
                                                selectedElement.detailId,
                                                "text",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                ) : selectedElement.type === "input" ? (
                                    <>
                                        <div className={styles.propertyItem}>
                                            <label>項目名</label>
                                            <input
                                                type={"text"}
                                                value={selectedElement.label}
                                                onChange={(e) =>
                                                    updateElement(
                                                        selectedElement.detailId,
                                                        "label",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className={styles.inputType}>
                                            <label>入力タイプ</label>

                                            <select
                                                value={selectedElement.inputType}
                                                onChange={(e) =>
                                                    updateElement(
                                                        selectedElement.detailId,
                                                        "inputType",
                                                        e.target.value as InputType
                                                    )
                                                }
                                            >
                                                <option value="text">テキスト</option>
                                                <option value="number">数値</option>
                                                <option value="date">日付</option>
                                            </select>
                                        </div>
                                    </>
                                ) : null
                            }
                            

                            <div className={styles.propertyItem}>
                                <label>座標x</label>
                                <input
                                    type="text"
                                    value={selectedElement.x}
                                    onChange={(e) =>
                                        updateElement(
                                            selectedElement.detailId,
                                            "x",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>

                            <div className={styles.propertyItem}>
                                <label>座標y</label>
                                <input
                                    type="text"
                                    value={selectedElement.y}
                                    onChange={(e) =>
                                        updateElement(
                                            selectedElement.detailId,
                                            "y",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>

                            <div className={styles.propertyItem}>
                                <label>幅</label>
                                <input
                                    type="text"
                                    value={selectedElement.width}
                                    onChange={(e) =>
                                        updateElement(
                                            selectedElement.detailId,
                                            "width",
                                            Math.max(1, Number(e.target.value))
                                        )
                                    }
                                />
                            </div>

                            <div className={styles.propertyItem}>
                                <label>高さ</label>
                                <input
                                    type="text"
                                    value={selectedElement.height}
                                    onChange={(e) =>
                                        updateElement(
                                            selectedElement.detailId,
                                            "height",
                                            Math.max(1, Number(e.target.value))
                                        )
                                    }
                                />
                            </div>

                            <div className={styles.propertyItem}>
                                <label>フォントサイズ</label>
                                <input
                                    type="text"
                                    value={selectedElement.fontSize}
                                    onChange={(e) =>
                                        updateElement(
                                            selectedElement.detailId,
                                            "fontSize",
                                            Math.max(1, Number(e.target.value))
                                        )
                                    }
                                />
                            </div>
                        </>
                    )
                    : <p>オブジェクトを選択してください。</p>}
                </div>
            </div>
        </div>
    )
}
