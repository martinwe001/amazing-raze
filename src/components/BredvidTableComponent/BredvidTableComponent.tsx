import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { BredvidTableData, getBredvidData } from "../../utils/CsvHelper";
import { BREDVIDCOLUMNS } from "../../utils/TableUtils";

function BredvidTableComponent() {
  const [data, setData] = useState<BredvidTableData[]>([]);
  useEffect(() => {
    getBredvidData("data.csv").then((data) => {
      setData(data);
    });
  }, []);

  const columns = useMemo(() => BREDVIDCOLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <h1 className="tableHeader">🇦🇹 Leaderboard 🇦🇹</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="tableHeader" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default BredvidTableComponent;
