import React from "react";

function Home(props){

    return (
        <div className="Home-page">
          <h1 className="main-header">Quizzical</h1>
          <p>Some description if needed</p>
          <button 
              className="submit--btn"
              onClick={props.onSubmit}
              type="button">
            Start quiz
          </button>
      </div>
      );

}

export default Home;
