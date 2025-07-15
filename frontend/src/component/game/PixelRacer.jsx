import { useEffect, useRef, useState } from "react";
import "./PixelRacer.css"; // for animations and pixel style

const PixelRacer = () => {
  const gameRef = useRef(null);
  const carRef = useRef(null);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(4);

  // Handle car movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      const car = carRef.current;
      if (!car || gameOver) return;

      const currentLeft = parseInt(window.getComputedStyle(car).left);
      const currentTop = parseInt(window.getComputedStyle(car).top);

      const step = 30;
      const gameWidth = gameRef.current.offsetWidth;
      const gameHeight = gameRef.current.offsetHeight;

      if (e.key === "ArrowLeft" && currentLeft > 0) {
        car.style.left = `${currentLeft - step}px`;
      } else if (e.key === "ArrowRight" && currentLeft + 40 < gameWidth) {
        car.style.left = `${currentLeft + step}px`;
      } else if (e.key === "ArrowUp" && currentTop > 0) {
        car.style.top = `${currentTop - step}px`;
      } else if (e.key === "ArrowDown" && currentTop + 60 < gameHeight) {
        car.style.top = `${currentTop + step}px`;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  // Game loop: move obstacles + collision check
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) => {
        const updated = prev.map((obs) => ({
          ...obs,
          top: obs.top + speed,
        }));

        // Collision check
        updated.forEach((obs) => {
          const car = carRef.current.getBoundingClientRect();
          const ob = {
            left: obs.left + gameRef.current.getBoundingClientRect().left,
            top: obs.top + gameRef.current.getBoundingClientRect().top,
            right: obs.left + 40,
            bottom: obs.top + 40,
          };

          if (
            car.left < ob.right &&
            car.right > ob.left &&
            car.top < ob.bottom &&
            car.bottom > ob.top
          ) {
            setGameOver(true);
            clearInterval(interval);
          }
        });

        return updated.filter((obs) => obs.top < 600);
      });

      // Score
      setScore((prev) => prev + 1);

      // Add new obstacle every few seconds
      if (Math.random() < 0.05) {
        const newObstacle = {
          id: Date.now(),
          left: Math.floor(Math.random() * 260),
          top: 0,
        };
        setObstacles((prev) => [...prev, newObstacle]);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [gameOver, speed]);

  const handleRestart = () => {
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setSpeed(4);
    carRef.current.style.left = "130px";
    carRef.current.style.top = "500px";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white font-poppins px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">🏎️ Pixel Racer</h1>
      <div
        ref={gameRef}
        className="relative w-[300px] h-[600px] bg-gray-800 rounded-lg overflow-hidden border-4 border-white"
      >
        {/* Car */}
        <div
          ref={carRef}
          className="absolute w-10 h-14 bg-blue-500 rounded-md transition-all"
          style={{ left: "130px", top: "500px" }}
        />

        {/* Obstacles */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute w-10 h-10 bg-red-500 rounded-sm"
            style={{ left: obs.left, top: obs.top }}
          />
        ))}

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold mb-2">💥 Game Over</h2>
            <p className="mb-4">Score: {score}</p>
            <button
              onClick={handleRestart}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Score */}
      <p className="mt-4 text-xl">Score: {score}</p>
    </div>
  );
};

export default PixelRacer;
