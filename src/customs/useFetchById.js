import { useState, useEffect } from 'react';
import MD5 from './md5'; // Custom hash function

const url = 'http://gateway.marvel.com/v1/public/characters';

//                         //
// HOW TO USE YOUR API KEY //
//                         //
// To use for yourself, comment the following 2 lines, uncomment the next 2 and paste your own api keys
// Not secured ! Only for development
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
// const PUBLIC_KEY = PASTE_YOUR_PUBLIC_KEY_HERE;
// const PRIVATE_KEY = PASTE_YOUR_PRIVATE_KEY_HERE;
//                         //

function useFetchApiById(id) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const ts = new Date().getTime();
  const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Origin: 'http://localhost:3000',
    },
    params: {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash,
    },
  };

  useEffect(() => {
    async function fetchUrl() {
      const response = await fetch(
        url + `/${id}?&apikey=${PUBLIC_KEY}`,
        options
      );
      const json = await response.json();

      setData(json.data.results[0]);
      setLoading(false);
    }
    if (loading) {
      fetchUrl();
    }
  }, [data, id, loading, options]);

  return [data, loading];
}
export { useFetchApiById };
