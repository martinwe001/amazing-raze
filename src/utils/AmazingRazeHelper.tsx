import { get, ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

export interface Challenge {
  id: string;
  description: string;
  name: string;
  points: number;
  category: string;
  isMultipleTries: boolean;
  isFree: boolean;
  hint: string | undefined;
}

export interface Team {
  name: string;
  completedChallenges: string[];
  players: string[];
}

export const getTeamById = async (id: string): Promise<Team> => {
  const dataRef = ref(db, `teams/${id}`);
  const firebaseData = await get(dataRef);
  return firebaseData.val();
};
export const getTeams = async (): Promise<Team[]> => {
  const dataRef = ref(db, `teams`);
  const firebaseData = await get(dataRef);
  return firebaseData.val();
};
export const getChallenges = async (): Promise<Challenge[]> => {
  const dataRef = ref(db, `challenges`);
  const firebaseData = await get(dataRef);
  return firebaseData.val();
};
export const setCompletedChallenge = async (
  teamId: string,
  challengeId: string
): Promise<boolean> => {
  const team = await getTeamById(teamId);
  if (!team.completedChallenges.includes(challengeId)) {
    team.completedChallenges = [...team.completedChallenges, challengeId];
    const teamRef = ref(db, `teams/${teamId}`);
    await set(teamRef, team);
    return true;
  }
  return false;
};
