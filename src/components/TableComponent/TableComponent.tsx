import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import {
  Challenge,
  Team,
  getChallenges,
  getTeams,
} from "../../utils/AmazingRazeHelper";
import { COLUMNS, LeaderboardItem } from "../../utils/TableUtils";
import "./TableComponent.css";

function TableComponent() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>();
  const [data, setData] = useState<LeaderboardItem[]>([]);
  useEffect(() => {
    getTeams().then((teamObjs) => {
      const teams: Team[] = Object.entries(teamObjs).map(([, value]) => {
        return {
          name: value.name,
          completedChallenges: value.completedChallenges,
          players: value.players,
        };
      });
      setTeams(teams);
    });
    getChallenges().then((challenges) => {
      setChallenges(challenges);
    });
  }, []);

  useEffect(() => {
    if (teams && challenges) {
      const tableData = teams.map((team) => {
        const pointsAndnum = challenges
          .map((challenge) => {
            const numberOfCompletions = team.completedChallenges.filter(
              (c) => c === challenge.id
            );
            if (numberOfCompletions.length) {
              return challenge.points * numberOfCompletions.length;
            }
          })
          .reduce(
            (acc, cur) => {
              if (cur) {
                return {
                  ...acc,
                  points: acc.points + cur,
                  numChallenges: acc.numChallenges + 1,
                };
              } else {
                return acc;
              }
            },
            { points: 0, numChallenges: 0 }
          );
        return {
          name: team.name,
          points: pointsAndnum.points,
          numChallenges: pointsAndnum.numChallenges,
        };
      });
      setData(
        tableData.sort((a, b) => {
          return b.points - a.points;
        })
      );
    }
  }, [teams, challenges]);

  const columns = useMemo(() => COLUMNS, []);
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

export default TableComponent;
