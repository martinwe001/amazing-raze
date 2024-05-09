import "./InfoComponent.css";

function InfoComponent() {
  return (
    <div className="formWrapper">
      <h1 className="info-header">Spillregler</h1>
      <p className="info-text">
        Dere har frem til kl 14:30 på å gjennomføre flest mulig challenges
      </p>
      <p className="info-text">
        Hver challenge må dokumenters og sendes på messenger til en i juryen for
        godkjenning. Når oppgaven er bekreftet godkjent vil dere bli tildelt
        poeng og leaderoardet oppdateres.
      </p>
    </div>
  );
}

export default InfoComponent;
