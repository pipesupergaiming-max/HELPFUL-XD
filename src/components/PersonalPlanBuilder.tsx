import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  RotateCcw,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { GAMES_CATALOG, GameGuide } from '../data/gamesData';
import { useLanguage } from '../i18n/LanguageContext';

type SkillTier = 'Principiante' | 'Intermedio' | 'Avanzado';
type WeaknessArea =
  | 'Puntería y control mecánico'
  | 'Posicionamiento y lectura de mapa'
  | 'Decisiones bajo presión'
  | 'Mentalidad y control de frustración';
type DailyBudget = 15 | 30 | 60;

interface SavedPlan {
  gameId: string;
  tier: SkillTier;
  weakness: WeaknessArea;
  minutes: DailyBudget;
  checkedSteps: Record<string, boolean>;
}

const WEAKNESS_OPTIONS: WeaknessArea[] = [
  'Puntería y control mecánico',
  'Posicionamiento y lectura de mapa',
  'Decisiones bajo presión',
  'Mentalidad y control de frustración',
];

const TIER_OPTIONS: SkillTier[] = ['Principiante', 'Intermedio', 'Avanzado'];
const TIME_OPTIONS: DailyBudget[] = [15, 30, 60];

interface PersonalPlanBuilderProps {
  onSelectGame: (gameId: string) => void;
}

