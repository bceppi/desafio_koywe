import React from "react";
import "./App.css";
import { Container } from "./components/Container";
import { CryptoTable } from "./components/CryptoTable";

function App() {
  return (
    <div className="App">
      <Container>
        <CryptoTable />
      </Container>
    </div>
  );
}

export default App;
