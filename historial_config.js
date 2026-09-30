/**
 * ============================================================
 *  SARE 1507 — HISTORIAL DE PROCESOS OPERATIVOS
 *  Configuración declarativa de nominales históricos y complementos
 * ============================================================
 *
 *  INSTRUCCIONES PARA AGREGAR UN NUEVO CICLO
 *  ------------------------------------------
 *  1. Sube los CSV nuevos a GitHub Pages (mismo repositorio).
 *  2. Copia el bloque de ejemplo al final de HISTORIAL_CONFIG,
 *     edita los 4 campos que cambian cada ciclo:
 *       url, id, nivelLabel, ciclo
 *  3. Haz git push. El sistema carga todo automáticamente.
 *  ¡No hay que tocar ningún otro archivo JS ni HTML!
 *
 * ============================================================
 *
 *  ESTRUCTURA ESTÁNDAR DE CSV (normalizada para futuros nominales)
 *  ----------------------------------------------------------------
 *  A partir del ciclo que sigue a agosto 2026, todos los CSV
 *  deben entregarse con estas columnas exactas (separador: coma):
 *
 *    MUNICIPIO | CCT | NOMBRE DE LA ESCUELA | NOMBRE COMPLETO | NIVEL | FECHA | OBSERVACIONES
 *
 *  Descripción de cada columna:
 *    MUNICIPIO         → Nombre del municipio (ej. "ECATEPEC DE MORELOS")
 *    CCT               → Clave del centro de trabajo (ej. "15DPR0001A")
 *    NOMBRE DE LA ESCUELA → Nombre completo de la escuela o plantel
 *    NOMBRE COMPLETO   → Nombre del tutor o becario (AP AM NOM o NOM AP AM, el sistema tolera ambos)
 *    NIVEL             → Nivel educativo (ej. "PRIMARIA", "SECUNDARIA", "MEDIA SUPERIOR")
 *    FECHA             → Fecha del operativo en formato AAAA-MM-DD (ej. "2026-10-15")
 *    OBSERVACIONES     → Nota libre (ej. "HOMÓNIMO/VALIDAR") o vacío
 *
 *  Columnas que YA NO se incluyen en la estructura normalizada:
 *    PROGRAMA / REMESA → Esa información queda en el campo "nivelLabel" del config de abajo.
 *
 * ============================================================
 *
 *  DESCRIPCIÓN DE CADA CAMPO DEL OBJETO DE CONFIGURACIÓN
 *  -------------------------------------------------------
 *  url         {string}  Nombre del archivo CSV en GitHub Pages (relativo al repo).
 *  id          {string}  Identificador único interno. Sin espacios ni caracteres especiales.
 *                        Se usa como clave en HIST_MAPS. Una vez publicado NO cambiar.
 *  label       {string}  Etiqueta corta para la fila en el panel de estadísticas (≤12 chars).
 *  nivelLabel  {string}  Nombre completo del programa que aparece en las fichas de resultado.
 *  hasCurp     {boolean} true  → el CSV tiene columna CURP; se indexa por CURP exacta.
 *                        false → sin CURP; se indexa por NOMBRE COMPLETO normalizado.
 *  sep         {string}  Separador del CSV: "," (coma) o ";" (punto y coma).
 *  grupo       {string}  Categoría visual:
 *                        "historico"   → aparece en el bloque "Operativos Anteriores"
 *                        "complemento" → se agrupa por ciclo debajo de los históricos
 *  ciclo       {string}  Solo para grupo:"complemento". Texto que encabeza el bloque visual
 *                        (ej. "Complementos Mayo-Junio 2026"). Todos los archivos de un mismo
 *                        ciclo deben compartir exactamente el mismo valor.
 *
 *  Campos de mapeo de columnas (para archivos con estructura no estándar):
 *  colNombre   {string}  Columna del nombre completo si no es "NOMBRE COMPLETO" (ej. "COMPLETO").
 *  colFecha    {string}  Columna de fecha si no es "FECHA" (ej. "REMESA").
 *  colNivel    {string}  Columna de nivel si no es "NIVEL" (ej. "PROGRAMA").
 *  fechaFija   {string}  Si el CSV no tiene columna de fecha, usa este valor para todos los registros.
 *  nivelFijo   {string}  Si el CSV no tiene columna de nivel, usa este valor para todos los registros.
 *
 * ============================================================
 */

