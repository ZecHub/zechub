'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSound } from '@/hooks/useSound';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 300;
const PADDLE_WIDTH = 8;
const PADDLE_HEIGHT = 50;
const BALL_SIZE = 8;
const PADDLE_SPEED = 6;
const INITIAL_BALL_SPEED = 4;

interface Paddle {
  y: number;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

type GameState = 'menu' | 'playing' | 'paused' | 'gameover';

export function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const { playClick } = useSound();

  const [gameState, setGameState] = useState<GameState>('menu');
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Game state refs
  const playerPaddleRef = useRef<Paddle>({ y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2 });
  const cpuPaddleRef = useRef<Paddle>({ y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2 });
  const ballRef = useRef<Ball>({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, vx: INITIAL_BALL_SPEED, vy: INITIAL_BALL_SPEED });
  const playerScoreRef = useRef(0);
  const cpuScoreRef = useRef(0);

  const CPU_SPEEDS = { easy: 2.5, medium: 4, hard: 5.5 };

  const resetBall = useCallback((direction: number = 1) => {
    ballRef.current = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      vx: INITIAL_BALL_SPEED * direction,
      vy: (Math.random() - 0.5) * INITIAL_BALL_SPEED * 2,
    };
  }, []);

  const resetGame = useCallback(() => {
    playerPaddleRef.current = { y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2 };
    cpuPaddleRef.current = { y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2 };
    resetBall();
    playerScoreRef.current = 0;
    cpuScoreRef.current = 0;
    setPlayerScore(0);
    setCpuScore(0);
  }, [resetBall]);

  const startGame = useCallback(() => {
    playClick();
    resetGame();
    setGameState('playing');
  }, [playClick, resetGame]);

  const gameOver = useCallback(() => {
    setGameState('gameover');
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const update = () => {
      const keys = keysRef.current;
      const ball = ballRef.current;
      const playerPaddle = playerPaddleRef.current;
      const cpuPaddle = cpuPaddleRef.current;

      // Player paddle movement
      if (keys.has('ArrowUp') || keys.has('w')) {
        playerPaddle.y = Math.max(0, playerPaddle.y - PADDLE_SPEED);
      }
      if (keys.has('ArrowDown') || keys.has('s')) {
        playerPaddle.y = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, playerPaddle.y + PADDLE_SPEED);
      }

      // CPU paddle AI
      const cpuSpeed = CPU_SPEEDS[difficulty];
      const cpuCenter = cpuPaddle.y + PADDLE_HEIGHT / 2;
      if (cpuCenter < ball.y - 10) {
        cpuPaddle.y = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, cpuPaddle.y + cpuSpeed);
      } else if (cpuCenter > ball.y + 10) {
        cpuPaddle.y = Math.max(0, cpuPaddle.y - cpuSpeed);
      }

      // Ball movement
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Ball collision with top/bottom
      if (ball.y <= 0 || ball.y >= GAME_HEIGHT - BALL_SIZE) {
        ball.vy = -ball.vy;
        ball.y = Math.max(0, Math.min(GAME_HEIGHT - BALL_SIZE, ball.y));
      }

      // Ball collision with player paddle (left)
      if (
        ball.x <= PADDLE_WIDTH + 20 &&
        ball.y + BALL_SIZE >= playerPaddle.y &&
        ball.y <= playerPaddle.y + PADDLE_HEIGHT &&
        ball.vx < 0
      ) {
        ball.vx = -ball.vx * 1.05;
        ball.vy += (ball.y - (playerPaddle.y + PADDLE_HEIGHT / 2)) * 0.1;
        ball.x = PADDLE_WIDTH + 20;
      }

      // Ball collision with CPU paddle (right)
      if (
        ball.x >= GAME_WIDTH - PADDLE_WIDTH - 20 - BALL_SIZE &&
        ball.y + BALL_SIZE >= cpuPaddle.y &&
        ball.y <= cpuPaddle.y + PADDLE_HEIGHT &&
        ball.vx > 0
      ) {
        ball.vx = -ball.vx * 1.05;
        ball.vy += (ball.y - (cpuPaddle.y + PADDLE_HEIGHT / 2)) * 0.1;
        ball.x = GAME_WIDTH - PADDLE_WIDTH - 20 - BALL_SIZE;
      }

      // Scoring
      if (ball.x < 0) {
        cpuScoreRef.current++;
        setCpuScore(cpuScoreRef.current);
        if (cpuScoreRef.current >= 5) {
          gameOver();
        } else {
          resetBall(-1);
        }
      } else if (ball.x > GAME_WIDTH) {
        playerScoreRef.current++;
        setPlayerScore(playerScoreRef.current);
        if (playerScoreRef.current >= 5) {
          gameOver();
        } else {
          resetBall(1);
        }
      }

      // Clamp ball speed
      const maxSpeed = 12;
      ball.vx = Math.max(-maxSpeed, Math.min(maxSpeed, ball.vx));
      ball.vy = Math.max(-maxSpeed, Math.min(maxSpeed, ball.vy));
    };

    const render = () => {
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Draw center line
      ctx.strokeStyle = '#4a5a4a';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(GAME_WIDTH / 2, 0);
      ctx.lineTo(GAME_WIDTH / 2, GAME_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw paddles (ASCII style)
      ctx.fillStyle = '#00ff88';
      ctx.font = '10px monospace';
      for (let i = 0; i < PADDLE_HEIGHT; i += 10) {
        ctx.fillText('█', 15, playerPaddleRef.current.y + i + 10);
        ctx.fillText('█', GAME_WIDTH - 22, cpuPaddleRef.current.y + i + 10);
      }

      // Draw ball
      ctx.fillStyle = '#f4b728';
      ctx.fillText('●', ballRef.current.x, ballRef.current.y + BALL_SIZE);

      // Draw scores
      ctx.fillStyle = '#00ff88';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(String(playerScoreRef.current), GAME_WIDTH / 4, 40);
      ctx.fillText(String(cpuScoreRef.current), (GAME_WIDTH * 3) / 4, 40);
    };

    const gameLoop = () => {
      update();
      render();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, difficulty, resetBall, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (e.key === 'Escape' && gameState === 'playing') setGameState('paused');
      else if (e.key === 'Escape' && gameState === 'paused') setGameState('playing');
    };
    const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  return (
    <div className="flex flex-col items-center h-full bg-[#0a0a1a] p-2">
      {gameState === 'menu' && (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <pre className="text-[var(--accent-gold)] text-center" style={{ fontSize: '12px' }}>
{`
 ____   ___  _   _  ____
|  _ \\ / _ \\| \\ | |/ ___|
| |_) | | | |  \\| | |  _
|  __/| |_| | |\\  | |_| |
|_|    \\___/|_| \\_|\\____|
`}
          </pre>
          <div className="flex gap-2 mb-2">
            {(['easy', 'medium', 'hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => { playClick(); setDifficulty(d); }}
                className={`btn-window px-3 py-1 capitalize ${difficulty === d ? 'text-[var(--accent-gold)]' : 'text-[var(--text-green)]'}`}
              >
                {d}
              </button>
            ))}
          </div>
          <button onClick={startGame} className="btn-window px-6 py-2 text-[var(--text-green)]">
            START GAME
          </button>
          <div className="text-[var(--text-green)] text-xs mt-4">
            <div>W/S or ↑/↓: Move Paddle</div>
            <div>First to 5 wins!</div>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="border border-[var(--border-window)]"
        />
      )}

      {gameState === 'paused' && (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="text-[var(--accent-gold)] text-xl">PAUSED</div>
          <button onClick={() => setGameState('playing')} className="btn-window px-6 py-2 text-[var(--text-green)]">
            RESUME
          </button>
          <button onClick={() => setGameState('menu')} className="btn-window px-6 py-2 text-[var(--text-amber)]">
            QUIT
          </button>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className={`text-xl ${playerScoreRef.current > cpuScoreRef.current ? 'text-[var(--accent-green)]' : 'text-[var(--accent-orange)]'}`}>
            {playerScoreRef.current > cpuScoreRef.current ? 'YOU WIN!' : 'CPU WINS!'}
          </div>
          <div className="text-[var(--text-green)]">
            {playerScore} - {cpuScore}
          </div>
          <button onClick={startGame} className="btn-window px-6 py-2 text-[var(--text-green)]">
            PLAY AGAIN
          </button>
          <button onClick={() => setGameState('menu')} className="btn-window px-6 py-2 text-[var(--text-amber)]">
            MENU
          </button>
        </div>
      )}
    </div>
  );
}

export default Pong;
