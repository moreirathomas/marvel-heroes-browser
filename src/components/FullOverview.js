import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchApiById } from '../hooks/useFetchById';

function FullOverview({ match }) {
  const id = match.params.id;
  const [data, loading] = useFetchApiById(id);
  //   const result = data.data.results[0];

  console.log(data);

  return (
    <div className="full-overview">
      <div className="character-data">
        <h2 className="character-name">{data.name}</h2>
        <p className="character-description">{data.description}</p>
      </div>
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
}
export default FullOverview;
