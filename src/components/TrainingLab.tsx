import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Crosshair,
  Move,
  Zap,
  Keyboard,
  Calculator,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type LabTool = 'aim' | 'tracking' | 'reaction' | 'keys' | 'edpi';
type TargetSize = 'small' | 'medium' | 'large';
type TrackingSpeed = 'slow' | 'normal' | 'fast';
type TacticalKey = 'W' | 'A' | 'S' | 'D' | 'Q' | 'E' | 'R' | 'SPACE';

const TACTICAL_KEYS: TacticalKey[] = ['W', 'A', 'S', 'D', 'Q', 'E', 'R', 'SPACE'];

interface AimTarget {
  x: number;
  y: number;
}

interface EdpiGamePreset {
  id: string;
  name: string;
  yaw: number;
  recommendedMin: number;
  recommendedMax: number;
  note: string;
}

const EDPI_PRESETS: EdpiGamePreset[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    yaw: 0.07,
    recommendedMin: 200,
    recommendedMax: 360,
    note: 'Rango estándar competitivo para microajustes precisos a la cabeza.',
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    yaw: 0.022,
    recommendedMin: 600,
    recommendedMax: 1000,
    note: 'Equivale a 30–50 cm para un giro completo de 360°.',
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    yaw: 0.022,
    recommendedMin: 800,
    recommendedMax: 1400,
    note: 'Permite seguimiento continuo (tracking) y giros rápidos en combate cercano.',
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    yaw: 0.0555,
    recommendedMin: 40,
    recommendedMax: 80,
    note: 'Calculado multiplicando DPI × % sensibilidad X/Y (ej. 800 × 6.5% = 52 eDPI).',
  },
  {
    id: 'overwatch2',
    name: 'Overwatch 2',
    yaw: 0.0066,
    recommendedMin: 2800,
    recommendedMax: 5200,
    note: 'Ideal para combinar seguimiento vertical y giros de 180°.',
  },
  {
    id: 'r6',
    name: 'Rainbow Six Siege',
    yaw: 0.00572,
    recommendedMin: 4000,
    recommendedMax: 9600,
    note: 'Basado en multiplicador estándar (0.02); permite girar ángulos y sostener pixeles con precisión.',
  },
  {
    id: 'marvelrivals',
    name: 'Marvel Rivals',
    yaw: 0.025,
    recommendedMin: 800,
    recommendedMax: 1800,
    note: 'Balance cómodo para seguimiento rápido de héroes con alta movilidad.',
  },
  {
    id: 'warzone',
    name: 'Call of Duty: Warzone',
    yaw: 0.0066,
    recommendedMin: 3200,
    recommendedMax: 6400,
    note: 'Rango popular en Warzone para controlar retroceso a media distancia.',
  },
  {
    id: 'pubg',
    name: 'PUBG: Battlegrounds',
    yaw: 0.00095,
    recommendedMin: 20000,
    recommendedMax: 36000,
    note: 'Basado en sensibilidad general dentro de PUBG para disparos de largo alcance.',
  },
  {
    id: 'destiny2',
    name: 'Destiny 2',
    yaw: 0.0066,
    recommendedMin: 2800,
    recommendedMax: 5600,
    note: 'Combina seguimiento ágil en PvP con precisión estable.',
  },
  {
    id: 'halo',
    name: 'Halo Infinite',
    yaw: 0.022,
    recommendedMin: 800,
    recommendedMax: 1600,
    note: 'Ideal para mantener la mira pegada durante duelos de escudo en Arena.',
  },
  {
    id: 'rust',
    name: 'Rust',
    yaw: 0.07,
    recommendedMin: 160,
    recommendedMax: 400,
    note: 'Calculado sobre sensibilidad clásica para controlar patrones de rifle.',
  },
];

