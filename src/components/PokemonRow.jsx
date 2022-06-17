import React from "react";
import { useSelector } from "react-redux";
import { findTypeMatch } from "../utils";

const PokemonRow = ({ pokemon }) => {
  const stat = useSelector((state) => {
    const allStats = state.team.stats;
    const stat = findTypeMatch(pokemon.types, allStats);
    console.log("row:", pokemon.name, "stats:", stat);
    return stat;
  });

  return (
    <>
      <td>
        <div className="d-flex">
          <div>
            <p className=" fw-bold">{pokemon.name}</p>
            <small>{pokemon.types[0].type.name}</small>
            {pokemon.types.length > 1 ? (
              <small>/{pokemon.types[1].type.name}</small>
            ) : (
              <></>
            )}
          </div>
          <div className="img-container">
            <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`}/>
          </div>
        </div>
      </td>
      {stat ? (
        <>
          <td>
            <div className="row" style={{maxWidth: '20rem'}}>
              {stat.strengths.map((strength) => (
                <div key={pokemon.name + strength} style={{width: 'fit-content'}}>
                  {strength}
                </div>
              ))}
            </div>
          </td>
          <td>
            <div className="row" style={{maxWidth: '20rem'}}>
              {stat.weaknesses.map((weakness) => (
                <div
                  key={pokemon.name + weakness}
                  className={stat.criticals.includes(weakness) ? "red" : ""}
                  style={{width: 'fit-content'}}
                >
                  {weakness}
                </div>
              ))}
            </div>
          </td>
        </>
      ) : (
        <>
          <td>
            <div className="spinner-border" role="status" />
          </td>
          <td>
            <div className="spinner-border" role="status" />
          </td>
        </>
      )}
    </>
  );
};

export default PokemonRow;
