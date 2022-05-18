import React from 'react'

const Home = () => {
        return (           
        <div className="App">
          <Header />
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Ta' Bueno - PI IngeBases</h1>
            <h2>React.js (Frontend) + ASP.NET (Backend)</h2>
            <p>
              We have successfully created a project using both ReactJS (JavaScript) and ASP.NET (C#),
              they are connected by using an internal API.
            </p>
            <p>
              This project has an active connection to the database server for this PI.
            </p>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            </div>
          <Footer />
        </div>
            );
    }

const divStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '10pt',
}

export default Home;