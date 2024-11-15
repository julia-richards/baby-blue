"use client";

import { useState, useEffect } from "react";

export default function MissYou() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-balloon ${
              30 + Math.random() * 20
            }s linear infinite`,
            animationDelay: `${-Math.random() * 30}s`,
          }}
        >
          <div
            className="text-6xl transform rotate-12"
            style={{ color: "#9CA3AF" }}
          >
            🎈
          </div>
        </div>
      ))}

      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center z-10 max-w-md">
        <h1 className="text-4xl font-bold text-gray-600 mb-4">
          {"We'll Miss You"}
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          We appreciate your thoughts and well-wishes for our little one!
        </p>
        <a
          href="https://my.babylist.com/sophie-blue"
          className="text-lg text-blue-500"
        >
          Check out our registry
        </a>
      </div>

      <style jsx>{`
        @keyframes float-balloon {
          0% {
            transform: translateY(110vh) translateX(-5vw);
          }
          100% {
            transform: translateY(-10vh) translateX(5vw);
          }
        }
      `}</style>
    </div>
  );
}
