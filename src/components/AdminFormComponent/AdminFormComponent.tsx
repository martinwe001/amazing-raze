import { useState } from "react";
import {
  getChallenges,
  setCompletedChallenge,
} from "../../utils/AmazingRazeHelper";
import CustomButton from "../CustomComponents/Button/Button";
import CustomInput from "../CustomComponents/Input/Input";

function AdminFormComponent() {
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [challengeId, setchallengeId] = useState<string>("");
  const codes = import.meta.env.VITE_CODES;

  async function handleCodeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("hfeuiwo");

    if (!codes.split(",").includes(code)) {
      setErrorMessage("Feil lagnavn!");
      setShowErrorMessage(true);
      return;
    }

    const challenges = await getChallenges();
    const c = challenges.find((c) => c.id === challengeId);
    if (c === undefined) {
      setErrorMessage("Challenge id finnes ikke!");
      setShowErrorMessage(true);
      return;
    } else {
      const didUpdateTeamChallenge = await setCompletedChallenge(
        code,
        challengeId,
        c.isMultipleTries
      );
      if (!didUpdateTeamChallenge) {
        setErrorMessage("Laget hadde allerede gjennomført denne challengen");
        setShowErrorMessage(true);
        return;
      }
    }
    setCode("");
    setchallengeId("");
    setShowErrorMessage(false);
  }

  return (
    <>
      <h1 className="formHeader">🇿🇦 Skriv inn lagnavn og challenge id 🇿🇦</h1>
      <form onSubmit={(e) => handleCodeSubmit(e)}>
        <div className="join-game-form">
          <CustomInput
            type="text"
            value={code}
            required
            placeholder="Lagnavn"
            onChange={(e) => setCode(e.target.value)}
          />
          <CustomInput
            type="text"
            value={challengeId}
            required
            placeholder="Challenge Id"
            onChange={(e) => setchallengeId(e.target.value)}
          />
          {showErrorMessage && <p>{errorMessage}</p>}
          <CustomButton label="Send inn" variant="initial" />
        </div>
      </form>
    </>
  );
}

export default AdminFormComponent;
