import { Column } from "react-table";
import { BredvidTableData } from "./CsvHelper";
import { Challenge } from "./AmazingRazeHelper";

export interface Player {
  id: string;
  name: string;
  time: number;
  birthday: string;
  attempts: Attempt[];
}
export interface Attempt {
  date: string;
  time: number;
}

export interface LeaderboardItem {
  name: string;
  points: number;
  numChallenges: number;
}

export const COLUMNS: Column<LeaderboardItem>[] = [
  {
    Header: "Plass",
    Cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        {row.index + 1 === 1 ? "🏆" : row.index + 1}
      </div>
    ),
  },
  {
    Header: "Lagnavn",
    accessor: "name",
    Cell: (row) => row.value,
  },
  {
    Header: "Poeng",
    accessor: "points",
    Cell: (row) => row.value,
  },
  {
    Header: "Antall utfordringer",
    accessor: "numChallenges",
    Cell: (row) => row.value,
  },
];

export const BREDVIDCOLUMNS: Column<BredvidTableData>[] = [
  {
    Header: "Plass",
    Cell: ({ row }) => (
      <div style={{ textAlign: "center" }}>
        {row.index + 1 === 1 ? "🏆" : row.index + 1}
      </div>
    ),
  },
  {
    Header: "Navn",
    accessor: "name",
    Cell: (row) => row.value,
  },
  {
    Header: "Poeng",
    accessor: "totalPoints",
    Cell: (row) => row.value,
  },
];

export const CHALLENGESCOLUMNS: Column<Challenge>[] = [
  {
    Header: "Navn",
    accessor: "name",
    Cell: (row) => row.value,
  },
  {
    Header: "Poeng",
    accessor: "points",
    Cell: (row) => row.value,
  },
  {
    Header: "Maks 1 gang?",
    accessor: "isMultipleTries",
    Cell: (row) => (row.value ? "Nei" : "Ja"),
  },
  {
    Header: "Koster spenn",
    accessor: "isFree",
    Cell: (row) => (row.value ? "Nei" : "Ja"),
  },
];
