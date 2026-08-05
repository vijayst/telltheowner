"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getOrCreateFingerprint } from "@/lib/fingerprint";

const MAX_RECORDING_TIME = 30;

interface UseVoiceRecorderOptions {
  onSubmitSuccess?: () => void;
}

export function useVoiceRecorder(
  clientId: string,
  options?: UseVoiceRecorderOptions
) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [fingerprint] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return getOrCreateFingerprint();
    }
    return "";
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, []);

  const startRecording = async () => {
    setError(null);
    setHasRecording(false);
    setAudioUrl(null);
    audioChunksRef.current = [];

    console.log("Requesting microphone access...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      console.log("Microphone access granted, starting recording...");

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioUrl(URL.createObjectURL(audioBlob));
        setHasRecording(true);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      setError(
        "Failed to access microphone. Please ensure you have granted permission."
      );
      console.error("Error accessing microphone:", err);
    }
  };

  const discardRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
    audioChunksRef.current = [];
    setAudioUrl(null);
    setError(null);
  };

  const submitRecording = async () => {
    if (!hasRecording || audioChunksRef.current.length === 0) {
      setError("No recording to submit");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("fingerprint", fingerprint);

      const response = await fetch(`/api/b/${clientId}/review`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      if (options?.onSubmitSuccess) {
        options.onSubmitSuccess();
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isRecording,
    isUploading,
    hasRecording,
    recordingTime,
    error,
    submitted,
    audioUrl,
    startRecording,
    stopRecording,
    discardRecording,
    submitRecording,
  };
}
