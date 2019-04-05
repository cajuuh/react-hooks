import React, { useState, useEffect } from 'react';


export default function App() {
  const [repositories, setRepositories] = useState([
    { name: 'repo-1', id: '1' },
    { name: 'repo-2', id: '2' },
    { name: 'repo-3', id: '3' }
  ])

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/cajuuh/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos`
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
    });
    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        {repositories.map(repo =>
          <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        )}
      </ul>
    </>
  );
}