export const PersonalPlanBuilder: React.FC<PersonalPlanBuilderProps> = ({
  onSelectGame,
}) => {
  const { t } = useLanguage();
  const [savedPlan, setSavedPlan] = useState<SavedPlan | null>(() => {
    try {
      const raw = localStorage.getItem('helpful-smile-user-plan');
      return raw ? (JSON.parse(raw) as SavedPlan) : null;
    } catch {
      return null;
    }
  });

  const [gameId, setGameId] = useState<string>(
    savedPlan?.gameId ?? GAMES_CATALOG[0].id
  );
  const [tier, setTier] = useState<SkillTier>(savedPlan?.tier ?? 'Intermedio');
  const [weakness, setWeakness] = useState<WeaknessArea>(
    savedPlan?.weakness ?? 'Puntería y control mecánico'
  );
  const [minutes, setMinutes] = useState<DailyBudget>(savedPlan?.minutes ?? 30);

  useEffect(() => {
    try {
      if (savedPlan) {
        localStorage.setItem('helpful-smile-user-plan', JSON.stringify(savedPlan));
      } else {
        localStorage.removeItem('helpful-smile-user-plan');
      }
    } catch {
      // Ignorar errores de almacenamiento
    }
  }, [savedPlan]);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedPlan({
      gameId,
      tier,
      weakness,
      minutes,
      checkedSteps: {},
    });
  };

  const toggleStep = (stepId: string) => {
    if (!savedPlan) return;
    setSavedPlan({
      ...savedPlan,
      checkedSteps: {
        ...savedPlan.checkedSteps,
        [stepId]: !savedPlan.checkedSteps[stepId],
      },
    });
  };

  const buildRoutineBlocks = (plan: SavedPlan, game: GameGuide) => {
    const warmupMins = plan.minutes === 15 ? 5 : plan.minutes === 30 ? 10 : 15;
    const focusMins = plan.minutes === 15 ? 7 : plan.minutes === 30 ? 15 : 30;
    const reviewMins = plan.minutes - warmupMins - focusMins;

    const firstDrill =
      game.dailyDrills[0]?.task ??
      t.personalPlan.fallbackDrill(game.name);

    const weaknessBlock = (() => {
      switch (plan.weakness) {
        case 'Puntería y control mecánico':
          return t.personalPlan.focusAim(
            game.name,
            game.recommendations[0]?.title ?? 'Mecánica base',
            focusMins
          );
        case 'Posicionamiento y lectura de mapa':
          return t.personalPlan.focusPosition(
            game.name,
            game.recommendations[1]?.title ?? 'Control de ángulos',
            focusMins
          );
        case 'Decisiones bajo presión':
          return t.personalPlan.focusDecision(
            game.recommendations[2]?.title ?? 'Toma de decisiones',
            focusMins
          );
        case 'Mentalidad y control de frustración':
          return t.personalPlan.focusMental(focusMins);
      }
    })();

    const reviewBlock =
      plan.tier === 'Principiante'
        ? t.personalPlan.reviewBeginner(game.name, reviewMins)
        : t.personalPlan.reviewAdvanced(reviewMins);

    return [
      {
        id: 'step-warmup',
        phase: t.personalPlan.phase1,
        duration: `${warmupMins} ${t.personalPlan.minUnit}`,
        text: firstDrill,
      },
      {
        id: 'step-focus',
        phase: t.personalPlan.phase2,
        duration: `${focusMins} ${t.personalPlan.minUnit}`,
        text: weaknessBlock,
      },
      {
        id: 'step-review',
        phase: t.personalPlan.phase3,
        duration: `${reviewMins} ${t.personalPlan.minUnit}`,
        text: reviewBlock,
      },
    ];
  };

  const activeGame =
    GAMES_CATALOG.find((g) => g.id === (savedPlan?.gameId ?? gameId)) ??
    GAMES_CATALOG[0];

  return (
    <section
      id="mi-plan"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-8">
        <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] mb-2">
          {t.personalPlan.eyebrow}
        </p>
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/f491f4f38222961d0f0d49669b37e750_bca928f3.jpg"
            alt="Logo de Helpful Smile"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700 shrink-0"
          />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.personalPlan.title}
          </h2>
        </div>
        <p className="text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
          {t.personalPlan.subtitle}
        </p>
      </div>

      {!savedPlan ? (
        <form
          onSubmit={handleGeneratePlan}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label
                htmlFor="plan-game"
                className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2"
              >
                {t.personalPlan.q1}
              </label>
              <select
                id="plan-game"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#60A5FA]"
              >
                {GAMES_CATALOG.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({t.catalog.genres[g.genre]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                {t.personalPlan.q2}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TIER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTier(option)}
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      tier === option
                        ? 'bg-slate-900 dark:bg-[#2563EB] text-white border-slate-900 dark:border-[#2563EB]'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {t.personalPlan.tiers[option]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                {t.personalPlan.q3}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TIME_OPTIONS.map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setMinutes(mins)}
                    className={`px-3 py-2.5 text-sm font-medium font-mono tabular-nums rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      minutes === mins
                        ? 'bg-slate-900 dark:bg-[#2563EB] text-white border-slate-900 dark:border-[#2563EB]'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {mins} {t.personalPlan.minUnit}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                {t.personalPlan.q4}
              </span>
              <div className="space-y-2.5">
                {WEAKNESS_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setWeakness(item)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                      weakness === item
                        ? 'bg-[#2563EB]/5 dark:bg-[#2563EB]/20 border-[#2563EB] dark:border-[#60A5FA] text-[#1D4ED8] dark:text-[#93C5FD]'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {t.personalPlan.weaknesses[item]}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>{t.personalPlan.generateButton}</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                <span>{activeGame.name}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {t.personalPlan.levelPrefix}{' '}
                  {t.personalPlan.tiers[savedPlan.tier].toLowerCase()}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {savedPlan.minutes} {t.personalPlan.minPerDay}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {t.personalPlan.goalPrefix}{' '}
                {t.personalPlan.weaknesses[savedPlan.weakness].toLowerCase()}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectGame(activeGame.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{t.personalPlan.viewGuide(activeGame.name)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setSavedPlan(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.personalPlan.changeGoal}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {buildRoutineBlocks(savedPlan, activeGame).map((block) => {
              const checked = Boolean(savedPlan.checkedSteps[block.id]);
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => toggleStep(block.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-colors flex items-start justify-between gap-4 cursor-pointer ${
                    checked
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {checked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        {block.phase}
                      </p>
                      <p
                        className={`text-sm font-medium leading-relaxed ${
                          checked
                            ? 'line-through text-slate-500 dark:text-slate-400'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {block.text}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-medium text-[#2563EB] dark:text-[#60A5FA] whitespace-nowrap shrink-0 tabular-nums">
                    {block.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
