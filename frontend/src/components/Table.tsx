import TextInput from './TextInput'
import styles from '../components/common.module.css'

{/* 
呼び出しサンプル

<Table
    columns={[
        { value: "名前" },
        { value: "年齢", align: "center" },
        { value: "住所" }
    ]}
    rows={[
        {
            cells: [
                { value: "田中" },
                { value: "25", align: "center" },
                { value: "大阪" }
            ]
        },
        {
            align: "center",
            cells: [
                { value: "佐藤" },
                { value: "30" },
                { value: "東京" }
            ]
        }
    ]}
/>
*/}

export type Cell = {
    value: React.ReactNode;
    align?: "left" | "center" | "right";
    isInput?: boolean;
}

export type Row = {
    cells: Cell[];
    align?: "left" | "center" | "right";
    height?: number;
}
type Props = {
    columns?: Cell[];
    rows: Row[];
    onRowClick?: (row: Row, index: number) => void;
    onCellChange?: (
        rowIndex: number,
        cellIndex: number,
        value: string
    ) => void;
}

const Table = ({
    columns,
    rows,
    onRowClick,
    onCellChange
}: Props) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                {columns && (
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}
                                    style={{textAlign: column.align ?? "left"}}
                                >
                                    {column.value}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} onClick={() => onRowClick?.(row, rowIndex)}>
                            {row.cells.map((cell, cellIndex) => (
                                <td key={cellIndex}
                                    style={{
                                        textAlign: cell.align?? row.align ?? "left"
                                    }}
                                >
                                    {cell.isInput ? (
                                            <TextInput
                                                name="newRow"
                                                value={cell.value as string}
                                                onChange={(e) => {
                                                    onCellChange?.(
                                                        rowIndex,
                                                        cellIndex,
                                                        e.target.value
                                                    )
                                                }}
                                                className3={styles.newRowInput}
                                            />
                                        ) : (
                                            cell.value
                                        )
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}

export default Table;
