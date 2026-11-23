/*!
 * DL CHAT — Asistente automático de DL COMPANY -TECHNOLOGY-
 * ----------------------------------------------------------
 * Cuando un cliente toca un botón de WhatsApp (al 321 864 1539) en la página web
 * o en una app, se abre este mini chat y responde al instante según lo que pidió.
 * Si necesita a una persona, el cliente pasa a WhatsApp con su caso ya resumido.
 *
 * Instalación en cada app (antes de </body>):
 *   <script>window.DL_CHAT_APP='stock';</script>
 *   <script src="https://dl-company-technology.github.io/chat/dl-chat.js" async></script>
 *
 * Valores de DL_CHAT_APP: web, finanzas, stock, cuadra, comanda, arte
 * Respuestas, precios y planes se editan en la app de administración:
 *   https://dl-company-technology.github.io/chat/admin/
 * (lo de este archivo es solo la configuración de respaldo si no hay internet).
 */
(function () {
  'use strict';
  if (window.DLChat) return;

  var NUMERO_BOTONES = '573218641539'; // número que usan los botones de las apps
  var WEB = 'https://dl-company-technology.github.io/';
  var script = document.currentScript;
  var APP_ACTUAL = String(window.DL_CHAT_APP || (script && script.getAttribute('data-app')) || '').toLowerCase();

  /* =====================================================================
   * CONOCIMIENTO  (planes y precios tomados de la página web)
   * ===================================================================== */
  var PAGO_DEFECTO = 'Te respondemos con los *datos para el pago* (Nequi o transferencia).';
  var ACTIVAR_CODIGO_CUADRA = 'Te enviamos tu *código de activación*. Lo escribes en *Planes → 🔑 ¿Ya pagaste? Activa tu código* y listo, sin perder tus datos.';

  var APPS_DEF = {
    finanzas: {
      nombre: 'DL FINANZAS', icono: '💰', url: WEB + 'dl-finanzas/',
      claves: ['dl finanzas', 'finanzas', 'gastos', 'presupuesto'],
      desc: 'Controla los ingresos, gastos y presupuesto de tu hogar: balance del mes, gastos por categoría, semáforo de presupuesto y tendencia de 6 meses.',
      planes: [
        { id: 'gratis', n: 'Gratis', p: 0, inc: '15 movimientos al mes · datos en tu celular' },
        { id: 'pro', n: 'Pro', p: 10000, antes: 20000, inc: 'Hasta 50 movimientos al mes · nube y sincronización · Excel y respaldos' },
        { id: 'premium', n: 'Premium 👑', p: 20000, antes: 40000, inc: 'Movimientos ilimitados · toda la app · soporte prioritario por WhatsApp' },
      ],
      pago: PAGO_DEFECTO,
      activar: 'Apenas confirmamos el pago, *activamos el plan directamente en tu cuenta* (con el correo con el que te registraste), sin perder tus datos.',
      sinCodigo: true,
      login: 'Si te registraste con *Google*, toca *continúa con Google* en vez de escribir correo y contraseña.',
      gratisLocal: 'En el plan *Gratis* los datos se guardan solo en ese celular. Para verlos en varios equipos necesitas el plan *Pro* o *Premium* (con nube).',
    },
    stock: {
      nombre: 'DL STOCK PRO', icono: '📦', url: WEB + 'dl-stock-pro/',
      claves: ['dl stock pro', 'dl stock', 'stock pro', 'stock', 'inventario'],
      desc: 'La app de inventario para tiendas, minimercados, bodegas y distribuidoras: escáner de códigos, alertas de vencimiento y stock bajo, y pedido al proveedor en un toque.',
      planes: [
        { id: 'gratis', n: 'Gratis', p: 0, inc: 'Hasta 100 productos · escáner, alertas y conteo · datos en tu celular' },
        { id: 'pro', n: 'Pro', p: 20000, antes: 40000, inc: 'Productos ilimitados · Excel, importar y etiquetas · pedido al proveedor' },
        { id: 'premium', n: 'Premium 👑', p: 40000, antes: 80000, inc: 'Todo lo de Pro · nube y sincronización · varios celulares y computador' },
        { id: 'empresarial', n: 'Empresarial 🏢', p: 80000, antes: 160000, inc: 'Todo lo de Premium · hasta 5 cajeros con usuario y contraseña' },
      ],
      pago: PAGO_DEFECTO,
      activar: 'Te enviamos tu *código de activación*. Lo escribes en *👑 Planes y precios → Ingresar código de activación* y tu plan empieza de inmediato, sin perder tus datos.',
      login: 'Si eres *cajero*, ingresas con el *código de empresa* y tu usuario. Si olvidaste tu clave, toca *¿Olvidaste tu contraseña?* en el ingreso de cajero y el dueño te genera una clave temporal.',
      gratisLocal: 'En los planes *Gratis* y *Pro* los datos se guardan en ese celular. Para verlos en varios equipos necesitas *Premium* (con nube).',
    },
    cuadra: {
      nombre: 'DL CUADRA PRO', icono: '🧾', url: WEB + 'dl-cuadra-pro/',
      claves: ['dl cuadra pro', 'dl cuadra', 'cuadra pro', 'cuadra', 'caja', 'cajero', 'ventas'],
      desc: 'Ventas e inventario diario para licoreras, tiendas, kioscos y negocios con caja: vendes con un toque, el inventario se descuenta solo y al final del día sabes cuánto debe haber en caja.',
      planes: [
        { id: 'gratis', n: 'Gratis', p: 0, inc: 'Hasta 15 productos · 3 días de historial · solo el dueño' },
        { id: 'pro', n: 'Pro', p: 20000, antes: 40000, inc: 'Hasta 150 productos y 3 cajeros con PIN · escáner · ventas sin internet · 90 días de historial' },
        { id: 'premium', n: 'Premium 💎', p: 40000, antes: 80000, inc: 'Productos y cajeros ilimitados · historial completo · soporte prioritario' },
        { id: 'empresarial', n: 'Empresarial 🏢', p: 70000, antes: 140000, inc: 'Todo lo de Premium · varias sedes · reportes de todas las sedes juntas' },
      ],
      pago: PAGO_DEFECTO,
      activar: ACTIVAR_CODIGO_CUADRA,
      login: 'Si eres *cajero*, ingresas con el nombre de la empresa, el NIT, tu usuario y tu *PIN de 4 dígitos*. Si olvidaste el PIN, pídele al dueño que lo consulte o genere uno nuevo desde *Administración*.',
      gratisLocal: null,
    },
    comanda: {
      nombre: 'DL COMANDA PRO', icono: '🍽️', url: WEB + 'dl-comanda-pro/',
      claves: ['dl comanda pro', 'dl comanda', 'comanda', 'restaurante', 'mesero', 'meseros', 'cocina', 'mesas'],
      desc: 'Pedidos para restaurantes y bares: el mesero toma el pedido por mesa desde el celular, la cocina lo recibe al instante y avisa cuando está listo, y la caja cobra y cuadra el día.',
      planes: [
        { id: 'gratis', n: 'Gratis', p: 0, inc: 'Hasta 5 mesas y 20 productos · 2 usuarios · 15 pedidos al día' },
        { id: 'pro', n: 'Pro', p: 30000, antes: 60000, inc: 'Hasta 8 mesas, 80 productos y 4 usuarios · 50 pedidos al día · imprimir, dividir cuentas y caja' },
        { id: 'premium', n: 'Premium ⭐', p: 50000, antes: 100000, inc: 'Todo ilimitado · estaciones cocina y bar · control de stock · soporte prioritario' },
      ],
      pago: PAGO_DEFECTO,
      activar: ACTIVAR_CODIGO_CUADRA,
      login: '*Meseros, cocina y caja:* pídele al dueño el nombre del restaurante, el NIT, tu usuario y tu PIN.',
      gratisLocal: null,
    },
    arte: {
      nombre: 'EL ARTE EN TUS MANOS', icono: '🧶', url: 'https://dimelolenin7-ui.github.io/el-arte-en-tus-manos-app/',
      claves: ['el arte en tus manos', 'arte en tus manos', 'amigurumi', 'amigurumis', 'curso', 'cursos', 'academia'],
      desc: 'Academia de amigurumis y manualidades con cursos en video, retos paso a paso y herramientas para emprender.',
      planes: [
        { id: 'gratis', n: 'Gratis', p: 0, inc: 'Cursos de muestra para empezar' },
        { id: 'pro', n: 'Pro', p: 10000, antes: 20000, inc: 'Cursos clásicos completos' },
        { id: 'premium', n: 'Premium 👑', p: 20000, antes: 40000, inc: 'Todos los cursos (incluidos los NUEVOS) · fichas de materiales · soporte prioritario por WhatsApp' },
      ],
      pago: 'Te enviamos el *enlace de pago* (Wompi en Colombia o PayPal internacional).',
      activar: 'Al confirmar el pago te enviamos tu *código único* y lo canjeas en la ventana de *⭐ Planes*.',
      login: 'Si te registraste con *Google*, usa el botón de Google en vez de correo y contraseña.',
      gratisLocal: null,
      sinAnual: true,
    },
  };
  // Preguntas y respuestas (se editan desde la app de administración).
  // "apps": a cuáles aplica ('*' = todas). En la respuesta puedes usar:
  //   {app} nombre de la app · {consejo_ingreso} · {consejo_datos} · {planes} lista corta de planes
  var PROBLEMAS_DEF = [
    {
      id: 'correo_no_llega', titulo: '📧 No me llega el correo para cambiar la contraseña', apps: ['*'],
      claves: ['no me llega el correo', 'no llega el correo', 'no me llego el correo', 'no me llega el link', 'no llega el link',
        'no me llega el enlace', 'no llega el enlace', 'no recibo el correo', 'no me ha llegado', 'recuperar mi contrasena', 'recuperar la contrasena'],
      respuesta: 'Entendido 📧. Revisa esto:\n\n1. Busca el correo en *Spam* o *Correo no deseado* (y en *Promociones* si usas Gmail).\n' +
        '2. Espera unos 5 minutos, a veces tarda.\n3. Verifica que escribiste el correo *exactamente igual* al de tu cuenta de {app}.\n\n' +
        'Luego vuelve a pedirlo desde *¿Olvidaste tu contraseña?*',
    },
    {
      id: 'login', titulo: '🔐 No puedo ingresar a mi cuenta', apps: ['*'],
      claves: ['no puedo ingresar', 'no puedo entrar', 'no puedo acceder', 'no me deja entrar', 'no me deja ingresar', 'iniciar sesion',
        'no inicia sesion', 'contrasena', 'clave', 'incorrecta', 'incorrecto', 'esta mal', 'olvide', 'no recuerdo', 'pin', 'acceder a mi cuenta', 'ingresar a mi cuenta'],
      respuesta: 'Listo, para solucionar ese problema 🔐:\n\nEn la pantalla de ingreso, debajo de donde escribes tus datos, toca *¿Olvidaste tu contraseña?*. ' +
        'Te llega un link a tu correo para crear una contraseña nueva y recuperas tu cuenta *sin perder los datos* de {app}.{consejo_ingreso}',
      alt: 'Intentemos esto 👇\n\n1. Revisa que el correo esté bien escrito y *sin espacios* al final.\n2. Toca el 👁️ para ver la contraseña mientras la escribes.\n' +
        '3. Si el link no llega, búscalo en *Spam* o *Correo no deseado*.',
    },
    {
      id: 'crear_cuenta', titulo: '🆕 No sé cómo crear mi cuenta', apps: ['*'],
      claves: ['crear mi cuenta', 'crear una cuenta', 'crear cuenta', 'registrarme', 'registrarse', 'como me registro', 'abrir cuenta'],
      respuesta: 'Crear tu cuenta es gratis 🙌:\n\n1. Abre {app} y en la pantalla de ingreso toca *Crear cuenta*.\n' +
        '2. Escribe tu correo y una contraseña (mínimo 6 caracteres).\n3. Acepta los términos y listo: ya puedes usar el plan Gratis.',
      porApp: { cuadra: 'Si prefieres, usa *Déjanos tus datos* (tu nombre, negocio, celular y correo) y nosotros te creamos la cuenta.' },
    },
    {
      id: 'no_carga', titulo: '⏳ La app no abre, se cierra o se queda cargando', apps: ['*'],
      claves: ['no abre', 'no me abre', 'no carga', 'no me carga', 'se cierra', 'se queda cargando', 'se queda pegada', 'pantalla blanca',
        'pantalla en blanco', 'se congela', 'se traba', 'lenta', 'no funciona', 'no sirve', 'error', 'falla', 'se bloquea'],
      respuesta: 'Vamos a solucionarlo 🛠️. Hazlo en orden:\n\n1. Revisa que tengas *internet*.\n2. Cierra {app} por completo y vuelve a abrirla.\n' +
        '3. Si la usas en el navegador, *recarga la página*.\n4. Si la instalaste en el celular, ábrela una vez desde el navegador para que se actualice a la última versión.',
      alt: 'Prueba también *reiniciar el celular* o computador y abrir la app de nuevo. Si tu plan tiene nube, tus datos están guardados y no se pierden 👍',
    },
    {
      id: 'datos', titulo: '🗂️ No aparecen mis datos o no se sincronizan', apps: ['*'],
      claves: ['no aparecen', 'no aparece', 'no me aparece', 'se borraron', 'se borro', 'perdi', 'desaparecio', 'desaparecieron', 'no se guardo',
        'no guarda', 'no sincroniza', 'no se sincroniza', 'otro celular', 'el computador', 'no se actualiza', 'mis datos'],
      respuesta: 'Revisemos tus datos 🗂️:\n\n1. Ingresa con la *misma cuenta* (correo) con la que guardaste la información.\n2. Ten internet al guardar.\n' +
        '3. Cierra y abre la app para que se actualice.{consejo_datos}',
    },
    {
      id: 'instalar', titulo: '📲 Instalar la app en el celular', apps: ['*'],
      claves: ['instalar', 'descargar', 'pantalla de inicio', 'icono', 'como la bajo', 'play store', 'app store'],
      respuesta: 'La app se instala desde el navegador, sin tienda 📲:\n\n*Android (Chrome):* abre {app}, toca los *⋮ tres puntos* → *Instalar app* o *Agregar a pantalla de inicio*.\n\n' +
        '*iPhone (Safari):* toca *Compartir* (el cuadrito con flecha) → *Agregar a inicio*.',
    },
    {
      id: 'limite', titulo: '🔒 Me dice que llegué al límite o que es Premium', apps: ['*'],
      claves: ['limite', 'no me deja agregar', 'no deja agregar', 'no puedo agregar', 'bloqueado', 'bloqueada', 'candado', 'mejora tu plan', 'es premium', 'dice premium'],
      respuesta: 'Eso pasa cuando llegas al límite de tu plan 🔒. Estos son los planes de {app}:\n\n{planes}\n\nCon un plan mayor se desbloquea al instante y *no pierdes tus datos*.',
      mostrarPlanes: true, preguntar: false,
    },
    {
      id: 'escaner', titulo: '📷 El escáner no lee los códigos', apps: ['stock', 'cuadra', 'comanda'],
      claves: ['escaner', 'escanear', 'camara', 'codigo de barras', 'no lee', 'no escanea'],
      respuesta: 'Para que el escáner lea bien 📷:\n\n1. Cuando el navegador pregunte, toca *Permitir* el uso de la cámara.\n2. Busca buena luz (o enciende la *linterna*) y acerca o aleja el código hasta que enfoque.\n' +
        '3. Si no lo lee, puedes *escribir el código* a mano.',
      alt: 'Si la cámara no abre: revisa en los ajustes del celular que el navegador tenga permiso de *cámara*, cierra la app y vuelve a abrirla.',
    },
    {
      id: 'caja', titulo: '💵 La caja del día no me cuadra', apps: ['cuadra', 'comanda'],
      claves: ['no cuadra', 'no me cuadra', 'descuadre', 'falta plata', 'falta dinero', 'sobra plata', 'cierre de caja', 'cierre del dia'],
      respuesta: 'Revisemos el cierre 💵:\n\n1. Mira el *cierre del día*: ventas, gastos y efectivo que debe haber en caja.\n2. Verifica que no haya ventas *pendientes por enviar* (las ventas sin internet se envían solas al volver la señal).\n' +
        '3. Revisa *gastos* o *fiados* sin registrar y ventas duplicadas.\n4. Confirma que estás viendo la *sede y la fecha* correctas.',
    },
    {
      id: 'cocina', titulo: '🔔 Los pedidos no llegan o no suenan en cocina', apps: ['comanda'],
      claves: ['no llega a cocina', 'no llegan a cocina', 'no llegan los pedidos', 'no suena', 'no avisa', 'no vibra', 'sonido', 'cocina no recibe'],
      respuesta: 'Para que cocina reciba y avise 🔔:\n\n1. Cocina debe tener *su usuario abierto* y con internet.\n2. Toca *Activar avisos* en ese equipo y sube el volumen.\n' +
        '3. No dejes la app minimizada mucho tiempo: algunos celulares la pausan para ahorrar batería.',
    },
    {
      id: 'videos', titulo: '🎬 Los videos o cursos no cargan', apps: ['arte'],
      claves: ['video', 'videos', 'no reproduce', 'curso bloqueado', 'cursos bloqueados', 'no carga el video'],
      respuesta: 'Para ver los cursos 🎬:\n\n1. Revisa tu conexión a internet (los videos necesitan buena señal).\n2. Cierra y abre la app.\n' +
        '3. Si un curso tiene 🔒, es de un plan superior: los marcados *NUEVO* son exclusivos de *Premium*.',
    },
  ];

  var GENERAL_DEF = {
    activo: true,
    empresa: 'DL COMPANY -TECHNOLOGY-',
    whatsapp: '573218641539',
    mensajeAsesor: 'Te comunico con un asesor de *{empresa}* 👨‍💻.\n\nToca *Continuar en WhatsApp*: tu caso va *ya resumido* para que no tengas que repetirlo, y te responderemos lo antes posible.',
    mensajeDespedida: '¡Con mucho gusto! 😊 Fue un placer ayudarte. Si necesitas algo más, aquí estoy.\n\n— *{empresa}*',
  };

  var DEFECTO = { version: 1, general: GENERAL_DEF, apps: APPS_DEF, orden_apps: ['finanzas', 'stock', 'cuadra', 'comanda'], problemas: PROBLEMAS_DEF };
  function copiar(o) { return JSON.parse(JSON.stringify(o)); }

  // Configuración activa (se reemplaza con la que guardas en la app de administración)
  var CFG, APPS, ORDEN_APPS, PROBLEMAS, GENERAL, WA_NUMERO, EMPRESA;
  function aplicarConfig(c) {
    var base = copiar(DEFECTO);
    c = c && typeof c === 'object' ? c : {};
    CFG = {
      version: 1,
      general: Object.assign(base.general, c.general || {}),
      apps: c.apps && Object.keys(c.apps).length ? c.apps : base.apps,
      orden_apps: c.orden_apps && c.orden_apps.length ? c.orden_apps : base.orden_apps,
      problemas: Array.isArray(c.problemas) ? c.problemas : base.problemas,
    };
    APPS = CFG.apps; ORDEN_APPS = CFG.orden_apps.filter(function (k) { return APPS[k]; });
    PROBLEMAS = CFG.problemas.filter(function (p) { return p && p.titulo && p.respuesta; })
      .map(function (p) { p.apps = p.apps && p.apps.length ? p.apps : ['*']; p.claves = p.claves || []; return p; });
    GENERAL = CFG.general; WA_NUMERO = String(GENERAL.whatsapp || GENERAL_DEF.whatsapp).replace(/\D/g, ''); EMPRESA = GENERAL.empresa || GENERAL_DEF.empresa;
  }
  aplicarConfig(null);

  // Nube (Supabase): lectura pública de la configuración y reporte de preguntas sin respuesta
  var NUBE = {
    url: 'https://geesohvgkqhhlxdnovfb.supabase.co/rest/v1/',
    llave: 'sb_publishable_oozUfY-BnwMxOnoUCmfBgg_INhu8KKd',
  };
  var CACHE = 'dlchat_config_v1';
  var configFija = false; // true cuando la app de administración está probando cambios
  try { var guardada = localStorage.getItem(CACHE); if (guardada) aplicarConfig(JSON.parse(guardada)); } catch (e) {}
  try {
    fetch(NUBE.url + 'chatbot_config?id=eq.principal&select=config', { headers: { apikey: NUBE.llave, Authorization: 'Bearer ' + NUBE.llave } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (filas) {
        if (!filas || !filas[0] || configFija) return;
        aplicarConfig(filas[0].config);
        try { localStorage.setItem(CACHE, JSON.stringify(filas[0].config)); } catch (e) {}
      }).catch(function () {});
  } catch (e) {}
  function reportarPendiente(texto) {
    if (configFija) return;
    try {
      fetch(NUBE.url + 'chatbot_pendientes', {
        method: 'POST',
        headers: { apikey: NUBE.llave, Authorization: 'Bearer ' + NUBE.llave, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ app: (st && st.app) || APP_ACTUAL || 'web', texto: String(texto).slice(0, 500) }),
      }).catch(function () {});
    } catch (e) {}
  }

  /* =====================================================================
   * UTILIDADES
   * ===================================================================== */
  function norm(t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function tiene(t, frase) {
    var f = norm(frase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('(^|\\s)' + f + '(?=\\s|$|s\\b)').test(t);
  }
  function puntos(t, frases) { var s = 0; frases.forEach(function (f) { if (tiene(t, f)) s += norm(f).split(' ').length; }); return s; }
  function dinero(n) { return '$' + Number(n).toLocaleString('es-CO'); }
  function saludo() {
    var h;
    try { h = Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/Bogota' }).format(new Date())); }
    catch (e) { h = new Date().getHours(); }
    return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
  }

  function detectarApp(t) {
    var mejor = null, mp = 0;
    Object.keys(APPS).forEach(function (k) { var p = puntos(t, APPS[k].claves); if (p > mp) { mp = p; mejor = k; } });
    return mejor;
  }
  function detectarPlan(t) {
    if (/(^|\s)(empresarial|empresa)(\s|$)/.test(t)) return 'empresarial';
    if (/(^|\s)premium(\s|$)/.test(t)) return 'premium';
    if (/(^|\s)pro(\s|$)/.test(t.replace(/(dl stock|dl cuadra|dl comanda|stock|cuadra|comanda) pro/g, ''))) return 'pro';
    return null;
  }
  function aplica(p, k) { return p.apps.indexOf('*') !== -1 || p.apps.indexOf(k) !== -1; }
  function detectarProblema(t, k) {
    var mejor = null, mp = 0;
    PROBLEMAS.forEach(function (p) { if (k && !aplica(p, k)) return; var s = puntos(t, p.claves); if (s > mp) { mp = s; mejor = p; } });
    return mejor;
  }
  function problemaPorId(id) { return PROBLEMAS.filter(function (p) { return p.id === id; })[0]; }

  function textoPlanes(a, corto) {
    return a.planes.map(function (p) {
      var precio = p.p ? '*' + dinero(p.p) + '*/mes' + (p.antes ? ' (antes ' + dinero(p.antes) + ')' : '') : '*$0*';
      return '• *' + p.n + '* — ' + precio + (corto ? '' : '\n   ' + p.inc);
    }).join(corto ? '\n' : '\n\n');
  }

  /* =====================================================================
   * CONVERSACIÓN
   * ===================================================================== */
  var st;
  function nuevaConversacion(textoOriginal, urlOriginal) {
    st = {
      original: textoOriginal || '',
      url: urlOriginal || '',
      app: APPS[APP_ACTUAL] ? APP_ACTUAL : null,
      origen: APP_ACTUAL === 'web' || !APP_ACTUAL ? 'web' : 'app',
      modo: null,            // soporte | confirmar | elegir_app | detalles
      siguiente: null,       // qué hacer después de elegir la app
      problema: null, alternativa: false, fallos: 0,
      premium: false,
      resumen: [],
    };
  }

  function nota(linea) { if (st.resumen.indexOf(linea) === -1) st.resumen.push(linea); }

  function mensajeWhatsApp() {
    var base = st.original || ('Hola DL COMPANY 👋 ' + (st.origen === 'web' ? 'Vengo de la página web.' : 'Vengo de la app ' + (st.app ? APPS[st.app].nombre : '') + '.'));
    if (!st.resumen.length) return base;
    return base + '\n\n📝 Resumen del asistente:\n' + st.resumen.map(function (r) { return '• ' + r; }).join('\n');
  }

  // Chips (respuestas rápidas)
  var CH = {
    wa: { t: '💬 Continuar en WhatsApp', a: 'wa', wa: true },
    pedido: { t: '📲 Enviar pedido por WhatsApp', a: 'wa', wa: true },
    asesor: { t: '👨‍💻 Hablar con un asesor', a: 'asesor' },
    menu: { t: '🏠 Menú principal', a: 'menu' },
    otra: { t: '🙋 Tengo otra pregunta', a: 'menu' },
    planes: { t: '👑 Ver planes y precios', a: 'planes' },
    soporte: { t: '🛠️ Soporte técnico', a: 'soporte' },
    activar: { t: '🔑 ¿Cómo activo mi plan?', a: 'activar' },
  };

  function r(texto, chips) { return { texto: texto, chips: chips || [] }; }

  function menuPrincipal(prefijo) {
    var a = st.app ? APPS[st.app] : null;
    var chips = st.origen === 'web' && !a
      ? [{ t: '📱 Ver nuestras apps', a: 'apps' }, CH.planes, { t: '✨ Quiero una app a la medida', a: 'medida' }, CH.soporte, CH.asesor]
      : [CH.soporte, CH.planes, { t: '🔑 Problemas con mi plan o código', a: 'problema_plan' }, CH.asesor];
    return r((prefijo ? prefijo + ' ' : '') + '¿En qué te puedo ayudar' + (a ? ' con *' + a.nombre + '*' : '') + '?', chips);
  }

  function pedirApp(siguiente, texto) {
    st.modo = 'elegir_app'; st.siguiente = siguiente;
    return r(texto || '¿Con cuál de nuestras apps?', ORDEN_APPS.concat(APP_ACTUAL === 'arte' ? ['arte'] : []).map(function (k) {
      return { t: APPS[k].icono + ' ' + APPS[k].nombre, a: 'app:' + k };
    }));
  }

  // ----- respuestas por tema -----
  function verPlanes(planId, anual) {
    if (!st.app) return pedirApp('planes', '¿De cuál app quieres ver los planes?');
    var a = APPS[st.app];
    var plan = planId && a.planes.filter(function (p) { return p.id === planId; })[0];
    st.modo = null;
    if (plan && plan.p) {
      nota('Quiere el plan ' + plan.n.replace(/[^\wÁÉÍÓÚáéíóúñ ]/g, '').trim() + ' de ' + a.nombre + (anual ? ' (anual)' : ''));
      var precio = anual && !a.sinAnual
        ? '*' + dinero(plan.p * 12) + '* por 14 meses (pagas 12, te regalamos 2)'
        : '*' + dinero(plan.p) + '*/mes' + (plan.antes ? ' (antes ' + dinero(plan.antes) + ', 50% de lanzamiento)' : '');
      return r('¡Excelente elección! 🎉\n\n*Plan ' + plan.n + ' de ' + a.nombre + '*\n' + precio + '\n✅ ' + plan.inc +
        '\n\n*Así lo activas:*\n1. Toca *Enviar pedido por WhatsApp* 👇\n2. ' + a.pago + '\n3. ' + a.activar,
        [CH.pedido, { t: '📋 Ver todos los planes', a: 'planes_todos' }, CH.otra]);
    }
    nota('Preguntó por los planes de ' + a.nombre);
    return r('*Planes de ' + a.nombre + '* 🚀 50% de descuento de lanzamiento\n\n' + textoPlanes(a) +
      (a.sinAnual ? '' : '\n\n📅 Pago anual: *14 meses por el precio de 12*.') + '\n\n¿Cuál te interesa?',
      a.planes.filter(function (p) { return p.p; }).map(function (p) { return { t: 'Quiero ' + p.n, a: 'plan:' + p.id }; }).concat([CH.otra]));
  }

  function comoActivar() {
    if (!st.app) return pedirApp('activar', '¿En cuál app quieres activar tu plan?');
    var a = APPS[st.app];
    return r('*Cómo activar tu plan en ' + a.nombre + '* 🔑\n\n1. Escríbenos por WhatsApp qué plan quieres.\n2. ' + a.pago + '\n3. ' + a.activar,
      [CH.planes, CH.pedido, CH.otra]);
  }

  function problemaPlan() {
    if (!st.app) return pedirApp('problema_plan', '¿En cuál app tienes el problema con el plan?');
    st.modo = null;
    nota('Tiene problemas para acceder a un plan o comprarlo');
    var a = APPS[st.app];
    var chips = [{ t: '🛒 Quiero comprar un plan', a: 'planes' }, { t: '🧾 Ya pagué y no tengo mi plan', a: 'pagado' }];
    if (!a.sinCodigo) chips.push({ t: '❌ Mi código no funciona', a: 'codigo_malo' });
    chips.push(CH.asesor);
    return r('Claro que sí, te ayudo con tu plan de *' + a.nombre + '* 👑. ¿Qué pasó?', chips);
  }

  function pagado() {
    var a = st.app ? APPS[st.app] : null;
    nota('Dice que ya realizó el pago');
    return r('¡Gracias por tu pago! 🙌\n\nPara activarlo rápido, toca *Continuar en WhatsApp* y envía:\n1. La *foto del comprobante*.\n2. El *correo* de tu cuenta' +
      (a ? ' de ' + a.nombre : '') + '.\n\n' + (a ? a.activar : 'Apenas lo confirmemos activamos tu plan.'), [CH.wa, CH.otra]);
  }

  function codigoMalo() {
    nota('El código de activación no le funciona');
    st.modo = 'confirmar'; st.problema = { id: 'codigo', titulo: 'Código de activación no funciona' }; st.alternativa = true;
    return r('Revisemos tu código 🔑:\n\n1. Escríbelo *completo* y *sin espacios*.\n2. Verifica que estás en la *misma cuenta* (correo) con la que pagaste.\n' +
      '3. Cada código se usa *una sola vez*: si ya lo activaste, cierra y abre la app y revisa tu plan.\n4. Ten internet al activarlo.\n\n¿Pudiste activarlo?',
      [{ t: '✅ Sí, ya quedó', a: 'si' }, { t: '❌ No, sigue igual', a: 'no' }]);
  }

  function soporte(prefijo) {
    if (!st.app) return pedirApp('soporte', '¿Con cuál app necesitas ayuda?');
    st.modo = 'soporte'; st.fallos = 0;
    var a = APPS[st.app];
    var propios = PROBLEMAS.filter(function (p) { return p.apps.indexOf('*') === -1 && aplica(p, st.app); });
    var generales = PROBLEMAS.filter(function (p) { return p.apps.indexOf('*') !== -1; });
    var lista = propios.concat(generales).slice(0, 8);
    return r((prefijo || 'Claro que sí, estamos para ayudarte con *' + a.nombre + '* 🛠️.') + '\n\nCuéntame qué está pasando, o elige una opción:',
      lista.map(function (p) { return { t: p.titulo, a: 'prob:' + p.id }; }).concat([CH.asesor]));
  }

  function textoRespuesta(p, campo) {
    var a = APPS[st.app] || { nombre: 'la app', planes: [] };
    var t = String(p[campo] || '')
      .replace(/\{app\}/g, a.nombre)
      .replace(/\{empresa\}/g, EMPRESA)
      .replace(/\{consejo_ingreso\}/g, a.login ? '\n\n💡 ' + a.login : '')
      .replace(/\{consejo_datos\}/g, a.gratisLocal ? '\n\n💡 ' + a.gratisLocal : '')
      .replace(/\{planes\}/g, a.planes && a.planes.length ? textoPlanes(a, true) : '');
    if (campo === 'respuesta' && p.porApp && p.porApp[st.app]) t += '\n\n' + p.porApp[st.app];
    return t;
  }

  function resolver(p) {
    var a = APPS[st.app];
    st.problema = p; st.alternativa = false; st.modo = 'confirmar';
    nota('Problema: ' + p.titulo.replace(/^\S+\s/, ''));
    var texto = textoRespuesta(p, 'respuesta');
    if (p.mostrarPlanes) {
      st.modo = null;
      return r(texto, a.planes.filter(function (x) { return x.p; }).map(function (x) { return { t: 'Quiero ' + x.n, a: 'plan:' + x.id }; }).concat([CH.otra]));
    }
    if (p.preguntar === false) { st.modo = null; return r(texto, [CH.otra, CH.asesor]); }
    return r(texto + '\n\n¿Pudiste solucionarlo?', [{ t: '✅ Sí, gracias', a: 'si' }, { t: '❌ No, sigue igual', a: 'no' }]);
  }

  function aAsesor(motivo) {
    st.modo = null;
    if (motivo) nota(motivo);
    return r(String(GENERAL.mensajeAsesor || GENERAL_DEF.mensajeAsesor).replace(/\{empresa\}/g, EMPRESA),
      [CH.wa, CH.menu]);
  }

  function infoApp(k) {
    st.app = k; var a = APPS[k];
    nota('Pidió información de ' + a.nombre);
    return r(a.icono + ' *' + a.nombre + '*\n\n' + a.desc + '\n\nPuedes *probarla gratis* y activar un plan cuando quieras más funciones.',
      [{ t: '🚀 Probar gratis', a: 'abrir:' + a.url }, CH.planes, { t: '💬 Tengo más preguntas', a: 'wa', wa: true }, CH.menu]);
  }

  function aLaMedida() {
    st.modo = 'detalles';
    nota('Quiere una app o página personalizada');
    return r('¡Claro! ✨ Creamos apps y páginas *a la medida*, con tu marca y lo que tu negocio necesita, y nosotros las mantenemos. (Ejemplo: *El Arte en Tus Manos*, academia de manualidades).\n\n' +
      'Para cotizarte, escríbeme aquí:\n1. ¿Qué tipo de negocio tienes?\n2. ¿Qué necesitas controlar o mostrar?\n3. ¿App, página web o ambas?\n\nLo que me cuentes va incluido en tu mensaje de WhatsApp 👇',
      [CH.wa, CH.menu]);
  }

  function pacientes() {
    st.modo = 'detalles';
    nota('Le interesa la app de control de pacientes y citas');
    return r('🩺 La *app de control de pacientes y citas* está en desarrollo (odontología, fisioterapia, estética y más: datos del paciente, agenda y recordatorios).\n\n' +
      'Cuéntame aquí tu *tipo de negocio* y te avisamos apenas salga. Luego toca *Continuar en WhatsApp* 👇', [CH.wa, { t: '📱 Ver las apps disponibles', a: 'apps' }]);
  }

  function despedida() {
    st.modo = null;
    return r(String(GENERAL.mensajeDespedida || GENERAL_DEF.mensajeDespedida).replace(/\{empresa\}/g, EMPRESA), [CH.menu]);
  }

  // ----- primer mensaje (lo que traía el botón) -----
  function interpretarPrimero(texto) {
    var t = norm(texto);
    var app = detectarApp(t.replace(/vengo de la pagina web/, ''));
    if (app) st.app = app;
    var cab = saludo() + ' 👋, gracias por escribir a *' + EMPRESA + '*.';
    var resp = interpretar(t, true);
    resp.texto = cab + ' ' + resp.texto;
    return resp;
  }

  function interpretar(t, primero) {
    var planId = detectarPlan(t);
    var anual = /anual|14 meses/.test(t);

    if (/(ya )?(realice|hice|pague|envie|transferi|consigne) (mi |el )?pago|ya pague|comprobante/.test(t)) return pagado();
    if (/problemas? para acceder a un plan|problema con (el|mi) plan|codigo no (sirve|funciona)|no me (llego|ha llegado) el codigo/.test(t)) return problemaPlan();
    if (/codigo/.test(t) && /(no (sirve|funciona|deja|acepta)|invalido|incorrecto)/.test(t)) { if (!st.app) return pedirApp('codigo_malo'); return codigoMalo(); }
    if (/(quiero|deseo|me interesa|necesito|como (compro|pago|activo))( comprar| el| activar el| pagar el| adquirir| un| una)* (plan|codigo|membresia|suscripcion)|comprar|precio|precios|cuanto (cuesta|vale)|planes|cotizar|pagar el plan/.test(t)
      && !/app personalizada|a la medida/.test(t)) {
      return verPlanes(planId, anual);
    }
    if (/app personalizada|a la medida|pagina web para|mi propia app|una app para mi negocio/.test(t)) return aLaMedida();
    if (/pacientes|citas|odontolog|fisioterap|estetica/.test(t)) return pacientes();
    if (/(^|\s)(asesor|humano|una persona|hablar con alguien|agente)(\s|$)/.test(t)) return aAsesor('Pidió hablar con un asesor');

    var premium = /soy (usuaria|usuario|cliente) (del )?(plan )?premium/.test(t);
    if (premium) { st.premium = true; nota('Cliente Premium (soporte prioritario)'); }

    var p = detectarProblema(t, st.app);
    if (p && st.app) return resolver(p);
    if (p && !st.app) { st.pendiente = p.id; return pedirApp('problema_pendiente', 'Te ayudo con eso. ¿En cuál de nuestras apps te pasa?'); }

    if (premium) return soporte('Como cliente *Premium* tienes *soporte prioritario* 👑. Te ayudo al instante y, si no se resuelve, tu caso pasa primero a un asesor.');
    if (/informacion|info|me interesa|quiero saber|conocer/.test(t) && st.app) return infoApp(st.app);
    if (/ayuda|asistencia|soporte|problema|no puedo|necesito/.test(t)) return soporte();
    if (primero && st.origen === 'web' && !st.app) return menuPrincipal('');
    return null;
  }

  // ----- cada mensaje escrito por el cliente -----
  function procesarTexto(texto) {
    var t = norm(texto);
    if (!t) return null;

    if (st.modo === 'detalles') {
      nota('Detalles: ' + texto.slice(0, 300));
      return r('¡Anotado! ✍️ Si quieres agregar algo más, escríbelo. Cuando termines toca *Continuar en WhatsApp* y te respondemos con la propuesta.', [CH.wa]);
    }
    if (st.modo === 'confirmar') {
      var otroP = detectarProblema(t, st.app);
      if (otroP && otroP !== st.problema && puntos(t, otroP.claves) >= 3) return resolver(otroP);
      if (/^(si+|sip|claro|listo|ok|ya|perfecto|gracias|excelente|genial|funciono|ya funciono|ya quedo|ya pude|quedo)(\s|$)/.test(t)) return accion('si');
      if (/(^|\s)(no|nop|todavia|aun|sigue|tampoco|nada)(\s|$)/.test(t)) return accion('no');
    }
    if (st.modo === 'elegir_app') {
      var k = /^\d$/.test(t) ? ORDEN_APPS[Number(t) - 1] : detectarApp(t);
      if (k) return accion('app:' + k);
    }
    if (/^(menu|inicio|empezar)$/.test(t)) return menuPrincipal('');
    if (/^(gracias|chao|adios|no gracias|eso es todo|bendiciones)/.test(t)) return despedida();

    var otra = detectarApp(t); if (otra && otra !== st.app && puntos(t, APPS[otra].claves) >= 2) st.app = otra;
    var resp = interpretar(t, false);
    if (resp) return resp;

    st.fallos++;
    nota('Escribió: "' + texto.slice(0, 200) + '"');
    reportarPendiente(texto);
    if (st.fallos >= 2) return aAsesor('El asistente no entendió el caso');
    return st.app ? soporte('Quiero ayudarte bien 🙏 pero no logré entenderlo. ¿Es alguna de estas opciones?')
      : menuPrincipal('Quiero ayudarte bien 🙏 pero no logré entenderlo.');
  }

  // ----- botones (chips) -----
  function accion(a) {
    if (a === 'menu') { st.modo = null; return menuPrincipal(''); }
    if (a === 'planes') return verPlanes(null);
    if (a === 'planes_todos') return verPlanes(null);
    if (a === 'soporte') return soporte();
    if (a === 'activar') return comoActivar();
    if (a === 'problema_plan') return problemaPlan();
    if (a === 'pagado') return pagado();
    if (a === 'codigo_malo') return codigoMalo();
    if (a === 'asesor') return aAsesor('Pidió hablar con un asesor');
    if (a === 'medida') return aLaMedida();
    if (a === 'apps') return r('Estas son nuestras apps 📱. Todas se pueden *probar gratis*:',
      ORDEN_APPS.map(function (k) { return { t: APPS[k].icono + ' ' + APPS[k].nombre, a: 'info:' + k }; }).concat([{ t: '🩺 Control de pacientes (pronto)', a: 'pacientes' }]));
    if (a === 'pacientes') return pacientes();
    if (a.indexOf('info:') === 0) return infoApp(a.slice(5));
    if (a.indexOf('plan:') === 0) return verPlanes(a.slice(5));
    if (a.indexOf('prob:') === 0) return resolver(problemaPorId(a.slice(5)));
    if (a.indexOf('app:') === 0) {
      st.app = a.slice(4); var sig = st.siguiente; st.siguiente = null; st.modo = null;
      if (sig === 'planes') return verPlanes(null);
      if (sig === 'activar') return comoActivar();
      if (sig === 'problema_plan') return problemaPlan();
      if (sig === 'codigo_malo') return codigoMalo();
      if (sig === 'problema_pendiente' && st.pendiente) { var pp = problemaPorId(st.pendiente); st.pendiente = null; if (aplica(pp, st.app)) return resolver(pp); }
      return soporte();
    }
    if (a === 'si') {
      st.modo = null;
      nota('Se solucionó con el asistente ✅');
      return r('¡Excelente! 🎉 Nos alegra que se haya solucionado. ¿Hay algo más en lo que te pueda ayudar?', [{ t: '🙋 Sí, otra pregunta', a: 'menu' }, { t: '👋 No, gracias', a: 'fin' }]);
    }
    if (a === 'no') {
      var p = st.problema;
      if (p && p.alt && !st.alternativa) {
        st.alternativa = true;
        return r(textoRespuesta(p, 'alt') + '\n\n¿Ahora sí pudiste?', [{ t: '✅ Sí, ya quedó', a: 'si' }, { t: '❌ No, sigue igual', a: 'no' }]);
      }
      return aAsesor('No se solucionó con los pasos del asistente');
    }
    if (a === 'fin') return despedida();
    return menuPrincipal('');
  }

  /* =====================================================================
   * INTERFAZ (Shadow DOM: no choca con los estilos de cada app)
   * ===================================================================== */
  var host, raiz, ui = {}, abierto = false, ocupado = false;
  var abrirOriginal = window.open.bind(window);

  var CSS = '' +
    ':host{all:initial}' +
    '*{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}' +
    '.fondo{position:fixed;inset:0;background:rgba(3,8,20,.55);backdrop-filter:blur(2px);opacity:0;transition:opacity .2s;z-index:1}' +
    '.panel{position:fixed;left:0;right:0;bottom:0;height:min(88dvh,720px);background:#0b1220;color:#e8eefc;border-radius:22px 22px 0 0;' +
    'border:1px solid rgba(212,175,55,.45);border-bottom:0;box-shadow:0 -10px 40px rgba(0,0,0,.45);display:flex;flex-direction:column;overflow:hidden;' +
    'transform:translateY(105%);transition:transform .28s cubic-bezier(.2,.8,.2,1);z-index:2}' +
    '@media(min-width:720px){.panel{left:auto;right:24px;bottom:24px;width:400px;height:min(80vh,680px);border-radius:22px;border-bottom:1px solid rgba(212,175,55,.45)}}' +
    '.on .fondo{opacity:1}.on .panel{transform:none}' +
    '.cab{display:flex;align-items:center;gap:11px;padding:14px 14px 12px;background:linear-gradient(135deg,#0f1b33,#101a2e 60%,#1a1630);border-bottom:1px solid rgba(212,175,55,.25)}' +
    '.av{width:40px;height:40px;border-radius:50%;flex:none;display:grid;place-items:center;font-weight:800;font-size:14px;color:#fff;letter-spacing:.5px;' +
    'background:linear-gradient(135deg,#00d4ff,#2563eb);box-shadow:0 0 0 2px rgba(212,175,55,.6)}' +
    '.tit{flex:1;min-width:0}.tit b{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.tit span{font-size:12px;color:#8fd6a8;display:flex;align-items:center;gap:5px}.tit span:before{content:"";width:7px;height:7px;border-radius:50%;background:#22c55e}' +
    '.ib{width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.08);color:#fff;font-size:18px;cursor:pointer;display:grid;place-items:center;flex:none}' +
    '.ib.wa{background:#25d366}.ib svg{width:20px;height:20px}' +
    '.msgs{position:relative;flex:1;overflow-y:auto;padding:14px 12px 6px;display:flex;flex-direction:column;gap:6px;overscroll-behavior:contain}' +
    '.m{max-width:86%;padding:9px 11px;border-radius:14px;font-size:14.5px;line-height:1.42;white-space:pre-wrap;word-wrap:break-word;animation:e .18s ease-out}' +
    '.m.bot{align-self:flex-start;background:#16213a;border:1px solid rgba(255,255,255,.06);border-top-left-radius:4px}' +
    '.m.yo{align-self:flex-end;background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#fff;border-top-right-radius:4px}' +
    '.m b{color:#ffd875}.m.yo b{color:#fff}' +
    '.esc{align-self:flex-start;background:#16213a;border-radius:14px;padding:11px 14px;display:flex;gap:4px}' +
    '.esc i{width:7px;height:7px;border-radius:50%;background:#7d8bb0;animation:p 1s infinite}.esc i:nth-child(2){animation-delay:.15s}.esc i:nth-child(3){animation-delay:.3s}' +
    '@keyframes p{0%,60%,100%{opacity:.3}30%{opacity:1}}@keyframes e{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}' +
    '.chips{display:flex;flex-wrap:wrap;gap:7px;padding:6px 12px 8px;max-height:38%;overflow-y:auto}' +
    '.chips button{background:rgba(255,255,255,.06);color:#e8eefc;border:1px solid rgba(212,175,55,.45);border-radius:18px;padding:8px 12px;font-size:13.5px;cursor:pointer;text-align:left;line-height:1.25}' +
    '.chips button:active{transform:scale(.97)}' +
    '.chips button.w{background:#25d366;border-color:#25d366;color:#04210f;font-weight:700}' +
    'form{display:flex;gap:8px;padding:8px 10px calc(10px + env(safe-area-inset-bottom));border-top:1px solid rgba(255,255,255,.07);background:#0d1526}' +
    'input{flex:1;min-width:0;border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:11px 15px;font-size:16px;background:#111b30;color:#e8eefc;outline:none}' +
    'input:focus{border-color:rgba(212,175,55,.7)}' +
    'form button{width:44px;height:44px;border-radius:50%;border:0;background:linear-gradient(135deg,#d4af37,#f5d77a);color:#1a1405;font-size:18px;cursor:pointer;flex:none}' +
    '.pie{text-align:center;font-size:10.5px;color:#6b7aa0;padding:0 0 2px}';

  var ICONO_WA = '<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>';

  function construir() {
    if (host) return;
    host = document.createElement('div');
    host.id = 'dl-chat';
    host.style.cssText = 'position:fixed;inset:0;z-index:2147483000;pointer-events:none';
    raiz = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    raiz.innerHTML = '<style>' + CSS + '</style>' +
      '<div class="cont"><div class="fondo"></div><div class="panel" role="dialog" aria-label="Asistente DL COMPANY">' +
      '<div class="cab"><div class="av">DL</div><div class="tit"><b>Asistente DL COMPANY</b><span>Responde al instante</span></div>' +
      '<button class="ib wa" type="button" title="Abrir WhatsApp" aria-label="Abrir WhatsApp">' + ICONO_WA + '</button>' +
      '<button class="ib x" type="button" aria-label="Cerrar">✕</button></div>' +
      '<div class="msgs"></div><div class="chips"></div>' +
      '<form><input placeholder="Escribe tu mensaje…" autocomplete="off" aria-label="Mensaje"><button aria-label="Enviar">➤</button></form>' +
      '<div class="pie">Asistente automático · ' + EMPRESA + '</div></div></div>';
    document.body.appendChild(host);
    ui.cont = raiz.querySelector('.cont');
    ui.msgs = raiz.querySelector('.msgs');
    ui.chips = raiz.querySelector('.chips');
    ui.input = raiz.querySelector('input');
    raiz.querySelector('.fondo').onclick = cerrar;
    raiz.querySelector('.x').onclick = cerrar;
    raiz.querySelector('.wa').onclick = irAWhatsApp;
    raiz.querySelector('form').onsubmit = function (e) {
      e.preventDefault();
      var v = ui.input.value.trim(); if (!v || ocupado) return;
      ui.input.value = '';
      enviarUsuario(v, function () { return procesarTexto(v); });
    };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && abierto) cerrar(); });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function formato(s) { return esc(s).replace(/\*([^*\n]+)\*/g, '<b>$1</b>'); }
  function bajar() { ui.msgs.scrollTop = ui.msgs.scrollHeight; }
  function burbuja(texto, quien) {
    var d = document.createElement('div'); d.className = 'm ' + quien; d.innerHTML = formato(texto);
    ui.msgs.appendChild(d); bajar();
    // Respuesta larga: mostrarla desde el inicio
    if (quien === 'bot' && d.offsetHeight > ui.msgs.clientHeight - 20) ui.msgs.scrollTop = d.offsetTop - 10;
  }
  function pintarChips(chips) {
    ui.chips.innerHTML = '';
    (chips || []).forEach(function (c) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = c.t;
      if (c.wa) b.className = 'w';
      b.onclick = function () {
        if (ocupado) return;
        if (c.a === 'wa') return irAWhatsApp();
        if (c.a.indexOf('abrir:') === 0) { abrirOriginal(c.a.slice(6), '_blank', 'noopener'); return; }
        enviarUsuario(c.t, function () { return accion(c.a); });
      };
      ui.chips.appendChild(b);
    });
  }

  function responder(resp) {
    ocupado = true; pintarChips([]);
    var e = document.createElement('div'); e.className = 'esc'; e.innerHTML = '<i></i><i></i><i></i>';
    ui.msgs.appendChild(e); bajar();
    setTimeout(function () {
      e.remove();
      burbuja(resp.texto, 'bot');
      pintarChips(resp.chips);
      ocupado = false;
    }, Math.min(1300, 400 + resp.texto.length * 2.5));
  }
  function enviarUsuario(texto, calcular) {
    burbuja(texto, 'yo');
    var resp = calcular();
    if (resp) responder(resp);
  }

  function irAWhatsApp() {
    var url = 'https://wa.me/' + WA_NUMERO + '?text=' + encodeURIComponent(mensajeWhatsApp());
    // Sin 'noopener' para saber si se abrió (con noopener window.open siempre devuelve null)
    var w = abrirOriginal(url, '_blank');
    if (w) { try { w.opener = null; } catch (e) {} } else location.href = url;
  }

  function abrir(textoOriginal, urlOriginal) {
    construir();
    var nuevo = !st || textoOriginal !== undefined;
    if (nuevo) {
      nuevaConversacion(textoOriginal, urlOriginal);
      ui.msgs.innerHTML = '';
    }
    host.style.pointerEvents = 'auto';
    abierto = true;
    requestAnimationFrame(function () { ui.cont.classList.add('on'); });
    if (!nuevo) return;
    if (textoOriginal) {
      burbuja(textoOriginal.replace(/^¡?hola dl company!?\s*👋?\s*/i, ''), 'yo');
      var resp = interpretarPrimero(textoOriginal) ;
      responder(resp);
    } else {
      responder(r(saludo() + ' 👋, soy el asistente de *' + EMPRESA + '*. ' + menuPrincipal('').texto, menuPrincipal('').chips));
    }
  }
  function cerrar() {
    if (!host) return;
    abierto = false;
    ui.cont.classList.remove('on');
    setTimeout(function () { if (!abierto) host.style.pointerEvents = 'none'; }, 280);
  }

  /* =====================================================================
   * INTERCEPTAR LOS BOTONES DE WHATSAPP DE LA EMPRESA
   * ===================================================================== */
  function datosWhatsApp(url) {
    try {
      var u = new URL(String(url), location.href);
      var host2 = u.hostname.replace(/^www\./, '');
      var num = '';
      if (host2 === 'wa.me') num = u.pathname.replace(/\D/g, '');
      else if (host2 === 'api.whatsapp.com' || host2 === 'web.whatsapp.com') num = (u.searchParams.get('phone') || '').replace(/\D/g, '');
      else return null;
      if (num !== NUMERO_BOTONES && num !== WA_NUMERO) return null; // solo el número de la empresa (no clientes ni proveedores)
      return { texto: u.searchParams.get('text') || '', url: u.href };
    } catch (e) { return null; }
  }
  // Mensajes que son formularios con datos: van directo a WhatsApp
  function pasaDirecto(texto) { return /•|sugerir este video/i.test(texto); }

  window.open = function (url) {
    var d = GENERAL.activo !== false && url && datosWhatsApp(url);
    if (d && !pasaDirecto(d.texto)) {
      abrir(d.texto, d.url);
      return { closed: false, close: function () {}, focus: function () {}, blur: function () {}, postMessage: function () {} };
    }
    return abrirOriginal.apply(window, arguments);
  };
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    if (GENERAL.activo === false) return;
    var d = datosWhatsApp(a.getAttribute('href'));
    if (!d || pasaDirecto(d.texto)) return;
    e.preventDefault(); e.stopPropagation();
    abrir(d.texto, d.url);
  }, true);

  window.DLChat = {
    abrir: function (texto) { abrir(texto || undefined); },
    // Para la app de administración: probar cambios sin guardarlos
    usarConfig: function (c) { configFija = true; aplicarConfig(c); st = null; },
    defecto: function () { return copiar(DEFECTO); },
    config: function () { return copiar(CFG); },
    cerrar: cerrar,
    version: '2.0.0',
    // Para pruebas: simula una conversación sin interfaz
    _probar: function (texto, app) {
      var prev = APP_ACTUAL; APP_ACTUAL = app || APP_ACTUAL;
      nuevaConversacion(texto); var out = interpretarPrimero(texto); APP_ACTUAL = prev; return out;
    },
    _texto: function (t) { return procesarTexto(t); },
    _accion: function (a) { return accion(a); },
    _whatsapp: function () { return mensajeWhatsApp(); },
  };
})();
