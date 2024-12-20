import { useState, useEffect, useCallback } from 'react';

export function useMediaRecording() {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [permissions, setPermissions] = useState({
    video: false,
    audio: false,
  });

  const requestPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      setPermissions({ video: true, audio: true });
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      return null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    const stream = mediaStream || await requestPermissions();
    if (!stream) return;

    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((chunks) => [...chunks, event.data]);
      }
    };

    recorder.start();
  }, [mediaStream, requestPermissions]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  }, [mediaRecorder]);

  const cleanupMedia = useCallback(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setRecordedChunks([]);
  }, [mediaStream]);

  useEffect(() => {
    return () => {
      cleanupMedia();
    };
  }, [cleanupMedia]);

  return {
    permissions,
    recordedChunks,
    startRecording,
    stopRecording,
    cleanupMedia,
  };
}