import { useState } from "react";
import "./App.css";
import PokeDetails from "./components/shared/PokeDetails";

function App() {
  const [id, setId] = useState(25);
  return (
    <div>
      <PokeDetails pokemon_id={id} />
      <button onClick={() => setId((p) => p - 1)}>Prev</button>
      <button onClick={() => setId((p) => p + 1)}>Next {id}</button>
    </div>
  );
}

export default App;
