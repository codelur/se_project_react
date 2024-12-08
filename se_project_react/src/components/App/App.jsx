import { useState } from "react";
import Header from "../Header/Header";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page__content">
        <Header />
      </div>
    </div>
  );
}

export default App;
