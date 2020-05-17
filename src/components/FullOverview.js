import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchApiById } from '../customs/useFetchById';

function FullOverview({ match }) {
  const id = match.params.id;
  const [data, loading] = useFetchApiById(id);

  console.log(data);

  const renderCharacter = () => {
    return (
      <div className="character-data">
        <div className="thumbnail-container">
          <img
            className="character-thumbnail"
            alt={data.name + ' thumbnail'}
            src={
              data.thumbnail.path +
              '/standard_amazing.' +
              data.thumbnail.extension
            }
          ></img>
        </div>
        <h2 className="character-name">{data.name}</h2>
        <p className="character-description">{data.description}</p>
      </div>
    );
  };

  return (
    <div className="full-overview">
      {!loading ? (
        renderCharacter()
      ) : (
        <div className="message-box">Loading</div>
      )}
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
}
export default FullOverview;
