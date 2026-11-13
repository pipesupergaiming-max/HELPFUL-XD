import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameGenre } from '../data/gamesData';

export type AppLanguage = 'es' | 'en' | 'pt';

export const LANGUAGE_OPTIONS: Array<{
  code: AppLanguage;
  shortLabel: string;
  label: string;
  badge?: string;
}> = [
  { code: 'es', shortLabel: 'ES', label: 'Español', badge: 'Principal' },
  { code: 'en', shortLabel: 'EN', label: 'English' },
  { code: 'pt', shortLabel: 'PT', label: 'Português' },
];

export interface Translations {
  nav: {
    ariaLabel: string;
    games: string;
    training: string;
    edpi: string;
    myPlan: string;
    evaluateLevel: string;
    darkLabel: string;
    lightLabel: string;
    toDarkAria: string;
    toLightAria: string;
    languageLabel: string;
    languageAria: string;
    primaryBadge: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    exploreGames: string;
    testReflexes: string;
    fallbackLabel: string;
    imageAlt: string;
    strip: {
      catalogLabel: string;
      gamesCountSuffix: string;
      catalogSub: string;
      correctionLabel: string;
      correctionTitle: string;
      correctionSub: string;
      labLabel: string;
      labTitle: string;
      labSub: string;
      configLabel: string;
      configTitle: string;
      configSub: string;
    };
  };
  catalog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchAria: string;
    allGenre: string;
    genres: Record<GameGenre, string>;
    emptyTitle: (query: string) => string;
    emptySubtitle: string;
    showAll: string;
    focusLabel: string;
    habitsToday: (done: number, total: number) => string;
    viewTips: string;
    imageAlt: (name: string) => string;
  };
  principles: {
    eyebrow: string;
    title: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  footer: {
    tagline: string;
    catalog: string;
    lab: string;
    plan: string;
    languageTitle: string;
  };
  gameDetail: {
    backToCatalog: string;
    demandPrefix: string;
    difficulties: Record<'Accesible' | 'Intermedia' | 'Exigente', string>;
    mainFocus: string;
    practiceButton: string;
    tabsAria: string;
    tabTips: string;
    tabMistakes: string;
    tabSettings: string;
    tabRoutine: string;
    pillars: Record<'Mecánicas' | 'Visión de Juego' | 'Decisiones' | 'Mentalidad', string>;
    whyItWorks: string;
    selectProblem: string;
    diagnosticSubtitle: string;
    symptomTitle: string;
    fixTitle: string;
    drillTitle: string;
    settingsHeader: (name: string) => string;
    settingsSubtitle: string;
    routineHeader: string;
    routineSubtitle: string;
    completedCount: (done: number, total: number) => string;
    reset: string;
    spanishGuideNotice: string;
  };
  trainingLab: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabAim: string;
    tabTracking: string;
    tabReaction: string;
    tabKeys: string;
    tabEdpi: string;
    aim: {
      sizeLabel: string;
      small: string;
      medium: string;
      large: string;
      timeLabel: string;
      timeCounter: string;
      hitsCounter: string;
      accuracyCounter: string;
      recordCounter: string;
      idleTitle: string;
      idleDesc: string;
      startButton: (sec: number) => string;
      targetAria: string;
      resultLabel: string;
      targetsLabel: string;
      accuracyLabel: string;
      targetsPerSecLabel: string;
      repeatButton: string;
      feedbackLowAcc: string;
      feedbackSlow: string;
      feedbackGood: string;
    };
    tracking: {
      speedLabel: string;
      slow: string;
      normal: string;
      fast: string;
      timeLabel: string;
      timeCounter: string;
      trackingCounter: string;
      recordCounter: string;
      idleTitle: string;
      idleDesc: string;
      startButton: (sec: number) => string;
      onTarget: string;
      offTarget: string;
      resultLabel: string;
      onTargetPctLabel: string;
      timeTrackedLabel: string;
      bestLabel: string;
      repeatButton: string;
      feedbackLow: string;
      feedbackMid: string;
      feedbackHigh: string;
    };
    reaction: {
      idleTitle: string;
      idleDesc: string;
      waitingTitle: string;
      waitingDesc: string;
      readyTitle: string;
      readyDesc: string;
      tooSoonTitle: string;
      tooSoonDesc: string;
      measuredLabel: string;
      resultDesc: string;
      logTitle: string;
      emptyLog: string;
      recentAvg: string;
      clearHistory: string;
      feedbackFast: string;
      feedbackSolid: string;
      feedbackSlow: string;
    };
    keys: {
      durationBadge: string;
      timeCounter: string;
      hitsCounter: string;
      streakCounter: string;
      accuracyCounter: string;
      recordCounter: string;
      idleTitle: string;
      idleDesc: string;
      startButton: string;
      promptHint: string;
      spaceLabel: string;
      resultLabel: string;
      avgMsLabel: string;
      maxStreakLabel: string;
      repeatButton: string;
      feedbackLowAcc: string;
      feedbackSlow: string;
      feedbackGood: string;
    };
    edpi: {
      selectGame: string;
      mouseDpi: string;
      sensPercent: string;
      sensIngame: string;
      effectiveEdpi: string;
      turn360: string;
      recommendedRange: (game: string, min: number, max: number) => string;
      verdictLowTitle: string;
      verdictLowDetail: string;
      verdictHighTitle: string;
      verdictHighDetail: string;
      verdictGoodTitle: string;
      verdictGoodDetail: string;
      notes: Record<string, string>;
    };
  };
  personalPlan: {
    eyebrow: string;
    title: string;
    subtitle: string;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    tiers: Record<'Principiante' | 'Intermedio' | 'Avanzado', string>;
    weaknesses: Record<
      | 'Puntería y control mecánico'
      | 'Posicionamiento y lectura de mapa'
      | 'Decisiones bajo presión'
      | 'Mentalidad y control de frustración',
      string
    >;
    minUnit: string;
    minPerDay: string;
    generateButton: string;
    levelPrefix: string;
    goalPrefix: string;
    viewGuide: (name: string) => string;
    changeGoal: string;
    phase1: string;
    phase2: string;
    phase3: string;
    fallbackDrill: (game: string) => string;
    focusAim: (game: string, rec: string, mins: number) => string;
    focusPosition: (game: string, rec: string, mins: number) => string;
    focusDecision: (rec: string, mins: number) => string;
    focusMental: (mins: number) => string;
    reviewBeginner: (game: string, mins: number) => string;
    reviewAdvanced: (mins: number) => string;
  };
  pwa: {
    installApp: string;
    installIOS: string;
    iosModalTitle: string;
    closeAria: string;
    iosStep1Pre: string;
    iosStep1Bold: string;
    iosStep1Post: string;
    iosStep2Pre: string;
    iosStep2Bold: string;
    iosUnderstood: string;
    offlineBadge: string;
  };
}

