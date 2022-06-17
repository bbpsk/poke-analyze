import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clear, selectStats, selectMemebers } from "../store/teamSlice";
import { analyzeStats } from "../utils";

const Buttons = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectStats);
  const pokes = useSelector(selectMemebers);

  const [showResults, setShowResults] = useState(false);
  const [teamStats, setTeamStats] = useState({
    blindSpots: [],
    weaknesses: [],
  });

  const clearTable = () => {
    dispatch(clear());
    setShowResults(false);
  };
  const analyze = async () => {
    const teamWeaks = stats
      .map((member) =>
        member.weaknesses.map((weak) => Array(member.pokemonUsing).fill(weak))
      )
      .flat(2);
    const teamStrs = stats.map((member) => member.strengths).flat();

    console.log("total weaknesses:", teamWeaks, "total strengths:", teamStrs);
    const res = await analyzeStats(teamWeaks, teamStrs, pokes.length);
    setTeamStats(res);
    setShowResults(true);
  };

  return (
    <>
      <div className="d-flex justify-content-evenly m-3">
        <button className="btn btn-dark rounded-pill" onClick={analyze}>
          Analyze
        </button>
        <button className="btn btn-dark rounded-pill" onClick={clearTable}>
          Clear
        </button>
      </div>
      {showResults && (
        <div className="">
          <p>Team Weaknesses: </p>
          {teamStats.weaknesses.length === 0 && <div className="px-4">none</div>}
          <ul className="row">
            {teamStats.weaknesses.map((weakness) => (
              <li key={weakness} className="col-4">{weakness}</li>
            ))}
          </ul>
          <p>Your team has no super effective options against these types: </p>
          <ul className="row">
            {teamStats.blindSpots.map((spot) => (
              <li key={spot} className="col-4">{spot}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Buttons;
