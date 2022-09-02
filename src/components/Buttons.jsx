import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clear, selectStats, selectMemebers } from "../store/teamSlice";
import { analyzeStats, findTypeMatch } from "../utils";

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
    let teamWeaks = [];
    let teamStrs = [];
    pokes.forEach((member) => {
      const memberStats = findTypeMatch(member.types, stats);
      teamWeaks.push(memberStats.weaknesses);
      teamStrs.push(memberStats.strengths);
    })
    console.log("total weaknesses:", teamWeaks.flat(), "total strengths:", teamStrs.flat());
    const res = await analyzeStats(teamWeaks.flat(), teamStrs.flat(), pokes.length);
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
          {teamStats.weaknesses.length !== 0 && (
            <p>Half of your team or more is weak to: </p>
          )}
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
