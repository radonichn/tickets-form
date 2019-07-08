import React from "react";
// import "./storage";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <div className="App container">
      <div className=" red">
        <SearchForm />
      </div>
    </div>
  );
}

export default App;
