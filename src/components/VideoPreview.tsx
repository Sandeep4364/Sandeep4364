import React, { useRef, useEffect } from 'react';

type VideoPreviewProps = {
  stream: MediaStream | null;
  isRecording: boolean;
};

export function VideoPreview({ stream, isRecording }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-64">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full bg-gray-800 rounded-lg object-cover"
      />
      {isRecording && (
        <div className="absolute top-4 right-4 flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2" />
          <span className="text-white text-sm font-medium">Recording</span>
        </div>
      )}
    </div>
  );
}