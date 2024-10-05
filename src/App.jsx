import React from 'react';

const matchups = [
  "2019 Chiefs vs 2023 Chiefs",
  "1968 KU vs 1995 KU",
  "2018 Chiefs vs 2015 Patriots",
  "1998 KState vs 2008 KU"
];

const App = () => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '768px',
      margin: '0 auto',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '10px',
        textAlign: 'center',
      }}>
        StatsDraft
      </h1>
      <hr style={{
        width: '100%',
        maxWidth: '300px',
        height: '1px',
        backgroundColor: '#ccc',
        border: 'none',
        margin: '0 0 20px 0',
      }} />
      <div style={{
        width: '100%',
        maxWidth: '300px',
      }}>
        {matchups.map((matchup, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '20px',
            padding: '10px 15px',
            marginBottom: '10px',
            textAlign: 'center',
            fontSize: '14px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            {matchup}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
