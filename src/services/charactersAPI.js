const getCharByName = async (queryName) => {
  const GET_CHAR_BY_NAME = `https://rickandmortyapi.com/api/character/?name=${queryName}`;
  const response = await fetch(GET_CHAR_BY_NAME);
  const data = await response.json();

  if (response.ok) return data.results;
  return null;
};

export default getCharByName;
