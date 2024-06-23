import React, { useState, useEffect, useRef } from 'react';

interface TranscriptProps {
  text: string;
}

const Transcript: React.FC<TranscriptProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      setIsOverflowing(transcriptRef.current.scrollHeight > transcriptRef.current.clientHeight);
    }
  }, [text]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-2 p-2 border-b rounded relative">
      <div
        ref={transcriptRef}
        className={`overflow-hidden ${isExpanded ? '' : 'h-12'}`}
        style={{ boxShadow: !isExpanded && isOverflowing ? 'inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5)' : 'none' }}
      >
        {text}
      </div>
      {isOverflowing && (
        <button
          onClick={toggleExpand}
          className="text-blue-500 hover:underline mt-1"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default Transcript;
