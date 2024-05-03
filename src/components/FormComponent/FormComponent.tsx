import { useEffect, useState } from "react";
import { Team, getTeamById } from "../../utils/AmazingRazeHelper";
import { getCookie, setCookie } from "../../utils/CookieHelper";
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

  return (
    <div className="formWrapper">
      <h1 className="formHeader">&#127866; Skriv inn kode &#127866;</h1>
      {formState === 1 && (
        <>
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
          <h1>{team.name}</h1>
        </>
      )}
    </div>
  );
}

export default FormComponent;
