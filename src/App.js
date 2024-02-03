import React, { useState,useEffect } from 'react';
import './App.css';
import dance from './dancing-bears.gif'
import teddy from './bear-teddy.gif'
import audio from './ReelAudio.mp3'

function App() {
  const [yesButtonSize, setYesButtonSize] = useState('20px');
  const [noButtonSize, setNoButtonSize] = useState('20px');
  const [noButtonTitle, setNoButtonTitle] = useState('No');
  const [showNotification, setShowNotification] = useState(false);
  const [showDanceGif, setShowDanceGif] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    const audioElement = new Audio(audio);
    audioElement.currentTime = 3;
    setAudioElement(audioElement);
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 3;
      }
    };
  }, []);

  const Notification = ({ message, onClose }) => {
    return (
      <div className="notification-container">
        <div className="notification">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  const handelAccept = () => {
    setYesButtonSize(parseInt(yesButtonSize) + 5 + 'px');
    setShowNotification(true);
    setYesButtonSize(parseInt('20px'))
    setNoButtonSize(parseInt('20px'))
    setShowDanceGif(true);
   if (audioElement) {
    audioElement.play();
  }

  };

  const handelReject = () => {
    setNoButtonSize(parseInt(noButtonSize) - 1 + 'px');
    setYesButtonSize(parseInt(yesButtonSize) + 7 + 'px')
    const randomHints = [
      'Maybe Later?',
       'Think Again?',
        'One More Chance?' ,
         'You will lose noting!',
          'Give me a chance!'
        ];
    const randomIndex = Math.floor(Math.random() * randomHints.length);
    setNoButtonTitle(randomHints[randomIndex]);
  };

  return (
    <div className="App">
      <img src={showDanceGif ? dance : teddy} 
      alt='bear'style={{ width: '200px', height: '200px' }} 
    />
      <h1 className='question'>Will you be my Valentine?</h1>
      <button className='yes' style={{ fontSize: yesButtonSize }} onClick={handelAccept}>Yes</button>
      <button className='no' style={{ fontSize: noButtonSize }} onClick={handelReject}>{noButtonTitle}</button>
      {showNotification && (
        <Notification
          message="Ok yay!!"
          onClose={() => setShowNotification(false)}
        />
      )}
        <audio autoPlay loop>
        <source src={audio} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
