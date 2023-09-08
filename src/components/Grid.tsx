import 'react-data-grid/lib/styles.css';
import DataGrid, {Column, SortColumn} from 'react-data-grid';
import {useCallback, useEffect, useState} from 'react';

interface Row {
    readonly id: number;
    readonly task: string;
    readonly complete: number;
    readonly priority: string;
    readonly issueType: string;
}


const Grid = () => {
    function createRows(): Row[] {
        const rows: Row[] = [];

        for (let i = 1; i < 50; i++) {
            rows.push({
                id: i,
                task: `Task ${i}`,
                complete: Math.min(100, Math.round(Math.random() * 110)),
                priority: ['Critical', 'High', 'Medium', 'Low'][Math.round(Math.random() * 3)],
                issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.round(Math.random() * 3)]
            });
        }

        return rows;
    }
    function createColumns(): Column<Row>[] {
        return [
            {
                key: 'id',
                name: 'ID',
                width: 80
            },
            {
                key: 'task',
                name: 'Title',
                resizable: true,
                sortable: true
            },
            {
                key: 'priority',
                name: 'Priority',
                resizable: true,
                sortable: true
            },
            {
                key: 'issueType',
                name: 'Issue Type',
                resizable: true,
                sortable: true
            },
            {
                key: 'complete',
                name: '% Complete',
                resizable: true,
                sortable: true
            }
        ];
    }

    const [rows, setRows] = useState(createRows);
    const [columns, setColumns] = useState(createColumns);
    const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

    const onSortColumnsChange = useCallback((sortColumnsParam: SortColumn[]) => {
        setSortColumns(sortColumnsParam.slice(-1));
    },[]);

    useEffect(() => {
        console.log("=>(Grid.tsx:75) sortColumns", sortColumns);
        console.log("=>(Grid.tsx:76) columns", columns);
        if(sortColumns.length === 0) return;
        else {
            const { columnKey, direction } = sortColumns[0];
            let sortedRows: Row[] = [...rows];
            switch (columnKey) {
                case 'task':
                case 'priority':
                case 'issueType':
                    sortedRows = sortedRows.sort((a, b) => a[columnKey].localeCompare(b[columnKey]));
                    break;
                case 'complete':
                    sortedRows = sortedRows.sort((a, b) => a[columnKey] - b[columnKey]);
                    break;
                default:
            }
            sortedRows = direction === 'DESC' ? sortedRows.reverse() : sortedRows;
            setRows(sortedRows);
        }
    }, [sortColumns]);

    return (
    <div>
        <DataGrid columns={columns} rows={rows} className="rdg-dark" sortColumns={sortColumns} onSortColumnsChange={onSortColumnsChange}/>
    </div>
        )
};

export default Grid;

