import { useEffect, useState } from "react";
import { getPlayers } from "../../utils/FirebaseHelper";
import { Player } from "../../utils/TableUtils";
import CardComponent from "../CardComponent/CardComponent";
import "./PlayersComponent.css";

function PlayersComponent() {
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    getPlayers(false).then((data) => setPlayers(data));
  }, []);
  return (
    <>
      <h1>🇦🇹 Spillere 🇦🇹 </h1>
      <div className="cardsWrapper">
        {players &&
          players.map((item, i) => (
            <CardComponent key={i} player={item} imgPath="beer copy.png" />
          ))}
      </div>
    </>
  );
}

export default PlayersComponent;
