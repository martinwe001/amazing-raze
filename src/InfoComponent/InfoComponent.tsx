import "./InfoComponent.css";

function InfoComponent() {
  return (
    <div className="formWrapper">
      <h1 className="info-header"> Velkommen til Amazing Race Wien!</h1>
      <p className="info-text">
        Nå skal dere bruke tid på å bli godt kjent med hva Wien har å by på.
        Kanskje dere blir bedre kjent med hverandre også! Hvert lag har frem til
        kl 14:30 på å gjennomføre flest mulig challenges. Hver challenge gir en
        poengsum og laget med flest poeng vinner konkurransen.
      </p>
      <p className="info-text">
        For å holde dere up-to-speed på både challenges og hvordan konkurrentene
        ligger an, har Satellite Guys snekret sammen et flittig hjelpemiddel.
        Dette finner dere på www.boysconsulting.com, men før dere får tilgang
        hit må dere løse den første oppgaven. Her vil svaret på oppgaven være
        koden som unlocker resten av go'-sakene.
      </p>
      <p className="info-text">
        Kl 14:30 må lagene være tilbake til planlagt sted, dere får beskjed, men
        vi ser an hva som passer best. Ellers står dere fritt frem til å bevege
        dere i bybildet. Så nå er resten opp til dere. Bli kjent med denne
        perlen av en by, sørg for å holde dere både hydrert og usultne, nyt at
        vi har fri og kos dere masse! Lykke til!
      </p>
      <h2 style={{ color: "white" }}>Hvordan får vi en challenge godkjent?</h2>
      <p className="info-text">
        Med mindre annet står spesifisert må hver challenge dokumenters med et
        bilde eller video og sendes på Messenger til en i juryen for
        godkjenning. Når oppgaven er bekreftet godkjent vil dere bli tildelt
        poeng og leaderoardet oppdateres. Det kan derfor være lurt å vente på
        godkjenning før dere raser avgårde mot neste challenge!
      </p>
    </div>
  );
}

export default InfoComponent;
