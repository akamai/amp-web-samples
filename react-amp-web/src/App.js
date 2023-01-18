import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerExample from './Components/PlayerExample';
import ConsoleSample from './Components/ConsoleSample';
import CodeSample from './Components/CodeSample';

const STEP_1 = `
import React, { useEffect } from 'react';
import  AMP  from  'adaptive-media-player-test'
`

const STEP_2 = `
import React, { useEffect } from 'react';
import AMP from  'adaptive-media-player-test'
function PlayerExample() {
  useEffect(() => {
    const config = {
      autoplay: true,
      media: { src: "https://example.com/video/bbb.mp4" }
    }
    AMP.create("customerApiKey", "#player", config)
  });
  return (
    <div id="player"></div>
  );
}
export default PlayerExample;
`

const STEP_3 = `
.PlayerExample-container {
  width: 640px;
  height: 360px;
}
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello React+AMP!</h1>
      </header>
      <div className='App-body'>
	      <p>Visit the <a className='App-link' href="https://player.akamai.com/documentation/web/">AMP API Docs</a> to learn how to use AMP in your HTML5 applications.</p>
        <PlayerExample name='React+AMP'></PlayerExample>
        <h2>How to use React+AMP?</h2>
        <ConsoleSample
        title="1. Add AMP to your node modules:"
        command="npm install adaptive-media-player --save-dev"
        />
        <CodeSample
        title="2. Import AMP into your react component:"
        script={STEP_1}/>
        <CodeSample
        title="3. Call AMP.create in you component passing a config object and a contained id:"
        script={STEP_2}/>
        <CodeSample
        title="4. Set a default size for your player in your css;"
        script={STEP_3}/>
      </div>
    </div>
  );
}

export default App;
