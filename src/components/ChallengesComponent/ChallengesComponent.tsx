import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { CHALLENGESCOLUMNS } from "../../utils/TableUtils";
import "./ChallengesComponent.css";
import { Challenge, getTeamById } from "../../utils/AmazingRazeHelper";
import { getChallenges } from "../../utils/FirebaseHelper";
import { getCookie } from "../../utils/CookieHelper";

function ChallengesComponent() {
  const [data, setData] = useState<Challenge[]>([]);
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getChallenges().then((challenges) => {
      setData(challenges);

      const teamName = getCookie();

      getTeamById(teamName!).then((team) => {
        setCompletedChallenges(team.completedChallenges);
        setIsLoading(false);
      });
    });
  }, []);

  const columns = useMemo(() => CHALLENGESCOLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const handleRowClick = (rowId: string) => {
    const newExpandedRows = {
      ...expandedRows,
      [rowId]: !expandedRows[rowId],
    };
    setExpandedRows(newExpandedRows);
  };

  return (
    <>
      {!isLoading && (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="tableHeader"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <>
                    <tr
                      {...row.getRowProps()}
                      onClick={() => handleRowClick(row.id)}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className={
                              completedChallenges.includes(`${i}`)
                                ? "iscompleted"
                                : ""
                            }
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                    {expandedRows[row.id] && (
                      <tr>
                        <td colSpan={row.cells.length}>
                          {data[i].description}
                          {data[i].hint && (
                            <>
                              <br />
                              <a href={data[i].hint} target="none">
                                Hjelp meg...
                              </a>
                            </>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default ChallengesComponent;
