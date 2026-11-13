import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckSquare,
  Square,
  ChevronRight,
  Target,
  AlertTriangle,
  SlidersHorizontal,
  ListChecks,
  RotateCcw,
} from 'lucide-react';
import { GameGuide, GENRE_IMAGES } from '../data/gamesData';
import { ResilientImage } from './ResilientImage';
import { useLanguage } from '../i18n/LanguageContext';

interface GameDetailViewProps {
  game: GameGuide;
  completedDrills: Record<string, boolean>;
  onToggleDrill: (drillId: string) => void;
  onResetGameDrills: (gameId: string, drillIds: string[]) => void;
  onBack: () => void;
  onOpenTrainer: () => void;
}

type DetailTab = 'consejos' | 'errores' | 'ajustes' | 'rutina';

export const GameDetailView: React.FC<GameDetailViewProps> = ({
  game,
  completedDrills,
  onToggleDrill,
  onResetGameDrills,
  onBack,
  onOpenTrainer,
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<DetailTab>('consejos');
  const [selectedMistakeId, setSelectedMistakeId] = useState<string>(
    game.commonMistakes[0]?.id ?? ''
  );

  const completedCount = game.dailyDrills.filter((d) => completedDrills[d.id]).length;
  const totalDrills = game.dailyDrills.length;
  const selectedMistake =
    game.commonMistakes.find((m) => m.id === selectedMistakeId) ?? game.commonMistakes[0];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors mb-6 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.gameDetail.backToCatalog}</span>
      </button>

      {/* Cabecera del juego seleccionado */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                <span>{t.catalog.genres[game.genre]}</span>
                <span aria-hidden="true">·</span>
                <span>{game.platform}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {t.gameDetail.demandPrefix}{' '}
                  {t.gameDetail.difficulties[game.difficulty]}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/assets/aistudio/f491f4f38222961d0f0d49669b37e750_bca928f3.jpg"
                  alt="Logo de Helpful Smile"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                />
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {game.name}
                </h1>
              </div>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6">
                {game.summary}
              </p>
              {language !== 'es' && t.gameDetail.spanishGuideNotice && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {t.gameDetail.spanishGuideNotice}
                </p>
              )}
            </div>

            <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                  {t.gameDetail.mainFocus}
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {game.skillFocus}
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenTrainer}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <Target className="w-4 h-4" />
                <span>{t.gameDetail.practiceButton}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] bg-slate-100 dark:bg-slate-800 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
            <ResilientImage
              src={GENRE_IMAGES[game.genre]}
              alt={t.catalog.imageAlt(game.name)}
              fallbackLabel={game.name}
              className="w-full h-full object-cover lg:absolute lg:inset-0"
            />
          </div>
        </div>
      </div>

      {/* Pestañas de navegación interna */}
      <div
        role="tablist"
        aria-label={t.gameDetail.tabsAria}
        className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg mb-8 w-full sm:w-fit"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'consejos'}
          onClick={() => setActiveTab('consejos')}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'consejos'
              ? 'bg-slate-900 dark:bg-[#2563EB] text-white'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{t.gameDetail.tabTips}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'errores'}
          onClick={() => setActiveTab('errores')}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'errores'
              ? 'bg-slate-900 dark:bg-[#2563EB] text-white'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{t.gameDetail.tabMistakes}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'ajustes'}
          onClick={() => setActiveTab('ajustes')}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'ajustes'
              ? 'bg-slate-900 dark:bg-[#2563EB] text-white'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{t.gameDetail.tabSettings}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'rutina'}
          onClick={() => setActiveTab('rutina')}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'rutina'
              ? 'bg-slate-900 dark:bg-[#2563EB] text-white'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          <span className="tabular-nums">
            {t.gameDetail.tabRoutine} ({completedCount}/{totalDrills})
          </span>
        </button>
      </div>

      {/* Tab 1: Consejos por pilares */}
      {activeTab === 'consejos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {game.recommendations.map((rec, index) => (
            <article
              key={rec.title}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-mono tabular-nums">0{index + 1}</span>
                  <span>{t.gameDetail.pillars[rec.pillar]}</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  {rec.title}
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
                  {rec.advice}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {t.gameDetail.whyItWorks}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {rec.whyItWorks}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Tab 2: Diagnóstico interactivo de errores */}
      {activeTab === 'errores' && selectedMistake && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5">
              {t.gameDetail.selectProblem}
            </h2>
            {game.commonMistakes.map((mistake) => {
              const isSelected = mistake.id === selectedMistake.id;
              return (
                <button
                  key={mistake.id}
                  type="button"
                  onClick={() => setSelectedMistakeId(mistake.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-[#2563EB] text-slate-900 dark:text-slate-100'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-medium leading-snug">
                    {mistake.problem}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              {t.gameDetail.diagnosticSubtitle}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              {selectedMistake.problem}
            </h3>

            <div className="space-y-6">
              <div className="pb-5 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  {t.gameDetail.symptomTitle}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedMistake.symptom}
                </p>
              </div>

              <div className="pb-5 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] mb-1.5">
                  {t.gameDetail.fixTitle}
                </h4>
                <p className="text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                  {selectedMistake.fix}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5">
                  {t.gameDetail.drillTitle}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedMistake.drillToFix}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Ajustes recomendados */}
      {activeTab === 'ajustes' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {t.gameDetail.settingsHeader(game.name)}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {t.gameDetail.settingsSubtitle}
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {game.settingsGuide.map((setting) => (
              <div
                key={setting.label}
                className="px-6 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-center"
              >
                <div className="sm:col-span-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {setting.label}
                </div>
                <div className="sm:col-span-3 font-mono text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA] tabular-nums">
                  {setting.value}
                </div>
                <div className="sm:col-span-5 text-sm text-slate-600 dark:text-slate-300">
                  {setting.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Rutina diaria con progreso guardado */}
      {activeTab === 'rutina' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {t.gameDetail.routineHeader}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {t.gameDetail.routineSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                {t.gameDetail.completedCount(completedCount, totalDrills)}
              </span>
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    onResetGameDrills(
                      game.id,
                      game.dailyDrills.map((d) => d.id)
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.gameDetail.reset}</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {game.dailyDrills.map((drill) => {
              const checked = Boolean(completedDrills[drill.id]);
              return (
                <button
                  key={drill.id}
                  type="button"
                  onClick={() => onToggleDrill(drill.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between gap-4 cursor-pointer ${
                    checked
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-slate-100'
                      : 'bg-white dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {checked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        checked ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {drill.task}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0 tabular-nums">
                    {drill.duration}
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