const HISTORIAL_CONFIG = [

  // ════════════════════════════════════════════════════════
  //  BLOQUE 1 — PADRONES HISTÓRICOS PRINCIPALES (con CURP)
  //  Archivos vigentes del operativo en curso BRCU mayo-junio 2026.
  //  Tienen CURP → búsqueda exacta por CURP en operativos anteriores.
  //  Separador: coma | Columnas estándar incluyen NIVEL y FECHA.
  // ════════════════════════════════════════════════════════

  {
    url:        'basica.csv',
    id:         'basica',
    label:      'Básica',
    nivelLabel: 'BÁSICA',
    hasCurp:    true,
    sep:        ',',
    grupo:      'historico'
    // Columnas: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA, NOMBRE COMPLETO,
    //           OBSERVACIONES, NIVEL, FECHA
  },

  {
    url:        'bueems.csv',
    id:         'bueems',
    label:      'BUEMS',
    nivelLabel: 'BUEMS',
    hasCurp:    true,
    sep:        ',',
    grupo:      'historico'
    // Columnas: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA, NOMBRE COMPLETO,
    //           OBSERVACIONES, NIVEL, FECHA
  },

  {
    url:        'jef.csv',
    id:         'jef',
    label:      'JEF',
    nivelLabel: 'JEF',
    hasCurp:    true,
    sep:        ',',
    grupo:      'historico'
    // Columnas: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA, NOMBRE COMPLETO,
    //           OBSERVACIONES, NIVEL, FECHA
  },

  {
    url:        'bueems_feb.csv',
    id:         'bueems_feb',
    label:      'BUEMS Feb 26',
    nivelLabel: 'BUEMS FEB 2026',
    hasCurp:    true,
    sep:        ',',
    grupo:      'historico'
    // Columnas: misma estructura que bueems.csv
  },

  // ════════════════════════════════════════════════════════
  //  BLOQUE 2 — COMPLEMENTOS MAYO-JUNIO 2026
  //  Sin CURP. Estructura IDÉNTICA a los padrones principales
  //  (MUNICIPIO, CCT, NOMBRE DE LA ESCUELA, NOMBRE COMPLETO,
  //   OBSERVACIONES, NIVEL, FECHA) pero con separador punto y coma.
  //  Se indexan por NOMBRE COMPLETO normalizado.
  // ════════════════════════════════════════════════════════

  {
    url:        'brcu_prim_secu_mayo_junio_2026.csv',
    id:         'brcu_may_jun',
    label:      'BRCU Prim/Sec',
    nivelLabel: 'REZAGO BRCU PRIMARIA/SECUNDARIA MAYO-JUNIO 2026',
    hasCurp:    false,
    sep:        ';',
    grupo:      'complemento',
    ciclo:      'Complementos Mayo-Junio 2026'
    // Columnas estándar: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA,
    //                    NOMBRE COMPLETO, OBSERVACIONES, NIVEL, FECHA
  },

  {
    url:        'bueems_mayo_junio_2026.csv',
    id:         'bueems_may_jun',
    label:      'BUEEMS',
    nivelLabel: 'REZAGO BUEEMS MAYO-JUNIO 2026',
    hasCurp:    false,
    sep:        ';',
    grupo:      'complemento',
    ciclo:      'Complementos Mayo-Junio 2026'
    // Columnas estándar: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA,
    //                    NOMBRE COMPLETO, OBSERVACIONES, NIVEL, FECHA
  },

  {
    url:        'jef_mayo_junio_2026.csv',
    id:         'jef_may_jun',
    label:      'JEF',
    nivelLabel: 'REZAGO JEF MAYO-JUNIO 2026',
    hasCurp:    false,
    sep:        ';',
    grupo:      'complemento',
    ciclo:      'Complementos Mayo-Junio 2026'
    // Columnas estándar: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA,
    //                    NOMBRE COMPLETO, OBSERVACIONES, NIVEL, FECHA
  },

  // ════════════════════════════════════════════════════════
  //  BLOQUE 3 — COMPLEMENTOS AGOSTO 2026
  //  Sin CURP. Estructura DISTINTA a la estándar:
  //  - No tienen columna NIVEL ni FECHA
  //  - Tienen columna PROGRAMA (y bueems_agosto tiene además REMESA)
  //  - Se usan los campos "nivelFijo" y "fechaFija" / "colFecha"
  //    para que el sistema los complete automáticamente.
  //  Separador: coma.
  // ════════════════════════════════════════════════════════

  {
    url:        'brcu_agosto_2026.csv',
    id:         'brcu_ago',
    label:      'BRCU',
    nivelLabel: 'BRCU AGOSTO 2026',
    hasCurp:    false,
    sep:        ',',
    grupo:      'complemento',
    ciclo:      'Complementos Agosto 2026',
    // Columnas CSV: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA, NOMBRE COMPLETO, PROGRAMA, OBSERVACIONES
    colNivel:   'PROGRAMA',       // usar columna PROGRAMA como nivel
    fechaFija:  'Agosto 2026'     // no tiene FECHA → valor fijo para mostrar en fichas
  },

  {
    url:        'bueems_agosto_2026.csv',
    id:         'bueems_ago',
    label:      'BUEEMS',
    nivelLabel: 'BUEEMS AGOSTO 2026',
    hasCurp:    false,
    sep:        ',',
    grupo:      'complemento',
    ciclo:      'Complementos Agosto 2026',
    // Columnas CSV: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA, NOMBRE COMPLETO, PROGRAMA, REMESA, OBSERVACIONES
    colNombre:  'NOMBRE COMPLETO', // ahora corregido (antes era 'COMPLETO' en el CSV original)
    colNivel:   'PROGRAMA',
    colFecha:   'REMESA',          // usar REMESA como referencia de fecha/proceso
    fechaFija:  'Agosto 2026'      // fallback si REMESA está vacío
  },

  {
    url:        'jef_agosto_2026.csv',
    id:         'jef_ago',
    label:      'JEF',
    nivelLabel: 'JEF AGOSTO 2026',
    hasCurp:    false,
    sep:        ',',
    grupo:      'complemento',
    ciclo:      'Complementos Agosto 2026',
    // Columnas CSV: MUNICIPIO, CCT, NOMBRE DE LA ESCUELA, NOMBRE COMPLETO, PROGRAMA, OBSERVACIONES
    colNivel:   'PROGRAMA',
    fechaFija:  'Agosto 2026'
  },

  // ════════════════════════════════════════════════════════
  //  PLANTILLA PARA FUTUROS CICLOS
  //  Copia este bloque, descomenta y edita los 4 campos marcados con ←
  //  Si el CSV tiene la estructura normalizada estándar, solo necesitas
  //  editar url, id, nivelLabel y ciclo. El resto queda igual.
  // ════════════════════════════════════════════════════════

  // {
  //   url:        'brcu_octubre_2026.csv',          // ← nombre del archivo en GitHub
  //   id:         'brcu_oct_2026',                  // ← id único, sin espacios
  //   label:      'BRCU',
  //   nivelLabel: 'BRCU OCTUBRE 2026',              // ← nombre en fichas de resultado
  //   hasCurp:    false,
  //   sep:        ',',
  //   grupo:      'complemento',
  //   ciclo:      'Complementos Octubre 2026'       // ← texto del bloque visual
  //   // Si usa estructura normalizada: sin campos adicionales
  //   // Si le falta NIVEL:  agregar → nivelFijo: 'PRIMARIA'  (o colNivel: 'PROGRAMA')
  //   // Si le falta FECHA:  agregar → fechaFija: 'Octubre 2026' (o colFecha: 'REMESA')
  // },
  // {
  //   url:        'bueems_octubre_2026.csv',
  //   id:         'bueems_oct_2026',
  //   label:      'BUEEMS',
  //   nivelLabel: 'BUEEMS OCTUBRE 2026',
  //   hasCurp:    false,
  //   sep:        ',',
  //   grupo:      'complemento',
  //   ciclo:      'Complementos Octubre 2026'
  // },
  // {
  //   url:        'jef_octubre_2026.csv',
  //   id:         'jef_oct_2026',
  //   label:      'JEF',
  //   nivelLabel: 'JEF OCTUBRE 2026',
  //   hasCurp:    false,
  //   sep:        ',',
  //   grupo:      'complemento',
  //   ciclo:      'Complementos Octubre 2026'
  // },

];