export const TrainingLab: React.FC<{ initialTool?: LabTool }> = ({
  initialTool = 'aim',
}) => {
  const { t } = useLanguage();
  const [activeTool, setActiveTool] = useState<LabTool>(initialTool);

  useEffect(() => {
    setActiveTool(initialTool);
  }, [initialTool]);

  // --- Aim Trainer State ---
  const [aimRunning, setAimRunning] = useState(false);
  const [aimFinished, setAimFinished] = useState(false);
  const [targetSize, setTargetSize] = useState<TargetSize>('medium');
  const [durationSec, setDurationSec] = useState<15 | 30>(30);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [hits, setHits] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [target, setTarget] = useState<AimTarget>({ x: 50, y: 50 });
  const [bestHits, setBestHits] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('helpful-smile-best-aim');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const spawnTarget = useCallback(() => {
    const x = 12 + Math.random() * 76;
    const y = 14 + Math.random() * 72;
    setTarget({ x, y });
  }, []);

  useEffect(() => {
    if (!aimRunning) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setAimRunning(false);
          setAimFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [aimRunning]);

  useEffect(() => {
    if (aimFinished && hits > bestHits) {
      setBestHits(hits);
      try {
        localStorage.setItem('helpful-smile-best-aim', String(hits));
      } catch {
        // Ignorar errores de almacenamiento
      }
    }
  }, [aimFinished, hits, bestHits]);

  const startAimRound = () => {
    setHits(0);
    setClicks(0);
    setTimeLeft(durationSec);
    setAimFinished(false);
    setAimRunning(true);
    spawnTarget();
  };

  const handleCanvasClick = () => {
    if (!aimRunning) return;
    setClicks((c) => c + 1);
  };

  const handleTargetHit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!aimRunning) return;
    setHits((h) => h + 1);
    setClicks((c) => c + 1);
    spawnTarget();
  };

  const accuracy = clicks > 0 ? Math.round((hits / clicks) * 100) : 0;
  const targetsPerSec =
    durationSec - timeLeft > 0
      ? (hits / (aimRunning ? durationSec - timeLeft : durationSec)).toFixed(2)
      : '0.00';

  const targetSizePx =
    targetSize === 'small' ? 'w-7 h-7' : targetSize === 'medium' ? 'w-10 h-10' : 'w-14 h-14';

  const getAimCoachFeedback = () => {
    if (accuracy < 75) {
      return t.trainingLab.aim.feedbackLowAcc;
    }
    if (hits / durationSec < 1.2) {
      return t.trainingLab.aim.feedbackSlow;
    }
    return t.trainingLab.aim.feedbackGood;
  };

  // --- Reaction Test State ---
  const [reactionState, setReactionState] = useState<
    'idle' | 'waiting' | 'ready' | 'tooSoon' | 'result'
  >('idle');
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [lastReaction, setLastReaction] = useState<number | null>(null);
  const readyAtRef = useRef<number>(0);
  const waitTimeoutRef = useRef<number | null>(null);

  const clearWaitTimeout = () => {
    if (waitTimeoutRef.current !== null) {
      window.clearTimeout(waitTimeoutRef.current);
      waitTimeoutRef.current = null;
    }
  };

  useEffect(() => () => clearWaitTimeout(), []);

  const startReactionRound = () => {
    clearWaitTimeout();
    setReactionState('waiting');
    const delay = 1400 + Math.random() * 2400;
    waitTimeoutRef.current = window.setTimeout(() => {
      readyAtRef.current = performance.now();
      setReactionState('ready');
    }, delay);
  };

  const handleReactionPadClick = () => {
    if (reactionState === 'idle' || reactionState === 'result' || reactionState === 'tooSoon') {
      startReactionRound();
      return;
    }
    if (reactionState === 'waiting') {
      clearWaitTimeout();
      setReactionState('tooSoon');
      return;
    }
    if (reactionState === 'ready') {
      const elapsed = Math.round(performance.now() - readyAtRef.current);
      setLastReaction(elapsed);
      setReactionTimes((prev) => [...prev.slice(-4), elapsed]);
      setReactionState('result');
    }
  };

  const avgReaction =
    reactionTimes.length > 0
      ? Math.round(reactionTimes.reduce((acc, v) => acc + v, 0) / reactionTimes.length)
      : null;

  const getReactionFeedback = (ms: number) => {
    if (ms <= 200) {
      return t.trainingLab.reaction.feedbackFast;
    }
    if (ms <= 260) {
      return t.trainingLab.reaction.feedbackSolid;
    }
    return t.trainingLab.reaction.feedbackSlow;
  };

  // --- Tracking Trainer State ---
  const [trackRunning, setTrackRunning] = useState(false);
  const [trackFinished, setTrackFinished] = useState(false);
  const [trackSpeed, setTrackSpeed] = useState<TrackingSpeed>('normal');
  const [trackDuration, setTrackDuration] = useState<15 | 30>(15);
  const [trackTimeLeft, setTrackTimeLeft] = useState<number>(15);
  const [trackPos, setTrackPos] = useState<AimTarget>({ x: 50, y: 50 });
  const [isPointerOnTarget, setIsPointerOnTarget] = useState(false);
  const [trackPct, setTrackPct] = useState(0);
  const [bestTrackPct, setBestTrackPct] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('helpful-smile-best-tracking');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const trackCanvasRef = useRef<HTMLDivElement>(null);
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const trackStateRef = useRef({
    x: 50,
    y: 50,
    vx: 26,
    vy: 19,
    trackedMs: 0,
    totalMs: 0,
  });

  const startTrackingRound = () => {
    const baseSpeed = trackSpeed === 'slow' ? 18 : trackSpeed === 'normal' ? 28 : 40;
    const angle = (Math.PI / 4) + Math.random() * (Math.PI / 3);
    trackStateRef.current = {
      x: 50,
      y: 50,
      vx: Math.cos(angle) * baseSpeed * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.sin(angle) * baseSpeed * (Math.random() > 0.5 ? 1 : -1),
      trackedMs: 0,
      totalMs: 0,
    };
    setTrackPos({ x: 50, y: 50 });
    setTrackPct(0);
    setIsPointerOnTarget(false);
    setTrackTimeLeft(trackDuration);
    setTrackFinished(false);
    setTrackRunning(true);
  };

  useEffect(() => {
    if (!trackRunning) return;
    let rafId = 0;
    let lastTs = performance.now();
    const startTs = lastTs;
    const totalRoundMs = trackDuration * 1000;

    const tick = (now: number) => {
      const dtSec = Math.min(0.05, (now - lastTs) / 1000);
      const dtMs = now - lastTs;
      lastTs = now;

      const st = trackStateRef.current;
      st.x += st.vx * dtSec;
      st.y += st.vy * dtSec;

      if (st.x <= 8) {
        st.x = 8;
        st.vx = Math.abs(st.vx);
      } else if (st.x >= 92) {
        st.x = 92;
        st.vx = -Math.abs(st.vx);
      }
      if (st.y <= 12) {
        st.y = 12;
        st.vy = Math.abs(st.vy);
      } else if (st.y >= 88) {
        st.y = 88;
        st.vy = -Math.abs(st.vy);
      }

      let onTargetNow = false;
      const canvasEl = trackCanvasRef.current;
      const ptr = pointerPosRef.current;
      if (canvasEl && ptr) {
        const rect = canvasEl.getBoundingClientRect();
        const tx = (st.x / 100) * rect.width;
        const ty = (st.y / 100) * rect.height;
        const dist = Math.hypot(ptr.x - tx, ptr.y - ty);
        onTargetNow = dist <= 32;
      }

      st.totalMs += dtMs;
      if (onTargetNow) {
        st.trackedMs += dtMs;
      }

      const pct = st.totalMs > 0 ? Math.round((st.trackedMs / st.totalMs) * 100) : 0;
      const elapsedMs = now - startTs;
      const remainingSec = Math.max(0, Math.ceil((totalRoundMs - elapsedMs) / 1000));

      setTrackPos({ x: st.x, y: st.y });
      setIsPointerOnTarget(onTargetNow);
      setTrackPct(pct);
      setTrackTimeLeft(remainingSec);

      if (elapsedMs >= totalRoundMs) {
        setTrackRunning(false);
        setTrackFinished(true);
        setIsPointerOnTarget(false);
        if (pct > bestTrackPct) {
          setBestTrackPct(pct);
          try {
            localStorage.setItem('helpful-smile-best-tracking', String(pct));
          } catch {
            // Ignorar errores de almacenamiento
          }
        }
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [trackRunning, trackDuration, bestTrackPct]);

  const getTrackingFeedback = () => {
    if (trackPct < 45) return t.trainingLab.tracking.feedbackLow;
    if (trackPct < 75) return t.trainingLab.tracking.feedbackMid;
    return t.trainingLab.tracking.feedbackHigh;
  };

  // --- Tactical Key Combos State ---
  const [keysRunning, setKeysRunning] = useState(false);
  const [keysFinished, setKeysFinished] = useState(false);
  const [keysTimeLeft, setKeysTimeLeft] = useState(20);
  const [currentKey, setCurrentKey] = useState<TacticalKey>('W');
  const [keyHits, setKeyHits] = useState(0);
  const [keyAttempts, setKeyAttempts] = useState(0);
  const [keyStreak, setKeyStreak] = useState(0);
  const [keyMaxStreak, setKeyMaxStreak] = useState(0);
  const [keyFlash, setKeyFlash] = useState<'hit' | 'miss' | null>(null);
  const keyPromptAtRef = useRef<number>(0);
  const [keyReactionSum, setKeyReactionSum] = useState(0);
  const [bestKeyHits, setBestKeyHits] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('helpful-smile-best-keys');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const nextRandomKey = useCallback((prevKey?: TacticalKey) => {
    const candidates = prevKey
      ? TACTICAL_KEYS.filter((k) => k !== prevKey)
      : TACTICAL_KEYS;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, []);

  const startKeysRound = () => {
    const first = nextRandomKey();
    setCurrentKey(first);
    setKeyHits(0);
    setKeyAttempts(0);
    setKeyStreak(0);
    setKeyMaxStreak(0);
    setKeyReactionSum(0);
    setKeyFlash(null);
    setKeysTimeLeft(20);
    setKeysFinished(false);
    setKeysRunning(true);
    keyPromptAtRef.current = performance.now();
  };

  const handleTacticalKeyInput = useCallback(
    (pressed: TacticalKey) => {
      if (!keysRunning) return;
      setKeyAttempts((a) => a + 1);
      if (pressed === currentKey) {
        const dt = Math.round(performance.now() - keyPromptAtRef.current);
        setKeyReactionSum((sum) => sum + dt);
        setKeyHits((h) => h + 1);
        setKeyStreak((s) => {
          const next = s + 1;
          setKeyMaxStreak((m) => Math.max(m, next));
          return next;
        });
        setKeyFlash('hit');
        const nextK = nextRandomKey(currentKey);
        setCurrentKey(nextK);
        keyPromptAtRef.current = performance.now();
      } else {
        setKeyStreak(0);
        setKeyFlash('miss');
      }
      window.setTimeout(() => setKeyFlash(null), 160);
    },
    [keysRunning, currentKey, nextRandomKey]
  );

  useEffect(() => {
    if (!keysRunning || activeTool !== 'keys') return;
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      const upper = e.code === 'Space' ? 'SPACE' : e.key.toUpperCase();
      if (TACTICAL_KEYS.includes(upper as TacticalKey)) {
        e.preventDefault();
        handleTacticalKeyInput(upper as TacticalKey);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [keysRunning, activeTool, handleTacticalKeyInput]);

  useEffect(() => {
    if (!keysRunning) return;
    const timer = window.setInterval(() => {
      setKeysTimeLeft((prev) => {
        if (prev <= 1) {
          setKeysRunning(false);
          setKeysFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [keysRunning]);

  useEffect(() => {
    if (keysFinished && keyHits > bestKeyHits) {
      setBestKeyHits(keyHits);
      try {
        localStorage.setItem('helpful-smile-best-keys', String(keyHits));
      } catch {
        // Ignorar errores de almacenamiento
      }
    }
  }, [keysFinished, keyHits, bestKeyHits]);

  const keyAccuracy = keyAttempts > 0 ? Math.round((keyHits / keyAttempts) * 100) : 100;
  const keyAvgMs = keyHits > 0 ? Math.round(keyReactionSum / keyHits) : 0;

  const getKeysFeedback = () => {
    if (keyAccuracy < 85) return t.trainingLab.keys.feedbackLowAcc;
    if (keyHits < 22) return t.trainingLab.keys.feedbackSlow;
    return t.trainingLab.keys.feedbackGood;
  };

  // --- eDPI Calculator State ---
  const [selectedEdpiGame, setSelectedEdpiGame] = useState<string>('valorant');
  const [dpiInput, setDpiInput] = useState<number>(800);
  const [sensInput, setSensInput] = useState<number>(0.35);

  const activePreset =
    EDPI_PRESETS.find((g) => g.id === selectedEdpiGame) ?? EDPI_PRESETS[0];

  const handleGamePresetChange = (gameId: string) => {
    setSelectedEdpiGame(gameId);
    if (gameId === 'valorant') setSensInput(0.35);
    if (gameId === 'cs2') setSensInput(1.0);
    if (gameId === 'apex') setSensInput(1.4);
    if (gameId === 'fortnite') setSensInput(6.5);
    if (gameId === 'overwatch2') setSensInput(4.5);
    if (gameId === 'r6') setSensInput(8.0);
    if (gameId === 'marvelrivals') setSensInput(1.5);
    if (gameId === 'warzone') setSensInput(5.0);
    if (gameId === 'pubg') setSensInput(35);
    if (gameId === 'destiny2') setSensInput(5.0);
    if (gameId === 'halo') setSensInput(1.4);
    if (gameId === 'rust') setSensInput(0.35);
  };

  const edpiValue =
    activePreset.id === 'fortnite'
      ? Math.round(dpiInput * (sensInput / 100) * 10) / 10
      : Math.round(dpiInput * sensInput * 10) / 10;

  const effectiveDegSens =
    activePreset.id === 'fortnite'
      ? dpiInput * (sensInput / 100) * activePreset.yaw
      : dpiInput * sensInput * activePreset.yaw;

  const cmPer360 =
    effectiveDegSens > 0 ? ((360 / effectiveDegSens) * 2.54).toFixed(1) : '0.0';

  const getEdpiVerdict = () => {
    if (edpiValue < activePreset.recommendedMin) {
      return {
        label: t.trainingLab.edpi.verdictLowTitle,
        detail: t.trainingLab.edpi.verdictLowDetail,
        status: 'warn' as const,
      };
    }
    if (edpiValue > activePreset.recommendedMax) {
      return {
        label: t.trainingLab.edpi.verdictHighTitle,
        detail: t.trainingLab.edpi.verdictHighDetail,
        status: 'warn' as const,
      };
    }
    return {
      label: t.trainingLab.edpi.verdictGoodTitle,
      detail: t.trainingLab.edpi.verdictGoodDetail,
      status: 'good' as const,
    };
  };

  const edpiVerdict = getEdpiVerdict();

  return (
    <section id="entrenamiento" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] mb-2">
            {t.trainingLab.eyebrow}
          </p>
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/f491f4f38222961d0f0d49669b37e750_bca928f3.jpg"
              alt="Logo de Helpful Smile"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700 shrink-0"
            />
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t.trainingLab.title}
            </h2>
          </div>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
            {t.trainingLab.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg w-full md:w-fit">
          <button
            type="button"
            onClick={() => setActiveTool('aim')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTool === 'aim'
                ? 'bg-white dark:bg-[#2563EB] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>{t.trainingLab.tabAim}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('tracking')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTool === 'tracking'
                ? 'bg-white dark:bg-[#2563EB] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Move className="w-4 h-4" />
            <span>{t.trainingLab.tabTracking}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('reaction')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTool === 'reaction'
                ? 'bg-white dark:bg-[#2563EB] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{t.trainingLab.tabReaction}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('keys')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTool === 'keys'
                ? 'bg-white dark:bg-[#2563EB] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            <span>{t.trainingLab.tabKeys}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('edpi')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTool === 'edpi'
                ? 'bg-white dark:bg-[#2563EB] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{t.trainingLab.tabEdpi}</span>
          </button>
        </div>
      </div>

      {/* Herramienta 1: Aim Grid */}
      {activeTool === 'aim' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.trainingLab.aim.sizeLabel}
                </span>
                {(['small', 'medium', 'large'] as TargetSize[]).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    disabled={aimRunning}
                    onClick={() => setTargetSize(sz)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 ${
                      targetSize === sz
                        ? 'bg-slate-900 dark:bg-[#2563EB] text-white border-slate-900 dark:border-[#2563EB]'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {sz === 'small'
                      ? t.trainingLab.aim.small
                      : sz === 'medium'
                      ? t.trainingLab.aim.medium
                      : t.trainingLab.aim.large}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.trainingLab.aim.timeLabel}
                </span>
                {([15, 30] as const).map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    disabled={aimRunning}
                    onClick={() => {
                      setDurationSec(sec);
                      setTimeLeft(sec);
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors font-mono tabular-nums whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 ${
                      durationSec === sec
                        ? 'bg-slate-900 dark:bg-[#2563EB] text-white border-slate-900 dark:border-[#2563EB]'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-sm tabular-nums">
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.aim.timeCounter}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{timeLeft}s</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.aim.hitsCounter}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{hits}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.aim.accuracyCounter}
                </span>
                <span className="font-semibold text-[#2563EB] dark:text-[#60A5FA]">{accuracy}%</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.aim.recordCounter}
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{bestHits}</span>
              </div>
            </div>
          </div>

          <div
            onClick={handleCanvasClick}
            className="relative w-full h-[380px] sm:h-[420px] bg-[#0F172A] select-none overflow-hidden cursor-crosshair"
          >
            {/* Cuadrícula sutil de referencia espacial */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #94A3B8 1px, transparent 1px), linear-gradient(to bottom, #94A3B8 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {!aimRunning && !aimFinished && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900/60">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t.trainingLab.aim.idleTitle}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mb-6">
                  {t.trainingLab.aim.idleDesc}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startAimRound();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>{t.trainingLab.aim.startButton(durationSec)}</span>
                </button>
              </div>
            )}

            {aimRunning && (
              <button
                type="button"
                aria-label={t.trainingLab.aim.targetAria}
                onClick={handleTargetHit}
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${targetSizePx} rounded-full bg-[#ff0000] border-2 border-white shadow-md transition-transform active:scale-90 cursor-crosshair flex items-center justify-center`}
              >
                <span className="w-2 h-2 rounded-full bg-white pointer-events-none" />
              </button>
            )}

            {aimFinished && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/85">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  {t.trainingLab.aim.resultLabel}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 my-4 font-mono tabular-nums">
                  <div>
                    <div className="text-3xl font-bold text-white">{hits}</div>
                    <div className="text-xs text-slate-400">{t.trainingLab.aim.targetsLabel}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#60A5FA]">{accuracy}%</div>
                    <div className="text-xs text-slate-400">{t.trainingLab.aim.accuracyLabel}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-400">
                      {targetsPerSec}
                    </div>
                    <div className="text-xs text-slate-400">{t.trainingLab.aim.targetsPerSecLabel}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-200 max-w-lg mb-6 leading-relaxed">
                  {getAimCoachFeedback()}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startAimRound();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.trainingLab.aim.repeatButton}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Herramienta 2: Seguimiento Continuo (Tracking) */}
      {activeTool === 'tracking' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.trainingLab.tracking.speedLabel}
                </span>
                {(['slow', 'normal', 'fast'] as TrackingSpeed[]).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    disabled={trackRunning}
                    onClick={() => setTrackSpeed(spd)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 ${
                      trackSpeed === spd
                        ? 'bg-slate-900 dark:bg-[#2563EB] text-white border-slate-900 dark:border-[#2563EB]'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {spd === 'slow'
                      ? t.trainingLab.tracking.slow
                      : spd === 'normal'
                      ? t.trainingLab.tracking.normal
                      : t.trainingLab.tracking.fast}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.trainingLab.tracking.timeLabel}
                </span>
                {([15, 30] as const).map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    disabled={trackRunning}
                    onClick={() => {
                      setTrackDuration(sec);
                      setTrackTimeLeft(sec);
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors font-mono tabular-nums whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 ${
                      trackDuration === sec
                        ? 'bg-slate-900 dark:bg-[#2563EB] text-white border-slate-900 dark:border-[#2563EB]'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-sm tabular-nums">
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.tracking.timeCounter}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {trackTimeLeft}s
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.tracking.trackingCounter}
                </span>
                <span className="font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                  {trackPct}%
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.tracking.recordCounter}
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {bestTrackPct}%
                </span>
              </div>
            </div>
          </div>

          <div
            ref={trackCanvasRef}
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              pointerPosRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              };
            }}
            onPointerDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              pointerPosRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              };
            }}
            onPointerLeave={() => {
              pointerPosRef.current = null;
            }}
            className="relative w-full h-[380px] sm:h-[420px] bg-[#0F172A] select-none overflow-hidden cursor-crosshair touch-none"
          >
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #94A3B8 1px, transparent 1px), linear-gradient(to bottom, #94A3B8 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {!trackRunning && !trackFinished && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900/60">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t.trainingLab.tracking.idleTitle}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mb-6">
                  {t.trainingLab.tracking.idleDesc}
                </p>
                <button
                  type="button"
                  onClick={startTrackingRound}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>{t.trainingLab.tracking.startButton(trackDuration)}</span>
                </button>
              </div>
            )}

            {trackRunning && (
              <>
                <div className="absolute top-3 left-4 pointer-events-none">
                  <span
                    className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md border ${
                      isPointerOnTarget
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300'
                    }`}
                  >
                    {isPointerOnTarget
                      ? t.trainingLab.tracking.onTarget
                      : t.trainingLab.tracking.offTarget}
                  </span>
                </div>
                <div
                  style={{ left: `${trackPos.x}%`, top: `${trackPos.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white pointer-events-none flex items-center justify-center transition-colors ${
                    isPointerOnTarget
                      ? 'bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.75)]'
                      : 'bg-[#2563EB] shadow-[0_0_16px_rgba(37,99,235,0.55)]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
              </>
            )}

            {trackFinished && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/85">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  {t.trainingLab.tracking.resultLabel}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 my-4 font-mono tabular-nums">
                  <div>
                    <div className="text-3xl font-bold text-[#60A5FA]">{trackPct}%</div>
                    <div className="text-xs text-slate-400">
                      {t.trainingLab.tracking.onTargetPctLabel}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {((trackPct / 100) * trackDuration).toFixed(1)}s
                    </div>
                    <div className="text-xs text-slate-400">
                      {t.trainingLab.tracking.timeTrackedLabel}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-400">
                      {bestTrackPct}%
                    </div>
                    <div className="text-xs text-slate-400">
                      {t.trainingLab.tracking.bestLabel}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-200 max-w-lg mb-6 leading-relaxed">
                  {getTrackingFeedback()}
                </p>
                <button
                  type="button"
                  onClick={startTrackingRound}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.trainingLab.tracking.repeatButton}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Herramienta 3: Test de Reflejos */}
      {activeTool === 'reaction' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <button
                type="button"
                onClick={handleReactionPadClick}
                className={`w-full h-[340px] flex flex-col items-center justify-center p-8 text-center transition-colors cursor-pointer ${
                  reactionState === 'ready'
                    ? 'bg-emerald-600 text-white'
                    : reactionState === 'waiting'
                    ? 'bg-amber-600 text-white'
                    : reactionState === 'tooSoon'
                    ? 'bg-rose-700 text-white'
                    : 'bg-[#0F172A] text-white hover:bg-slate-900'
                }`}
              >
                {reactionState === 'idle' && (
                  <>
                    <Zap className="w-10 h-10 mb-3 text-[#60A5FA]" />
                    <h3 className="text-2xl font-bold mb-2">
                      {t.trainingLab.reaction.idleTitle}
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md">
                      {t.trainingLab.reaction.idleDesc}
                    </p>
                  </>
                )}
                {reactionState === 'waiting' && (
                  <>
                    <h3 className="text-2xl font-bold mb-2">
                      {t.trainingLab.reaction.waitingTitle}
                    </h3>
                    <p className="text-sm text-amber-100">
                      {t.trainingLab.reaction.waitingDesc}
                    </p>
                  </>
                )}
                {reactionState === 'ready' && (
                  <>
                    <h3 className="text-4xl font-bold mb-2">
                      {t.trainingLab.reaction.readyTitle}
                    </h3>
                    <p className="text-sm text-emerald-100">
                      {t.trainingLab.reaction.readyDesc}
                    </p>
                  </>
                )}
                {reactionState === 'tooSoon' && (
                  <>
                    <AlertCircle className="w-10 h-10 mb-3" />
                    <h3 className="text-2xl font-bold mb-2">
                      {t.trainingLab.reaction.tooSoonTitle}
                    </h3>
                    <p className="text-sm text-rose-100">
                      {t.trainingLab.reaction.tooSoonDesc}
                    </p>
                  </>
                )}
                {reactionState === 'result' && lastReaction !== null && (
                  <>
                    <p className="text-xs font-medium text-slate-400 mb-1">
                      {t.trainingLab.reaction.measuredLabel}
                    </p>
                    <h3 className="text-5xl font-bold font-mono tabular-nums mb-3">
                      {lastReaction} ms
                    </h3>
                    <p className="text-sm text-slate-300">
                      {t.trainingLab.reaction.resultDesc}
                    </p>
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-4 p-6 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {t.trainingLab.reaction.logTitle}
                </h4>
                {reactionTimes.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t.trainingLab.reaction.emptyLog}
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {t.trainingLab.reaction.recentAvg}
                      </span>
                      <span className="text-2xl font-bold font-mono tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                        {avgReaction} ms
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 font-mono text-xs tabular-nums text-slate-600 dark:text-slate-300">
                      {reactionTimes.map((timeVal, i) => (
                        <span
                          key={`${timeVal}-${i}`}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
                        >
                          #{i + 1}: {timeVal}ms
                        </span>
                      ))}
                    </div>
                    {avgReaction !== null && (
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
                        {getReactionFeedback(avgReaction)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {reactionTimes.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setReactionTimes([]);
                    setLastReaction(null);
                    setReactionState('idle');
                  }}
                  className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.trainingLab.reaction.clearHistory}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Herramienta 4: Combos y Teclas Tácticas */}
      {activeTool === 'keys' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.trainingLab.keys.durationBadge}
            </span>
            <div className="flex flex-wrap items-center gap-5 font-mono text-sm tabular-nums">
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.keys.timeCounter}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {keysTimeLeft}s
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.keys.hitsCounter}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {keyHits}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.keys.streakCounter}
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {keyStreak}x
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.keys.accuracyCounter}
                </span>
                <span className="font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                  {keyAccuracy}%
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-500 dark:text-slate-400 mr-1.5">
                  {t.trainingLab.keys.recordCounter}
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {bestKeyHits}
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-full min-h-[380px] sm:min-h-[400px] bg-[#0F172A] p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            {!keysRunning && !keysFinished && (
              <div className="max-w-md">
                <Keyboard className="w-10 h-10 text-[#60A5FA] mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t.trainingLab.keys.idleTitle}
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {t.trainingLab.keys.idleDesc}
                </p>
                <button
                  type="button"
                  onClick={startKeysRound}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>{t.trainingLab.keys.startButton}</span>
                </button>
              </div>
            )}

            {keysRunning && (
              <div className="w-full max-w-lg flex flex-col items-center">
                <p className="text-xs font-medium text-slate-400 mb-3">
                  {t.trainingLab.keys.promptHint}
                </p>
                <div
                  className={`min-w-[112px] px-6 h-24 rounded-2xl border-2 flex items-center justify-center font-mono text-4xl font-bold tracking-tight transition-colors mb-8 ${
                    keyFlash === 'hit'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : keyFlash === 'miss'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                      : 'bg-slate-800/90 border-[#60A5FA] text-white'
                  }`}
                >
                  {currentKey === 'SPACE' ? t.trainingLab.keys.spaceLabel : currentKey}
                </div>

                <div className="grid grid-cols-4 gap-2.5 w-full max-w-sm">
                  {TACTICAL_KEYS.map((keyOpt) => {
                    const isActivePrompt = keyOpt === currentKey;
                    return (
                      <button
                        key={keyOpt}
                        type="button"
                        onClick={() => handleTacticalKeyInput(keyOpt)}
                        className={`py-3 rounded-lg border font-mono text-sm font-bold transition-colors cursor-pointer ${
                          isActivePrompt
                            ? 'bg-[#2563EB] border-[#60A5FA] text-white'
                            : 'bg-slate-800/70 border-slate-700 text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {keyOpt === 'SPACE' ? t.trainingLab.keys.spaceLabel : keyOpt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {keysFinished && (
              <div className="max-w-lg">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  {t.trainingLab.keys.resultLabel}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 my-4 font-mono tabular-nums">
                  <div>
                    <div className="text-3xl font-bold text-white">{keyHits}</div>
                    <div className="text-xs text-slate-400">
                      {t.trainingLab.keys.hitsCounter.replace(':', '')}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#60A5FA]">{keyAvgMs}</div>
                    <div className="text-xs text-slate-400">
                      {t.trainingLab.keys.avgMsLabel}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-400">
                      {keyMaxStreak}x
                    </div>
                    <div className="text-xs text-slate-400">
                      {t.trainingLab.keys.maxStreakLabel}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-200 mb-6 leading-relaxed">
                  {getKeysFeedback()}
                </p>
                <button
                  type="button"
                  onClick={startKeysRound}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.trainingLab.keys.repeatButton}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Herramienta 5: Calculadora de Sensibilidad y eDPI */}
      {activeTool === 'edpi' && (
        <div
          id="calculadora"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                  {t.trainingLab.edpi.selectGame}
                </label>
                <div className="flex flex-wrap gap-2">
                  {EDPI_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleGamePresetChange(preset.id)}
                      className={`px-3.5 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedEdpiGame === preset.id
                          ? 'bg-slate-900 dark:bg-[#2563EB] text-white border-slate-900 dark:border-[#2563EB]'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="dpi-input"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    {t.trainingLab.edpi.mouseDpi}
                  </label>
                  <input
                    id="dpi-input"
                    type="number"
                    min={100}
                    max={16000}
                    step={50}
                    value={dpiInput}
                    onChange={(e) => setDpiInput(Math.max(100, Number(e.target.value) || 400))}
                    className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#2563EB] dark:focus:border-[#60A5FA]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sens-input"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    {activePreset.id === 'fortnite'
                      ? t.trainingLab.edpi.sensPercent
                      : t.trainingLab.edpi.sensIngame}
                  </label>
                  <input
                    id="sens-input"
                    type="number"
                    min={0.01}
                    max={100}
                    step={0.05}
                    value={sensInput}
                    onChange={(e) =>
                      setSensInput(Math.max(0.01, Number(e.target.value) || 0.1))
                    }
                    className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#2563EB] dark:focus:border-[#60A5FA]"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.trainingLab.edpi.notes[activePreset.id] ?? activePreset.note}
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#F7F8FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4 pb-5 border-b border-slate-200 dark:border-slate-800 mb-5">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {t.trainingLab.edpi.effectiveEdpi}
                  </p>
                  <p className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                    {edpiValue}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {t.trainingLab.edpi.turn360}
                  </p>
                  <p className="text-3xl font-bold font-mono tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                    {cmPer360} cm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 mb-3">
                {edpiVerdict.status === 'good' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {edpiVerdict.label}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {edpiVerdict.detail}
                  </p>
                </div>
              </div>

              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums pt-3 border-t border-slate-200 dark:border-slate-800">
                {t.trainingLab.edpi.recommendedRange(
                  activePreset.name,
                  activePreset.recommendedMin,
                  activePreset.recommendedMax
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
