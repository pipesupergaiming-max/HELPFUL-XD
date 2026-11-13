export type GameGenre =
  | 'FPS Táctico'
  | 'Battle Royale'
  | 'MOBA y Estrategia'
  | 'Deportes y Motor'
  | 'Acción y Sandbox';

export interface GameplayRecommendation {
  pillar: 'Mecánicas' | 'Visión de Juego' | 'Decisiones' | 'Mentalidad';
  title: string;
  advice: string;
  whyItWorks: string;
}

export interface MistakeDiagnostic {
  id: string;
  problem: string;
  symptom: string;
  fix: string;
  drillToFix: string;
}

export interface SettingItem {
  label: string;
  value: string;
  note: string;
}

export interface DailyDrill {
  id: string;
  task: string;
  duration: string;
}

export interface GameGuide {
  id: string;
  name: string;
  genre: GameGenre;
  platform: string;
  skillFocus: string;
  difficulty: 'Accesible' | 'Intermedia' | 'Exigente';
  summary: string;
  visualTheme: string;
  recommendations: GameplayRecommendation[];
  commonMistakes: MistakeDiagnostic[];
  settingsGuide: SettingItem[];
  dailyDrills: DailyDrill[];
}

export const GENRE_IMAGES: Record<GameGenre, string> = {
  'FPS Táctico': '/src/assets/images/genre_fps_tactical_1794532599507.jpg',
  'Battle Royale': '/src/assets/images/genre_battle_royale_1794532600636.jpg',
  'MOBA y Estrategia': '/src/assets/images/genre_moba_strategy_1794532599892.jpg',
  'Deportes y Motor': '/src/assets/images/hero_coaching_desk_1794532599204.jpg',
  'Acción y Sandbox': '/src/assets/images/genre_battle_royale_1794532600636.jpg',
};

