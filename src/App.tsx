import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  Target,
  AlertTriangle,
  SlidersHorizontal,
  Gamepad2,
  Moon,
  Sun,
} from 'lucide-react';
import {
  GAMES_CATALOG,
  GameGenre,
  GENRE_IMAGES,
} from './data/gamesData';
import { ResilientImage } from './components/ResilientImage';
import { GameDetailView } from './components/GameDetailView';
import { TrainingLab } from './components/TrainingLab';
import { PersonalPlanBuilder } from './components/PersonalPlanBuilder';
import {
  PWAInstallButton,
  OfflineIndicator,
} from './components/PWAInstallButton';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage } from './i18n/LanguageContext';

const GENRES: Array<'Todos' | GameGenre> = [
  'Todos',
  'FPS Táctico',
  'Battle Royale',
  'MOBA y Estrategia',
  'Deportes y Motor',
  'Acción y Sandbox',
];

export default function App() {
  const { t } = useLanguage();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<'Todos' | GameGenre>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [labInitialTool, setLabInitialTool] = useState<'aim' | 'reaction' | 'edpi'>('aim');
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('helpful-smile-theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('helpful-smile-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignorar errores de almacenamiento
    }
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', isDark ? '#0B0F17' : '#F7F8FA');
    }
  }, [isDark]);

  const [completedDrills, setCompletedDrills] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('helpful-smile-drills');
      return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('helpful-smile-drills', JSON.stringify(completedDrills));
    } catch {
      // Ignorar errores de almacenamiento
    }
  }, [completedDrills]);

  const selectedGame = useMemo(
    () => GAMES_CATALOG.find((g) => g.id === selectedGameId) ?? null,
    [selectedGameId]
  );

  const filteredGames = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return GAMES_CATALOG.filter((game) => {
      const matchesGenre =
        selectedGenre === 'Todos' || game.genre === selectedGenre;
      const matchesQuery =
        !query ||
        game.name.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        game.skillFocus.toLowerCase().includes(query);
      return matchesGenre && matchesQuery;
    });
  }, [selectedGenre, searchQuery]);

  const handleToggleDrill = (drillId: string) => {
    setCompletedDrills((prev) => ({
      ...prev,
      [drillId]: !prev[drillId],
    }));
  };

  const handleResetGameDrills = (_gameId: string, drillIds: string[]) => {
    setCompletedDrills((prev) => {
      const next = { ...prev };
      for (const id of drillIds) {
        delete next[id];
      }
      return next;
    });
  };

  const scrollToSection = (sectionId: string, tool?: 'aim' | 'reaction' | 'edpi') => {
    if (tool) {
      setLabInitialTool(tool);
    }
    if (selectedGameId) {
      setSelectedGameId(null);
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectGame = (gameId: string) => {
    setSelectedGameId(gameId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#1E1E1E] dark:bg-[#0B0F17] text-[#0F172A] dark:text-slate-100">
      {/* Fondo decorativo con el patrón de caritas sonrientes a máxima visibilidad */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 smiley-bg-pattern opacity-100 dark:opacity-55"
      />
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-[#F7F8FA]/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="w-[1167px] max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between gap-8 bg-[#ffe53e] dark:bg-slate-900">
          {/* Zone 1: Brand logo + single text element wordmark */}
          <button
            type="button"
            onClick={() => {
              setSelectedGameId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <img
              src="/assets/aistudio/f491f4f38222961d0f0d49669b37e750_bca928f3.jpg"
              alt="Logo de Helpful Smile"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <span>Helpful Smile</span>
          </button>

          {/* Zone 2: 4 clean single-line navigation links */}
          <nav
            aria-label={t.nav.ariaLabel}
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            <button
              type="button"
              onClick={() => scrollToSection('juegos')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.games}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('entrenamiento', 'aim')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.training}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('entrenamiento', 'edpi')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.edpi}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mi-plan')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.myPlan}
            </button>
          </nav>

          {/* Zone 3: Language selector + Theme switch + primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher variant="header" />
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-pressed={isDark}
              aria-label={isDark ? t.nav.toLightAria : t.nav.toDarkAria}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold text-slate-900 dark:text-slate-100 bg-white/85 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">{t.nav.lightLabel}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span className="hidden sm:inline">{t.nav.darkLabel}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mi-plan')}
              className="px-3.5 sm:px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              {t.nav.evaluateLevel}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {selectedGame ? (
          <GameDetailView
            game={selectedGame}
            completedDrills={completedDrills}
            onToggleDrill={handleToggleDrill}
            onResetGameDrills={handleResetGameDrills}
            onBack={() => setSelectedGameId(null)}
            onOpenTrainer={() => scrollToSection('entrenamiento', 'aim')}
          />
        ) : (
          <>
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-14 sm:pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-6 bg-[#ffe212] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-center">
                  <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] mb-3">
                    {t.hero.eyebrow}
                  </p>
                  <div className="flex items-start gap-4 mb-5">
                    <img
                      src="/assets/aistudio/f491f4f38222961d0f0d49669b37e750_bca928f3.jpg"
                      alt="Logo de Helpful Smile"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-slate-900/20 dark:border-slate-700 shadow-xs shrink-0 mt-1"
                    />
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.08] [text-wrap:balance]">
                      {t.hero.title}
                    </h1>
                  </div>
                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl mb-8">
                    {t.hero.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToSection('juegos')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{t.hero.exploreGames}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('entrenamiento', 'reaction')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{t.hero.testReflexes}</span>
                    </button>
                    <PWAInstallButton variant="primary" />
                  </div>
                </div>

                <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                  <ResilientImage
                    src="/src/assets/images/hero_coaching_desk_1794532599204.jpg"
                    alt={t.hero.imageAlt}
                    fallbackLabel={t.hero.fallbackLabel}
                    className="w-full h-full object-cover lg:absolute lg:inset-0"
                  />
                </div>
              </div>

              {/* 4-column summary strip below hero split */}
              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#feff00] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-400 text-xs font-medium mb-1">
                    <Gamepad2 className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
                    <span>{t.hero.strip.catalogLabel}</span>
                  </div>
                  <p className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                    {GAMES_CATALOG.length} {t.hero.strip.gamesCountSuffix}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-400 mt-0.5">
                    {t.hero.strip.catalogSub}
                  </p>
                </div>

                <div className="bg-[#ffc400] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-400 text-xs font-medium mb-1">
                    <AlertTriangle className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
                    <span>{t.hero.strip.correctionLabel}</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {t.hero.strip.correctionTitle}
                  </p>
                  <p className="text-xs text-slate-800 dark:text-slate-400 mt-0.5">
                    {t.hero.strip.correctionSub}
                  </p>
                </div>

                <div className="bg-[#f73900] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-slate-400 text-xs font-medium mb-1">
                    <Target className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
                    <span>{t.hero.strip.labLabel}</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {t.hero.strip.labTitle}
                  </p>
                  <p className="text-xs text-slate-900 dark:text-slate-400 mt-0.5">
                    {t.hero.strip.labSub}
                  </p>
                </div>

                <div className="bg-[#bbff00] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-400 text-xs font-medium mb-1">
                    <SlidersHorizontal className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
                    <span>{t.hero.strip.configLabel}</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {t.hero.strip.configTitle}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-400 mt-0.5">
                    {t.hero.strip.configSub}
                  </p>
                </div>
              </div>
            </section>

            {/* Catálogo de Juegos Famosos */}
            <section
              id="juegos"
              className="w-[801px] max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
            >
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] mb-2">
                      {t.catalog.eyebrow}
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/aistudio/f491f4f38222961d0f0d49669b37e750_bca928f3.jpg"
                        alt="Logo de Helpful Smile"
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                      />
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        {t.catalog.title}
                      </h2>
                    </div>
                    <p className="text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
                      {t.catalog.subtitle}
                    </p>
                  </div>

                  <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.catalog.searchPlaceholder}
                      aria-label={t.catalog.searchAria}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Filtro por género */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {GENRES.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3.5 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedGenre === genre
                          ? 'bg-slate-900 dark:bg-[#2563EB] text-white border-slate-900 dark:border-[#2563EB]'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {genre === 'Todos' ? t.catalog.allGenre : t.catalog.genres[genre]}
                    </button>
                  ))}
                </div>
              </div>

              {filteredGames.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center">
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {t.catalog.emptyTitle(searchQuery)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
                    {t.catalog.emptySubtitle}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedGenre('Todos');
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
                  >
                    {t.catalog.showAll}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGames.map((game) => {
                    const doneCount = game.dailyDrills.filter(
                      (d) => completedDrills[d.id]
                    ).length;

                    return (
                      <article
                        key={game.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl overflow-hidden flex flex-col justify-between transition-colors"
                      >
                        <div>
                          <div className="h-40 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                            <ResilientImage
                              src={GENRE_IMAGES[game.genre]}
                              alt={t.catalog.imageAlt(game.name)}
                              fallbackLabel={game.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                              <span>{t.catalog.genres[game.genre]}</span>
                              <span aria-hidden="true">·</span>
                              <span>{game.platform}</span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                              {game.name}
                            </h3>

                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                              {game.summary}
                            </p>

                            <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                              {t.catalog.focusLabel}: {game.skillFocus}
                            </p>
                          </div>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                            {t.catalog.habitsToday(doneCount, game.dailyDrills.length)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSelectGame(game.id)}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA] hover:text-[#1D4ED8] dark:hover:text-[#93C5FD] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>{t.catalog.viewTips}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Fundamentos por Género */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-8">
                <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] mb-2">
                  {t.principles.eyebrow}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/f491f4f38222961d0f0d49669b37e750_bca928f3.jpg"
                    alt="Logo de Helpful Smile"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                  />
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    {t.principles.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGenre('FPS Táctico');
                    scrollToSection('juegos');
                  }}
                  className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl overflow-hidden transition-colors cursor-pointer"
                >
                  <div className="h-44 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                    <ResilientImage
                      src="/src/assets/images/genre_fps_tactical_1794532599507.jpg"
                      alt={t.principles.cards[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {t.principles.cards[0].title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.principles.cards[0].description}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedGenre('MOBA y Estrategia');
                    scrollToSection('juegos');
                  }}
                  className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl overflow-hidden transition-colors cursor-pointer"
                >
                  <div className="h-44 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                    <ResilientImage
                      src="/src/assets/images/genre_moba_strategy_1794532599892.jpg"
                      alt={t.principles.cards[1].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {t.principles.cards[1].title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.principles.cards[1].description}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedGenre('Battle Royale');
                    scrollToSection('juegos');
                  }}
                  className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl overflow-hidden transition-colors cursor-pointer"
                >
                  <div className="h-44 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                    <ResilientImage
                      src="/src/assets/images/genre_battle_royale_1794532600636.jpg"
                      alt={t.principles.cards[2].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {t.principles.cards[2].title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.principles.cards[2].description}
                    </p>
                  </div>
                </button>
              </div>
            </section>

            {/* Laboratorio de Entrenamiento */}
            <div>
              <TrainingLab initialTool={labInitialTool} />
            </div>

            {/* Plan Personalizado */}
            <PersonalPlanBuilder onSelectGame={handleSelectGame} />
          </>
        )}
      </main>

      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/f491f4f38222961d0f0d49669b37e750_bca928f3.jpg"
                alt="Logo de Helpful Smile"
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover shrink-0"
              />
              <p className="font-medium text-slate-700 dark:text-slate-200">
                {t.footer.tagline}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => scrollToSection('juegos')}
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {t.footer.catalog}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('entrenamiento', 'aim')}
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {t.footer.lab}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('mi-plan')}
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {t.footer.plan}
              </button>
              <PWAInstallButton variant="subtle" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex justify-center md:justify-end">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </footer>
      <OfflineIndicator />
    </div>
  );
}
