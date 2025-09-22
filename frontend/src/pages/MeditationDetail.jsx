import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMeditationBySlug } from "../lib/api";
import toast from "react-hot-toast";
import { FaCirclePlay, FaPause } from "react-icons/fa6";

const formatTime = (secs) => {
  if (!Number.isFinite(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const MeditationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialFromList = () => {
    const list = queryClient.getQueryData(["meditations"]) || [];
    return list.find((m) => m.slug === slug);
  };
  const {
    data: meditation,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["meditation", slug],
    queryFn: () => fetchMeditationBySlug(slug),
    initialData: initialFromList,
    retry: 1,
  });
  if (isError) toast.error("Failed to load meditation");

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!meditation) return;
    const audio = audioRef.current;
    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, [meditation]);

  if (isLoading && !meditation) {
    return (
      <section className="h-screen grid place-items-center">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  if (!meditation) {
    return (
      <section className="h-screen grid place-items-center">
        <div className="text-center">
          <p className="mb-4">Meditation not found.</p>
          <button
            type="button"
            onClick={() => navigate("/meditation")}
            className="px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            Back to Library
          </button>
        </div>
      </section>
    );
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const onSeek = (e) => {
    const value = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = (value / 100) * duration;
  };

  return (
    <section className="relative bg-main-page min-h-[100vh]">
      <Navbar isFixed />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-center">
          <div className="h-64 w-64 md:h-60 md:w-60 rounded-3xl bg-tape-card border border-primary/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] mx-auto" />
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-heading">
              {meditation.title}
            </h1>
            <p className="mt-3 text-secondary leading-relaxed max-w-2xl">
              {meditation.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={toggle}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="grid place-items-center h-11 w-11 rounded-full bg-primary text-white text-xl"
              >
                {isPlaying ? <FaPause /> : <FaCirclePlay />}
              </button>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={onSeek}
                  className="w-full h-2 rounded-full appearance-none bg-gray-300 outline-none"
                />
                <div className="flex justify-between text-xs text-primary mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{meditation.duration}</span>
                </div>
              </div>
            </div>
            <audio
              ref={audioRef}
              src={meditation.audioUrl}
              preload="metadata"
            />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default MeditationDetail;
