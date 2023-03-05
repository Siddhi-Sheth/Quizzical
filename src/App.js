import React from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

function App() {

  const [currentComponent, setCurrentComponent] = React.useState("Home");

  return (
    <div>
      {currentComponent === "Home" ? (<Home onSubmit={() => setCurrentComponent("Quiz")} />) : (<Quiz />)}
    </div>
  );
}

export default App;
