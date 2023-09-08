import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import {useEffect, useState} from 'react';
const customersData = require('../data/customers.json');

interface IRow {
    id: number;
    name: string;
}


const Grid = () => {
    const [rows, setRows] = useState<any>([])
    const [cols, setCols] = useState<any>([])

    useEffect(() => {
        const colData = [];

        for (const label in customersData[1]) {
            colData.push({key: label , name: label});
        }
        setCols(colData);
        setRows(customersData);
    }, []);


    useEffect(() => {
    }, [rows]);

    const rowGetter = (row: IRow) => row.id;

    return (
    <div>
        <DataGrid columns={cols} rows={rows} className="rdg-dark" rowKeyGetter={rowGetter}/>
    </div>
        )
};

export default Grid;