const TRANSLATIONS: Record<AppLanguage, Translations> = {
  es: {
    nav: {
      ariaLabel: 'Navegación principal',
      games: 'Juegos',
      training: 'Entrenamiento',
      edpi: 'Calculadora eDPI',
      myPlan: 'Mi Plan',
      evaluateLevel: 'Evaluar nivel',
      darkLabel: 'Oscuro',
      lightLabel: 'Claro',
      toDarkAria: 'Cambiar a modo oscuro',
      toLightAria: 'Cambiar a modo claro',
      languageLabel: 'Idioma',
      languageAria: 'Cambiar idioma de la aplicación',
      primaryBadge: 'Principal',
    },
    hero: {
      eyebrow: 'Entrenamiento y estrategia para jugadores',
      title: 'Mejora tu habilidad y jugabilidad en cada partida.',
      subtitle:
        'Helpful Smile reúne consejos tácticos, diagnóstico de errores frecuentes, ajustes recomendados y ejercicios prácticos para los videojuegos más famosos.',
      exploreGames: 'Explorar juegos',
      testReflexes: 'Probar reflejos y mira',
      fallbackLabel: 'Helpful Smile · Estación de práctica',
      imageAlt: 'Estación de entrenamiento y análisis táctico Helpful Smile',
      strip: {
        catalogLabel: 'Catálogo activo',
        gamesCountSuffix: 'juegos',
        catalogSub: 'Guías paso a paso en español',
        correctionLabel: 'Corrección rápida',
        correctionTitle: 'Diagnóstico real',
        correctionSub: 'Detecta fallos comunes y soluciónalos',
        labLabel: 'Laboratorio',
        labTitle: 'Mira y reflejos',
        labSub: 'Mide precisión y tiempo en ms',
        configLabel: 'Configuración',
        configTitle: 'Ajustes y eDPI',
        configSub: 'Sensibilidad, FOV y controles óptimos',
      },
    },
    catalog: {
      eyebrow: 'Recomendaciones por título',
      title: 'Elige tu juego para mejorar su jugabilidad',
      subtitle:
        'Cada ficha incluye consejos de mecánicas, lectura del mapa, errores frecuentes, configuración recomendada y rutina diaria.',
      searchPlaceholder: 'Buscar juego o habilidad...',
      searchAria: 'Buscar juego o habilidad',
      allGenre: 'Todos',
      genres: {
        'FPS Táctico': 'FPS Táctico',
        'Battle Royale': 'Battle Royale',
        'MOBA y Estrategia': 'MOBA y Estrategia',
        'Deportes y Motor': 'Deportes y Motor',
        'Acción y Sandbox': 'Acción y Sandbox',
      },
      emptyTitle: (query) => `No encontramos juegos con "${query}"`,
      emptySubtitle:
        'Prueba buscando otro nombre famoso o restablece los filtros de género.',
      showAll: 'Mostrar todos los juegos',
      focusLabel: 'Foco',
      habitsToday: (done, total) => `${done}/${total} hábitos hoy`,
      viewTips: 'Ver consejos',
      imageAlt: (name) => `Guía táctica de ${name}`,
    },
    principles: {
      eyebrow: 'Principios universales',
      title: 'Tres pilares que mejoran tu nivel en cualquier juego',
      cards: [
        {
          title: 'Geometría de ángulos y cobertura',
          description:
            'Asómate exponiendo una sola línea de tiro a la vez y mantén siempre cobertura sólida a un paso de distancia.',
        },
        {
          title: 'Economía, oleadas y presión de mapa',
          description:
            'Convierte recursos constantes y control de tiempos en ventajas reales antes de forzar peleas arriesgadas.',
        },
        {
          title: 'Rotación temprana y lectura de zona',
          description:
            'Muévete hacia el lado menos poblado del círculo con tiempo para recibir al resto desde terreno elevado.',
        },
      ],
    },
    footer: {
      tagline: 'Helpful Smile · Entrenamiento y mejora de jugabilidad',
      catalog: 'Catálogo de juegos',
      lab: 'Laboratorio de práctica',
      plan: 'Plan personalizado',
      languageTitle: 'Idioma',
    },
    gameDetail: {
      backToCatalog: 'Volver al catálogo de juegos',
      demandPrefix: 'Exigencia',
      difficulties: {
        Accesible: 'accesible',
        Intermedia: 'intermedia',
        Exigente: 'exigente',
      },
      mainFocus: 'Foco principal de mejora',
      practiceButton: 'Practicar reflejos y mira',
      tabsAria: 'Secciones de entrenamiento del juego',
      tabTips: 'Consejos de jugabilidad',
      tabMistakes: 'Diagnóstico de errores',
      tabSettings: 'Ajustes óptimos',
      tabRoutine: 'Rutina diaria',
      pillars: {
        Mecánicas: 'Mecánicas',
        'Visión de Juego': 'Visión de Juego',
        Decisiones: 'Decisiones',
        Mentalidad: 'Mentalidad',
      },
      whyItWorks: 'Por qué mejora tu rendimiento',
      selectProblem: 'Selecciona el problema que más te ocurre',
      diagnosticSubtitle: 'Diagnóstico y corrección',
      symptomTitle: 'Cómo se manifiesta en partida',
      fixTitle: 'Solución táctica inmediata',
      drillTitle: 'Ejercicio práctico para corregirlo',
      settingsHeader: (name) => `Configuración recomendada para ${name}`,
      settingsSubtitle:
        'Ajustes pensados para ganar claridad visual, respuesta rápida y consistencia mecánica.',
      routineHeader: 'Lista de calentamiento y práctica diaria',
      routineSubtitle:
        'Marca los ejercicios conforme los completes antes de entrar a partidas clasificatorias.',
      completedCount: (done, total) => `${done} de ${total} completados`,
      reset: 'Reiniciar',
      spanishGuideNotice: '',
    },
    trainingLab: {
      eyebrow: 'Laboratorio práctico',
      title: 'Entrena tu puntería, reflejos y sensibilidad',
      subtitle:
        'No solo leas consejos: mide tu precisión real y ajusta tu configuración antes de entrar a competir.',
      tabAim: 'Puntería',
      tabTracking: 'Seguimiento',
      tabReaction: 'Reflejos (ms)',
      tabKeys: 'Combos (Teclas)',
      tabEdpi: 'Calculadora eDPI',
      aim: {
        sizeLabel: 'Tamaño:',
        small: 'Pequeño',
        medium: 'Medio',
        large: 'Grande',
        timeLabel: 'Tiempo:',
        timeCounter: 'Tiempo:',
        hitsCounter: 'Aciertos:',
        accuracyCounter: 'Precisión:',
        recordCounter: 'Récord:',
        idleTitle: 'Entrenamiento de transición y clic preciso',
        idleDesc:
          'Haz clic en los objetivos lo más rápido posible sin fallar disparos al vacío.',
        startButton: (sec) => `Iniciar prueba (${sec}s)`,
        targetAria: 'Objetivo de puntería',
        resultLabel: 'Resultado de la sesión',
        targetsLabel: 'Objetivos',
        accuracyLabel: 'Precisión',
        targetsPerSecLabel: 'Objetivos / seg',
        repeatButton: 'Repetir ejercicio',
        feedbackLowAcc:
          'Tu velocidad de clic supera tu control actual: frena un instante la mira sobre el círculo antes de hacer clic para subir de 85% de precisión.',
        feedbackSlow:
          'Muy buena precisión. Ahora intenta encadenar transiciones más rápidas entre objetivos manteniendo el ratón ligero.',
        feedbackGood:
          'Excelente equilibrio entre velocidad y precisión. Estás listo para practicar movimientos laterales dentro de tu juego.',
      },
      tracking: {
        speedLabel: 'Velocidad:',
        slow: 'Lento',
        normal: 'Normal',
        fast: 'Rápido',
        timeLabel: 'Tiempo:',
        timeCounter: 'Tiempo:',
        trackingCounter: 'Seguimiento:',
        recordCounter: 'Récord:',
        idleTitle: 'Seguimiento continuo de objetivo móvil',
        idleDesc:
          'Mantén el cursor o dedo encima del objetivo mientras rebota sin perderlo. Ideal para Apex, Overwatch 2 y Warzone.',
        startButton: (sec) => `Iniciar seguimiento (${sec}s)`,
        onTarget: 'En objetivo',
        offTarget: 'Fuera de mira',
        resultLabel: 'Resultado de seguimiento',
        onTargetPctLabel: 'Tiempo sobre objetivo',
        timeTrackedLabel: 'Segundos fijados',
        bestLabel: 'Mejor marca',
        repeatButton: 'Repetir seguimiento',
        feedbackLow:
          'Te cuesta anticipar los cambios de dirección. Baja un poco la sensibilidad o relaja la muñeca para seguir el movimiento de forma fluida con el antebrazo.',
        feedbackMid:
          'Buen control base. Intenta anticipar los rebotes en los bordes sin dar tirones bruscos con el ratón.',
        feedbackHigh:
          'Seguimiento sobresaliente. Tu control continuo te dará ventaja directa en duelos largos con armas automáticas.',
      },
      reaction: {
        idleTitle: 'Prueba de velocidad de reacción',
        idleDesc:
          'Haz clic aquí para empezar. Espera a que el panel cambie a verde y pulsa lo antes posible.',
        waitingTitle: 'Espera la señal verde...',
        waitingDesc:
          'Mantén el dedo listo sobre el botón izquierdo del ratón o pantalla.',
        readyTitle: '¡HAZ CLIC AHORA!',
        readyDesc: 'Señal activa',
        tooSoonTitle: 'Pulsaste demasiado pronto',
        tooSoonDesc:
          'Haz clic de nuevo para repetir este intento sin anticiparte.',
        measuredLabel: 'Tiempo de reacción medido',
        resultDesc:
          'Haz clic en cualquier lugar del panel para realizar otro intento.',
        logTitle: 'Registro de intentos',
        emptyLog:
          'Completa al menos 3 intentos para calcular tu promedio real y recibir una recomendación de juego.',
        recentAvg: 'Promedio reciente',
        clearHistory: 'Limpiar historial',
        feedbackFast:
          'Reflejos sobresalientes. Aprovecha ventajas de primer contacto con francotirador o rifles de ráfaga.',
        feedbackSolid:
          'Rango competitivo sólido. Compensa cualquier duelo cerrado mejorando tu colocación previa de mira (crosshair placement).',
        feedbackSlow:
          'Tiempo de respuesta relajado o con fatiga. Descansa la vista, asegúrate de jugar con monitor a 120Hz+ si es posible y anticipa ángulos en lugar de reaccionar tarde.',
      },
      keys: {
        durationBadge: '20s · Teclado o táctil',
        timeCounter: 'Tiempo:',
        hitsCounter: 'Aciertos:',
        streakCounter: 'Racha:',
        accuracyCounter: 'Precisión:',
        recordCounter: 'Récord:',
        idleTitle: 'Entrenamiento de combos y teclas tácticas',
        idleDesc:
          'Pulsa la tecla indicada en tu teclado (o tócala en pantalla) lo más rápido posible sin equivocarte para entrenar reflejos de movimiento y habilidades.',
        startButton: 'Iniciar reto (20s)',
        promptHint: 'Pulsa o haz clic en la tecla:',
        spaceLabel: 'ESPACIO',
        resultLabel: 'Resultado de reflejo táctico',
        avgMsLabel: 'ms / tecla',
        maxStreakLabel: 'Racha máx.',
        repeatButton: 'Repetir reto',
        feedbackLowAcc:
          'Prioriza pulsar la tecla correcta antes de acelerar: en partida, lanzar una habilidad equivocada o fallar un counter-strafe cuesta el duelo.',
        feedbackSlow:
          'Buena precisión de dedos. Intenta mantener los dedos descansando sobre W-A-S-D y Q-E-R para reducir la distancia de respuesta.',
        feedbackGood:
          'Velocidad y limpieza excepcionales en teclado. Tu ejecución de habilidades y esquivas bajo presión está en gran nivel.',
      },
      edpi: {
        selectGame: 'Selecciona tu juego principal',
        mouseDpi: 'DPI del ratón',
        sensPercent: 'Sensibilidad en juego (%)',
        sensIngame: 'Sensibilidad dentro del juego',
        effectiveEdpi: 'Tu eDPI efectivo',
        turn360: 'Giro de 360°',
        recommendedRange: (game, min, max) =>
          `Rango recomendado en ${game}: ${min} – ${max} eDPI`,
        verdictLowTitle: 'Sensibilidad Baja (Control extremo)',
        verdictLowDetail:
          'Excelente precisión a larga distancia, pero exige alfombrilla amplia para girar 180° ante flanqueos.',
        verdictHighTitle: 'Sensibilidad Alta (Riesgo de sobrepasar el objetivo)',
        verdictHighDetail:
          'Te giras rápido, pero los microajustes a la cabeza pierden estabilidad. Prueba bajarla un 15% durante 3 días.',
        verdictGoodTitle: 'Rango Óptimo Competitivo',
        verdictGoodDetail:
          'Equilibrio ideal entre estabilidad en microajustes y agilidad para limpiar esquinas.',
        notes: {
          valorant:
            'Rango estándar competitivo para microajustes precisos a la cabeza.',
          cs2: 'Equivale a 30–50 cm para un giro completo de 360°.',
          apex: 'Permite seguimiento continuo (tracking) y giros rápidos en combate cercano.',
          fortnite:
            'Calculado multiplicando DPI × % sensibilidad X/Y (ej. 800 × 6.5% = 52 eDPI).',
          overwatch2:
            'Ideal para combinar seguimiento vertical y giros de 180°.',
          r6: 'Basado en multiplicador estándar (0.02); permite girar ángulos y sostener pixeles con precisión.',
          marvelrivals:
            'Balance cómodo para seguimiento rápido de héroes con alta movilidad.',
          warzone:
            'Rango popular en Warzone (ej. 800 DPI × 5.0 = 4000 eDPI) para controlar retroceso a media distancia.',
          pubg: 'Basado en sensibilidad general dentro de PUBG; ofrece estabilidad en disparos de largo alcance.',
          destiny2:
            'Combina seguimiento ágil en PvP con precisión estable para cañones de mano y francotiradores.',
          halo: 'Ideal para mantener la mira pegada durante duelos largos de escudo en Arena.',
          rust: 'Calculado sobre `input.sensitivity` clásico para controlar patrones de rifle y arcos.',
        },
      },
    },
    personalPlan: {
      eyebrow: 'Plan personalizado',
      title: 'Construye tu rutina diaria de mejora',
      subtitle:
        'Indica tu juego principal, tu nivel actual y qué aspecto te cuesta más para generar un plan diario concreto.',
      q1: '1. ¿En qué juego quieres subir de nivel?',
      q2: '2. ¿Cuál es tu nivel actual en ese juego?',
      q3: '3. Tiempo diario disponible para entrenar',
      q4: '4. ¿Qué sientes que te frena más ahora mismo?',
      tiers: {
        Principiante: 'Principiante',
        Intermedio: 'Intermedio',
        Avanzado: 'Avanzado',
      },
      weaknesses: {
        'Puntería y control mecánico': 'Puntería y control mecánico',
        'Posicionamiento y lectura de mapa': 'Posicionamiento y lectura de mapa',
        'Decisiones bajo presión': 'Decisiones bajo presión',
        'Mentalidad y control de frustración':
          'Mentalidad y control de frustración',
      },
      minUnit: 'min',
      minPerDay: 'min/día',
      generateButton: 'Generar mi plan diario',
      levelPrefix: 'Nivel',
      goalPrefix: 'Objetivo: mejorar en',
      viewGuide: (name) => `Ver guía de ${name}`,
      changeGoal: 'Cambiar objetivo',
      phase1: 'Fase 01 · Calentamiento',
      phase2: 'Fase 02 · Práctica dirigida',
      phase3: 'Fase 03 · Revisión táctica',
      fallbackDrill: (game) =>
        `Calentamiento técnico en ${game} enfocado en control básico.`,
      focusAim: (game, rec, mins) =>
        `Práctica aislada en ${game}: aplica "${rec}" sin preocuparte por el marcador (${mins} min).`,
      focusPosition: (game, rec, mins) =>
        `En partidas reales de ${game}, cada 15 segundos revisa cobertura y minimapa aplicando "${rec}" (${mins} min).`,
      focusDecision: (rec, mins) =>
        `Juega enfocándote en "${rec}" y evita forzar intercambios desfavorables (${mins} min).`,
      focusMental: (mins) =>
        `Sesión con regla de calma: juega un máximo de 2 partidas seguidas analizando cada caída en 5 segundos sin culpar al equipo (${mins} min).`,
      reviewBeginner: (game, mins) =>
        `Anota 1 error que te costó la partida hoy y revisa la sección "Diagnóstico de errores" de ${game} (${mins} min).`,
      reviewAdvanced: (mins) =>
        `Revisa las primeras 3 eliminaciones o fallos clave de tu última partida para detectar un patrón repetido (${mins} min).`,
    },
    pwa: {
      installApp: 'Instalar app',
      installIOS: 'Instalar en iOS',
      iosModalTitle: 'Instalar en iPhone o iPad',
      closeAria: 'Cerrar instrucciones',
      iosStep1Pre: 'Toca el botón',
      iosStep1Bold: 'Compartir',
      iosStep1Post: 'en la barra de Safari.',
      iosStep2Pre: 'Desliza hacia abajo y selecciona',
      iosStep2Bold: 'Añadir a pantalla de inicio',
      iosUnderstood: 'Entendido',
      offlineBadge: 'Modo sin conexión · Guías y rutinas disponibles',
    },
  },
  en: {
    nav: {
      ariaLabel: 'Main navigation',
      games: 'Games',
      training: 'Training',
      edpi: 'eDPI Calculator',
      myPlan: 'My Plan',
      evaluateLevel: 'Assess skill',
      darkLabel: 'Dark',
      lightLabel: 'Light',
      toDarkAria: 'Switch to dark mode',
      toLightAria: 'Switch to light mode',
      languageLabel: 'Language',
      languageAria: 'Change application language',
      primaryBadge: 'Primary',
    },
    hero: {
      eyebrow: 'Training and strategy for players',
      title: 'Improve your skill and gameplay in every match.',
      subtitle:
        'Helpful Smile brings together tactical tips, common mistake diagnostics, recommended settings, and practical drills for the world’s top games.',
      exploreGames: 'Explore games',
      testReflexes: 'Test reflexes & aim',
      fallbackLabel: 'Helpful Smile · Practice station',
      imageAlt: 'Helpful Smile tactical analysis and training desk',
      strip: {
        catalogLabel: 'Active catalog',
        gamesCountSuffix: 'games',
        catalogSub: 'Step-by-step tactical guides',
        correctionLabel: 'Fast correction',
        correctionTitle: 'Real diagnostics',
        correctionSub: 'Spot common mistakes and fix them',
        labLabel: 'Training lab',
        labTitle: 'Aim & reflexes',
        labSub: 'Measure accuracy and time in ms',
        configLabel: 'Setup',
        configTitle: 'Settings & eDPI',
        configSub: 'Sensitivity, FOV, and optimal binds',
      },
    },
    catalog: {
      eyebrow: 'Recommendations by title',
      title: 'Pick your game to level up your gameplay',
      subtitle:
        'Every sheet includes mechanics tips, map awareness, common mistakes, recommended settings, and a daily drill routine.',
      searchPlaceholder: 'Search game or skill...',
      searchAria: 'Search game or skill',
      allGenre: 'All',
      genres: {
        'FPS Táctico': 'Tactical FPS',
        'Battle Royale': 'Battle Royale',
        'MOBA y Estrategia': 'MOBA & Strategy',
        'Deportes y Motor': 'Sports & Racing',
        'Acción y Sandbox': 'Action & Sandbox',
      },
      emptyTitle: (query) => `No games found for "${query}"`,
      emptySubtitle:
        'Try another popular title or reset the genre filters.',
      showAll: 'Show all games',
      focusLabel: 'Focus',
      habitsToday: (done, total) => `${done}/${total} drills today`,
      viewTips: 'View tips',
      imageAlt: (name) => `Tactical guide for ${name}`,
    },
    principles: {
      eyebrow: 'Universal principles',
      title: 'Three pillars that raise your level in any game',
      cards: [
        {
          title: 'Angle geometry and cover',
          description:
            'Peek while exposing only one line of fire at a time and always keep solid cover one step away.',
        },
        {
          title: 'Economy, waves, and map pressure',
          description:
            'Turn steady resource farming and timing control into real advantages before forcing risky fights.',
        },
        {
          title: 'Early rotations and zone reading',
          description:
            'Move toward the less crowded side of the circle early so you can hold high ground against late rotators.',
        },
      ],
    },
    footer: {
      tagline: 'Helpful Smile · Gameplay training & skill improvement',
      catalog: 'Game catalog',
      lab: 'Training lab',
      plan: 'Personal plan',
      languageTitle: 'Language',
    },
    gameDetail: {
      backToCatalog: 'Back to game catalog',
      demandPrefix: 'Difficulty',
      difficulties: {
        Accesible: 'accessible',
        Intermedia: 'intermediate',
        Exigente: 'demanding',
      },
      mainFocus: 'Primary improvement focus',
      practiceButton: 'Practice aim & reflexes',
      tabsAria: 'Game training sections',
      tabTips: 'Gameplay tips',
      tabMistakes: 'Mistake diagnostics',
      tabSettings: 'Optimal settings',
      tabRoutine: 'Daily routine',
      pillars: {
        Mecánicas: 'Mechanics',
        'Visión de Juego': 'Game Sense',
        Decisiones: 'Decision Making',
        Mentalidad: 'Mindset',
      },
      whyItWorks: 'Why it improves your performance',
      selectProblem: 'Select the issue that affects you most',
      diagnosticSubtitle: 'Diagnosis & fix',
      symptomTitle: 'How it shows up in-game',
      fixTitle: 'Immediate tactical fix',
      drillTitle: 'Practical drill to fix it',
      settingsHeader: (name) => `Recommended settings for ${name}`,
      settingsSubtitle:
        'Settings designed for visual clarity, fast response, and mechanical consistency.',
      routineHeader: 'Warm-up and daily practice checklist',
      routineSubtitle:
        'Check off each drill as you complete it before queuing into ranked matches.',
      completedCount: (done, total) => `${done} of ${total} completed`,
      reset: 'Reset',
      spanishGuideNotice:
        'Detailed tactical guide entries are written in Spanish (primary language).',
    },
    trainingLab: {
      eyebrow: 'Hands-on lab',
      title: 'Train your aim, reflexes, and sensitivity',
      subtitle:
        'Don’t just read tips: measure your real accuracy and dial in your settings before competing.',
      tabAim: 'Aim',
      tabTracking: 'Tracking',
      tabReaction: 'Reflexes (ms)',
      tabKeys: 'Key Combos',
      tabEdpi: 'eDPI Calculator',
      aim: {
        sizeLabel: 'Size:',
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        timeLabel: 'Time:',
        timeCounter: 'Time:',
        hitsCounter: 'Hits:',
        accuracyCounter: 'Accuracy:',
        recordCounter: 'Best:',
        idleTitle: 'Flick transition and precision click training',
        idleDesc:
          'Click targets as fast as you can without missing shots into empty space.',
        startButton: (sec) => `Start test (${sec}s)`,
        targetAria: 'Aim target',
        resultLabel: 'Session result',
        targetsLabel: 'Targets',
        accuracyLabel: 'Accuracy',
        targetsPerSecLabel: 'Targets / sec',
        repeatButton: 'Repeat drill',
        feedbackLowAcc:
          'Your click speed is ahead of your control: pause for a split second on the circle before clicking to pass 85% accuracy.',
        feedbackSlow:
          'Great accuracy. Now try chaining faster transitions between targets while keeping your mouse grip light.',
        feedbackGood:
          'Excellent balance between speed and precision. You are ready to practice movement duels in-game.',
      },
      tracking: {
        speedLabel: 'Speed:',
        slow: 'Slow',
        normal: 'Normal',
        fast: 'Fast',
        timeLabel: 'Time:',
        timeCounter: 'Time:',
        trackingCounter: 'Tracking:',
        recordCounter: 'Best:',
        idleTitle: 'Smooth moving-target tracking',
        idleDesc:
          'Keep your cursor or finger on top of the bouncing target without losing it. Ideal for Apex, Overwatch 2, and Warzone.',
        startButton: (sec) => `Start tracking (${sec}s)`,
        onTarget: 'On target',
        offTarget: 'Off target',
        resultLabel: 'Tracking session result',
        onTargetPctLabel: 'Time on target',
        timeTrackedLabel: 'Seconds locked',
        bestLabel: 'Personal best',
        repeatButton: 'Repeat tracking',
        feedbackLow:
          'Direction changes are throwing you off. Try slightly lowering your sensitivity or relaxing your wrist to track smoothly with your forearm.',
        feedbackMid:
          'Solid baseline control. Anticipate wall bounces smoothly without jerky mouse corrections.',
        feedbackHigh:
          'Outstanding tracking. Your smooth cursor control gives you a direct edge in sustained automatic-weapon duels.',
      },
      reaction: {
        idleTitle: 'Reaction speed test',
        idleDesc:
          'Click here to start. Wait until the panel turns green and click as fast as possible.',
        waitingTitle: 'Wait for the green signal...',
        waitingDesc:
          'Keep your finger ready on the left mouse button or screen.',
        readyTitle: 'CLICK NOW!',
        readyDesc: 'Signal active',
        tooSoonTitle: 'Clicked too early',
        tooSoonDesc:
          'Click again to retry this attempt without anticipating.',
        measuredLabel: 'Measured reaction time',
        resultDesc:
          'Click anywhere on the panel to run another attempt.',
        logTitle: 'Attempt log',
        emptyLog:
          'Complete at least 3 attempts to compute your real average and receive a gameplay tip.',
        recentAvg: 'Recent average',
        clearHistory: 'Clear history',
        feedbackFast:
          'Outstanding reflexes. Take advantage of first-contact peeks with snipers or burst rifles.',
        feedbackSolid:
          'Solid competitive range. Win close duels more often by tightening your pre-aim crosshair placement.',
        feedbackSlow:
          'Relaxed or fatigued response time. Rest your eyes, use a 120Hz+ monitor if available, and anticipate angles instead of reacting late.',
      },
      keys: {
        durationBadge: '20s · Keyboard or touch',
        timeCounter: 'Time:',
        hitsCounter: 'Hits:',
        streakCounter: 'Streak:',
        accuracyCounter: 'Accuracy:',
        recordCounter: 'Best:',
        idleTitle: 'Tactical key combo & ability speed drill',
        idleDesc:
          'Press the prompted key on your keyboard (or tap it on screen) as fast and cleanly as possible to sharpen movement and ability reflexes.',
        startButton: 'Start drill (20s)',
        promptHint: 'Press or click key:',
        spaceLabel: 'SPACE',
        resultLabel: 'Tactical reflex result',
        avgMsLabel: 'ms / key',
        maxStreakLabel: 'Best streak',
        repeatButton: 'Repeat drill',
        feedbackLowAcc:
          'Focus on hitting the right key before pushing speed: in-match, fat-fingering an ability or strafe key loses fights.',
        feedbackSlow:
          'Clean finger accuracy. Keep your fingers resting naturally on W-A-S-D and Q-E-R to shorten travel time.',
        feedbackGood:
          'Exceptional keyboard speed and accuracy. Your ability combos and dodges under pressure are sharp.',
      },
      edpi: {
        selectGame: 'Select your main game',
        mouseDpi: 'Mouse DPI',
        sensPercent: 'In-game sensitivity (%)',
        sensIngame: 'In-game sensitivity',
        effectiveEdpi: 'Your effective eDPI',
        turn360: '360° turn',
        recommendedRange: (game, min, max) =>
          `Recommended range in ${game}: ${min} – ${max} eDPI`,
        verdictLowTitle: 'Low Sensitivity (Extreme control)',
        verdictLowDetail:
          'Excellent long-range precision, though you need a wide mousepad to turn 180° against flanks.',
        verdictHighTitle: 'High Sensitivity (Risk of overshooting)',
        verdictHighDetail:
          'Fast turns, but micro-adjustments to the head lose consistency. Try lowering it by 15% for 3 days.',
        verdictGoodTitle: 'Optimal Competitive Range',
        verdictGoodDetail:
          'Ideal balance between micro-adjustment stability and agility when clearing corners.',
        notes: {
          valorant:
            'Standard competitive range for crisp head-level micro-adjustments.',
          cs2: 'Equals roughly 30–50 cm for a full 360° turn.',
          apex: 'Supports smooth continuous tracking and quick turns in close-quarters fights.',
          fortnite:
            'Calculated as DPI × X/Y sensitivity % (e.g. 800 × 6.5% = 52 eDPI).',
          overwatch2:
            'Ideal for combining vertical tracking and fast 180° turns.',
          r6: 'Based on standard 0.02 multiplier; balances angle clearing and holding tight pixel peeks.',
          marvelrivals:
            'Comfortable balance for fast tracking against high-mobility heroes.',
          warzone:
            'Popular Warzone range (e.g. 800 DPI × 5.0 = 4000 eDPI) for mid-range recoil control.',
          pubg: 'Based on PUBG general sensitivity; gives steady control in long-range spray transfers.',
          destiny2:
            'Pairs snappy PvP tracking with steady precision for hand cannons and snipers.',
          halo: 'Great for keeping your reticle locked through long Arena shield duels.',
          rust: 'Calculated on classic `input.sensitivity` for rifle recoil patterns and bow fights.',
        },
      },
    },
    personalPlan: {
      eyebrow: 'Personal plan',
      title: 'Build your daily improvement routine',
      subtitle:
        'Pick your main game, current skill tier, and biggest bottleneck to generate a focused daily routine.',
      q1: '1. Which game do you want to level up in?',
      q2: '2. What is your current level in that game?',
      q3: '3. Daily time available for training',
      q4: '4. What holds you back the most right now?',
      tiers: {
        Principiante: 'Beginner',
        Intermedio: 'Intermediate',
        Avanzado: 'Advanced',
      },
      weaknesses: {
        'Puntería y control mecánico': 'Aim & mechanical control',
        'Posicionamiento y lectura de mapa': 'Positioning & map reading',
        'Decisiones bajo presión': 'Decisions under pressure',
        'Mentalidad y control de frustración': 'Mindset & tilt control',
      },
      minUnit: 'min',
      minPerDay: 'min/day',
      generateButton: 'Generate my daily plan',
      levelPrefix: 'Level',
      goalPrefix: 'Goal: improve',
      viewGuide: (name) => `View ${name} guide`,
      changeGoal: 'Change goal',
      phase1: 'Phase 01 · Warm-up',
      phase2: 'Phase 02 · Focused practice',
      phase3: 'Phase 03 · Tactical review',
      fallbackDrill: (game) =>
        `Technical warm-up in ${game} focused on core control.`,
      focusAim: (game, rec, mins) =>
        `Isolated practice in ${game}: apply "${rec}" without worrying about the scoreboard (${mins} min).`,
      focusPosition: (game, rec, mins) =>
        `In live ${game} matches, check cover and minimap every 15 seconds while applying "${rec}" (${mins} min).`,
      focusDecision: (rec, mins) =>
        `Play with your focus on "${rec}" and avoid forcing unfavorable duels (${mins} min).`,
      focusMental: (mins) =>
        `Calm-mindset session: play at most 2 matches in a row and review each death in 5 seconds without blaming teammates (${mins} min).`,
      reviewBeginner: (game, mins) =>
        `Write down 1 mistake that cost you a round today and check the "Mistake diagnostics" tab for ${game} (${mins} min).`,
      reviewAdvanced: (mins) =>
        `Review the first 3 deaths or key mistakes of your last match to spot a repeated habit (${mins} min).`,
    },
    pwa: {
      installApp: 'Install app',
      installIOS: 'Install on iOS',
      iosModalTitle: 'Install on iPhone or iPad',
      closeAria: 'Close instructions',
      iosStep1Pre: 'Tap the',
      iosStep1Bold: 'Share',
      iosStep1Post: 'button in the Safari bar.',
      iosStep2Pre: 'Scroll down and select',
      iosStep2Bold: 'Add to Home Screen',
      iosUnderstood: 'Got it',
      offlineBadge: 'Offline mode · Guides and routines available',
    },
  },
  pt: {
    nav: {
      ariaLabel: 'Navegação principal',
      games: 'Jogos',
      training: 'Treino',
      edpi: 'Calculadora eDPI',
      myPlan: 'Meu Plano',
      evaluateLevel: 'Avaliar nível',
      darkLabel: 'Escuro',
      lightLabel: 'Claro',
      toDarkAria: 'Mudar para modo escuro',
      toLightAria: 'Mudar para modo claro',
      languageLabel: 'Idioma',
      languageAria: 'Alterar idioma do aplicativo',
      primaryBadge: 'Principal',
    },
    hero: {
      eyebrow: 'Treino e estratégia para jogadores',
      title: 'Melhore sua habilidade e jogabilidade em cada partida.',
      subtitle:
        'Helpful Smile reúne dicas táticas, diagnóstico de erros comuns, ajustes recomendados e exercícios práticos para os jogos mais famosos.',
      exploreGames: 'Explorar jogos',
      testReflexes: 'Testar reflexos e mira',
      fallbackLabel: 'Helpful Smile · Estação de prática',
      imageAlt: 'Estação de treino e análise tática Helpful Smile',
      strip: {
        catalogLabel: 'Catálogo ativo',
        gamesCountSuffix: 'jogos',
        catalogSub: 'Guias táticos passo a passo',
        correctionLabel: 'Correção rápida',
        correctionTitle: 'Diagnóstico real',
        correctionSub: 'Detecte falhas comuns e corrija',
        labLabel: 'Laboratório',
        labTitle: 'Mira e reflexos',
        labSub: 'Meça precisão e tempo em ms',
        configLabel: 'Configuração',
        configTitle: 'Ajustes e eDPI',
        configSub: 'Sensibilidade, FOV e controles ideais',
      },
    },
    catalog: {
      eyebrow: 'Recomendações por título',
      title: 'Escolha seu jogo para melhorar a jogabilidade',
      subtitle:
        'Cada guia traz dicas mecânicas, leitura de mapa, erros frequentes, configurações recomendadas e rotina diária.',
      searchPlaceholder: 'Buscar jogo ou habilidade...',
      searchAria: 'Buscar jogo ou habilidade',
      allGenre: 'Todos',
      genres: {
        'FPS Táctico': 'FPS Tático',
        'Battle Royale': 'Battle Royale',
        'MOBA y Estrategia': 'MOBA e Estratégia',
        'Deportes y Motor': 'Esportes e Corrida',
        'Acción y Sandbox': 'Ação e Sandbox',
      },
      emptyTitle: (query) => `Nenhum jogo encontrado para "${query}"`,
      emptySubtitle:
        'Tente outro título famoso ou redefina os filtros de gênero.',
      showAll: 'Mostrar todos os jogos',
      focusLabel: 'Foco',
      habitsToday: (done, total) => `${done}/${total} hábitos hoje`,
      viewTips: 'Ver dicas',
      imageAlt: (name) => `Guia tático de ${name}`,
    },
    principles: {
      eyebrow: 'Princípios universais',
      title: 'Três pilares que elevam seu nível em qualquer jogo',
      cards: [
        {
          title: 'Geometria de ângulos e cobertura',
          description:
            'Abra ângulo expondo apenas uma linha de tiro por vez e mantenha cobertura sólida sempre a um passo.',
        },
        {
          title: 'Economia, waves e pressão de mapa',
          description:
            'Transforme recursos constantes e controle de tempo em vantagens reais antes de forçar lutas arriscadas.',
        },
        {
          title: 'Rotação antecipada e leitura de zona',
          description:
            'Mova-se para o lado menos povoado do círculo com antecedência para segurar terreno elevado.',
        },
      ],
    },
    footer: {
      tagline: 'Helpful Smile · Treino e evolução de jogabilidade',
      catalog: 'Catálogo de jogos',
      lab: 'Laboratório de prática',
      plan: 'Plano personalizado',
      languageTitle: 'Idioma',
    },
    gameDetail: {
      backToCatalog: 'Voltar ao catálogo de jogos',
      demandPrefix: 'Exigência',
      difficulties: {
        Accesible: 'acessível',
        Intermedia: 'intermediária',
        Exigente: 'exigente',
      },
      mainFocus: 'Foco principal de melhoria',
      practiceButton: 'Treinar reflexos e mira',
      tabsAria: 'Seções de treino do jogo',
      tabTips: 'Dicas de jogabilidade',
      tabMistakes: 'Diagnóstico de erros',
      tabSettings: 'Ajustes ideais',
      tabRoutine: 'Rotina diária',
      pillars: {
        Mecánicas: 'Mecânicas',
        'Visión de Juego': 'Visão de Jogo',
        Decisiones: 'Decisões',
        Mentalidad: 'Mentalidade',
      },
      whyItWorks: 'Por que melhora seu desempenho',
      selectProblem: 'Selecione o problema que mais acontece',
      diagnosticSubtitle: 'Diagnóstico e correção',
      symptomTitle: 'Como aparece na partida',
      fixTitle: 'Solução tática imediata',
      drillTitle: 'Exercício prático para corrigir',
      settingsHeader: (name) => `Configuração recomendada para ${name}`,
      settingsSubtitle:
        'Ajustes pensados para clareza visual, resposta rápida e consistência mecânica.',
      routineHeader: 'Lista de aquecimento e prática diária',
      routineSubtitle:
        'Marque os exercícios conforme concluir antes de entrar nas ranqueadas.',
      completedCount: (done, total) => `${done} de ${total} concluídos`,
      reset: 'Reiniciar',
      spanishGuideNotice:
        'Os guias táticos detalhados são mantidos em espanhol (idioma principal).',
    },
    trainingLab: {
      eyebrow: 'Laboratório prático',
      title: 'Treine sua mira, reflexos e sensibilidade',
      subtitle:
        'Não leia apenas dicas: meça sua precisão real e ajuste sua configuração antes de competir.',
      tabAim: 'Mira',
      tabTracking: 'Rastreamento',
      tabReaction: 'Reflexos (ms)',
      tabKeys: 'Combos (Teclas)',
      tabEdpi: 'Calculadora eDPI',
      aim: {
        sizeLabel: 'Tamanho:',
        small: 'Pequeno',
        medium: 'Médio',
        large: 'Grande',
        timeLabel: 'Tempo:',
        timeCounter: 'Tempo:',
        hitsCounter: 'Acertos:',
        accuracyCounter: 'Precisão:',
        recordCounter: 'Recorde:',
        idleTitle: 'Treino de transição e clique preciso',
        idleDesc:
          'Clique nos alvos o mais rápido possível sem errar tiros no vazio.',
        startButton: (sec) => `Iniciar teste (${sec}s)`,
        targetAria: 'Alvo de mira',
        resultLabel: 'Resultado da sessão',
        targetsLabel: 'Alvos',
        accuracyLabel: 'Precisão',
        targetsPerSecLabel: 'Alvos / seg',
        repeatButton: 'Repetir exercício',
        feedbackLowAcc:
          'Sua velocidade de clique supera seu controle atual: estabilize a mira por um instante antes de clicar para passar de 85% de precisão.',
        feedbackSlow:
          'Ótima precisão. Agora tente encadear transições mais rápidas entre alvos mantendo o mouse leve.',
        feedbackGood:
          'Excelente equilíbrio entre velocidade e precisão. Você está pronto para treinar duelos em movimento no jogo.',
      },
      tracking: {
        speedLabel: 'Velocidade:',
        slow: 'Lento',
        normal: 'Normal',
        fast: 'Rápido',
        timeLabel: 'Tempo:',
        timeCounter: 'Tempo:',
        trackingCounter: 'No alvo:',
        recordCounter: 'Recorde:',
        idleTitle: 'Rastreamento contínuo de alvo móvel',
        idleDesc:
          'Mantenha o cursor ou dedo sobre o alvo enquanto ele se move sem perdê-lo. Ideal para Apex, Overwatch 2 e Warzone.',
        startButton: (sec) => `Iniciar treino (${sec}s)`,
        onTarget: 'No alvo',
        offTarget: 'Fora do alvo',
        resultLabel: 'Resultado do rastreamento',
        onTargetPctLabel: 'Tempo no alvo',
        timeTrackedLabel: 'Segundos travado',
        bestLabel: 'Melhor marca',
        repeatButton: 'Repetir rastreamento',
        feedbackLow:
          'Mudanças de direção estão quebrando sua mira. Tente reduzir um pouco a sensibilidade ou relaxar o pulso para acompanhar com o antebraço.',
        feedbackMid:
          'Bom controle base. Antecipe os rebotes nas bordas sem movimentos bruscos no mouse.',
        feedbackHigh:
          'Rastreamento excelente. Seu controle fluido dá vantagem direta em trocas longas com armas automáticas.',
      },
      reaction: {
        idleTitle: 'Teste de velocidade de reação',
        idleDesc:
          'Clique aqui para começar. Espere o painel ficar verde e clique o mais rápido possível.',
        waitingTitle: 'Aguarde o sinal verde...',
        waitingDesc:
          'Mantenha o dedo pronto sobre o botão esquerdo do mouse ou tela.',
        readyTitle: 'CLIQUE AGORA!',
        readyDesc: 'Sinal ativo',
        tooSoonTitle: 'Clicou cedo demais',
        tooSoonDesc:
          'Clique novamente para repetir esta tentativa sem se antecipar.',
        measuredLabel: 'Tempo de reação medido',
        resultDesc:
          'Clique em qualquer lugar do painel para fazer outra tentativa.',
        logTitle: 'Registro de tentativas',
        emptyLog:
          'Complete pelo menos 3 tentativas para calcular sua média real e receber uma dica de jogo.',
        recentAvg: 'Média recente',
        clearHistory: 'Limpar histórico',
        feedbackFast:
          'Reflexos excelentes. Aproveite vantagens de primeiro contato com sniper ou rifles de rajada.',
        feedbackSolid:
          'Faixa competitiva sólida. Compense duelos curtos melhorando o posicionamento prévio da mira.',
        feedbackSlow:
          'Tempo de resposta relaxado ou com fadiga. Descanse a vista, use monitor 120Hz+ se possível e antecipe ângulos.',
      },
      keys: {
        durationBadge: '20s · Teclado ou toque',
        timeCounter: 'Tempo:',
        hitsCounter: 'Acertos:',
        streakCounter: 'Sequência:',
        accuracyCounter: 'Precisão:',
        recordCounter: 'Recorde:',
        idleTitle: 'Treino de combos e teclas táticas',
        idleDesc:
          'Pressione a tecla indicada no teclado (ou toque na tela) o mais rápido possível sem errar para treinar reflexos de movimento e habilidades.',
        startButton: 'Iniciar desafio (20s)',
        promptHint: 'Pressione ou clique na tecla:',
        spaceLabel: 'ESPAÇO',
        resultLabel: 'Resultado de reflexo tático',
        avgMsLabel: 'ms / tecla',
        maxStreakLabel: 'Maior sequência',
        repeatButton: 'Repetir desafio',
        feedbackLowAcc:
          'Priorize acertar a tecla certa antes de acelerar: na partida, errar uma habilidade ou counter-strafe custa o duelo.',
        feedbackSlow:
          'Boa precisão nos dedos. Mantenha os dedos apoiados em W-A-S-D e Q-E-R para reduzir a distância de resposta.',
        feedbackGood:
          'Velocidade e precisão excepcionais no teclado. Sua execução de habilidades e esquivas sob pressão está afiada.',
      },
      edpi: {
        selectGame: 'Selecione seu jogo principal',
        mouseDpi: 'DPI do mouse',
        sensPercent: 'Sensibilidade no jogo (%)',
        sensIngame: 'Sensibilidade dentro do jogo',
        effectiveEdpi: 'Seu eDPI efetivo',
        turn360: 'Giro de 360°',
        recommendedRange: (game, min, max) =>
          `Faixa recomendada em ${game}: ${min} – ${max} eDPI`,
        verdictLowTitle: 'Sensibilidade Baixa (Controle extremo)',
        verdictLowDetail:
          'Excelente precisão a longa distância, mas exige mousepad largo para girar 180° contra flancos.',
        verdictHighTitle: 'Sensibilidade Alta (Risco de passar do alvo)',
        verdictHighDetail:
          'Você gira rápido, mas microajustes na cabeça perdem estabilidade. Experimente reduzir 15% por 3 dias.',
        verdictGoodTitle: 'Faixa Competitiva Ideal',
        verdictGoodDetail:
          'Equilíbrio ideal entre estabilidade nos microajustes e agilidade para limpar esquinas.',
        notes: {
          valorant:
            'Faixa padrão competitiva para microajustes precisos na altura da cabeça.',
          cs2: 'Equivale a 30–50 cm para um giro completo de 360°.',
          apex: 'Permite acompanhamento contínuo (tracking) e giros rápidos de curta distância.',
          fortnite:
            'Calculado multiplicando DPI × % sensibilidade X/Y (ex: 800 × 6.5% = 52 eDPI).',
          overwatch2:
            'Ideal para combinar tracking vertical e giros de 180°.',
          r6: 'Baseado no multiplicador padrão (0.02); equilibra abertura de ângulos e pixels fechados.',
          marvelrivals:
            'Equilíbrio confortável para acompanhar heróis de alta mobilidade.',
          warzone:
            'Faixa popular no Warzone (ex: 800 DPI × 5.0 = 4000 eDPI) para controlar recuo a média distância.',
          pubg: 'Baseado na sensibilidade geral do PUBG; oferece firmeza em sprays de longa distância.',
          destiny2:
            'Combina tracking ágil no PvP com precisão estável para revólveres e snipers.',
          halo: 'Ideal para manter a mira grudada em duelos longos de escudo na Arena.',
          rust: 'Calculado sobre o `input.sensitivity` clássico para controlar rifles e arcos.',
        },
      },
    },
    personalPlan: {
      eyebrow: 'Plano personalizado',
      title: 'Monte sua rotina diária de evolução',
      subtitle:
        'Informe seu jogo principal, nível atual e maior dificuldade para gerar um plano diário objetivo.',
      q1: '1. Em qual jogo você quer subir de nível?',
      q2: '2. Qual é o seu nível atual nesse jogo?',
      q3: '3. Tempo diário disponível para treinar',
      q4: '4. O que mais te trava neste momento?',
      tiers: {
        Principiante: 'Iniciante',
        Intermedio: 'Intermediário',
        Avanzado: 'Avançado',
      },
      weaknesses: {
        'Puntería y control mecánico': 'Mira e controle mecânico',
        'Posicionamiento y lectura de mapa': 'Posicionamento e leitura de mapa',
        'Decisiones bajo presión': 'Decisões sob pressão',
        'Mentalidad y control de frustración': 'Mentalidade e controle emocional',
      },
      minUnit: 'min',
      minPerDay: 'min/dia',
      generateButton: 'Gerar meu plano diário',
      levelPrefix: 'Nível',
      goalPrefix: 'Objetivo: melhorar em',
      viewGuide: (name) => `Ver guia de ${name}`,
      changeGoal: 'Alterar objetivo',
      phase1: 'Fase 01 · Aquecimento',
      phase2: 'Fase 02 · Prática direcionada',
      phase3: 'Fase 03 · Revisão tática',
      fallbackDrill: (game) =>
        `Aquecimento técnico em ${game} focado em controle básico.`,
      focusAim: (game, rec, mins) =>
        `Prática isolada em ${game}: aplique "${rec}" sem se preocupar com o placar (${mins} min).`,
      focusPosition: (game, rec, mins) =>
        `Em partidas reais de ${game}, verifique cobertura e minimapa a cada 15 segundos aplicando "${rec}" (${mins} min).`,
      focusDecision: (rec, mins) =>
        `Jogue focado em "${rec}" e evite forçar trocas desfavoráveis (${mins} min).`,
      focusMental: (mins) =>
        `Sessão com foco calmo: jogue no máximo 2 partidas seguidas analisando cada queda em 5 segundos sem culpar o time (${mins} min).`,
      reviewBeginner: (game, mins) =>
        `Anote 1 erro que custou a partida hoje e revise a aba "Diagnóstico de erros" de ${game} (${mins} min).`,
      reviewAdvanced: (mins) =>
        `Revise as primeiras 3 eliminações ou falhas chave da sua última partida para identificar padrões repetidos (${mins} min).`,
    },
    pwa: {
      installApp: 'Instalar app',
      installIOS: 'Instalar no iOS',
      iosModalTitle: 'Instalar no iPhone ou iPad',
      closeAria: 'Fechar instruções',
      iosStep1Pre: 'Toque no botão',
      iosStep1Bold: 'Compartilhar',
      iosStep1Post: 'na barra do Safari.',
      iosStep2Pre: 'Role para baixo e selecione',
      iosStep2Bold: 'Adicionar à Tela de Início',
      iosUnderstood: 'Entendi',
      offlineBadge: 'Modo offline · Guias e rotinas disponíveis',
    },
  },
};

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('helpful-smile-lang');
      if (saved === 'es' || saved === 'en' || saved === 'pt') {
        return saved;
      }
    } catch {
      // Ignorar errores de almacenamiento
    }
    return 'es'; // Español como idioma principal predeterminado
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('helpful-smile-lang', language);
    } catch {
      // Ignorar errores de almacenamiento
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
