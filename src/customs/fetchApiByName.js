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

const fetchApiByName = (name) => {
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

  let data = {};
  let loading = true;

  return fetch(url + `?nameStartsWith=${name}&apikey=${PUBLIC_KEY}`, options)
    .then((response) => response.json())
    .then((json) => {
      data = json.data;
      loading = false;
      return [data, loading];
    })
    .catch(console.log);
};

export { fetchApiByName };