export const GAMES_CATALOG: GameGuide[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    genre: 'FPS Táctico',
    platform: 'PC · Consola',
    skillFocus: 'Colocación de mira y uso de habilidades',
    difficulty: 'Exigente',
    summary:
      'Domina los duelos en el primer disparo manteniendo la mira a la altura de la cabeza y coordinando utilidades con tu equipo antes de abrir ángulos.',
    visualTheme: 'from-slate-800 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Pre-apuntado a la altura de la cabeza',
        advice:
          'Usa las cajas y marcas horizontales de cada mapa como referencia constante. No mires el suelo al rotar; mueve el ratón trazando las esquinas por donde saldrá el rival.',
        whyItWorks:
          'Reduce el tiempo de reacción necesario a un microajuste horizontal de pocos milímetros.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Regla de los ángulos desventajosos',
        advice:
          'Al limpiar un sitio, abre ángulo por ángulo (slicing the pie) usando A y D sin pulsar W. Así solo te expones a un enemigo a la vez.',
        whyItWorks:
          'Evita quedar atrapado en fuego cruzado y te da ventaja de perspectiva si estás más lejos de la pared que el rival.',
      },
      {
        pillar: 'Decisiones',
        title: 'Disciplina de economía en equipo',
        advice:
          'Compra o ahorra siempre al mismo ritmo que tus compañeros para garantizar rondas completas con rifle y escudo pesado en lugar de compras sueltas.',
        whyItWorks:
          'Una ronda con armas inferiores coordinada con flashes tiene mucha más probabilidad de éxito que comprar sin utilidad.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Comunica datos cortos, no órdenes',
        advice:
          'Di exactamente ubicación, daño realizado y qué habilidad escuchaste en menos de tres segundos tras caer.',
        whyItWorks:
          'Mantiene el audio limpio para tus compañeros vivos que necesitan escuchar pasos.',
      },
    ],
    commonMistakes: [
      {
        id: 'val-1',
        problem: 'Disparo antes de frenar por completo (error de movimiento)',
        symptom: 'Las balas salen desviadas aunque el punto esté sobre el enemigo.',
        fix: 'Practica el contra-strafing o suelta las teclas de movimiento un instante antes del clic izquierdo.',
        drillToFix: '10 minutos en galería con bots en strafe disparando ráfagas de 2 balas tras detenerte.',
      },
      {
        id: 'val-2',
        problem: 'Recargar tras conseguir una sola baja',
        symptom: 'Mueres a mitad de animación cuando aparece el segundo rival a intercambiar.',
        fix: 'Si te quedan más de 8 balas en el cargador y estás en zona caliente, mantén el arma lista y recolócate.',
        drillToFix: 'Juega dos partidas de Deathmatch prohibiéndote recargar hasta tener menos de 5 balas.',
      },
    ],
    settingsGuide: [
      { label: 'eDPI recomendado', value: '200 – 360 eDPI', note: 'Ej: 800 DPI × 0.35 sens' },
      { label: 'Mira', value: 'Estática compacta', note: 'Sin error de movimiento ni disparo para evitar ruido visual' },
      { label: 'Minimapa', value: 'Fijo · Tamaño 1.1', note: 'Te permite ver rotaciones de ambos sitios a la vez' },
      { label: 'Límite FPS', value: 'Fijo estable / Reflex On', note: 'Prioriza estabilidad de frame-time sobre gráficos altos' },
    ],
    dailyDrills: [
      { id: 'val-d1', task: '50 eliminaciones con Sheriff buscando solo disparos a la cabeza', duration: '5 min' },
      { id: 'val-d2', task: '2 Deathmatch practicando apertura de ángulos sin agacharse (crouch)', duration: '12 min' },
      { id: 'val-d3', task: 'Repasar 2 lineups o humos clave en partida personalizada', duration: '5 min' },
    ],
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    genre: 'FPS Táctico',
    platform: 'PC',
    skillFocus: 'Counter-strafe, spray y control de mapa',
    difficulty: 'Exigente',
    summary:
      'La precisión mecánica y la lectura de utilidades deciden cada ronda. Aprende a frenar tu inercia al milisegundo y a intercambiar bajas con tu compañero.',
    visualTheme: 'from-slate-800 to-blue-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Domina el counter-strafe con A y D',
        advice:
          'Cuando te muevas a la izquierda con A, da un toque rápido a D justo antes de disparar para llevar tu velocidad a cero de forma instantánea.',
        whyItWorks:
          'En CS2 la inercia continúa brevemente si solo sueltas la tecla; frenar con la tecla opuesta activa precisión perfecta al instante.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Juega para el intercambio (trade kill)',
        advice:
          'Nunca dejes que tu primer compañero entre solo a un sitio sin cobertura. Mantente a 1 segundo de distancia para eliminar al defensor en cuanto dispare.',
        whyItWorks:
          'Convierte cualquier baja inicial defensiva en un 4v4 favorable a los atacantes por control de espacio.',
      },
      {
        pillar: 'Decisiones',
        title: 'Guarda utilidades para el retake o post-plant',
        advice:
          'No gastes todas las granadas en los primeros 15 segundos de ronda si no ves presencia enemiga real.',
        whyItWorks:
          'Una incendiaria o humo en los últimos 20 segundos de bomba gana rondas por sí sola.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Reinicia tu enfoque cada ronda',
        advice:
          'Analiza en 5 segundos durante la compra por qué moriste (¿mal ángulo o mala comunicación?) y suéltalo antes de que caiga la barrera.',
        whyItWorks:
          'Evita arrastrar frustración que provoque entradas precipitadas en rondas siguientes.',
      },
    ],
    commonMistakes: [
      {
        id: 'cs-1',
        problem: 'Empezar el spray demasiado pronto a media-larga distancia',
        symptom: 'Las balas suben por encima del rival tras el cuarto disparo.',
        fix: 'A más de 20 metros usa ráfagas cortas de 2-3 balas y resetea el retroceso con un paso lateral.',
        drillToFix: '100 bajas en mapa de Aim Botz solo con ráfagas de 3 balas manteniendo movimiento lateral.',
      },
      {
        id: 'cs-2',
        problem: 'Asomarse con la granada en la mano',
        symptom: 'Te sorprenden en una esquina sin poder disparar.',
        fix: 'Saca humos y flashes siempre detrás de cobertura sólida antes de lanzarlos con rebote.',
        drillToFix: 'Practica 5 lanzamientos con rebote desde cobertura segura en Mirage o Inferno.',
      },
    ],
    settingsGuide: [
      { label: 'eDPI recomendado', value: '600 – 1000 eDPI', note: 'Ej: 800 DPI × 1.0 sens' },
      { label: 'Radar', value: 'Zoom 0.45 · Centrado Off', note: 'Muestra el mapa entero para detectar bomba caída' },
      { label: 'Audio', value: 'Perfil Nítido + EQ limpio', note: 'Facilita distinguir pasos en madera vs metal' },
      { label: 'Binds', value: 'Tecla dedicada por granada', note: 'Evita girar la ruleta con el número 4' },
    ],
    dailyDrills: [
      { id: 'cs-d1', task: '5 minutos de control de patrón de las primeras 10 balas de AK-47 y M4', duration: '5 min' },
      { id: 'cs-d2', task: '150 bajas en mapa de práctica enfocadas en counter-strafe', duration: '10 min' },
      { id: 'cs-d3', task: '1 partida de Retakes para mejorar toma de decisiones bajo reloj', duration: '15 min' },
    ],
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    genre: 'Battle Royale',
    platform: 'PC · Consola · Móvil',
    skillFocus: 'Construcción, edición, piece control y rotación',
    difficulty: 'Exigente',
    summary:
      'Gana más peleas cerrando ángulos antes que tu rival y rotando con ventaja de altura en zonas finales tanto en Construcción como en Cero Construcción.',
    visualTheme: 'from-blue-900 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Prioriza el piece control antes de disparar',
        advice:
          'Antes de abrir un edit para disparar, coloca un cono dentro de la caja del rival o paredes laterales para limitar su escape.',
        whyItWorks:
          'Controlar las estructuras alrededor del enemigo te permite elegir el momento exacto del pico derecho.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Aprovecha siempre el pico derecho (Right-Hand Peek)',
        advice:
          'La cámara está sobre tu hombro derecho. Edita ventanas o esquinas superiores derechas para disparar exponiendo lo mínimo tu cuerpo.',
        whyItWorks:
          'Te deja ver y disparar al oponente fracciones de segundo antes de que él tenga ángulo limpio sobre ti.',
      },
      {
        pillar: 'Decisiones',
        title: 'Evita peleas largas en mitad de tormenta',
        advice:
          'Si una pelea dura más de 25 segundos fuera de zona segura, rompe contacto y rota hacia el lado muerto del círculo.',
        whyItWorks:
          'Las peleas largas atraen terceros (third parties) y queman materiales necesarios para el cierre.',
      },
      {
        pillar: 'Mentalidad',
        title: 'En Cero Construcción, juega con cobertura natural y movilidad',
        advice:
          'Lleva siempre un objeto de escape (impulso, gancho o vehículo) y nunca cruces explanadas abiertas sin saber dónde hay rocas o árboles.',
        whyItWorks:
          'Sin paredes artificiales, el posicionamiento preventivo sustituye a la construcción defensiva.',
      },
    ],
    commonMistakes: [
      {
        id: 'fn-1',
        problem: 'Saltar dentro de la caja enemiga sin ventaja de vida (50/50)',
        symptom: 'Ganas unas veces y pierdes otras por pura suerte de escopeta.',
        fix: 'Dispara desde un edit seguro, vuelve a cerrar el edit al instante y cambia de ángulo.',
        drillToFix: '10 minutos en mapas de Box Fight concentrándote en editar-disparar-cerrar sin entrar.',
      },
      {
        id: 'fn-2',
        problem: 'Quedarse sin materiales en zonas móviles finales',
        symptom: 'Mueres expuesto al cruzar en top 10.',
        fix: 'Reutiliza túneles y construcciones ajenas durante las rotaciones y recarga madera/piedra en medio juego.',
        drillToFix: 'Juega 3 partidas fijándote la meta de entrar a zona 4 con al menos 1200 materiales totales.',
      },
    ],
    settingsGuide: [
      { label: 'Confirmar edición', value: 'Al soltar (Ambos)', note: 'Acelera cadenas de triple edit con menos pulsaciones' },
      { label: 'Visualizar efectos de sonido', value: 'Activado', note: 'Detecta cofres, pasos y disparos antes que el audio puro' },
      { label: 'Binds de construcción', value: 'Dedos independientes', note: 'Separa pared, escalera y cono en botones accesibles del ratón/teclado' },
      { label: 'Modo rendimiento', value: 'Mallas bajas / Distancia alta', note: 'Maximiza FPS estables en finales con muchos jugadores' },
    ],
    dailyDrills: [
      { id: 'fn-d1', task: '10 minutos de freebuild practicando túneles y retakes básicos sin trabarse', duration: '10 min' },
      { id: 'fn-d2', task: 'Mapas de Piece Control enfocados en colocar cono antes del disparo', duration: '10 min' },
      { id: 'fn-d3', task: '3 rondas de Zone Wars practicando rotaciones económicas', duration: '10 min' },
    ],
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    genre: 'MOBA y Estrategia',
    platform: 'PC',
    skillFocus: 'Control de oleadas, CS, visión y objetivos',
    difficulty: 'Exigente',
    summary:
      'El oro constante y el control de oleadas superan a buscar peleas arriesgadas. Aprende cuándo empujar, cuándo congelar y cómo convertir ventajas en objetivos.',
    visualTheme: 'from-emerald-900 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Meta de 7+ súbditos por minuto',
        advice:
          'No golpees súbditos automáticamente: espera al último instante de vida para dar el último golpe (last hit) y observa el proyectil de tus magos aliados.',
        whyItWorks:
          '15 súbditos equivalen aproximadamente al oro de una eliminación completa sin ningún riesgo de morir.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Regla del minimapa cada 4 segundos',
        advice:
          'Echa un vistazo rápido al minimapa cada vez que mates un súbdito o uses una habilidad. Si no ves al jungla rival, asume que está en tu lado.',
        whyItWorks:
          'Reduce drásticamente las muertes por emboscadas previsibles en fase de líneas.',
      },
      {
        pillar: 'Decisiones',
        title: 'Control de oleadas: Empujar vs Congelar',
        advice:
          'Empuja toda la oleada bajo torre rival justo antes de volver a base para que pierda experiencia. Congela cerca de tu torre cuando tengas ventaja y quieras castigar.',
        whyItWorks:
          'Multiplica tu ventaja de nivel sin necesidad de arriesgar bajo torre enemiga.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Reduce tu grupo de campeones a 2 o 3',
        advice:
          'Elige 2 campeones principales para tu rol y domina sus enfrentamientos difíciles en lugar de cambiar cada partida.',
        whyItWorks:
          'Automatizas el daño límite de tu campeón y liberas atención mental para leer el mapa.',
      },
    ],
    commonMistakes: [
      {
        id: 'lol-1',
        problem: 'Pelear en desventaja numérica o sin visión antes de Dragón',
        symptom: 'El equipo pierde una escaramuza 45 segundos antes del objetivo y regala mapa.',
        fix:
          'Prepara la oleada de mid y coloca centinelas 1 minuto antes de que nazca el objetivo, sin iniciar peleas sin información.',
        drillToFix: 'Revisa tus últimas 3 muertes en el minuto 15-25 y anota dónde estaba tu visión.',
      },
      {
        id: 'lol-2',
        problem: 'Perseguir bajas por la jungla sin visión en lugar de tirar torres',
        symptom: 'Conviertes una pelea ganada en una trampa enemiga al alargarse.',
        fix: 'Tras ganar una pelea, toma inmediatamente la torre, campamento o dragón más cercano en los siguientes 15 segundos.',
        drillToFix: 'En tu próxima partida, marca en voz alta el objetivo tras cada pelea ganada.',
      },
    ],
    settingsGuide: [
      { label: 'Cámara', value: 'Suelta (Espacio para centrar)', note: 'Permite vigilar peleas y líneas vecinas con libertad' },
      { label: 'Lanzamiento rápido', value: 'Activado con indicador opcional', note: 'Reduce milisegundos cruciales en combos' },
      { label: 'Attack Move Click', value: 'Tecla A o clic lateral', note: 'Facilita el kiteo con tiradores y evita caminar hacia el enemigo por error' },
      { label: 'Tamaño Minimapa', value: 'Escala 100 o superior', note: 'Hace imposible ignorar rotaciones rivales' },
    ],
    dailyDrills: [
      { id: 'lol-d1', task: '5 min en herramienta de práctica: conseguir 40+ CS en los primeros 5 min sin objetos', duration: '5 min' },
      { id: 'lol-d2', task: 'Practicar el combo principal y cancelación de animación de tu campeón', duration: '5 min' },
      { id: 'lol-d3', task: 'Revisar solo las primeras 3 muertes de tu última partida para detectar patrón', duration: '8 min' },
    ],
  },
  {
    id: 'apex-legends',
    name: 'Apex Legends',
    genre: 'Battle Royale',
    platform: 'PC · Consola',
    skillFocus: 'Tracking continuo, movimiento y cobertura',
    difficulty: 'Exigente',
    summary:
      'Con tiempos para matar largos (TTK alto), la consistencia al seguir objetivos en movimiento y saber recargar tras cobertura definen al ganador.',
    visualTheme: 'from-slate-800 to-zinc-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Recoil Smoothing en movimiento',
        advice:
          'Al disparar en automático, muévete lateralmente (strafe) mientras sigues al objetivo con la mira. El motor reduce el retroceso horizontal automáticamente.',
        whyItWorks:
          'Convierte armas difíciles como la R-99 o Flatline en láseres a media distancia.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Regla del 60/40 de cobertura',
        advice:
          'Procura que al menos un tercio de tu pantalla esté protegido por una roca, muro o desnivel mientras disparas.',
        whyItWorks:
          'Si rompen tu escudo, estás a medio paso de cubrirte para usar una batería sin perder el duelo.',
      },
      {
        pillar: 'Decisiones',
        title: 'Cambia de escudo (Armor Swap) antes de curar',
        advice:
          'Si hay cajas de enemigos caídos cerca tras terminar una pelea, prioriza cambiar al escudo lleno del suelo antes de usar pilas.',
        whyItWorks:
          'Te protege instantáneamente contra un tercer equipo que llegue atraído por los disparos.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Resetea y reposiciona si fallas la apertura',
        advice:
          'No fuerces un intercambio cuando ya perdiste 100 de vida y tu enemigo tiene escudo completo; usa tu habilidad táctica para romper línea de visión.',
        whyItWorks:
          'En Apex gana el equipo que sobrevive con recursos al cierre, no el que toma más duelos ciegos.',
      },
    ],
    commonMistakes: [
      {
        id: 'apex-1',
        problem: 'Quedarse en campo abierto disparando hasta vaciar dos cargadores',
        symptom: 'Te derriten entre dos jugadores rivales en 1.5 segundos.',
        fix: 'Dispara un cargador desde cobertura, cúbrete para recargar y asómate por el lado opuesto.',
        drillToFix: '10 minutos en Campo de Tiro practicando vaciar un cargador mientras haces strafe y deslizamiento hacia cobertura.',
      },
      {
        id: 'apex-2',
        problem: 'Lootear demasiado lento después de una pelea',
        symptom: 'Llega otro escuadrón y te atrapa mirando el inventario.',
        fix: 'Recoge solo escudo, munición y baterías en menos de 6 segundos y toma altura.',
        drillToFix: 'Cronometra tus looteos en partida para no pasar más de 5 segundos en cada caja.',
      },
    ],
    settingsGuide: [
      { label: 'FOV (Campo de visión)', value: '104 – 110', note: 'Mejora la visión periférica en combates cercanos' },
      { label: 'Sensibilidad', value: '800 DPI × 1.2–1.6', note: 'Balance ideal entre tracking suave y giros de 180°' },
      { label: 'Recibir daño cierra caja', value: 'Desactivado', note: 'Permite completar un armor swap aunque te estén disparando' },
      { label: 'Indicador de daño', value: 'Acumulativo', note: 'Sabes exactamente cuánto daño real llevas hecho a un rival' },
    ],
    dailyDrills: [
      { id: 'apex-d1', task: 'One-clip (derribar de un cargador) a maniquíes en movimiento a 25 metros', duration: '8 min' },
      { id: 'apex-d2', task: 'Practicar slide-jump y tap-strafe / superglide según plataforma', duration: '5 min' },
      { id: 'apex-d3', task: '2 rondas de Mixtape (Control/TDM) enfocadas en no perder cobertura', duration: '12 min' },
    ],
  },
  {
    id: 'warzone',
    name: 'Call of Duty: Warzone',
    genre: 'FPS Táctico',
    platform: 'PC · Consola',
    skillFocus: 'Centrado de mira, rotación y audio',
    difficulty: 'Intermedia',
    summary:
      'Anticipa la posición rival con buen centrado de mira, usa el minimapa tras cada eliminación y domina el ritmo de placas y reposicionamiento.',
    visualTheme: 'from-stone-800 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Centrado constante (Centering)',
        advice:
          'Mantén el punto blanco del centro de la pantalla apuntando exactamente a la puerta o ventana por donde puede salir alguien antes de apuntar con la mira (ADS).',
        whyItWorks:
          'Al pulsar ADS ya estás sobre el objetivo y ganas las primeras balas decisivas.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Usa placas mientras te reposicionas',
        advice:
          'Aprende a colocar placas mientras corres detrás de cobertura y rompes línea de visión (snaking / slide cancel) para no ser un blanco fácil.',
        whyItWorks:
          'Ganas ventaja de vida antes de que el rival logre seguir tu ruta.',
      },
      {
        pillar: 'Decisiones',
        title: 'Rotación temprana en círculos finales',
        advice:
          'No esperes a que el gas te empuje por la espalda; muévete al borde estrecho de la zona con tiempo para recibir a quienes vienen huyendo.',
        whyItWorks:
          'Quien espera en cobertura dentro de zona gana casi todos los enfrentamientos contra jugadores corriendo en el gas.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Lee el radar en Resurgimiento',
        advice:
          'Cada vez que remates o elimines a alguien, mira inmediatamente los puntos rojos que se revelan en el minimapa.',
        whyItWorks:
          'Sabes si su equipo está encima tuyo o lejos, evitando sorpresas al recargar.',
      },
    ],
    commonMistakes: [
      {
        id: 'wz-1',
        problem: 'Volver a asomarse por la misma ventana después de perder placas',
        symptom: 'El francotirador o fusilero enemigo ya tiene pre-apuntado ese pixel.',
        fix: 'Si te rompen placas, cambia obligatoriamente de piso, puerta o cobertura antes de volver a disparar.',
        drillToFix: 'En tu próxima sesión, aplica la regla: si pierdo placas, cambio de ángulo sí o sí.',
      },
      {
        id: 'wz-2',
        problem: 'Llevar dos armas para la misma distancia',
        symptom: 'Te quedas corto de alcance o lento en interiores.',
        fix: 'Combina un subfusil/escopeta ágil para interiores con un fusil de asalto/francotirador estable para media-larga distancia.',
        drillToFix: 'Revisa tus clases y asegúrate de tener una para corto alcance y otra para largo.',
      },
    ],
    settingsGuide: [
      { label: 'FOV', value: '110 – 120 (Afectado)', note: 'Reduce el retroceso visual al apuntar con miras x1' },
      { label: 'Sprint automático', value: 'Sprint táctico automático', note: 'Ahorra pulsaciones y agiliza el movimiento lateral' },
      { label: 'Comportamiento placas', value: 'Aplicar todas', note: 'Coloca las 3 placas con una sola pulsación mientras corres' },
      { label: 'Minimapa', value: 'Cuadrado', note: 'Muestra un 27% más de superficie que el minimapa circular' },
    ],
    dailyDrills: [
      { id: 'wz-d1', task: '5 minutos de práctica contra bots sin ayuda de mira para calentar el centrado', duration: '5 min' },
      { id: 'wz-d2', task: '2 partidas enfocadas exclusivamente en cambiar de ángulo tras cada intercambio', duration: '15 min' },
    ],
  },
  {
    id: 'ea-fc-25',
    name: 'EA Sports FC 25',
    genre: 'Deportes y Motor',
    platform: 'PC · Consola',
    skillFocus: 'Defensa con CDM, pases seguros y finalización',
    difficulty: 'Intermedia',
    summary:
      'Deja de sacar a tus centrales de posición. Defiende cerrando líneas de pase con tus mediocentros y construye ataques con paciencia y pases extras.',
    visualTheme: 'from-emerald-900 to-zinc-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Usa el Jockey (L2 / LT) y protege el balón',
        advice:
          'Al defender 1v1 en el área, mantén L2/LT para moverte lateralmente sin lanzarte con entrada a destiempo. Reserva el sprint solo para recuperar terreno.',
        whyItWorks:
          'Si fallas una entrada de pie quedas vendido; el jockey obliga al delantero a chocar o retroceder.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Defiende con tus mediocentros (MCD/MC)',
        advice:
          'Controla manualmente a tu mediocentro para tapar el pase hacia los delanteros y usa R1/RB con toques cortos para presionar con el segundo jugador.',
        whyItWorks:
          'Mantiene intacta la línea de cuatro defensas evitando huecos a la espalda.',
      },
      {
        pillar: 'Decisiones',
        title: 'El pase extra dentro del área',
        advice:
          'Cuando llegues a línea de fondo o al borde del área, no chutes precipitado frente a dos defensas; busca el pase atrás o al segundo palo libre.',
        whyItWorks:
          'Multiplica las probabilidades de gol de un 25% a más del 80% con portero vencido.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Cambia de banda cuando te presionen',
        advice:
          'Si el rival activa presión alta por un costado, da un pase largo aéreo o raso hacia tu lateral opuesto completamente solo.',
        whyItWorks:
          'Rompe su esquema de presión y te abre 30 metros de campo libre.',
      },
    ],
    commonMistakes: [
      {
        id: 'fc-1',
        problem: 'Mantener pulsado el botón de correr (R2/RT) todo el partido',
        symptom: 'Pierdes balones por control largo y tus jugadores se cansan al minuto 60.',
        fix: 'Suelta R2/RT al recibir el balón y gira hacia el espacio libre usando solo el joystick izquierdo o R1/RB.',
        drillToFix: 'Juega un partido completo obligándote a recibir siempre sin tocar el botón de sprint.',
      },
      {
        id: 'fc-2',
        problem: 'Sacar a los dos defensas centrales hacia el medio campo',
        symptom: 'Te filtran balones en profundidad (triángulos) constantemente.',
        fix: 'Cambia de cursor con el stick derecho hacia tus volantes para retroceder con ellos.',
        drillToFix: 'Practica cambiar de jugador con el stick derecho en lugar de L1/LB durante 2 partidos.',
      },
    ],
    settingsGuide: [
      { label: 'Cámara', value: 'Cooperativa (Altura 20 · Zoom 0)', note: 'Ves todo el ancho del campo para cambiar de banda' },
      { label: 'Cambio automático', value: 'Solo balones aéreos y sueltos', note: 'Evita que la IA desordene tu defensa en jugadas rápidas' },
      { label: 'Finalización precisa', value: 'Activada (práctica recomendada)', note: 'Los tiros en verde entran con mucha mayor potencia y ángulo' },
      { label: 'Defensa', value: 'Defensa Avanzada', note: 'Permite elegir entre carga física (X/A) y entrada limpia (O/B)' },
    ],
    dailyDrills: [
      { id: 'fc-d1', task: '5 minutos de juegos de habilidad de finalización precisa (Timed Finishing)', duration: '5 min' },
      { id: 'fc-d2', task: '1 partido en Squad Battles o Amistosos defendiendo exclusivamente con mediocentros', duration: '15 min' },
    ],
  },
  {
    id: 'rocket-league',
    name: 'Rocket League',
    genre: 'Deportes y Motor',
    platform: 'PC · Consola',
    skillFocus: 'Rotación al segundo palo, boost y recuperación',
    difficulty: 'Exigente',
    summary:
      'No necesitas goles aéreos imposibles para subir de rango: una rotación limpia al palo lejano, buena gestión de turbo y despejes potentes te llevarán lejos.',
    visualTheme: 'from-blue-900 to-indigo-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Recuperación rápida con Drift (Powerslide)',
        advice:
          'Cada vez que caigas al suelo tras un salto o choque, mantén pulsado el derrape y alinea las 4 ruedas con la dirección de la caída.',
        whyItWorks:
          'Conservas toda tu inercia sin gastar turbo extra al volver a defender.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Rotación al palo lejano (Back Post)',
        advice:
          'Cuando vuelvas a defender, nunca sigas la pelota por el mismo lado por donde ataca el rival. Cruza hacia el poste opuesto de tu portería.',
        whyItWorks:
          'Te da visión completa de toda la jugada y cubre el ángulo más peligroso de tiro.',
      },
      {
        pillar: 'Decisiones',
        title: 'Recoge pads pequeños de 12 en lugar de ir a la esquina',
        advice:
          'Con 3 o 4 pads pequeños (36-48 de turbo) puedes detener cualquier disparo y lanzar un contraataque sin abandonar la jugada.',
        whyItWorks:
          'Ir a por el turbo grande de 100 deja a tu equipo en inferioridad 3 o 4 segundos clave.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Respeta al primer hombre y no hagas double commit',
        advice:
          'Si tu compañero ya está yendo a disputar un balón o está en la esquina rival, quédate en el centro esperando el pase o el rebote.',
        whyItWorks:
          'Evita el error #1 de rangos bajos e intermedios: encajar goles con portería vacía.',
      },
    ],
    commonMistakes: [
      {
        id: 'rl-1',
        problem: 'Ir los dos o tres compañeros por el mismo balón en la esquina',
        symptom: 'El rival despeja fuerte y anota directo sin oposición.',
        fix: 'Mantén al menos un coche entre la mitad del campo y tu portería mientras el compañero centra.',
        drillToFix: 'Juega 3 partidos siendo consciente de mantener siempre una distancia de 1/3 de campo con tu compañero.',
      },
      {
        id: 'rl-2',
        problem: 'Tocar el balón sin propósito entregándoselo al rival',
        symptom: 'Pierdes la posesión inmediatamente después de despejar.',
        fix: 'Da un primer toque suave para controlar o golpea justo después del bote en el suelo para elevar un pase largo.',
        drillToFix: '10 minutos en Juego Libre conduciendo el balón despacio y variando la velocidad.',
      },
    ],
    settingsGuide: [
      { label: 'Sacudida de cámara', value: 'Desactivada', note: 'Elimina vibraciones molestas al tocar el balón o chocar' },
      { label: 'FOV / Distancia', value: 'FOV 110 · Distancia 260–280', note: 'Amplía la visión lateral de compañeros y rivales' },
      { label: 'Air Roll / Drift', value: 'L1 / LB', note: 'Permite saltar, acelerar y girar en el aire sin soltar botones clave' },
      { label: 'Zona muerta (Deadzone)', value: '0.05 – 0.08', note: 'Respuesta más ágil en los giros sin perder estabilidad' },
    ],
    dailyDrills: [
      { id: 'rl-d1', task: '5 minutos de Juego Libre siguiendo rutas de pads pequeños sin usar turbos grandes', duration: '5 min' },
      { id: 'rl-d2', task: 'Paquete de entrenamiento de despejes y paradas en sombra (Shadow Defense)', duration: '10 min' },
    ],
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    genre: 'Acción y Sandbox',
    platform: 'PC · Consola · Móvil',
    skillFocus: 'PvP, parkour, gestión de barra rápida y supervivencia',
    difficulty: 'Accesible',
    summary:
      'Mejora en supervivencia técnica, PvP (1.9+ o 1.8) y speedrunning dominando el acceso rápido a objetos y la colocación de bloques bajo presión.',
    visualTheme: 'from-emerald-800 to-stone-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Uso de teclas numéricas y cubo de agua (MLG)',
        advice:
          'Asigna espada, bloques, cubo de agua y arco a teclas fijas del 1 al 5 o botones laterales en lugar de usar la rueda del ratón.',
        whyItWorks:
          'Salvar una caída letal con agua o colocar bloques defensivos ocurre en décimas de segundo.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'W-Tap y distancia crítica en combate',
        advice:
          'En combate clásico o moderno, suelta y vuelve a pulsar W justo tras golpear para reiniciar el empuje (knockback) y mantener al rival fuera de su alcance.',
        whyItWorks:
          'Te permite encadenar golpes seguidos (combo) sin recibir daño de vuelta.',
      },
      {
        pillar: 'Decisiones',
        title: 'Orden de supervivencia en el Nether y cuevas',
        advice:
          'Lleva siempre una pieza de oro equipada en el Nether, camas o bloques de construcción en la mano secundaria y nunca piques directamente hacia abajo.',
        whyItWorks:
          'Previene el 90% de las muertes evitables que arruinan mundos avanzados.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Domina el ritmo del escudo y hacha (Java 1.9+)',
        advice:
          'En combate moderno espera a que se cargue al 100% el indicador de golpe antes de atacar y usa el hacha solo para desactivar el escudo enemigo.',
        whyItWorks:
          'Los golpes rápidos sin carga hacen una fracción mínima del daño real.',
      },
    ],
    commonMistakes: [
      {
        id: 'mc-1',
        problem: 'Hacer spam de clics en versiones modernas (1.9+)',
        symptom: 'El enemigo apenas recibe daño mientras te derriba en tres golpes.',
        fix: 'Activa el indicador de ataque junto a la mira y sincroniza el clic con el tiempo de carga.',
        drillToFix: 'Practica contra zombies o esqueletos buscando golpes críticos al caer de un salto.',
      },
      {
        id: 'mc-2',
        problem: 'Desorientarse en minas o el Nether',
        symptom: 'Pierdes horas buscando tu portal o tu base.',
        fix: 'Coloca antorchas siempre en la pared derecha al bajar (así al volver quedan a tu izquierda) y anota coordenadas clave.',
        drillToFix: 'Crea un sistema fijo de señalización con bloques visibles en cada cruce de tu mundo.',
      },
    ],
    settingsGuide: [
      { label: 'Indicador de ataque', value: 'Mira (Crosshair)', note: 'Esencial para sincronizar golpes al 100% de daño' },
      { label: 'Teclas rápidas (Hotkeys)', value: 'Slots 7-9 en R, F, C o ratón', note: 'Evita estirar los dedos para sacar perlas o bloques' },
      { label: 'Balanceo de visión', value: 'Opcional / Desactivado en PvP', note: 'Estabiliza la pantalla al esprintar y saltar' },
    ],
    dailyDrills: [
      { id: 'mc-d1', task: '5 minutos practicando saltos de puente rápido y salvadas con cubo de agua', duration: '5 min' },
      { id: 'mc-d2', task: 'Combate contra mobs o duelos practicando W-tap y golpes críticos al descender', duration: '10 min' },
    ],
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    genre: 'Acción y Sandbox',
    platform: 'PC · Consola',
    skillFocus: 'Lectura de animaciones, postura y gestión de estamina',
    difficulty: 'Exigente',
    summary:
      'Supera a los jefes más duros observando sus manos y pies, esquivando hacia el ataque (no hacia atrás) y gestionando tu barra de resistencia con calma.',
    visualTheme: 'from-amber-950 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Esquiva hacia adentro, no hacia atrás',
        advice:
          'Rueda en diagonal hacia el arma o costado del jefe cuando el golpe esté bajando, aprovechando los frames de invulnerabilidad.',
        whyItWorks:
          'Esquivar hacia atrás suele dejarte en el rango final del combo, mientras rodar hacia adentro te posiciona detrás para contraatacar.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Rompe la postura con ataques cargados y saltos',
        advice:
          'En lugar de dar 5 golpes ligeros arriesgados, busca ventanas seguras para lanzar un ataque en salto (R2/RT) o ataque pesado cargado.',
        whyItWorks:
          'Aturde al jefe para ejecutar un golpe crítico devastador y recuperar ritmo.',
      },
      {
        pillar: 'Decisiones',
        title: 'Sube Vigor primero hasta 40–60',
        advice:
          'Al inicio, las mejoras de arma dan mucho más daño que subir Fuerza o Destreza. Invierte tus primeros niveles principalmente en Vigor (vida).',
        whyItWorks:
          'Evita morir de un solo error y te da margen real para aprender los movimientos del jefe.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Curación dentro de una ventana de ataque, nunca en neutro',
        advice:
          'Los jefes tienen lectura de entrada cuando bebes un frasco. Espera a que terminen un combo completo antes de curarte.',
        whyItWorks:
          'Impide perder automáticamente el mismo HP que acabas de recuperar.',
      },
    ],
    commonMistakes: [
      {
        id: 'er-1',
        problem: 'Rodar por pánico (Panic Rolling) en ataques retrasados',
        symptom: 'El jefe levanta el arma 2 segundos, ruedas dos veces antes y te golpea justo al terminar la voltereta.',
        fix: 'Mira la mano o el hombro del jefe, no el arma en alto; pulsa esquivar solo cuando el brazo empieza a descender.',
        drillToFix: 'Dedica 2 intentos frente a un jefe sin atacar, solo caminando y esquivando en el instante exacto.',
      },
      {
        id: 'er-2',
        problem: 'Equipamiento con Carga Pesada (Heavy Load)',
        symptom: 'Tu personaje rueda lento y casi no tiene invulnerabilidad.',
        fix: 'Mantén siempre tu peso por debajo del 70% (Carga Media) ajustando armadura o talismanes.',
        drillToFix: 'Verifica en la pantalla de estado que ponga "Carga Media" o "Carga Ligera".',
      },
    ],
    settingsGuide: [
      { label: 'Carga de equipo', value: 'Carga Media (< 70% peso)', note: 'Indispensable para esquivas fluidas' },
      { label: 'Auto-fijado cercano', value: 'Configurado según preferencia', note: 'Desactívalo en jefes gigantes (dragones) para ver sus patas y ataques' },
      { label: 'Acceso rápido', value: 'Viales en bolsa rápida (Y/Triángulo + cruceta)', note: 'Deja solo los viales principales en el acceso inferior para no perder tiempo' },
    ],
    dailyDrills: [
      { id: 'er-d1', task: '2 intentos de observación pura frente al jefe actual sin atacar', duration: '5 min' },
      { id: 'er-d2', task: 'Practicar parry o ruptura de postura contra caballeros en campo abierto', duration: '10 min' },
    ],
  },
  {
    id: 'overwatch-2',
    name: 'Overwatch 2',
    genre: 'FPS Táctico',
    platform: 'PC · Consola',
    skillFocus: 'Cobertura natural, gestión de ultimates y agrupación',
    difficulty: 'Intermedia',
    summary:
      'Deja de morir primero en cada pelea de equipo. Juega pegado a esquinas sólidas, vigila el contador de bajas y coordina habilidades definitivas en dos fases.',
    visualTheme: 'from-slate-800 to-sky-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Usa cobertura natural aunque tengas un Tanque',
        advice:
          'Los escudos se rompen rápido. Colócate siempre a un paso de una pared o columna para cubrirte si tu tanque retrocede.',
        whyItWorks:
          'Reduce el daño innecesario que exige que tus soportes desperdicien sanación.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Toma la altura elevada (High Ground)',
        advice:
          'Antes de iniciar la pelea de equipo, sube a balcones o puentes con tu héroe. Te da ángulo sobre el soporte enemigo escondido atrás.',
        whyItWorks:
          'Obliga al rival a gastar movilidad para alcanzarte mientras tú puedes retroceder dando dos pasos atrás.',
      },
      {
        pillar: 'Decisiones',
        title: 'No gastes 5 ultimates en una pelea ya ganada',
        advice:
          'Si ya eliminaron a 2 enemigos primero, guarda tu definitiva para la siguiente oleada en lugar de encadenarla por inercia.',
        whyItWorks:
          'Gana la siguiente pelea automáticamente y asegura el punto o carga.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Reagrúpate sin asomarte (No Trickling)',
        advice:
          'Si caen 3 compañeros, retrocede o déjate caer rápido para reaparecer juntos en vez de ir muriendo de uno en uno.',
        whyItWorks:
          'Entrar de 1 en 1 regala 90 segundos completos al reloj del rival.',
      },
    ],
    commonMistakes: [
      {
        id: 'ow-1',
        problem: 'Pararse en medio del camino principal (Main) sin cobertura',
        symptom: 'Recibes todo el spam de proyectiles y caes antes de usar tu habilidad.',
        fix: 'Busca rutas laterales (off-angles) o juega pegado al marco de la puerta.',
        drillToFix: 'Durante una partida completa pregúntate cada 10s: ¿tengo una pared a mi lado?',
      },
    ],
    settingsGuide: [
      { label: 'Sonido de bajas aliados/enemigos', value: 'Activado ambos', note: 'Te avisa por audio sin mirar arriba si la pelea está perdida' },
      { label: 'Sensibilidad por héroe', value: 'Personalizada', note: 'Más alta para héroes de cuerpo a cuerpo (Genji/Reinhardt) y baja para precisión (Ashe/Ana)' },
      { label: 'Contorno de aliados', value: 'Siempre visible', note: 'Fundamental para soportes y tanques al rastrear posición del equipo' },
    ],
    dailyDrills: [
      { id: 'ow-d1', task: '5 minutos en campo de práctica de código VAXTA calentando tracking y flicks', duration: '5 min' },
      { id: 'ow-d2', task: 'Jugar 2 partidas enfocándote en usar ángulos laterales sin aislarte de tus soportes', duration: '15 min' },
    ],
  },
  {
    id: 'free-fire',
    name: 'Free Fire',
    genre: 'Battle Royale',
    platform: 'Móvil',
    skillFocus: 'Levantamiento de mira, pared gloo y movimiento',
    difficulty: 'Accesible',
    summary:
      'Optimiza tu HUD a 3 o 4 dedos, domina el levantamiento de mira en J según la distancia y coloca paredes gloo instantáneas tras disparar.',
    visualTheme: 'from-slate-800 to-amber-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Levantamiento de mira según distancia',
        advice:
          'A corta distancia desliza el botón de disparo hacia arriba con fuerza y rapidez; a larga distancia haz un movimiento mucho más suave y corto.',
        whyItWorks:
          'Evita que la mira se quede atascada en el pecho o pase por encima de la cabeza.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Pared Gloo inmediata tras ráfaga',
        advice:
          'Nunca te quedes quieto recargando después de disparar. Dispara 4-6 balas, agáchate y pon pared gloo si no tumbaste al rival.',
        whyItWorks:
          'Corta el contraataque enemigo y te da tiempo de cambiar de lado.',
      },
      {
        pillar: 'Decisiones',
        title: 'HUD personalizado a 3 o 4 dedos',
        advice:
          'Mueve el botón de agacharse, saltar o pared gloo a la parte superior izquierda para pulsarlos con el índice mientras apuntas con el pulgar.',
        whyItWorks:
          'Permite hacer acciones simultáneas mucho más rápido que jugando solo con dos pulgares.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Altura y rotación por el borde seguro',
        advice:
          'En clasificatoria evita caer en zonas con 4 escuadras si buscas subir puntos constantes; equipa armas y rota controlando alturas.',
        whyItWorks:
          'Asegura consistencia de puntos en lugar de depender de la suerte del primer arma.',
      },
    ],
    commonMistakes: [
      {
        id: 'ff-1',
        problem: 'Empezar a levantar la mira cuando el punto rojo ya está muy abajo',
        symptom: 'Todos los tiros van al chaleco y te derriban primero.',
        fix: 'Coloca inicialmente la mira cerca del pecho o cuello antes de disparar.',
        drillToFix: '10 minutos en Isla de Entrenamiento practicando disparo-pared-cambio de arma.',
      },
    ],
    settingsGuide: [
      { label: 'Sensibilidad General', value: '95 – 100 (o 160–190 en nuevo sistema)', note: 'Agilidad máxima para girar 180° y colocar paredes' },
      { label: 'Tamaño botón de disparo', value: '42% – 52%', note: 'Facilita el recorrido vertical para levantar mira con precisión' },
      { label: 'Cambio rápido de arma', value: 'Activado', note: 'Agiliza el movimiento entre disparos de escopeta o francotirador' },
    ],
    dailyDrills: [
      { id: 'ff-d1', task: '5 minutos de práctica de levantamiento de mira con MP40 y M1887 en entrenamiento', duration: '5 min' },
      { id: 'ff-d2', task: 'Duelos 1v1 en Sala enfocándote en agacharte y poner pared tras cada disparo', duration: '10 min' },
    ],
  },
  {
    id: 'brawl-stars',
    name: 'Brawl Stars',
    genre: 'MOBA y Estrategia',
    platform: 'Móvil',
    skillFocus: 'Control de carriles, auto-aim vs manual y esquive',
    difficulty: 'Accesible',
    summary:
      'Aprende a dividir el mapa en 3 carriles, a no gastar las 3 municiones al aire y a esquivar leyendo el patrón de disparo de cada brawler.',
    visualTheme: 'from-sky-900 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Apunta manualmente a media y larga distancia',
        advice:
          'El botón de auto-ataque dispara hacia donde estaba el rival hace medio segundo. Predice hacia dónde camina para interceptar su trayectoria.',
        whyItWorks:
          'Aumenta tu tasa de acierto más de un 50% en modos 3v3 competitivos.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Respeta tu carril (Izquierda, Centro, Derecha)',
        advice:
          'Al empezar una partida 3v3, evita ir los tres por el centro. Cada jugador cubre un carril para rodear al equipo enemigo.',
        whyItWorks:
          'Impide que ataques de área enemigos golpeen a todo tu equipo a la vez y genera fuego cruzado.',
      },
      {
        pillar: 'Decisiones',
        title: 'Guarda siempre una barra de munición',
        advice:
          'No gastes los 3 ataques seguidos a menos que asegures la eliminación. Mantén 1 carga lista para intimidar o defenderte.',
        whyItWorks:
          'Un brawler sin munición invita al rival a avanzar sin miedo y ganar todo el territorio.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Cuenta atrás segura en Atrapagemas',
        advice:
          'Cuando tu equipo tenga las 10 gemas, retrocede hacia tu base formando un triángulo defensivo; no vayas a buscar más bajas al spawn rival.',
        whyItWorks:
          'Un error individual entregando gemas tira a la basura 2 minutos de dominio perfecto.',
      },
    ],
    commonMistakes: [
      {
        id: 'bs-1',
        problem: 'Caminar en línea recta hacia atrás o adelante al esquivar',
        symptom: 'Te alcanzan todos los disparos de francotiradores como Piper o Colt.',
        fix: 'Haz pequeños zigzags irregulares en perpendicular a la línea de tiro enemiga.',
        drillToFix: 'Juega 3 partidas concentrado únicamente en mirar los disparos enemigos antes de responder.',
      },
    ],
    settingsGuide: [
      { label: 'Joysticks', value: 'Bloqueo de movimiento desactivado / tamaño cómodo', note: 'Evita perder el dedo en giros rápidos' },
      { label: 'Composición', value: 'Adaptar refuerzos (Gears) al mapa', note: 'Velocidad en mapas con muchos arbustos; Daño o Escudo en abiertos' },
    ],
    dailyDrills: [
      { id: 'bs-d1', task: 'Jugar 3 partidas de Noqueo o Balón Brawl sin usar auto-aim salvo a quemarropa', duration: '10 min' },
    ],
  },
  {
    id: 'clash-royale',
    name: 'Clash Royale',
    genre: 'MOBA y Estrategia',
    platform: 'Móvil',
    skillFocus: 'Conteo de elixir, rotación de ciclo y colocación',
    difficulty: 'Intermedia',
    summary:
      'Gana partidas haciendo intercambios positivos de elixir, arrastrando tropas al centro para activar ambas torres y conociendo las 4 cartas clave del rival.',
    visualTheme: 'from-blue-950 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Coloca tropas defensivas en el centro (Kiting)',
        advice:
          'Atrae a unidades cuerpo a cuerpo hacia la casilla central de tu lado para que reciban flechas de tus dos torres a la vez.',
        whyItWorks:
          'Te permite defender cartas caras de 5-7 de elixir gastando apenas 2 o 3 de elixir.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Rastrea el hechizo o counter principal del rival',
        advice:
          'Si el oponente acaba de gastar Tronco o Bola de Fuego, sabes que durante sus próximas 4 cartas no tendrá ese hechizo en mano.',
        whyItWorks:
          'Es tu ventana exacta para atacar por el otro puente o presionar sin miedo a perder tu tropa clave.',
      },
      {
        pillar: 'Decisiones',
        title: 'Nunca desperdicies elixir al 10 ni ataques sin respaldo',
        advice:
          'Si estás lleno de elixir, cicla una carta barata detrás de tu torre del rey para iniciar un empuje ordenado en lugar de tirar todo directo al puente.',
        whyItWorks:
          'Cuando tu tropa llegue al puente ya habrás regenerado suficiente elixir para apoyarla con hechizo.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Usa tu torre como recurso en el 2x',
        advice:
          'No hace falta defender cada 100 de daño si eso te deja seco de elixir. A veces recibir un golpe menor te da ventaja de +4 elixir para ganar la torre opuesta.',
        whyItWorks:
          'Convierte la vida de tu torre en ventaja de ataque decisiva.',
      },
    ],
    commonMistakes: [
      {
        id: 'cr-1',
        problem: 'Defender todo en el puente agrupando tus tropas',
        symptom: 'Un solo hechizo enemigo (Bola de Fuego / Veneno) elimina tu defensa y daña la torre.',
        fix: 'Separa tus defensas a distancia y coloca tu tropa de apoyo detrás o en el costado opuesto.',
        drillToFix: 'Analiza tus últimas 2 derrotas en repetición a velocidad 2x mirando el marcador de elixir.',
      },
    ],
    settingsGuide: [
      { label: 'Mazo equilibrado', value: '1 condición de victoria + 2 hechizos + defensa aérea', note: 'Evita usar mazos aleatorios sin sinergia' },
      { label: 'Costo medio', value: '2.8 – 3.8 de elixir', note: 'Facilita rotar rápido tus defensas en tiempo extra' },
    ],
    dailyDrills: [
      { id: 'cr-d1', task: 'Ver la repetición de tu última derrota identificando el intercambio de elixir que la decidió', duration: '5 min' },
      { id: 'cr-d2', task: 'Jugar 3 partidas contando en voz alta el único counter fuerte del rival', duration: '10 min' },
    ],
  },
  {
    id: 'dota-2',
    name: 'Dota 2',
    genre: 'MOBA y Estrategia',
    platform: 'PC',
    skillFocus: 'Creep aggro, denegación y tiempos de mapa',
    difficulty: 'Exigente',
    summary:
      'Domina la línea manipulando el aggro de los creeps, controlando las runas de cada minuto par y usando el Teleport para responder en todo el mapa.',
    visualTheme: 'from-rose-950 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Manipula el Creep Aggro en línea',
        advice:
          'Haz clic de ataque sobre un héroe enemigo (incluso en otro carril) mientras estás cerca de los creeps rivales y retrocede de inmediato hacia tu creep de rango.',
        whyItWorks:
          'Atrae los creeps enemigos hacia tu lado seguro para farmear sin exponerte al castigo del rival.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Vigila las marcas de tiempo clave',
        advice:
          'Acércate a las runas cada 2 minutos, acumula campamentos en el segundo :53-:55 y busca la runa de sabiduría al minuto 7.',
        whyItWorks:
          'Los recursos gratuitos del mapa multiplican la experiencia de todo tu equipo.',
      },
      {
        pillar: 'Decisiones',
        title: 'Lleva siempre un Pergamino de TP listo',
        advice:
          'No uses TP solo para volver a farmear si no es urgente; guárdalo para contraatacar si el enemigo se lanza bajo la torre de tus aliados.',
        whyItWorks:
          'Un TP defensivo oportuno convierte una emboscada enemiga en 2 bajas a favor de tu equipo.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Compra BKB antes de que sea tarde',
        advice:
          'En núcleos (Cores), no compres un tercer objeto de daño puro si mueres aturdido cada pelea; la Vara del Rey Negro habilita que realmente hagas daño.',
        whyItWorks:
          'Un héroe vivo con daño medio aporta infinitamente más que un héroe con daño máximo aturdido.',
      },
    ],
    commonMistakes: [
      {
        id: 'dota-1',
        problem: 'Empujar la línea sin motivo al minuto 1-5',
        symptom: 'Tus creeps quedan frente a la torre enemiga y te quedas sin lugar seguro para farmear.',
        fix: 'Deniega tus propios creeps en cuanto bajen del 50% de vida para mantener el equilibrio cerca de tu torre.',
        drillToFix: '10 minutos en Last Hit Trainer buscando puntuación superior a 3000.',
      },
    ],
    settingsGuide: [
      { label: 'Ataque forzado con clic derecho', value: 'Activado (o A-click)', note: 'Agiliza la denegación de creeps en fase de líneas' },
      { label: 'Doble toque para auto-lanzar', value: 'Activado', note: 'Acelera objetos defensivos o habilidades de movilidad hacia base' },
      { label: 'Barra de cámara', value: 'Edge Pan o Middle Mouse Grip', note: 'Middle Mouse Grip evita mover la mira lejos de la acción' },
    ],
    dailyDrills: [
      { id: 'dota-d1', task: '5 minutos de Last Hit Trainer enfocándote en denegar creeps propios', duration: '5 min' },
      { id: 'dota-d2', task: 'Practicar stackeo doble en campamentos de la jungla en lobby', duration: '5 min' },
    ],
  },
  {
    id: 'pubg',
    name: 'PUBG: Battlegrounds',
    genre: 'Battle Royale',
    platform: 'PC · Consola · Móvil',
    skillFocus: 'Balística, inclinación (peek) y lectura de terreno',
    difficulty: 'Exigente',
    summary:
      'Calcula caída de bala y distancia, asómate inclinando el torso sin exponer todo el cuerpo y usa las depresiones del terreno en cierres abiertos.',
    visualTheme: 'from-stone-800 to-zinc-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Inclinación rápida (Q/E) y control vertical',
        advice:
          'Dispara siempre asomado con Q o E junto a árboles y marcos, y agáchate al iniciar una ráfaga en campo abierto para reducir el retroceso.',
        whyItWorks:
          'Agacharse reduce drásticamente el retroceso vertical y dificulta que te den a la cabeza.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Lee los pliegues del terreno (Ridges)',
        advice:
          'Incluso en campos aparentemente vacíos, busca pequeñas depresiones de tierra donde un coche o tu cuerpo queden fuera de ángulo.',
        whyItWorks:
          'La cobertura de terreno natural te salva cuando no hay casas en el último círculo.',
      },
      {
        pillar: 'Decisiones',
        title: 'Lleva granadas de humo siempre',
        advice:
          'Reserva espacio en la mochila para 3 o 4 humos en lugar de llevar 300 balas de sobra. Los humos crean pasillos seguros para cruzar o revivir.',
        whyItWorks:
          'Te permiten sobrevivir a círculos finales completamente descubiertos.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Silencio antes de confirmar el disparo',
        advice:
          'Si un enemigo corre lejos y no te ha visto, espera a que se detenga a lootear o quede sin cobertura antes de abrir fuego.',
        whyItWorks:
          'Disparar sin oportunidad clara solo revela tu posición a todos los jugadores cercanos.',
      },
    ],
    commonMistakes: [
      {
        id: 'pubg-1',
        problem: 'Correr hacia la zona sin vehículo en mapas grandes',
        symptom: 'Mueres atrapado por la zona azul o disparado desde atrás.',
        fix: 'Localiza un vehículo desde los primeros 2 minutos y úsalo como cobertura portátil al estacionar.',
        drillToFix: 'En tu próxima partida aterriza cerca de carretera principal para asegurar rotación.',
      },
    ],
    settingsGuide: [
      { label: 'Apuntar / ADS separados', value: 'Clic derecho solo ADS', note: 'Elimina el retraso de milisegundos al abrir mira rápido' },
      { label: 'Multiplicador sens vertical', value: '1.15 – 1.35', note: 'Facilita bajar el ratón en sprays largos de Beryl o AKM' },
      { label: 'Teclas rápidas de curación', value: 'Botiquín / Venda / Bebida dedicados', note: 'Evita abrir el inventario en pleno combate' },
    ],
    dailyDrills: [
      { id: 'pubg-d1', task: '5 minutos de control de retroceso con Beryl y M416 con mira x3 en campo de entrenamiento', duration: '5 min' },
      { id: 'pubg-d2', task: 'Practicar lanzamientos de humo precisos a 30-50 metros para cubrir un vehículo', duration: '5 min' },
    ],
  },
  {
    id: 'gta-online',
    name: 'GTA Online',
    genre: 'Acción y Sandbox',
    platform: 'PC · Consola',
    skillFocus: 'Conducción técnica, coberturas y acceso rápido a blindaje',
    difficulty: 'Accesible',
    summary:
      'Optimiza golpes y enfrentamientos usando el menú rápido para curarte al instante, trazando curvas limpias y dominando el control aéreo.',
    visualTheme: 'from-slate-800 to-emerald-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Curación instantánea con rueda de armas',
        advice:
          'Abre la rueda de armas y usa los accesos directos para comer aperitivos o ponerte chaleco antibalas en medio de un tiroteo sin abrir el menú largo.',
        whyItWorks:
          'Recuperas vida completa en medio segundo mientras sigues en cobertura.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Traza curvas de fuera hacia el vértice (Apex)',
        advice:
          'En carreras y persecuciones, frena antes de entrar en la curva y acelera al salir por el interior en lugar de derrapar de lado perdiendo velocidad.',
        whyItWorks:
          'Conservas mayor velocidad punta en rectas largas y evitas trompos.',
      },
      {
        pillar: 'Decisiones',
        title: 'Cobertura manual y disparo sin asomarse por completo',
        advice:
          'Apunta desde esquina derecha en golpes difíciles en lugar de depender de la animación automática de cobertura que a veces expone el brazo.',
        whyItWorks:
          'Minimizas el daño recibido por NPCs con puntería alta en misiones difíciles.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Usa vehículos blindados adecuados por misión',
        advice:
          'El Kuruma Blindado te hace casi invulnerable frente a disparos normales de NPCs en preparaciones, ahorrando dinero y reintentos.',
        whyItWorks:
          'Reduce frustración y acelera cualquier misión de farmeo.',
      },
    ],
    commonMistakes: [
      {
        id: 'gta-1',
        problem: 'Comer aperitivos de pie en campo abierto',
        symptom: 'La animación lenta del personaje te deja inmóvil y mueres antes de terminar.',
        fix: 'Agáchate en cobertura o apunta con el arma mientras comes para cancelar la animación lenta.',
        drillToFix: 'Prueba en sesión privada curarte detrás de un muro usando el acceso rápido de rueda de armas.',
      },
    ],
    settingsGuide: [
      { label: 'Modo de puntería', value: 'Libre / Asistida según lobby', note: 'Puntería libre otorga más RP y entrena precisión real' },
      { label: 'Altura de cámara vehículo', value: 'Alta', note: 'Mejora la visibilidad del tráfico que viene de frente' },
    ],
    dailyDrills: [
      { id: 'gta-d1', task: 'Completar una carrera técnica limpiando curvas sin chocar contra muros', duration: '6 min' },
      { id: 'gta-d2', task: 'Practicar curación rápida con rueda de armas bajo cobertura', duration: '4 min' },
    ],
  },
  {
    id: 'smash-ultimate',
    name: 'Super Smash Bros. Ultimate',
    genre: 'Acción y Sandbox',
    platform: 'Consola',
    skillFocus: 'Juego neutral, recuperación variable y ventaja',
    difficulty: 'Exigente',
    summary:
      'Deja de rodar hacia el centro por reflejo y evita lanzar ataques smash al aire. Controla el centro del escenario y varía siempre tu forma de volver.',
    visualTheme: 'from-slate-800 to-rose-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Domina el Short Hop y Fast Fall',
        advice:
          'Pulsa salto y ataque rápido o practica el toque muy breve al salto para lanzar ataques aéreos bajos y seguros sobre el escudo rival.',
        whyItWorks:
          'Hace tus ataques mucho más difíciles de castigar al caer rápido al suelo.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Controla el centro del escenario',
        advice:
          'Quien ocupa el centro tiene espacio detrás para retroceder; quien está en la esquina queda obligado a saltar o rodar para escapar.',
        whyItWorks:
          'Puedes castigar sus opciones de escape simplemente leyendo sus hábitos.',
      },
      {
        pillar: 'Decisiones',
        title: 'Varía tus opciones al colgar del borde (Ledge)',
        advice:
          'Alterna entre subida normal, ataque, rodar, saltar o soltar el borde y atacar. Nunca subas 3 veces seguidas igual.',
        whyItWorks:
          'Evita que el oponente te lea y te elimine con un golpe cargado al instante.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Observa al personaje rival, no al tuyo',
        advice:
          'Si ya conoces los movimientos de tu luchador, fija la vista en el oponente para reaccionar a su salto, escudo o agarre.',
        whyItWorks:
          'Tu cerebro procesa su intención décimas de segundo antes y reaccionas mejor.',
      },
    ],
    commonMistakes: [
      {
        id: 'smash-1',
        problem: 'Gastar el segundo salto inmediatamente al salir volando',
        symptom: 'Un solo golpe suave fuera del escenario te deja sin recuperación.',
        fix: 'Guarda tu salto doble el máximo tiempo posible y úsalo solo cuando estés cerca del borde o necesites esquivar un ataque aéreo.',
        drillToFix: 'Juega 2 combates obligándote a recuperar primero con recuperación especial o esquive aéreo hacia el borde.',
      },
    ],
    settingsGuide: [
      { label: 'Salto con stick (Tap Jump)', value: 'Desactivado', note: 'Evita saltar sin querer al querer lanzar ataques hacia arriba' },
      { label: 'Stick C (Derecho)', value: 'Ataques Fuertes (Tilt)', note: 'Facilita ejecutar tilts precisos en movimiento sin hacer smash por error' },
      { label: 'Sensibilidad del stick', value: 'Alta', note: 'Mayor facilidad para entradas rápidas de movimiento y dash dance' },
    ],
    dailyDrills: [
      { id: 'smash-d1', task: '5 minutos de práctica de Short Hop + Fast Fall aéreo sobre escudo en entrenamiento', duration: '5 min' },
      { id: 'smash-d2', task: 'Practicar 10 recuperaciones seguidas volviendo desde muy abajo variando el ángulo', duration: '5 min' },
    ],
  },
  {
    id: 'rainbow-six-siege',
    name: 'Rainbow Six Siege',
    genre: 'FPS Táctico',
    platform: 'PC · Consola',
    skillFocus: 'Uso de drones, ángulos verticales y sonido',
    difficulty: 'Exigente',
    summary:
      'La información vale más que los reflejos puros. Limpia con tu dron antes de entrar, abre líneas verticales sobre objetivos y escucha pisadas con precisión.',
    visualTheme: 'from-slate-800 to-zinc-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Pre-apunta alternando postura de pie y agachado',
        advice:
          'Al abrir un pasillo, mantén la mira a la altura exacta de la cabeza de un jugador de pie o agachado y utiliza Q/E para asomar solo lo mínimo del hombro.',
        whyItWorks:
          'En Siege un solo impacto en la cabeza es baja instantánea con cualquier arma.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Conserva tu dron de preparación',
        advice:
          'En cuanto localices el objetivo durante la fase de preparación, saca tu dron del sitio y déjalo escondido en la habitación por donde vas a entrar.',
        whyItWorks:
          'Tener dos drones activos durante el ataque multiplica tus bajas seguras sin entrar a ciegas.',
      },
      {
        pillar: 'Decisiones',
        title: 'Juego vertical (arriba/abajo del sitio)',
        advice:
          'Usa cargas demoledoras o escopetas sobre el techo blando encima del punto para expulsar a los defensores de sus coberturas cómodas.',
        whyItWorks:
          'Obligas al rival a moverse mientras tus compañeros avanzan por las puertas principales.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Defiende el tiempo, no busques bajas innecesarias',
        advice:
          'Si estás defendiendo en ventaja numérica (4v2) a falta de 30 segundos, quédate en ángulos cruzados seguros y obliga a los atacantes a plantar.',
        whyItWorks:
          'Salir a cazar uno por uno es la forma más común de perder rondas ya ganadas.',
      },
    ],
    commonMistakes: [
      {
        id: 'r6-1',
        problem: 'Entrar por ventanas o puertas sin dronear antes',
        symptom: 'Te eliminan defensores escondidos en esquinas obvias o trampas de Frost/Kapkan.',
        fix: 'Dronéa exactamente las 2 habitaciones delante de ti y entra en menos de 5 segundos tras guardar el dron.',
        drillToFix: 'Juega 3 partidas con la regla de no cruzar ninguna puerta exterior sin haberla droneado primero.',
      },
      {
        id: 'r6-2',
        problem: 'Reforzar paredes que bloquean las rotaciones del equipo',
        symptom: 'Tus compañeros quedan encerrados en el punto sin salida ni ángulo de retake.',
        fix: 'Deja siempre abierta una rotación entre bombas A y B usando escopeta o granada de impacto.',
        drillToFix: 'Aprende las 2 rotaciones estándar de cada sitio en tus mapas favoritos.',
      },
    ],
    settingsGuide: [
      { label: 'FOV', value: '84 – 90', note: 'Amplía la visión periférica en pasillos estrechos sin deformar demasiado' },
      { label: 'Rango dinámico de audio', value: 'Modo Noche', note: 'Sube los pasos bajos y suaviza explosiones para escuchar mejor' },
      { label: 'Escala de mira ADS', value: 'Proporcional por zoom', note: 'Mantiene sensación constante entre mira x1 y x2.5 (ACOG)' },
    ],
    dailyDrills: [
      { id: 'r6-d1', task: '5 minutos en Campo de Tiro practicando headshots rápidos en objetivos en movimiento', duration: '5 min' },
      { id: 'r6-d2', task: '1 partida de Versus AI / Arcade enfocándote en inclinar Q/E antes de abrir ángulos', duration: '10 min' },
    ],
  },
  {
    id: 'cod-mobile',
    name: 'Call of Duty: Mobile',
    genre: 'FPS Táctico',
    platform: 'Móvil',
    skillFocus: 'HUD a 4 dedos, slide-cancel y control de spawns',
    difficulty: 'Intermedia',
    summary:
      'Da el salto de dos pulgares a garra de 3 o 4 dedos para deslizar, apuntar y disparar al mismo tiempo mientras controlas los reapariciones en Punto Caliente.',
    visualTheme: 'from-slate-800 to-stone-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Domina el deslizamiento hacia cobertura (Slide-Peek)',
        advice:
          'Deslízate al doblar esquinas largas y cancela la animación apuntando (ADS) justo al ver al rival para cambiar tu altura de cabeza.',
        whyItWorks:
          'Dificulta que los rivales que pre-apuntan al pecho te acierten las primeras balas.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Lee la rotación de Punto Caliente 15s antes',
        advice:
          'Cuando falten 15 segundos para cambiar el punto, deja de luchar por el viejo y corre hacia el siguiente objetivo para capturar los spawns cercanos.',
        whyItWorks:
          'Tu equipo reaparece al lado del nuevo punto y asegura los primeros 20 puntos gratis.',
      },
      {
        pillar: 'Decisiones',
        title: 'Equipa ventajas según tu rol',
        advice:
          'Usa Silencio Mortal o Alerta Máxima en Buscar y Destruir; en Punto Caliente prioriza Peso Ligero y Tenacidad contra explosivos.',
        whyItWorks:
          'Adapta tu clase al modo en lugar de jugar todo con la misma configuración.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Usa rachas de puntos sostenibles',
        advice:
          'UAV, UAV de respuesta y Torretas o Predators ayudan a todo tu equipo mucho más que esperar rachas altísimas que casi nunca sacas.',
        whyItWorks:
          'Mantienes el mapa iluminado constantemente para evitar flanqueos.',
      },
    ],
    commonMistakes: [
      {
        id: 'codm-1',
        problem: 'Jugar siempre con disparo automático o con solo dos pulgares en rangos altos',
        symptom: 'Pierdes duelos cercanos porque tardas demasiado en apuntar y moverte a la vez.',
        fix: 'Cambia a disparo manual y pasa los botones de apuntar y agacharse/deslizar a tus dedos índices.',
        drillToFix: 'Dedica 10 minutos al día en Modo Práctica hasta que el HUD a 3-4 dedos se sienta natural.',
      },
    ],
    settingsGuide: [
      { label: 'Modo de cámara FOV', value: '75 – 90', note: 'Mayor claridad en espacios cerrados y sensación de velocidad' },
      { label: 'Sincronizar ADS con FOV', value: 'Activado', note: 'Reduce el retroceso visual al apuntar con miras de punto rojo' },
      { label: 'Giroscopio', value: 'Solo al apuntar (ADS)', note: 'Permite microajustar el retroceso inclinando levemente el teléfono' },
    ],
    dailyDrills: [
      { id: 'codm-d1', task: '5 minutos de práctica de seguimiento y control de retroceso a 30m en Campo de Tiro', duration: '5 min' },
      { id: 'codm-d2', task: '2 partidas públicas practicando slide-peek y pre-apuntado de esquinas', duration: '12 min' },
    ],
  },
  {
    id: 'marvel-rivals',
    name: 'Marvel Rivals',
    genre: 'FPS Táctico',
    platform: 'PC · Consola',
    skillFocus: 'Sinergias Team-Up, foco a estrategas y destrucción de entorno',
    difficulty: 'Intermedia',
    summary:
      'Gana más peleas protegiendo o eliminando primero a los Estrategas, aprovechando habilidades combinadas y usando la destrucción del mapa a tu favor.',
    visualTheme: 'from-blue-900 to-slate-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Apunta ligeramente a la derecha en tercera persona',
        advice:
          'Al tener cámara sobre el hombro, los proyectiles cercanos salen con leve desplazamiento. Ajusta tu mira ligeramente a la derecha de objetivos a quemarropa.',
        whyItWorks:
          'Aumenta la consistencia con héroes de precisión y evita fallar tiros pegado a esquinas.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Presiona primero a los Estrategas (Soportes)',
        advice:
          'Disparar sin parar al Vanguardia enemigo mientras sus dos Estrategas lo curan detrás solo les regala carga de habilidad definitiva.',
        whyItWorks:
          'Eliminar o distraer a un Estratega hace que todo el frente enemigo colapse en segundos.',
      },
      {
        pillar: 'Decisiones',
        title: 'Aprovecha las sinergias Team-Up y destruye coberturas',
        advice:
          'Revisa qué héroes activan bonificaciones de equipo en la selección y rompe paredes destructibles para abrir ángulos sorpresa.',
        whyItWorks:
          'Un Team-Up bien elegido aporta habilidades extra decisivas sin coste adicional.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Cambia de héroe si te hacen counter directo',
        advice:
          'Si juegas un héroe de vuelo y el equipo rival tiene dos tiradores hitscan presionándote, adapta tu elección tras la primera ronda.',
        whyItWorks:
          'La flexibilidad de composición gana más partidas que insistir en un duelo imposible.',
      },
    ],
    commonMistakes: [
      {
        id: 'mr-1',
        problem: 'Usar definitivas defensivas de Estratega al mismo tiempo que tu compañero',
        symptom: 'Gastan dos definitivas inmortales juntas y quedan indefensos en la siguiente pelea.',
        fix: 'Acuerda por voz o chat quién usa su definitiva primero cuando llegue el combo enemigo.',
        drillToFix: 'Antes de usar tu definitiva, mira durante medio segundo si tu otro soporte ya activó la suya.',
      },
    ],
    settingsGuide: [
      { label: 'Mira personalizada por rol', value: 'Punto limpio para hitscan / Círculo para escopetas', note: 'Evita retículas grandes que tapen cabezas lejanas' },
      { label: 'Audio de aliados caídos', value: 'Activado', note: 'Te avisa de inmediato cuándo dejar de avanzar y reagruparte' },
    ],
    dailyDrills: [
      { id: 'mr-d1', task: '5 minutos en práctica calentando tracking sobre bots móviles con tu duelista o soporte principal', duration: '5 min' },
      { id: 'mr-d2', task: 'Practicar el combo de movilidad y escape de 2 héroes distintos', duration: '5 min' },
    ],
  },
  {
    id: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
    genre: 'MOBA y Estrategia',
    platform: 'Móvil',
    skillFocus: 'Rotación por Tortuga, control de arbustos y contra-armado',
    difficulty: 'Intermedia',
    summary:
      'Sube a Mítico limpiando tu línea rápido para rotar antes que el rival, revisando arbustos con habilidades y comprando objetos según el equipo enemigo.',
    visualTheme: 'from-indigo-950 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Limpia la oleada antes de rotar (Wave Clear)',
        advice:
          'No abandones tu carril dejando 3 súbditos sin limpiar solo para llegar tarde a una pelea; limpia primero en 3 segundos y luego rota por tu jungla segura.',
        whyItWorks:
          'No pierdes oro ni experiencia mientras presionas otra línea.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Comprueba arbustos con habilidades antes de entrar',
        advice:
          'Si juegas tirador o mago, nunca camines directo dentro de un arbusto sin visión; lanza una habilidad a distancia o espera a que tu tanque abra camino.',
        whyItWorks:
          'Evita el 80% de las emboscadas instantáneas en mitad y final de partida.',
      },
      {
        pillar: 'Decisiones',
        title: 'Compra objetos defensivos y anti-curación a tiempo',
        advice:
          'Si el equipo enemigo tiene mucha regeneración (Estes, Ruby, Alucard), prioriza Alabarda Marina, Collar de Dureza o Dominio de Hielo en tu 2º o 3º objeto.',
        whyItWorks:
          'Romper su curación gana peleas de equipo que parecían imposibles con daño puro.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Prioriza objetivos sobre perseguir kills en su base',
        advice:
          'Tras ganar una pelea cerca del Lord, asegúralo o tira dos torres en vez de perseguir al último tanque con poca vida.',
        whyItWorks:
          'Las partidas se ganan destruyendo el nexo, no por marcador de eliminaciones.',
      },
    ],
    commonMistakes: [
      {
        id: 'mlbb-1',
        problem: 'Seguir una build fija recomendada sin mirar al rival',
        symptom: 'Mueres al instante frente a un asesino mágico o físico adelantado.',
        fix: 'Adapta tus botas (físicas o mágicas) y reserva el 4º o 5º espacio para Defensa Atenea o Armadura Antigua si hace falta.',
        drillToFix: 'En pantalla de carga identifica quién es la mayor amenaza enemiga y elige tus botas pensando en ese héroe.',
      },
    ],
    settingsGuide: [
      { label: 'Modo de apuntado avanzado', value: 'Activado (Minions / Torres)', note: 'Te permite golpear la torre sin atacar por error a héroes bajo ella' },
      { label: 'Prioridad de objetivo', value: 'PS más bajos o Más cercano según rol', note: 'PS más bajos para asesinos/tiradores; más cercano para tanques' },
      { label: 'Desplazamiento de cámara', value: 'Activado', note: 'Arrastra el minimapa para vigilar peleas antes de llegar' },
    ],
    dailyDrills: [
      { id: 'mlbb-d1', task: 'Practicar en modo entrenamiento el combo de Parpadeo (Flicker) + Habilidad definitiva', duration: '5 min' },
      { id: 'mlbb-d2', task: 'Jugar 2 partidas enfocándote en mirar el minimapa antes de cada rotación', duration: '15 min' },
    ],
  },
  {
    id: 'teamfight-tactics',
    name: 'Teamfight Tactics (TFT)',
    genre: 'MOBA y Estrategia',
    platform: 'PC · Móvil',
    skillFocus: 'Economía de 50 de oro, scouting y ritmo de nivel',
    difficulty: 'Exigente',
    summary:
      'Domina el interés económico de 50 de oro, arma objetos temprano para salvar vida y observa los tableros rivales para posicionar tu carry sin quedar bloqueado.',
    visualTheme: 'from-slate-800 to-indigo-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Explora tableros (Scouting) antes de rondas clave',
        advice:
          'En rondas 3-2, 4-1 y top 4, revisa dónde coloca el rival sus asesinos, Céfiro o tanques principales y mueve tu carry al lado contrario u óptimo.',
        whyItWorks:
          'Un simple cambio de esquina en los últimos 3 segundos cambia por completo el resultado del combate.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'No fuerces una composición sin piezas ni objetos',
        advice:
          'En lugar de buscar un campeón exacto desde la ronda 2-1, arma objetos versátiles que sirvan para varios carries del mismo tipo (daño físico o poder de habilidad).',
        whyItWorks:
          'Evitas perder 40 de vida esperando una pieza que quizá otros jugadores ya están comprando.',
      },
      {
        pillar: 'Decisiones',
        title: 'Respeta la regla de los múltiplos de 10 de oro',
        advice:
          'Cada 10 monedas guardadas (hasta 50) te dan +1 de oro extra por ronda. Vende campeones innecesarios de tu banca para alcanzar 10, 20, 30, 40 y 50 antes.',
        whyItWorks:
          'Una buena economía temprana te permite subir a nivel 8 y 9 con suficiente oro para mejorar todo tu tablero.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Juega para Top 4 cuando tengas mala tienda',
        advice:
          'Si la partida empieza difícil, no ahorres a ciegas hasta quedar en 15 de vida; gasta oro en ronda 3-2 o 4-1 para estabilizar y asegurar un 3º o 4º puesto.',
        whyItWorks:
          'Sumar puntos constantes en puestos 2-4 sube rango mucho más rápido que arriesgar un 8º lugar.',
      },
    ],
    commonMistakes: [
      {
        id: 'tft-1',
        problem: 'Guardar 6 componentes en la banca esperando objetos "perfectos"',
        symptom: 'Pierdes 6 rondas seguidas en fase 2 y 3 llegando al late game sin vida.',
        fix: 'Combina objetos útiles (como Capa de Fuego, Chispa, Filo o Shojin) en fase 2 para mantener buena vida.',
        drillToFix: 'En tu próxima partida, proponte no tener nunca más de 3 componentes sueltos en banca tras el carrusel.',
      },
    ],
    settingsGuide: [
      { label: 'Atajos de teclado', value: 'D (Refrescar) · F (Comprar XP) · W (Banca/Tablero)', note: 'Acelera las transiciones de ronda para hacer roll down sin que acabe el reloj' },
    ],
    dailyDrills: [
      { id: 'tft-d1', task: 'Practicar una transición completa de nivel 7 u 8 vendiendo tablero anterior en 20 segundos', duration: '8 min' },
    ],
  },
  {
    id: 'chess',
    name: 'Ajedrez (Chess.com / Lichess)',
    genre: 'MOBA y Estrategia',
    platform: 'PC · Móvil · Web',
    skillFocus: 'Táctica, cálculo de jaques/capturas y gestión de reloj',
    difficulty: 'Exigente',
    summary:
      'Deja de regalar piezas en un solo movimiento aplicando el checklist CCA (Jaques, Capturas, Amenazas) y controla el centro antes de lanzar ataques laterales.',
    visualTheme: 'from-stone-800 to-slate-900',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Checklist obligatorio en cada jugada (Jaques, Capturas, Amenazas)',
        advice:
          'Antes de mover una pieza, revisa siempre en orden: 1) ¿Qué jaques tengo o tiene mi rival? 2) ¿Qué piezas quedan sin defensa? 3) ¿Qué amenaza directa crea la última jugada?',
        whyItWorks:
          'Elimina la mayoría de errores graves (blunders) de una jugada.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Desarrollo rápido y enroque temprano',
        advice:
          'En la apertura saca primero caballos y alfiles hacia el centro, enroca antes de la jugada 10 y evita mover dos veces la misma pieza sin necesidad.',
        whyItWorks:
          'Pone a salvo tu rey y conecta tus torres antes de que se abra la partida.',
      },
      {
        pillar: 'Decisiones',
        title: 'Mejora tu peor pieza en posiciones tranquilas',
        advice:
          'Cuando no veas un golpe táctico claro, busca cuál de tus torres o piezas menores está inactiva y llévala a una columna abierta o casilla central.',
        whyItWorks:
          'La coordinación de todas tus piezas gana posiciones equilibradas sin forzar riesgos.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Juega ritmos de 10+0 o 15+10 para aprender de verdad',
        advice:
          'Las partidas rápidas de 1 o 3 minutos (Bullet/Blitz) refuerzan malos hábitos si no calculas. Usa partidas rápidas de 10-15 min para pensar tus jugadas.',
        whyItWorks:
          'Desarrolla visión táctica real que luego se traduce naturalmente a ritmos rápidos.',
      },
    ],
    commonMistakes: [
      {
        id: 'chess-1',
        problem: 'Sacar la dama demasiado pronto buscando mates fáciles',
        symptom: 'El rival desarrolla sus piezas ganando tiempos atacando tu dama y quedas muy retrasado.',
        fix: 'Desarrolla piezas menores primero y reserva la dama para el medio juego cuando el rey rival esté expuesto.',
        drillToFix: 'Resuelve 10 problemas de táctica al día tomándote el tiempo de calcular toda la secuencia antes de mover.',
      },
    ],
    settingsGuide: [
      { label: 'Confirmación de jugada (opcional en clásicas)', value: 'Desactivada en Blitz / Activa en diarias', note: 'Evita errores de clic involuntario (mouse slip)' },
      { label: 'Resaltar última jugada', value: 'Activado', note: 'Ayuda a no pasar por alto amenazas recién creadas' },
    ],
    dailyDrills: [
      { id: 'chess-d1', task: 'Resolver 10 ejercicios tácticos de clavadas, ataques dobles y desviación sin adivinar', duration: '8 min' },
      { id: 'chess-d2', task: 'Analizar tu última partida perdida identificando solo el primer error grave', duration: '7 min' },
    ],
  },
  {
    id: 'street-fighter-6',
    name: 'Street Fighter 6',
    genre: 'Acción y Sandbox',
    platform: 'PC · Consola',
    skillFocus: 'Anti-aéreos, defensa paciente, Drive Impact y espacio',
    difficulty: 'Exigente',
    summary:
      'Construye una defensa sólida agachado, castiga los saltos con anti-aéreos consistentes y aprende a reaccionar al Drive Impact sin pulsar botones a ciegas.',
    visualTheme: 'from-slate-800 to-orange-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Bloquea agachado por defecto y reacciona arriba',
        advice:
          'La mayoría de ataques rápidos bajos son imposibles de ver por reflejo. Cubre abajo siempre y levanta la guardia solo cuando veas saltar o un overhead lento.',
        whyItWorks:
          'Corta casi toda la presión básica del rival sin gastar recursos.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Castiga todo salto con tu anti-aéreo fiable',
        advice:
          'En lugar de intentar combinaciones difíciles al aire, usa un botón simple (como puño fuerte agachado o Shoryuken) cada vez que salten hacia ti.',
        whyItWorks:
          'Quitarle el aire al oponente lo obliga a jugar en el suelo donde tienes tiempo de pensar.',
      },
      {
        pillar: 'Decisiones',
        title: 'No te quedes en Burnout por gastar Drive sin pensar',
        advice:
          'Vigila tu barra verde de Drive en la parte superior. Si bajas de 2 bloques, juega defensivo unos segundos para no entrar en estado agotado frente a la esquina.',
        whyItWorks:
          'En Burnout recibes daño bloqueando y quedas aturdido si te acorralan con Drive Impact.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Usa ataques cancelables en neutro contra Drive Impact',
        advice:
          'En la esquina evita lanzar golpes lentos que no se puedan cancelar; usa golpes rápidos o medios que te den margen de pulsar tu propio Drive Impact como respuesta.',
        whyItWorks:
          'Te protege del recurso más castigador en rangos iniciales e intermedios.',
      },
    ],
    commonMistakes: [
      {
        id: 'sf6-1',
        problem: 'Despertarse siempre lanzando ataque o agarre tras caer al suelo',
        symptom: 'El rival te hace meaty (golpe en el primer frame al levantarte) y te quita media barra.',
        fix: 'Aprende a simplemente bloquear al levantarte la mayoría de las veces; recibir un agarre duele mucho menos que un combo completo.',
        drillToFix: '10 minutos en modo entrenamiento configurando al bot para que salte y lance Drive Impact aleatorios.',
      },
    ],
    settingsGuide: [
      { label: 'Tipo de control', value: 'Clásico o Moderno (ambos válidos)', note: 'Moderno acelera reacciones anti-aéreas; Clásico ofrece todo el repertorio' },
      { label: 'Reducción de retardo de entrada', value: 'Activada (si tu pantalla lo soporta)', note: 'Mejora la respuesta al reaccionar a Drive Impact' },
    ],
    dailyDrills: [
      { id: 'sf6-d1', task: '5 minutos de práctica de anti-aéreos desde ambos lados (izquierda y derecha)', duration: '5 min' },
      { id: 'sf6-d2', task: 'Practicar 1 combo sencillo desde golpe ligero y 1 castigo fuerte tras bloquear un Super/DP', duration: '7 min' },
    ],
  },
  {
    id: 'hollow-knight',
    name: 'Hollow Knight',
    genre: 'Acción y Sandbox',
    platform: 'PC · Consola',
    skillFocus: 'Pogo aéreo, control de distancia y ventanas de curación',
    difficulty: 'Exigente',
    summary:
      'Domina el golpe descendente (pogo) sobre enemigos y pinchos, evita saltar por pánico y aprovecha solo las ventanas seguras tras ataques para concentrar alma.',
    visualTheme: 'from-slate-900 to-zinc-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Domina el Pogo con el aguijón hacia abajo',
        advice:
          'Mantén abajo + ataque en el aire sobre jefes o pinchos para rebotar infinitamente y mantenerte por encima de ataques horizontales.',
        whyItWorks:
          'Te da daño constante mientras esquivas embestidas terrestres sin gastar sombra.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'No abuses del salto ni del dash sin razón',
        advice:
          'Camina primero para esquivar ataques telegrafiados y reserva el salto y la capa sombría para atravesar proyectiles o reposicionarte.',
        whyItWorks:
          'Saltar por impulso suele meterte justo en la trayectoria de caída de los jefes.',
      },
      {
        pillar: 'Decisiones',
        title: 'Usa hechizos además del aguijón',
        advice:
          'Si tienes vida completa o te sobra Alma, lanza Espíritu Vengativo o Oscuridad Descendente (que da frames de invulnerabilidad al caer).',
        whyItWorks:
          'Los hechizos hacen mucho más daño por golpe que el aguijón básico y acortan los combates difíciles.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Cura solo cuando el jefe esté aturdido o lejos',
        advice:
          'Intentar curarte en medio de un intercambio rápido casi siempre cuesta 1 o 2 máscaras de vuelta. Espera la fase de aturdimiento o el final de una embestida larga.',
        whyItWorks:
          'Mantiene tu Alma disponible para atacar o sanar de forma garantizada.',
      },
    ],
    commonMistakes: [
      {
        id: 'hk-1',
        problem: 'Acorralarse contra las esquinas de la arena',
        symptom: 'El jefe carga hacia ti y no tienes espacio detrás para esquivar.',
        fix: 'Cuando un jefe te empuje al borde, salta por encima haciéndole pogo o usa Capa Sombría para volver al centro.',
        drillToFix: 'Practica contra los Señores Mantis o Hornet manteniendo siempre espacio a tu espalda.',
      },
    ],
    settingsGuide: [
      { label: 'Amuletos versátiles', value: 'Fuerza Irrompible + Piedra de Chamán + Corte Rápido', note: 'Equilibrio sólido entre alcance, velocidad de aguijón y poder de hechizos' },
    ],
    dailyDrills: [
      { id: 'hk-d1', task: '5 minutos practicando pogo continuo sobre enemigos en Senderos Verdes o Hogar de Dioses', duration: '5 min' },
    ],
  },
  {
    id: 'roblox',
    name: 'Roblox (Shooters / Obby / Competitivo)',
    genre: 'Acción y Sandbox',
    platform: 'PC · Consola · Móvil',
    skillFocus: 'Shift-lock, precisión de cámara, saltos técnicos y movimiento',
    difficulty: 'Accesible',
    summary:
      'Mejora en experiencias competitivas como Rivals, Arsenal, Blade Ball o Obbies difíciles dominando el bloqueo de mayúsculas, sensibilidad uniforme y saltos precisos.',
    visualTheme: 'from-slate-800 to-blue-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Domina el Shift-Lock para giros y saltos exactos',
        advice:
          'Activa el bloqueo de mayúsculas (Shift-Lock) en Obbies y juegos de acción en 3ª persona para orientar el cuerpo del personaje al instante con el ratón.',
        whyItWorks:
          'Permite realizar wrap-arounds (saltos rodeando paredes) y alinearte con plataformas estrechas sin fallar.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Usa una sensibilidad uniforme entre experiencias FPS',
        advice:
          'En juegos shooter dentro de Roblox (Arsenal, Rivals, Phantom Forces), ajusta la sensibilidad de cámara para que un giro de 180° mida siempre igual en tu alfombrilla.',
        whyItWorks:
          'Tu memoria muscular no se reinicia cada vez que cambias de modo de juego.',
      },
      {
        pillar: 'Decisiones',
        title: 'En juegos de ritmo/reacción (Blade Ball), escucha el audio antes que mirar',
        advice:
          'Fija la vista en la distancia de la bola y sincroniza el clic con el sonido de aceleración en lugar de pulsar por pánico en cuanto cambia de color.',
        whyItWorks:
          'Ganas los choques rápidos (clashes) manteniendo un ritmo constante.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Optimiza gráficos para mantener 60+ FPS estables',
        advice:
          'En PC baja la calidad gráfica manual a niveles 3–5 en juegos competitivos para evitar tirones cuando haya muchas partículas en pantalla.',
        whyItWorks:
          'La fluidez de imagen reduce el error al seguir objetivos rápidos o calcular saltos.',
      },
    ],
    commonMistakes: [
      {
        id: 'rbx-1',
        problem: 'Dejar la sensibilidad de cámara de Roblox demasiado alta por defecto',
        symptom: 'La mira tiembla y pasas de largo en duelos a media distancia.',
        fix: 'Reduce la sensibilidad en el menú de Roblox (0.2 a 0.6 en PC con 800 DPI) hasta poder seguir objetivos suaves.',
        drillToFix: 'Prueba girar 180° de un movimiento cómodo de muñeca y ajusta la barra hasta lograrlo sin pasarte.',
      },
    ],
    settingsGuide: [
      { label: 'Bloqueo de mayúsculas', value: 'Activado', note: 'Clave en plataformas, parkour y combate en tercera persona' },
      { label: 'Calidad gráfica', value: 'Manual (3 – 5 en competitivo)', note: 'Prioriza FPS estables sobre sombras y reflejos' },
    ],
    dailyDrills: [
      { id: 'rbx-d1', task: '5 minutos de práctica de wrap-arounds y saltos en primera/tercera persona', duration: '5 min' },
      { id: 'rbx-d2', task: '2 rondas de calentamiento en shooter de Roblox buscando solo disparos a la cabeza', duration: '8 min' },
    ],
  },
  {
    id: 'dead-by-daylight',
    name: 'Dead by Daylight',
    genre: 'Acción y Sandbox',
    platform: 'PC · Consola',
    skillFocus: 'Check-spots en loops, gestión de pallets y presión de generadores',
    difficulty: 'Intermedia',
    summary:
      'Como superviviente, aprende a mirar atrás mientras corres y exprime cada estructura antes de tirar un pallet. Como asesino, protege 3 generadores cercanos.',
    visualTheme: 'from-zinc-900 to-slate-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Abraza las esquinas al máximo (Tight Looping)',
        advice:
          'Tanto de superviviente como de asesino, corre pegado al borde interior de rocas y paredes. Cada paso abierto de más regala distancia al rival.',
        whyItWorks:
          'Una vuelta ajustada puede darte 1 o 2 giros completos extra en la misma estructura.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Usa Check-Spots antes de decidir hacia dónde girar',
        advice:
          'En muros altos, detente medio segundo en la esquina donde ves ambos lados para comprobar si el asesino amaga (moonwalk) o viene directo.',
        whyItWorks:
          'Evita caer en fintas de luz roja y desperdiciar pallets seguros demasiado pronto.',
      },
      {
        pillar: 'Decisiones',
        title: 'Rompe un posible "3-Gen" desde mitad de partida',
        advice:
          'Si quedan 3 generadores muy juntos en una esquina del mapa, prioriza reparar uno del centro aunque esté más expuesto mientras quede equipo sano.',
        whyItWorks:
          'Evita quedar atrapado al final con los últimos generadores vigilados en 5 segundos por el asesino.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Como asesino, abandona persecuciones largas sin progreso',
        advice:
          'Si un superviviente te lleva hacia una zona con 3 estructuras conectadas y no logras golpe en 25 segundos, déjalo y ve a presionar generadores.',
        whyItWorks:
          'El tiempo es el recurso más escaso del asesino; perseguir a un solo jugador en zona fuerte cuesta 3 generadores.',
      },
    ],
    commonMistakes: [
      {
        id: 'dbd-1',
        problem: 'Tirar todos los pallets en cuanto escuchas el latido del asesino',
        symptom: 'Al minuto 4 no queda ni un solo pallet en el mapa y el equipo cae en segundos.',
        fix: 'Da 2 o 3 vueltas al loop usando la ventana o la esquina antes de bajar el pallet cuando realmente te alcance.',
        drillToFix: 'En tu próxima partida intenta no tirar ningún pallet sin haber dado al menos 2 vueltas primero.',
      },
    ],
    settingsGuide: [
      { label: 'FOV (Campo de visión)', value: '95 – 103 (en Asesino)', note: 'Facilita seguir a supervivientes que intentan girar alrededor de ti (360)' },
      { label: 'Indicador visual de latido', value: 'Activado', note: 'Muestra la intensidad del radio de terror incluso si hay ruido alrededor' },
    ],
    dailyDrills: [
      { id: 'dbd-d1', task: 'Practicar correr mirando hacia atrás en partida sin chocar contra árboles ni paredes', duration: '5 min' },
    ],
  },
  {
    id: 'mario-kart-8',
    name: 'Mario Kart 8 Deluxe',
    genre: 'Deportes y Motor',
    platform: 'Consola',
    skillFocus: 'Mini-turbos en derrape, trazada interna y defensa con objetos',
    difficulty: 'Accesible',
    summary:
      'Gana carreras cerrando cada curva por el interior, encadenando derrapes hasta chispa rosa y manteniendo un objeto defensivo en tu espalda cuando vayas primero.',
    visualTheme: 'from-blue-900 to-emerald-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Inicia el derrape antes de entrar en la curva',
        advice:
          'Salta con R/ZR justo antes del giro y empuja el stick hacia el interior para cargar mini-turbos azules, naranjas o morados y salir acelerando.',
        whyItWorks:
          'Los mini-turbos aportan mucha más velocidad acumulada que solo tener estadísticas altas.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Recoge 10 monedas cuanto antes',
        advice:
          'Cada moneda aumenta tu velocidad punta máxima hasta llegar a 10. Aprovecha las hileras de monedas en las primeras dos vueltas sin salirte de la trazada.',
        whyItWorks:
          'Un corredor con 10 monedas es notablemente más rápido en rectas que uno con 0.',
      },
      {
        pillar: 'Decisiones',
        title: 'No gastes tu objeto defensivo en primera posición',
        advice:
          'Si vas 1º con plátano o caparazón verde, mantenlo detrás (o guárdalo en reserva si llevas moneda) y solo lánzalo al pasar por cajas dobles.',
        whyItWorks:
          'Te protege del caparazón rojo automático del 2º clasificado.',
      },
      {
        pillar: 'Mentalidad',
        title: 'En 200cc usa el freno mientras derrapas (Brake Drifting)',
        advice:
          'En curvas muy cerradas a 200cc, da pequeños toques al botón de freno B sin soltar el acelerador ni el derrape.',
        whyItWorks:
          'Cierra el radio de giro evitando estrellarte contra los muros exteriores.',
      },
    ],
    commonMistakes: [
      {
        id: 'mk8-1',
        problem: 'Dejar activada la conducción asistida (Smart Steering)',
        symptom: 'El coche te frena solo antes de atajos con champiñón y no te deja cargar mini-turbos morados.',
        fix: 'Pulsa pausa y desactiva el volante inteligente (antena amarilla detrás del kart) para tomar atajos reales.',
        drillToFix: 'Haz 2 pruebas contrarreloj intentando mantener 10 monedas y cargar al menos 4 mini-turbos naranjas/morados.',
      },
    ],
    settingsGuide: [
      { label: 'Volante inteligente', value: 'Desactivado', note: 'Imprescindible para atajos y mini-turbos avanzados' },
      { label: 'Combinación equilibrada', value: 'Peso medio + Neumáticos Roller', note: 'Maximiza el atributo oculto de Mini-Turbo y aceleración' },
    ],
    dailyDrills: [
      { id: 'mk8-d1', task: '1 sesión de Contrarreloj siguiendo al fantasma del récord en tu pista favorita', duration: '8 min' },
    ],
  },
  {
    id: 'gran-turismo-7',
    name: 'Gran Turismo 7',
    genre: 'Deportes y Motor',
    platform: 'Consola',
    skillFocus: 'Trail braking, puntos de frenada y salida limpia de curva',
    difficulty: 'Exigente',
    summary:
      'Baja tus tiempos por vuelta frenando en línea recta con referencias fijas, soltando el freno progresivamente hacia el vértice (trail braking) y acelerando suave.',
    visualTheme: 'from-slate-900 to-neutral-950',
    recommendations: [
      {
        pillar: 'Mecánicas',
        title: 'Frena al 100% en línea recta y suelta gradualmente (Trail Braking)',
        advice:
          'Pisa el freno al máximo antes de girar el volante; conforme empiezas a meter el coche hacia el vértice, ve liberando presión de freno de forma suave.',
        whyItWorks:
          'Mantiene peso en las ruedas delanteras para que el coche gire mejor sin perder adherencia.',
      },
      {
        pillar: 'Visión de Juego',
        title: 'Mira hacia el siguiente vértice y salida, no al capó',
        advice:
          'Fija tus referencias de frenada en carteles de distancia (150m, 100m), sombras o cambios de piano, y lleva la vista hacia la salida en cuanto gires.',
        whyItWorks:
          'Tu volante sigue naturalmente hacia donde miras y evitas correcciones bruscas.',
      },
      {
        pillar: 'Decisiones',
        title: 'Prioriza la velocidad de salida antes de una recta larga',
        advice:
          'En la curva previa a una recta, sacrifica entrar un poco más lento para hacer un vértice tardío y acelerar a fondo metros antes que tus rivales.',
        whyItWorks:
          'Ganas décimas de segundo a lo largo de toda la recta siguiente.',
      },
      {
        pillar: 'Mentalidad',
        title: 'Reduce el Control de Tracción (TCS) progresivamente a 0 o 1',
        advice:
          'El TCS alto corta potencia del motor al salir de curvas lentas. Bájalo a 1 o 0 y modula el acelerador con suavidad al enderezar el coche.',
        whyItWorks:
          'Desbloquea aceleración real en cada salida de horquilla.',
      },
    ],
    commonMistakes: [
      {
        id: 'gt7-1',
        problem: 'Frenar demasiado tarde buscando ganar 5 metros en la entrada',
        symptom: 'Bloqueas, te pasas el vértice y pierdes 0.6 segundos en toda la recta siguiente.',
        fix: 'Frena 10 metros antes de lo que crees, toca el vértice interior limpio y acelera temprano.',
        drillToFix: 'Completa 5 vueltas seguidas en Experiencia de Circuito enfocándote en no derrapar en las salidas.',
      },
    ],
    settingsGuide: [
      { label: 'Control de Tracción (TCS)', value: '0 – 1 (2 en lluvia)', note: 'Evita que el juego recorte potencia al acelerar' },
      { label: 'ABS', value: 'Por defecto', note: 'Mantiene estabilidad en frenadas al límite' },
      { label: 'Transmisión', value: 'Manual', note: 'Permite usar freno motor bajando marchas y estirar rpm cuando conviene' },
    ],
    dailyDrills: [
      { id: 'gt7-d1', task: 'Completar un sector de Experiencia de Circuito buscando medalla de Oro sin ayudas de trazada', duration: '10 min' },
    ],
  },
];

