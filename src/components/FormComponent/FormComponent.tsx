import { useEffect, useState } from "react";
import { Team, getTeamById } from "../../utils/AmazingRazeHelper";
import { getCookie, setCookie } from "../../utils/CookieHelper";
import ChallengesComponent from "../ChallengesComponent/ChallengesComponent";
import CustomButton from "../CustomComponents/Button/Button";
import ErrorMessageDiv from "../CustomComponents/ErrorMessageDiv/ErrorMessageDiv";
import CustomInput from "../CustomComponents/Input/Input";
import "./FormComponent.css";

function FormComponent() {
  const [code, setCode] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formState, setFormState] = useState<number>(0);
  const [team, setTeam] = useState<Team>();
  const codes = import.meta.env.VITE_CODES;

  useEffect(() => {
    const code = getCookie();
    if (code) {
      getTeamById(code).then((currentTeam: Team) => {
        setTeam(currentTeam);
        setFormState(2);
      });
    } else {
      setFormState(1);
    }
  }, []);

  async function handleCodeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!codes.split(",").includes(code)) {
      setErrorMessage("Feil kode!");
      setShowErrorMessage(true);
      return;
    }
    setCookie(code);
    setTeam(await getTeamById(code));
    setFormState(2);
  }

  const firstVerse =
    "Gratulerer, folkens, dere er litt av et lag,\nforsett sånn, og dere får en sabla bra dag!";
  const secondVerse =
    "Gjør dere klare for å skue, spise litt, og vandre,\nmens dere prøver å samle poeng (gjerne flere enn de andre).";
  const thirdVerse =
    "Koden dere søker, er svaret på første gåte,\nmen husk å ikke glemme - ALLTID drikk med måte...";

  return (
    <div className="formWrapper">
      {formState === 1 && (
        <>
          <h1 className="formHeader">🇦🇹 Skriv inn kode 🇦🇹</h1>
          <p className="infoText">{firstVerse}</p>
          <p className="infoText">{secondVerse}</p>
          <p className="infoText">{thirdVerse}</p>
          <form onSubmit={(e) => handleCodeSubmit(e)}>
            <div className="join-game-form">
              <CustomInput
                type="text"
                value={code}
                required
                placeholder="Kode"
                onChange={(e) => setCode(e.target.value)}
              />
              {showErrorMessage && <ErrorMessageDiv text={errorMessage} />}
              <CustomButton label="Neste" variant="initial" />
            </div>
          </form>
        </>
      )}

      {formState === 2 && team && (
        <>
          <h1 className="teamNameHeader">{team.name}</h1>
          <ChallengesComponent />
        </>
      )}
    </div>
  );
}

export default FormComponent;
