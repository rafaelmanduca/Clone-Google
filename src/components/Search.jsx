import axios from "axios";
import { useState } from "react";
import atomo from "/atomo.svg";

export const Search = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const URL = "http://localhost:4000/search";
      const res = await axios.get(URL,{
        params:{
          query: query
        }
      });

      const data = res.data.organic_results || [];
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("OCORREU UM ERRO NA BUSCA!!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Title</h1>
        <img src={atomo} alt="image" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Procure na Web"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <div>
        {error ? (
          <h3>{error}</h3>
        ) : loading ? (
          <h3> Carregando.... </h3>
        ) : (
          <ul>
            {results.map((result, index) => {
              return (
                <li key={index}>
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {result.title}
                  </a>
                  <p>{result.snippet}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
