import React from "react";
import "./App.css";
import { Container } from "./components/Container";
import { Landing } from "./components/Landing";

function App() {
  return (
    <div className="App">
      <Container>
        <Landing />
      </Container>
    </div>
  );
}

export default App;
