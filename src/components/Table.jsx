import React from "react";
import { useSelector } from "react-redux";
import { selectMemebers } from "../store/teamSlice";
import PokemonRow from "./PokemonRow";

const Table = () => {
  const slots = [1, 2, 3, 4, 5, 6];
  const pokes = useSelector(selectMemebers);
  console.log(pokes);

  return (
    <table className="table table-striped mt-4">
      <thead className="gray">
        <tr>
          <th scope="col">.</th>
          <th scope="col">Pokemon</th>
          <th scope="col">Strengths</th>
          <th scope="col">Weaknesses</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((number) => (
          <tr key={number}>
            <th scope="row">#{number}</th>
            {pokes[number - 1] ? (
              <PokemonRow pokemon={pokes[number - 1]} />
            ) : (
              <>
                <td></td>
                <td></td>
                <td></td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