// ============================================================
//  FUNCIONES DE ARRANQUE — No editar a partir de aquí
//  El HTML principal lee HISTORIAL_CONFIG y construye automáticamente:
//    • HIST_MAPS  → un Map() por cada entrada del config
//    • Panel de estadísticas → agrupado por "grupo" y "ciclo"
//    • Búsquedas → por CURP (hasCurp:true) o por nombre (hasCurp:false)
// ============================================================

// Construir HIST_MAPS dinámicamente desde el config
// (Este bloque reemplaza la declaración manual de const HIST_MAPS = {...})
const HIST_MAPS = {};
HISTORIAL_CONFIG.forEach(function(cfg) {
  HIST_MAPS[cfg.id] = new Map();
});

// Lista de IDs sin CURP (para la búsqueda en complementos)
// Se recalcula automáticamente; no hay lista hardcodeada de IDs
const IDS_SIN_CURP = HISTORIAL_CONFIG
  .filter(function(cfg) { return !cfg.hasCurp; })
  .map(function(cfg)    { return cfg.id; });

// Lista de IDs con CURP (para buscarEnHistoricos)
const IDS_CON_CURP = HISTORIAL_CONFIG
  .filter(function(cfg) { return cfg.hasCurp; })
  .map(function(cfg)    { return cfg.id; });

// Agrupar complementos por ciclo (para generar el panel de estadísticas)
const CICLOS_COMPLEMENTO = {};
HISTORIAL_CONFIG
  .filter(function(cfg) { return cfg.grupo === 'complemento'; })
  .forEach(function(cfg) {
    if (!CICLOS_COMPLEMENTO[cfg.ciclo]) {
      CICLOS_COMPLEMENTO[cfg.ciclo] = [];
    }
    CICLOS_COMPLEMENTO[cfg.ciclo].push(cfg.id);
  });
