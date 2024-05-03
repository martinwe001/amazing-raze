import { get, ref } from "firebase/database";
import { db } from "../firebaseConfig";

export interface Challenge {
  id: string;
  description: string;
  name: string;
  points: number;
  category: string;
  isMultipleTries: boolean;
  isFree: boolean;
  hint: string;
}

export interface Team {
  id: string;
  name: string;
  completedChallenges: string[];
  players: string[];
}

export const getTeamById = async (id: string): Promise<Team> => {
  const dataRef = ref(db, `teams/${id}`);
  const firebaseData = await get(dataRef);
  return firebaseData.val();
};
