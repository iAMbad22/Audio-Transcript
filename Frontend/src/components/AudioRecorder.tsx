// src/components/AudioRecorder.tsx
import React, { useState, useRef } from 'react';
import micImage from '../assets/mic.avif'; // Adjust the path as necessary

const AudioRecorder: React.FC<{ onStop: (blob: Blob) => void }> = ({ onStop }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      onStop(audioBlob);
      audioChunks.current = [];
    };
    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center h-[25vh] w-full">
      
      <div className={`${recording ? 'w-[12vh] h-[12vh]' : ''} bg-red-400 absolute rounded-full top-14  animate-ping `}></div>
      <div className={`${recording ? 'w-[10vh] h-[10vh]' : '' }  bg-red-500 absolute rounded-full top-15  animate-ping `}></div>
      <div className={`${recording  ? 'w-[8vh] h-[8vh]' : '' }   bg-red-600 absolute rounded-full top-[75px]  animate-ping `}></div>
      <button
        className={`relative w-21 h-24 rounded-full ${recording ? 'bg-red-500' : 'bg-green-500'} flex items-center justify-center shadow-circle absolute`}
        onClick={recording ? stopRecording : startRecording}
      >
        <img src={micImage} alt="Start Recording" className="w-full h-full rounded-full" />
      </button>
      {recording ? <h1 className='pt-16'>Stop Recording</h1> : <h1 className='pt-16'>Start or Continue Recording</h1>}
    </div>
  );
};

export default AudioRecorder;
