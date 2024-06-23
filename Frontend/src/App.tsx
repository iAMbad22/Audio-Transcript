import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioRecorder from './components/AudioRecorder';
import Transcript from './components/Transcripts';

const App: React.FC = () => {
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [allTranscripts, setAllTranscripts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllTranscripts();
  }, []);

  const fetchAllTranscripts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transcripts');
      setAllTranscripts(response.data.map((t: { transcript: string }) => t.transcript));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAudioStop = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTranscripts(prev => [...prev, response.data.data.transcript]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/transcripts/save', { transcript: transcripts.join(' ') });
      alert('Transcript saved successfully!');
      setTranscripts([]); // Reset transcripts after saving
      fetchAllTranscripts(); // Fetch all transcripts again after saving
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audio Recorder</h1>
      <AudioRecorder onStop={handleAudioStop} />
      <button
        className="px-4 py-2 mt-2 rounded bg-blue-500 text-white"
        onClick={handleSave}
        disabled={transcripts.length === 0 || loading}
      >
        Save Transcript
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {transcripts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Current Transcript:</h2>
          <p>{transcripts.join(' ')}</p>
        </div>
      )}
      {allTranscripts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">All Transcripts:</h2>
          <ul>
            {allTranscripts.map((transcript, index) => (
              <Transcript key={index} text={transcript} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
