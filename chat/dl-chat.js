/*!
 * DL CHAT — Asistente automático de DL COMPANY -TECHNOLOGY-
 * ----------------------------------------------------------
 * Cuando un cliente toca un botón de WhatsApp (al 321 864 1539) en la página web
 * o en una app, se abre este mini chat y responde al instante según lo que pidió.
 * Si necesita a una persona, el asesor le responde AQUÍ MISMO desde la administración
 * (sección Chats), sin salir a WhatsApp.
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
  var ARIA_LOGO = WEB + 'chat/aria.png';
  var script = document.currentScript;
  var APP_ACTUAL = String(window.DL_CHAT_APP || (script && script.getAttribute('data-app')) || '').toLowerCase();

  /* =====================================================================
   * CONOCIMIENTO  (planes y precios tomados de la página web)
   * ===================================================================== */
  var PAGO_DEFECTO = 'Paga por *Nequi* al *3218641539* o por *Bre-B* a la llave *@NEQUILEN197*, y envíanos aquí la foto del *comprobante* con el botón 📎.';
  var ACTIVAR_CODIGO_CUADRA = 'Te enviamos tu *código de activación*. Lo escribes en *Planes → 🔑 ¿Ya pagaste? Activa tu código* y listo, sin perder tus datos.';

  var APPS_DEF = {
    finanzas: {
      nombre: 'DL FINANZAS', icono: '💰', url: WEB + 'dl-finanzas/',
      claves: ['dl finanzas', 'finanzas', 'gastos', 'presupuesto'],
      desc: 'Controla los ingresos, gastos y presupuesto de tu hogar: balance del mes, gastos por categoría, semáforo de presupuesto y tendencia de 6 meses.',
      planes: [
        { id: 'gratis', n: 'Gratis', p: 0, inc: '15 movimientos al mes · datos en tu celular' },
        { id: 'pro', n: 'Pro', p: 10000, antes: 20000, inc: 'Hasta 50 movimientos al mes · nube y sincronización · Excel y respaldos' },
        { id: 'premium', n: 'Premium 👑', p: 20000, antes: 40000, inc: 'Movimientos ilimitados · toda la app · soporte prioritario con ARIA' },
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
        { id: 'premium', n: 'Premium 👑', p: 20000, antes: 40000, inc: 'Todos los cursos (incluidos los NUEVOS) · fichas de materiales · soporte prioritario con ARIA' },
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
      claves: ['crear mi cuenta', 'crear una cuenta', 'crear cuenta', 'registrarme', 'registrarse', 'abrir cuenta', 'registrarme en la app'],
      respuesta: 'Crear tu cuenta es gratis 🙌:\n\n1. Abre {app} y en la pantalla de ingreso toca *Crear cuenta*.\n' +
        '2. Escribe tu correo y una contraseña (mínimo 6 caracteres).\n3. Acepta los términos y listo: ya puedes usar el plan Gratis.',
      porApp: { cuadra: 'Si prefieres, usa *Déjanos tus datos* (tu nombre, negocio, celular y correo) y nosotros te creamos la cuenta.' },
    },
    {
      id: 'no_carga', titulo: '⏳ La app no abre, se cierra o se queda cargando', apps: ['*'],
      claves: ['no abre', 'no me abre', 'no carga', 'no me carga', 'se cierra sola', 'app se cierra', 'app se me cierra', 'se cierra de repente', 'se sale sola', 'se queda cargando', 'se queda pegada', 'pantalla blanca',
        'pantalla en blanco', 'se congela', 'se traba', 'lenta', 'no funciona', 'no sirve', 'error', 'falla', 'se bloquea'],
      respuesta: 'Vamos a solucionarlo 🛠️. Hazlo en orden:\n\n1. Revisa que tengas *internet*.\n2. Cierra {app} por completo y vuelve a abrirla.\n' +
        '3. Si la usas en el navegador, *recarga la página*.\n4. Si la instalaste en el celular, ábrela una vez desde el navegador para que se actualice a la última versión.',
      alt: 'Prueba también *reiniciar el celular* o computador y abrir la app de nuevo. Si tu plan tiene nube, tus datos están guardados y no se pierden 👍',
    },
    {
      id: 'datos', titulo: '🗂️ No aparecen mis datos o no se sincronizan', apps: ['*'],
      claves: ['no aparecen', 'no aparece', 'no me aparece', 'se borraron', 'se borro', 'perdi', 'desaparecio', 'desaparecieron', 'no se guardo',
        'no guarda', 'no sincroniza', 'no se sincroniza', 'no se actualiza', 'mis datos', 'perdi la informacion'],
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

    // ================= GENERALES =================
    {
      id: 'ver_guia', tipo: 'guia', titulo: '🧭 Ver la guía de la app paso a paso', apps: ['*'],
      claves: ['guia', 'tutorial', 'como se usa la app', 'como funciona la app', 'ensename a usar', 'no se usar', 'no entiendo la app', 'como empiezo', 'primeros pasos', 'paso a paso'],
      respuesta: '{app} trae una *guía paso a paso* que te muestra para qué sirve cada botón 🧭. Así la vuelves a ver:',
      porApp: {
        stock: 'Toca *Más → 🧭 Guía*.',
        cuadra: 'Toca el menú de los *3 puntos ⋮ → Guía*.',
        comanda: 'Toca el botón *?* (arriba en la app o en la pantalla de ingreso).',
        finanzas: 'Abre el menú *☰ → Ver guía de la app*.',
        arte: 'Toca *❓ Ayuda*.',
      },
      preguntar: false,
    },
    {
      id: 'planes_diferencia', tipo: 'guia', titulo: '🤔 ¿Qué plan me conviene?', apps: ['*'],
      claves: ['que plan', 'cual plan', 'diferencia entre planes', 'diferencia de planes', 'que incluye', 'me conviene', 'me recomiendas', 'que trae el plan'],
      respuesta: 'Estos son los planes de {app} 👑:\n\n{planes_detalle}\n\n💡 Si estás empezando, usa el *Gratis*. Cuando necesites más, subes de plan *sin perder tus datos*.',
      mostrarPlanes: true, preguntar: false,
    },
    {
      id: 'renovar', titulo: '🔄 ¿Mi plan se renueva solo? / Cancelar plan', apps: ['*'],
      claves: ['cancelar plan', 'cancelar', 'cancelar suscripcion', 'se renueva', 'renovacion', 'cobro automatico', 'debito automatico', 'vencio mi plan', 'se vencio', 'cuando vence', 'renovar'],
      respuesta: 'Tranquilo: *no hay cobros automáticos* 🙌. Pagas el plan por el tiempo que elijas y, cuando se vence, pagas de nuevo solo si quieres seguir. No tienes que cancelar nada.\n\nPara renovarlo, es igual que comprarlo:\n\n{planes}',
      mostrarPlanes: true, preguntar: false,
    },
    {
      id: 'reembolso', titulo: '💸 Reembolsos o cobro duplicado', apps: ['*'],
      claves: ['reembolso', 'devolucion', 'devolver mi dinero', 'devuelvan', 'me arrepenti', 'cobro doble', 'me cobraron dos veces', 'cobro duplicado', 'cobraron de mas'],
      respuesta: 'Las condiciones completas están en la *Política de reembolsos* de la app. Si te hicimos un *cobro duplicado o por un valor incorrecto*, envíanos aquí el comprobante con el botón 📎 y toca *Hablar con un asesor*: lo revisamos y te lo solucionamos.',
      porApp: { arte: 'En *EL ARTE EN TUS MANOS*: si pagaste pero *aún no has canjeado tu código*, puedes pedir el reembolso dentro de los *5 días* siguientes a la compra. Si el código ya se canjeó, no aplica reembolso. Respondemos en máximo 15 días hábiles.' },
      whatsapp: true, preguntar: false,
    },
    {
      id: 'computador', tipo: 'guia', titulo: '💻 Usarla en el computador o en otro celular', apps: ['*'],
      claves: ['computador', 'computadora', 'pc', 'portatil', 'laptop', 'otro celular', 'varios celulares', 'tablet', 'dos celulares', 'en el navegador'],
      respuesta: '{app} funciona en cualquier navegador 💻: abre el mismo enlace en el computador o en el otro celular e ingresa con *la misma cuenta*.{consejo_datos}',
      porApp: {
        cuadra: 'Tus cajeros entran desde su propio celular con *🏢 Acceso empresa* (nombre de la empresa, NIT, usuario y PIN).',
        comanda: 'Cada mesero, cocina y caja entra desde su propio celular en *🍽️ Personal*.',
      },
    },
    {
      id: 'sin_internet', tipo: 'guia', titulo: '📶 ¿Funciona sin internet?', apps: ['*'],
      claves: ['sin internet', 'sin senal', 'se cayo el internet', 'se fue el internet', 'offline', 'sin datos', 'no tengo internet'],
      respuesta: 'Te cuento cómo funciona {app} sin internet 📶:',
      porApp: {
        cuadra: '*Sí:* si se cae el internet sigue vendiendo. Las ventas se guardan en el celular y se envían solas cuando vuelve la conexión (desde el plan *Pro*).',
        stock: 'En los planes *Gratis* y *Pro* el inventario se guarda en tu celular, así que funciona sin internet. En *Premium* necesitas internet para sincronizar entre celulares.',
        comanda: 'Necesita internet: los pedidos viajan *en vivo* entre meseros, cocina y caja.',
        finanzas: 'En el plan *Gratis* tus datos están en el celular. Con nube (*Pro* o *Premium*) necesitas internet para sincronizar.',
        arte: 'Los videos de los cursos necesitan internet.',
      },
      preguntar: false,
    },
    {
      id: 'tema', tipo: 'guia', titulo: '🌗 Cambiar a modo claro u oscuro', apps: ['*'],
      claves: ['modo oscuro', 'modo claro', 'modo dia', 'modo noche', 'tema', 'cambiar colores', 'se ve muy oscuro', 'se ve muy claro'],
      respuesta: 'Busca el botón de *tema* 🌗 (sol / luna, o *Tema*) arriba en la app o en el menú, y cambia entre el *modo oscuro* y el *modo día*.',
      preguntar: false,
    },
    {
      id: 'eliminar_cuenta', titulo: '🗑️ Eliminar mi cuenta', apps: ['*'],
      claves: ['eliminar mi cuenta', 'borrar mi cuenta', 'eliminar la cuenta', 'borrar la cuenta', 'darme de baja', 'cerrar mi cuenta'],
      respuesta: 'Eliminar la cuenta *borra todos tus datos y no se puede deshacer* ⚠️. Por seguridad lo hacemos nosotros: toca *Hablar con un asesor* y escríbenos el correo de la cuenta.',
      porApp: { finanzas: 'En *DL FINANZAS* lo puedes hacer tú: menú *☰ → Eliminar mi cuenta*.' },
      whatsapp: true, preguntar: false,
    },
    {
      id: 'moneda', tipo: 'guia', titulo: '💱 Cambiar la moneda', apps: ['finanzas', 'stock'],
      claves: ['moneda', 'dolares', 'dolar', 'usd', 'euros', 'pesos', 'cop'],
      respuesta: 'Toca el botón de *moneda* (💱 o 🇨🇴 COP) y elige la que necesitas. Los valores se muestran en esa moneda.',
      preguntar: false,
    },

    {
      id: 'metodos_pago', tipo: 'guia', titulo: '💳 Métodos de pago (Colombia)', apps: ['finanzas', 'stock', 'cuadra', 'comanda'],
      claves: ['metodos de pago', 'metodo de pago', 'medios de pago', 'como pago', 'como puedo pagar', 'como hago el pago', 'donde pago', 'a donde pago',
        'numero de nequi', 'nequi', 'pagar por nequi', 'pagar con nequi', 'bre b', 'llave', 'llave bre b', 'datos para pagar', 'datos de pago',
        'consignar', 'consignacion', 'transferir', 'transferencia', 'numero para pagar', 'cuenta para pagar', 'a que cuenta'],
      respuesta: '💳 *Métodos de pago en Colombia*\n\n📱 *Nequi:* 3218641539\n🔑 *Bre-B (llave):* @NEQUILEN197\n\n*Después de pagar:*\n' +
        '1. Toma una captura del *comprobante*.\n2. Envíala aquí con el botón 📎 y escribe el *correo de tu cuenta* y el plan que pagaste.\n3. {activar}',
      whatsapp: true, preguntar: false,
    },

    // ================= DL STOCK PRO =================
    {
      id: 'stock_agregar', tipo: 'guia', titulo: '➕ Agregar mis productos', apps: ['stock'],
      claves: ['agregar producto', 'agregar productos', 'crear producto', 'registrar producto', 'nuevo producto', 'subir productos', 'como agrego', 'foto de la etiqueta'],
      respuesta: 'Hay *4 formas* de agregar productos ➕:\n\n1. *Foto de la etiqueta:* la app lee el código, el nombre y los precios.\n2. *Foto de la galería.*\n3. *Escanear el código* de barras.\n4. *Registro manual.*\n\n💡 Si tienes muchos, súbelos de una vez desde *Excel* (*Importar productos*).',
    },
    {
      id: 'stock_sumar', tipo: 'guia', titulo: '🔢 Sumar o restar unidades', apps: ['stock'],
      claves: ['sumar', 'restar', 'entrada', 'salida', 'descontar', 'llego mercancia', 'unidades', 'por cajas', 'sixpack', 'actualizar cantidad', 'cambiar cantidad'],
      respuesta: 'En tu lista de productos usa *+ y −* para sumar o restar unidades con un toque (si te equivocas, toca *Deshacer*) 🔢.\n\nToca el producto para ajustar por *cajas o sixpack (R1)*, registrar una *Entrada* o *Salida*, o editarlo.',
    },
    {
      id: 'stock_pedido', tipo: 'guia', titulo: '🚚 Hacer el pedido al proveedor', apps: ['stock', 'cuadra'],
      claves: ['pedido', 'proveedor', 'proveedores', 'pedir mercancia', 'surtir', 'lo que se acaba'],
      respuesta: 'Arma el *pedido para tu proveedor* con lo que se está acabando 🚚: la app te lo sugiere, ajustas cantidades y lo envías por *WhatsApp*.',
      porApp: {
        stock: 'Toca *Pedido*. Guarda a tus proveedores en *🚚 Mis proveedores* para enviárselo directo.',
        cuadra: 'En *🛒 Pedido al proveedor* eliges si es en canastas, pacas o botellas y para cuándo lo necesitas.',
      },
    },
    {
      id: 'stock_conteo', tipo: 'guia', titulo: '📋 Hacer el conteo físico', apps: ['stock'],
      claves: ['conteo', 'contar', 'inventario fisico', 'faltantes', 'sobrantes', 'cuadrar inventario', 'revisar bodega'],
      respuesta: 'Toca *Conteo → Empezar conteo* 📋 y registra lo que hay físicamente en tu bodega. Al terminar, la app te muestra *sobrantes, faltantes* y la diferencia en dinero; si está bien, toca *Aplicar ajustes al inventario*.\n\nSi te interrumpen, luego tocas *Continuar conteo*.',
    },
    {
      id: 'stock_etiquetas', tipo: 'guia', titulo: '🏷️ Imprimir etiquetas de precio', apps: ['stock'],
      claves: ['etiqueta', 'etiquetas', 'imprimir precios', 'imprimir precio', 'precio en la estanteria', 'habladores'],
      respuesta: 'Toca *Etiquetas → Ver e imprimir etiquetas* 🏷️. Se abre una vista lista para imprimir, con precio, promoción y código de barras.\n\nEn el celular elige *Guardar como PDF* o tu impresora.',
    },
    {
      id: 'stock_excel', tipo: 'guia', titulo: '📊 Importar o descargar en Excel', apps: ['stock'],
      claves: ['excel', 'importar', 'exportar', 'descargar inventario', 'plantilla', 'historial', 'subir excel'],
      respuesta: '📊 *Subir productos:* toca *Importar → Importar productos*. Si no sabes el formato, toca *Descargar plantilla de ejemplo*, llénala y súbela.\n\n*Descargar:* toca *Excel → Descargar Excel* para tu inventario o *Exportar historial* para los movimientos.\n\n(Disponible desde el plan *Pro*.)',
    },
    {
      id: 'stock_copia', tipo: 'guia', titulo: '💾 Copia de seguridad / cambiar de celular', apps: ['stock', 'finanzas'],
      claves: ['copia de seguridad', 'respaldo', 'backup', 'cambiar de celular', 'celular nuevo', 'restaurar', 'pasar mis datos', 'perder mis datos'],
      respuesta: 'Para no perder nada al cambiar de celular 💾:',
      porApp: {
        stock: 'Toca *Copia → Descargar copia (.json)* y guárdala. En el celular nuevo abre la app y restaura esa copia (desde el plan *Pro*).\n\n💡 En *Premium* tu inventario está en la nube: solo ingresa con tu cuenta en el celular nuevo.',
        finanzas: 'Abre el menú *☰ → Descargar respaldo* y guárdalo.\n\n💡 Con *Pro* o *Premium* tus datos están en la nube: solo ingresa con tu cuenta en el celular nuevo.',
      },
    },
    {
      id: 'stock_vencimiento', tipo: 'guia', titulo: '⏰ Alertas de vencimiento', apps: ['stock'],
      claves: ['vencimiento', 'vence', 'vencidos', 'vencido', 'fecha de vencimiento', 'por vencer', 'caducidad'],
      respuesta: 'En *Alertas* ves lo que se vence ⏰:\n\n• *PRÓXIMO:* faltan 30 días o menos.\n• *CRÍTICO:* faltan 15 días o menos.\n• *VENCIDO.*\n\nPara que aparezca, ponle la *fecha de vencimiento* al producto (tócalo → editar).',
    },
    {
      id: 'stock_cajeros', tipo: 'guia', titulo: '👥 Crear cajeros (plan Empresarial)', apps: ['stock'],
      claves: ['cajero', 'cajeros', 'empleado', 'empleados', 'equipo', 'trabajador', 'usuario para', 'lineal'],
      respuesta: 'Con el plan *Empresarial* creas *hasta 5 cajeros* 👥:\n\n1. Toca *👥 Equipo → ＋ Agregar cajero*.\n2. Escribe su usuario y contraseña, y asígnale *su lineal* (sus categorías).\n3. Ellos entran en la pantalla de ingreso con *👥 Entrar como cajero*: código de empresa, usuario y contraseña.\n\nLo que hagan se ve *en tiempo real* en tu celular.',
    },
    {
      id: 'stock_categorias', tipo: 'guia', titulo: '🗂️ Categorías y zonas de bodega', apps: ['stock'],
      claves: ['categoria', 'categorias', 'zona', 'zonas', 'pasillo', 'estante', 'bloque', 'ubicacion'],
      respuesta: 'Toca *Categorías* 🗂️ para crear las categorías de tu negocio y las *zonas de bodega* (pasillo, bloque, estante). Así filtras y encuentras todo más rápido; el buscador también busca por ubicación.',
    },

    // ================= DL CUADRA PRO =================
    {
      id: 'cuadra_vender', tipo: 'guia', titulo: '🛒 Vender y cobrar', apps: ['cuadra'],
      claves: ['vender', 'venta', 'cobrar', 'cobro', 'como cobro', 'carrito', 'como vendo', 'registrar venta', 'efectivo', 'pago con qr'],
      respuesta: 'Vender es muy fácil 🛒:\n\n1. En *Vender*, toca los productos: cada toque suma 1 unidad al carrito (también puedes buscar o escanear).\n2. Abajo aparece el total: toca *Cobrar*.\n3. Elige *efectivo*, *QR* o *📒 Fiado*.\n\nEl inventario se descuenta solo.',
    },
    {
      id: 'cuadra_productos', tipo: 'guia', titulo: '➕ Agregar productos y mercancía', apps: ['cuadra'],
      claves: ['agregar producto', 'agregar productos', 'nuevo producto', 'crear producto', 'llego mercancia', 'entrada de mercancia', 'stock minimo', 'cambiar precio', 'editar producto'],
      respuesta: '➕ *Producto nuevo:* en *Inventario* toca *+ Producto* y escribe el nombre, el precio de venta, la categoría y cuántas unidades tienes.\n\n*Llegó mercancía o cambió el precio:* toca el producto para registrar la entrada, corregir el conteo o editar el precio y el *stock mínimo* (cuándo avisarte que se está acabando).',
    },
    {
      id: 'cuadra_cerrar', tipo: 'guia', titulo: '🔒 Cerrar la caja del día', apps: ['cuadra'],
      claves: ['cerrar caja', 'cierro caja', 'cierre del dia', 'cierre de caja', 'terminar turno', 'termino turno', 'cerrar el dia', 'cuadrar caja'],
      respuesta: 'Al final del día toca *Cierre del día* 🔒: ves lo vendido en efectivo, QR, los gastos y lo que debe haber en caja.\n\nToca *Cerrar caja*, escribe cuánto efectivo contaste y la app te dice *si cuadra*. El dueño recibe el aviso al instante y, si quieres, lo compartes por WhatsApp.',
    },
    {
      id: 'cuadra_cajeros', tipo: 'guia', titulo: '👥 Crear cajeros y su PIN', apps: ['cuadra'],
      claves: ['cajero', 'cajeros', 'pin del cajero', 'empleado', 'empleados', 'crear usuario', 'trabajador', 'acceso empresa'],
      respuesta: '👥 Desde el plan *Pro*:\n\n1. Entra a *Admin → + Cajero* y escribe su nombre.\n2. La app le genera un *PIN de 4 números*: compártelo con él.\n3. Él entra en *🏢 Acceso empresa* con el nombre de la empresa, el NIT, su usuario y su PIN.\n\nTus cajeros *nunca ven tu ganancia ni tus costos*.',
    },
    {
      id: 'cuadra_sedes', tipo: 'guia', titulo: '🏢 Manejar varias sedes', apps: ['cuadra'],
      claves: ['sede', 'sedes', 'otro local', 'sucursal', 'varios locales', 'dos locales'],
      respuesta: 'Con el plan *Empresarial* 🏢 entras a *Admin → + Sede* y agregas cada local. Cada sede tiene *su propio inventario y sus cajeros*; los productos y precios se comparten.\n\nPara ver las ventas, el inventario y el cierre de cada una, cambia de sede desde el menú *⋮*.',
    },
    {
      id: 'cuadra_fiado', tipo: 'guia', titulo: '📒 Fiado y abonos', apps: ['cuadra'],
      claves: ['fiado', 'fiar', 'me debe', 'me deben', 'abono', 'abonos', 'credito', 'deuda', 'cobrar al cliente'],
      respuesta: '📒 Al cobrar, elige *📒 Fiado* y el cliente.\n\nEn *Fiado* (menú *⋮*) ves quién te debe, registras *abonos* y le cobras por *WhatsApp*. Con el plan *Pro* le puedes fiar hasta a 10 clientes, con cupo máximo para cada uno.',
    },
    {
      id: 'cuadra_ganancia', tipo: 'guia', titulo: '💰 Ver mi ganancia', apps: ['cuadra'],
      claves: ['ganancia', 'utilidad', 'cuanto gane', 'precio de compra', 'costo', 'costos', 'margen'],
      respuesta: 'La app calcula tu ganancia con el *precio de compra* 💰:\n\n1. Toca cada producto → *Editar* → pon el *precio de compra*.\n2. En el *Cierre del día* y en los reportes verás cuánto ganaste.\n\nSolo tú la ves: tus cajeros nunca la ven.',
    },
    {
      id: 'cuadra_reportes', tipo: 'guia', titulo: '📊 Reportes y Excel', apps: ['cuadra'],
      claves: ['reporte', 'reportes', 'excel', 'mas vendido', 'mas vendidos', 'ventas del mes', 'ventas de la semana', 'ventas por cajero', 'estadisticas'],
      respuesta: 'En *📊 Reportes* (menú *⋮*) ves cómo te fue en la semana o el mes: los productos *más vendidos* y las ventas *por día, por cajero y por categoría*. Desde ahí lo descargas en *Excel*.',
    },
    {
      id: 'cuadra_conteo', tipo: 'guia', titulo: '🔢 Conteo de apertura y cierre', apps: ['cuadra'],
      claves: ['conteo', 'contar', 'apertura', 'contar productos', 'inventario fisico'],
      respuesta: '🔢 Al *empezar el turno* se cuenta lo que hay (apertura) y al *cerrar la caja* se vuelve a contar (cierre). Si falta algo, por ejemplo un producto entregado sin cobrar, lo sabes de una vez. El dueño recibe el resultado.',
    },
    {
      id: 'cuadra_avisos', tipo: 'guia', titulo: '🔔 Recibir los avisos de cierre en el celular', apps: ['cuadra', 'comanda'],
      claves: ['avisos', 'notificaciones', 'notificacion', 'no me llegan los avisos', 'alerta', 'celular bloqueado'],
      respuesta: 'Para que los avisos te lleguen aunque la app esté cerrada 🔔:',
      porApp: {
        cuadra: 'Abre *🔔 Tus cierres* y toca *activar los avisos*. Cuando un cajero cierra la caja te llega la notificación.',
        comanda: 'Abre *Tu cuenta y ajustes* y toca *Activar avisos*; ahí también puedes *probar el sonido*.',
      },
    },

    // ================= DL COMANDA PRO =================
    {
      id: 'comanda_pedido', tipo: 'guia', titulo: '📝 Tomar un pedido', apps: ['comanda'],
      claves: ['tomar pedido', 'tomo pedido', 'tomar orden', 'tomo orden', 'hacer pedido', 'hago pedido', 'mesa libre', 'notas', 'sin cebolla', 'agregar otro pedido', 'enviar a cocina'],
      respuesta: '📝 Toca una *mesa libre*, elige los productos (cada toque suma 1), agrega notas como *sin cebolla* y toca *Revisar y enviar*. La cocina lo recibe al instante con sonido.\n\nPara agregar algo a una mesa ocupada, tócala y agrega otro pedido.',
    },
    {
      id: 'comanda_colores', tipo: 'guia', titulo: '🎨 Qué significan los colores de las mesas', apps: ['comanda'],
      claves: ['colores', 'color', 'mesa roja', 'mesa naranja', 'mesa azul', 'mesa morada', 'mesa dorada', 'mesa gris'],
      respuesta: '🎨 Los colores de las mesas:\n\n⚪ *Gris:* libre\n🟠 *Naranja:* en cocina\n🟡 *Dorado:* listo para recoger\n🔵 *Azul:* cuenta abierta\n🟣 *Morado:* pidió la cuenta\n🔴 *Rojo:* lleva más de 15 minutos sin cobrar',
      preguntar: false,
    },
    {
      id: 'comanda_cuenta', tipo: 'guia', titulo: '🧾 Pedir la cuenta, cobrar y dividir', apps: ['comanda'],
      claves: ['cuenta', 'pedir la cuenta', 'cobrar', 'cobro', 'como cobro', 'dividir', 'dividir la cuenta', 'propina', 'vueltas', 'descuento', 'pagar la mesa'],
      respuesta: '🧾 *Mesero:* toca la mesa → *pedir la cuenta*. La app le recuerda preguntar si desea la *propina voluntaria del 10%*, y la respuesta le llega a la caja.\n\n*Caja:* toca la cuenta, elige *efectivo, tarjeta o transferencia*. La app calcula las vueltas, la propina y el descuento, y puedes *dividir la cuenta* entre varias personas.',
    },
    {
      id: 'comanda_qr', tipo: 'guia', titulo: '📱 Cobrar con QR (Nequi, Bancolombia…)', apps: ['comanda'],
      claves: ['qr', 'nequi', 'daviplata', 'bancolombia', 'bre b', 'llave', 'codigo qr', 'cobrar con qr', 'cobrar con nequi', 'subir qr', 'qr de pago'],
      respuesta: '📱 En *Administración → QR de pago* sube el QR de Nequi, Bancolombia, Daviplata o tu llave Bre-B.\n\nCuando el cliente quiera pagar así, el mesero toca la mesa → *📱 Pagar con QR* y se muestra en grande con el valor a pagar.',
    },
    {
      id: 'comanda_personal', tipo: 'guia', titulo: '👥 Crear meseros, cocina y caja', apps: ['comanda'],
      claves: ['mesero', 'meseros', 'personal', 'empleado', 'empleados', 'usuario', 'cocinero', 'crear usuario', 'pin'],
      respuesta: '👥 En *Administración → Personal → + Usuario* creas a tus meseros, cocina, bar y caja. Puedes darle a cada uno *una o varias funciones* (por ejemplo Bar + Caja).\n\nLa app les da un *PIN*: entran en *🍽️ Personal* con el nombre del restaurante, el NIT, su usuario y su PIN. No necesitan correo.',
    },
    {
      id: 'comanda_menu', tipo: 'guia', titulo: '🍔 Productos del menú y mesas', apps: ['comanda'],
      claves: ['producto', 'productos', 'menu', 'carta', 'plato', 'agregar mesa', 'crear mesa', 'renombrar mesa', 'agotado', 'ocultar'],
      respuesta: '🍔 En *Administración*:\n\n• *+ Producto:* agrega tus platos y bebidas con precio y categoría. Puedes *ocultar* los que se agotan para que el mesero no los pida.\n• *+ Mesa:* crea, renombra u ordena tus mesas (ej. Mesa 1, Barra, Terraza 2).',
    },
    {
      id: 'comanda_estaciones', tipo: 'guia', titulo: '🍳🍹 Separar cocina y bar', apps: ['comanda'],
      claves: ['bar', 'estaciones', 'bebidas', 'separar', 'cocina y bar', 'bartender'],
      respuesta: '🍳🍹 En *Administración* activa las *estaciones cocina y bar*: las bebidas van al bar y los platos a la cocina, cada uno con su aviso.\n\nEn cada celular eliges si es de *cocina* o de *bar* para ver solo lo tuyo. (Plan *Premium*.)',
    },
    {
      id: 'comanda_caja', tipo: 'guia', titulo: '💵 Abrir y cerrar la caja', apps: ['comanda'],
      claves: ['abrir caja', 'abro caja', 'cerrar caja', 'cierro caja', 'base', 'cierre de caja', 'entradas y salidas'],
      respuesta: '💵 *Al empezar:* abre la caja contando los billetes y monedas de la *base*.\n\nDurante el día registra entradas y salidas. *Al final:* cierra la caja y la app te dice si *cuadra, falta o sobra*. Tarjeta y transferencia van aparte. Cada cierre queda guardado.',
    },
    {
      id: 'comanda_ventas', tipo: 'guia', titulo: '📊 Ventas, Excel y resumen por WhatsApp', apps: ['comanda'],
      claves: ['ventas', 'excel', 'reporte', 'reportes', 'cuanto vendi', 'por mesero', 'lo mas pedido', 'resumen del dia'],
      respuesta: '📊 En *Ventas* mira cualquier día con las flechas o el calendario: total, propinas, pedidos, *ventas por mesero* y *lo más pedido*.\n\nToca *⬇️ Descargar Excel* o *📲 Resumen por WhatsApp* para enviárselo a tu socio o contador.',
    },
    {
      id: 'comanda_imprimir', tipo: 'guia', titulo: '🖨️ Imprimir o enviar el recibo', apps: ['comanda'],
      claves: ['imprimir', 'impresora', 'recibo', 'factura', 'papel', 'tirilla', 'comprobante'],
      respuesta: '🖨️ En *Cobrado hoy* toca un cobro para *imprimir* el recibo o *enviarlo por WhatsApp*.\n\nEl tamaño del papel de tu impresora lo eliges en *Tu cuenta y ajustes*.',
    },

    // ================= DL FINANZAS =================
    {
      id: 'fin_registrar', tipo: 'guia', titulo: '💵 Registrar ingresos y gastos', apps: ['finanzas'],
      claves: ['registrar gasto', 'registrar ingreso', 'anotar gasto', 'anotar', 'agregar gasto', 'nuevo gasto', 'ingreso', 'ingresos', 'gasto', 'gastos', 'movimiento', 'nuevo movimiento'],
      respuesta: '💵 Toca *💵 Ingreso* cuando recibas dinero, *🏠 Gasto fijo* para lo que pagas cada mes (arriendo, servicios) o *🛒 Gasto variable* para el resto (mercado, gustos, transporte).\n\nTambién puedes usar *➕ Nuevo movimiento*: escribes el valor, el concepto y la categoría.',
    },
    {
      id: 'fin_quincenal', tipo: 'guia', titulo: '📅 Pagos o sueldos quincenales', apps: ['finanzas'],
      claves: ['quincena', 'quincenal', 'cada quince dias', 'cada 15 dias', 'dos veces al mes'],
      respuesta: '📅 Al registrar el movimiento elige *Quincenal* y se cuenta *dos veces en el mes*. Para lo que es una sola vez, elige *Mensual* o *Pago único*.',
    },
    {
      id: 'fin_topes', tipo: 'guia', titulo: '🚦 Topes de presupuesto (semáforo)', apps: ['finanzas'],
      claves: ['tope', 'topes', 'presupuesto', 'semaforo', 'limite de gasto', 'controlar gastos', 'gastar menos'],
      respuesta: '🚦 Toca *Ajustar topes* y ponle un *tope mensual* a cada categoría.\n\n🟢 *Verde:* vas bien\n🟡 *Amarillo:* te estás acercando\n🔴 *Rojo:* ya te pasaste',
    },
    {
      id: 'fin_editar', tipo: 'guia', titulo: '✏️ Editar o borrar un movimiento', apps: ['finanzas'],
      claves: ['editar', 'borrar movimiento', 'eliminar movimiento', 'equivoque', 'equivoque gasto', 'equivoque movimiento', 'corregir gasto', 'corregir', 'cambiar un gasto', 'modificar'],
      respuesta: '✏️ En *Movimientos*, busca el registro y *tócalo*: ahí lo puedes *editar* o *eliminar*.',
    },
    {
      id: 'fin_meses', tipo: 'guia', titulo: '📆 Ver otros meses y copiar gastos fijos', apps: ['finanzas'],
      claves: ['otro mes', 'mes anterior', 'mes pasado', 'mes siguiente', 'copiar al mes', 'repetir gastos', 'gastos fijos'],
      respuesta: '📆 Todo se calcula *por mes*: usa las *flechas* para ver meses anteriores o planear el siguiente.\n\nPara no volver a escribir tus gastos fijos, usa *Copiar al mes*.',
    },
    {
      id: 'fin_excel', tipo: 'guia', titulo: '📊 Exportar a Excel', apps: ['finanzas'],
      claves: ['excel', 'exportar', 'descargar mis datos', 'reporte'],
      respuesta: '📊 Abre el menú *☰ → Exportar a Excel* (desde el plan *Pro*). Ahí mismo puedes *Descargar respaldo*.',
    },
    {
      id: 'fin_nombre', tipo: 'guia', titulo: '👤 Cambiar mi nombre', apps: ['finanzas'],
      claves: ['cambiar mi nombre', 'mi nombre', 'como me llama', 'nombre'],
      respuesta: '👤 Abre el menú *☰ → Cambiar mi nombre*. Así te saludo cada vez que entras.',
      preguntar: false,
    },

    // ================= EL ARTE EN TUS MANOS =================
    {
      id: 'arte_buscar', tipo: 'guia', titulo: '🔎 Encontrar un curso o tutorial', apps: ['arte'],
      claves: ['buscar', 'encontrar', 'donde esta', 'curso de', 'tutorial de', 'categoria', 'categorias'],
      respuesta: '🔎 Usa el *buscador* con el nombre del amigurumi, la técnica o la categoría.\n\nTambién puedes filtrar por temas (*🌸 Flores, 🐾 Animalitos, 👑 Princesas, 🍓 Comida…*) o abrir *🎓 Cursos Completos* y tocar la barra de un curso para ver sus clases paso a paso.',
    },
    {
      id: 'arte_contador', tipo: 'guia', titulo: '🧶 Contador de vueltas y materiales', apps: ['arte'],
      claves: ['contador', 'vueltas', 'contar vueltas', 'materiales', 'que necesito', 'lana', 'hilo'],
      respuesta: '🧶 Dentro de cada tutorial:\n\n• Usa *+ y −* en el *contador de vueltas* mientras tejes.\n• En *Materiales sugeridos* ves qué necesitas para ese proyecto.',
    },
    {
      id: 'arte_favoritos', tipo: 'guia', titulo: '❤️ Favoritos y clases vistas', apps: ['arte'],
      claves: ['favorito', 'favoritos', 'guardar', 'marcar como visto', 'clases vistas', 'ya vi'],
      respuesta: '❤️ Toca *🤍 Favorito* para guardar un tutorial y luego encuéntralo en *❤️ Favoritos*.\n\nCon *✓ Marcar como visto* llevas el control de las clases que ya completaste.',
    },
    {
      id: 'arte_calculadora', tipo: 'guia', titulo: '🧮 Calcular el precio de venta', apps: ['arte'],
      claves: ['calculadora', 'precio de venta', 'cuanto cobrar', 'cuanto cobro', 'cuanto vendo', 'costo', 'ganancia', 'vender mis amigurumis'],
      respuesta: '🧮 Abre la *Calculadora de Costos y Precios*: escribe lo que gastaste en materiales y tiempo, y toca *Calcular Costo y Precio Sugerido*. Te da el precio de venta con *30% de ganancia*.',
    },
    {
      id: 'arte_sugerir', tipo: 'guia', titulo: '💡 Sugerir un curso nuevo', apps: ['arte'],
      claves: ['sugerir', 'sugerencia', 'nuevo curso', 'quiero aprender', 'no esta el curso', 'agreguen'],
      respuesta: '💡 Toca *💡 Sugerir Curso*, escribe qué te gustaría aprender y toca *Enviar Sugerencia a Soporte*. ¡Las tenemos en cuenta para los próximos cursos!',
      preguntar: false,
    },
    {
      id: 'arte_anuncios', tipo: 'guia', titulo: '🚫 Ver las clases sin anuncios', apps: ['arte'],
      claves: ['anuncios', 'publicidad', 'propaganda', 'sin anuncios', 'comerciales'],
      respuesta: '🚫 Algunos videos traen anuncios de la plataforma de video. Para verlos sin anuncios, abre la app con el navegador *Brave* (en la app toca *🦁 ¿Ver las clases sin anuncios? Usa Brave*).',
    },
  ];

  var GENERAL_DEF = {
    activo: true,
    intentosAsesor: 3,     // veces que el asistente no entiende antes de ofrecer un asesor
    empresa: 'DL COMPANY -TECHNOLOGY-',
    whatsapp: '573218641539',
    mensajeAsesor: 'Listo 🙌 Te paso con un asesor de *{empresa}* 👨‍💻. En un momento te va a hablar.',
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
  // Coincidencia flexible: ignora palabras de relleno (un, el, mi…) y acepta variaciones
  // de la misma palabra (agrego/agregar, vencen/vence, cobro/cobrar, productos/producto).
  var VACIAS = { un: 1, una: 1, unos: 1, unas: 1, el: 1, la: 1, los: 1, las: 1, de: 1, del: 1, mi: 1, mis: 1, tu: 1, tus: 1,
    a: 1, al: 1, por: 1, para: 1, en: 1, con: 1, me: 1, te: 1, lo: 1, le: 1, se: 1, y: 1, o: 1 };
  var cacheTok = {};
  function tokens(t) {
    if (cacheTok[t]) return cacheTok[t];
    var r = norm(t).split(' ').filter(function (w) { return w && !VACIAS[w]; });
    if (Object.keys(cacheTok).length > 3000) cacheTok = {};
    return (cacheTok[t] = r);
  }
  function igual(a, b) {
    if (a === b) return true;
    if (a.length < 4 || b.length < 4 || /\d/.test(a + b)) return false;
    var corta = a.length <= b.length ? a : b, larga = corta === a ? b : a;
    if (corta.length <= 5) return larga.indexOf(corta) === 0 && larga.length - corta.length <= 2; // vence → vencen, pago → pagos
    return a.slice(0, 5) === b.slice(0, 5) && Math.abs(a.length - b.length) <= 4;                // agrego → agregar
  }
  function tiene(t, frase) {
    var tt = tokens(t), ft = tokens(frase);
    if (!ft.length) return false;
    for (var i = 0; i + ft.length <= tt.length; i++) {
      for (var j = 0; j < ft.length && igual(tt[i + j], ft[j]); j++);
      if (j === ft.length) return true;
    }
    return false;
  }
  function puntos(t, frases) { var s = 0; (frases || []).forEach(function (f) { if (tiene(t, f)) s += tokens(f).length || 1; }); return s; }
  function dinero(n) { return '$' + Number(n).toLocaleString('es-CO'); }
  function saludo() {
    var h;
    try { h = Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/Bogota' }).format(new Date())); }
    catch (e) { h = new Date().getHours(); }
    return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
  }

  // ARIA se presenta al abrir el chat
  function presentacion() {
    return saludo() + ' 👋, soy *ARIA*, la asistente virtual de *' + EMPRESA + '*.';
  }

  function detectarApp(t) {
    var mejor = null, mp = 0;
    Object.keys(APPS).forEach(function (k) { var p = puntos(t, APPS[k].claves); if (p > mp) { mp = p; mejor = k; } });
    return mejor;
  }
  // Solo el nombre propio de la app (ej. "comanda", "dl cuadra"), no palabras de tema como "mesero" o "caja"
  function appPorNombre(t) {
    var mejor = null, mp = 0;
    Object.keys(APPS).forEach(function (k) {
      var palabras = tokens(APPS[k].nombre).filter(function (w) { return ['dl', 'pro', 'el', 'en', 'tus', 'app'].indexOf(w) === -1; });
      if (palabras.length && tiene(t, palabras.join(' ')) && palabras.length > mp) { mp = palabras.length; mejor = k; }
    });
    return mejor;
  }

  // "3 meses", "tres meses", "un año", "6 meses"…
  var NUMEROS = { un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12 };
  function detectarMeses(t) {
    if (/(^|\s)(un|1)\s+ano(\s|$)|anual|14 meses/.test(t)) return 12;
    var m = t.match(/(^|\s)(\d{1,2}|un|uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce)\s+mes(es)?(\s|$)/);
    if (!m) return 0;
    var n = /\d/.test(m[2]) ? Number(m[2]) : NUMEROS[m[2]];
    return n >= 1 && n <= 24 ? n : 0;
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
  // ¿De dónde viene el cliente? 1) la app donde está instalado el chat; 2) si no, lo que dice el botón
  // ("Vengo de la app DL FINANZAS…" / "Vengo de la página web…").
  function origenDe(texto) {
    if (APPS[APP_ACTUAL]) return { app: APP_ACTUAL, origen: 'app' };
    var t = norm(texto);
    var m = t.match(/vengo de la app (.+)/);
    if (m) {
      var k = null, mp = 0;
      Object.keys(APPS).forEach(function (x) { var n = norm(APPS[x].nombre); if (m[1].indexOf(n) === 0 && n.length > mp) { mp = n.length; k = x; } });
      if (k) return { app: k, origen: 'app' };
    }
    return { app: null, origen: 'web' };
  }

  function nuevaConversacion(textoOriginal, urlOriginal) {
    var o = origenDe(textoOriginal || '');
    st = {
      original: textoOriginal || '',
      url: urlOriginal || '',
      app: o.app,
      origen: o.origen,
      modo: null,            // soporte | confirmar | elegir_app | detalles
      siguiente: null,       // qué hacer después de elegir la app
      problema: null, alternativa: false, fallos: 0,
      premium: false,
      resumen: [],
      chat: [],
      estado: 'bot',         // bot | humano (un asesor responde en este chat)
      convId: null,          // conversación guardada en la nube
      ultimoId: 0,           // último mensaje recibido de la nube
      avisoHumano: 0,
    };
  }

  function nota(linea) { if (st.resumen.indexOf(linea) === -1) st.resumen.push(linea); }

  /* ---------- Conversación guardada en la nube (para que el asesor la vea y responda) ---------- */
  var CLAVE_TOKEN = 'dlchat_token', CLAVE_CONV = 'dlchat_conv_' + (APP_ACTUAL || 'web');
  function token() {
    var t = null;
    try { t = localStorage.getItem(CLAVE_TOKEN); } catch (e) {}
    if (!t || t.length < 20) {
      var L = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'; t = '';
      for (var i = 0; i < 32; i++) t += L.charAt(Math.floor(Math.random() * L.length));
      try { localStorage.setItem(CLAVE_TOKEN, t); } catch (e) {}
    }
    return t;
  }
  function guardarLocal(s2) {
    if (!s2 || !s2.convId) return;
    try { localStorage.setItem(CLAVE_CONV, JSON.stringify({ id: s2.convId, estado: s2.estado, t: Date.now() })); } catch (e) {}
  }
  function leerLocal() {
    try { var o = JSON.parse(localStorage.getItem(CLAVE_CONV) || 'null'); if (o && o.id && Date.now() - o.t < 14 * 864e5) return o; } catch (e) {}
    return null;
  }
  function rpc(fn, args) {
    return fetch(NUBE.url + 'rpc/' + fn, {
      method: 'POST', headers: { apikey: NUBE.llave, Authorization: 'Bearer ' + NUBE.llave, 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    }).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); });
  }
  function esperar(ms) { return new Promise(function (ok) { setTimeout(ok, ms); }); }
  var cola = Promise.resolve();
  function asegurarConv(s2) {
    if (s2.convId) return Promise.resolve(s2.convId);
    if (!s2._creando) s2._creando = rpc('chat_iniciar', { p_token: token(), p_app: s2.app || APP_ACTUAL || 'web', p_origen: s2.origen })
      .then(function (r) { s2.convId = r.id; s2.codigo = r.codigo; guardarLocal(s2); return r.id; })
      .catch(function (e) { s2._creando = null; throw e; }); // si falla, se vuelve a intentar
    return s2._creando;
  }
  // Guarda un mensaje en la nube. Si falla (sin internet, celular en segundo plano…)
  // lo reintenta solo hasta que llegue, y avisa en la burbuja cómo va.
  var despertar = null;
  function registrar(de, texto, adjunto, alCambiar) {
    if (configFija || !st) return Promise.resolve();
    var s2 = st, intentos = 0;
    function intentar() {
      return asegurarConv(s2)
        .then(function (id) { return rpc('chat_enviar', { p_id: id, p_token: token(), p_de: de, p_texto: String(texto || '').slice(0, 2500), p_adjunto: adjunto || null, p_app: s2.app || null }); })
        .then(function (mid) { if (mid) { s2.vistos = s2.vistos || {}; s2.vistos[mid] = 1; } if (alCambiar) alCambiar('ok'); })
        .catch(function (e) {
          intentos++;
          // error definitivo del servidor (permiso, límite): no insistir
          if (typeof e === 'number' && e >= 400 && e < 500 && e !== 408 && e !== 429) { if (alCambiar) alCambiar('error'); return; }
          if (alCambiar) alCambiar('reintento');
          var espera = Math.min(15000, 1500 * intentos);
          return Promise.race([esperar(espera), new Promise(function (ok) { despertar = ok; })]).then(intentar);
        });
    }
    cola = cola.then(intentar);
    return cola;
  }
  // Al volver a la app o recuperar internet: reintentar ya y traer lo nuevo
  function alVolver() {
    if (document.visibilityState !== 'visible') return;
    if (despertar) { var d = despertar; despertar = null; d(); }
    if (abierto && st && st.convId) leerNuevos(st, false);
  }
  document.addEventListener('visibilitychange', alVolver);
  window.addEventListener('online', alVolver);
  window.addEventListener('pageshow', alVolver);
  function pedirAsesor(s2) {
    s2.estado = 'humano';
    if (configFija) return;
    cola = cola.then(function () { return asegurarConv(s2); })
      .then(function (id) { guardarLocal(s2); return rpc('chat_pedir_asesor', { p_id: id, p_token: token(), p_resumen: s2.resumen.slice(0, 30) }); })
      .catch(function () {});
  }

  // Chips (respuestas rápidas)
  var CH = {
    wa: { t: '👨‍💻 Hablar con un asesor', a: 'asesor_si', wa: true },
    pedido: { t: '📲 Pedir este plan', a: 'pedir_plan', wa: true },
    comprobante: { t: '📎 Ya pagué, enviar comprobante', a: 'comprobante' },
    asesor: { t: '👨‍💻 Hablar con un asesor', a: 'asesor' },
    asesorFinal: { t: '👨‍💻 Hablar con un asesor', a: 'asesor_si' },
    todo: { t: '📋 Ver todas las opciones', a: 'todo' },
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
      ? [{ t: '📱 Ver nuestras apps', a: 'apps' }, CH.planes, { t: '✨ Quiero una app a la medida', a: 'medida' }, CH.soporte]
      : [{ t: '🛠️ Tengo un problema', a: 'soporte' }, { t: '📘 Aprender a usar ' + (a ? a.nombre : 'la app'), a: 'guias' }, CH.planes, { t: '🔑 Problemas con mi plan o código', a: 'problema_plan' }];
    return r((prefijo ? prefijo + ' ' : '') + '¿En qué te puedo ayudar' + (a ? ' con *' + a.nombre + '*' : '') + '?', chips);
  }

  function pedirApp(siguiente, texto) {
    st.modo = 'elegir_app'; st.siguiente = siguiente;
    return r(texto || '¿Con cuál de nuestras apps?', ORDEN_APPS.concat(APP_ACTUAL === 'arte' ? ['arte'] : []).map(function (k) {
      return { t: APPS[k].icono + ' ' + APPS[k].nombre, a: 'app:' + k };
    }));
  }

  // ----- respuestas por tema -----
  function verPlanes(planId, anual, meses) {
    if (!st.app) return pedirApp('planes', '¿De cuál app quieres ver los planes?');
    var a = APPS[st.app];
    if (meses) st.meses = meses;
    meses = st.meses || 0;
    if (meses === 12 && !a.sinAnual) { anual = true; }
    var plan = planId && a.planes.filter(function (p) { return p.id === planId; })[0];
    st.modo = null;
    if (!plan && meses) {
      // Dijo cuánto tiempo pero no cuál plan
      return r('¡Perfecto! 🙌 ' + (anual ? 'Pago *anual*' : '*' + meses + (meses === 1 ? ' mes' : ' meses') + '*') + ' de *' + a.nombre + '*. ¿De cuál plan?\n\n' + textoPlanes(a, true),
        a.planes.filter(function (p) { return p.p; }).map(function (p) { return { t: 'Plan ' + p.n, a: 'plan:' + p.id }; }).concat([CH.otra]));
    }
    if (plan && plan.p) {
      var cuanto = anual && !a.sinAnual ? ' (anual)' : meses > 1 ? ' por ' + meses + ' meses' : '';
      nota('Quiere el plan ' + plan.n.replace(/[^\wÁÉÍÓÚáéíóúñ ]/g, '').trim() + ' de ' + a.nombre + cuanto);
      var precio = anual && !a.sinAnual
        ? '*' + dinero(plan.p * 12) + '* por 14 meses (pagas 12, te regalamos 2)'
        : meses > 1
          ? '*' + dinero(plan.p * meses) + '* por ' + meses + ' meses (' + dinero(plan.p) + '/mes, 50% de lanzamiento)'
          : '*' + dinero(plan.p) + '*/mes' + (plan.antes ? ' (antes ' + dinero(plan.antes) + ', 50% de lanzamiento)' : '');
      return r('¡Excelente elección! 🎉\n\n*Plan ' + plan.n + ' de ' + a.nombre + '*\n' + precio + '\n✅ ' + plan.inc +
        '\n\n*Así lo activas:*\n1. ' + a.pago + '\n2. Toca *📲 Pedir este plan* y un asesor te confirma aquí mismo.\n3. ' + a.activar,
        [CH.pedido, CH.comprobante, { t: '📋 Ver todos los planes', a: 'planes_todos' }, CH.otra]);
    }
    nota('Preguntó por los planes de ' + a.nombre);
    return r('*Planes de ' + a.nombre + '* 🚀 50% de descuento de lanzamiento\n\n' + textoPlanes(a) +
      (a.sinAnual ? '' : '\n\n📅 Pago anual: *14 meses por el precio de 12*.') + '\n\n¿Cuál te interesa?',
      a.planes.filter(function (p) { return p.p; }).map(function (p) { return { t: 'Quiero ' + p.n, a: 'plan:' + p.id }; }).concat([CH.otra]));
  }

  function comoActivar() {
    if (!st.app) return pedirApp('activar', '¿En cuál app quieres activar tu plan?');
    var a = APPS[st.app];
    return r('*Cómo activar tu plan en ' + a.nombre + '* 🔑\n\n1. Elige tu plan y toca *📲 Pedir este plan*.\n2. ' + a.pago + '\n3. ' + a.activar,
      [CH.planes, CH.comprobante, CH.otra]);
  }

  function problemaPlan() {
    if (!st.app) return pedirApp('problema_plan', '¿En cuál app tienes el problema con el plan?');
    st.modo = null;
    nota('Tiene problemas para acceder a un plan o comprarlo');
    var a = APPS[st.app];
    var chips = [{ t: '🛒 Quiero comprar un plan', a: 'planes' }, { t: '🧾 Ya pagué y no tengo mi plan', a: 'pagado' }];
    if (problemaPorId('metodos_pago') && aplica(problemaPorId('metodos_pago'), st.app)) chips.splice(1, 0, { t: '💳 ¿Cómo pago?', a: 'prob:metodos_pago' });
    if (!a.sinCodigo) chips.push({ t: '❌ Mi código no funciona', a: 'codigo_malo' });
    chips.push(CH.otra);
    return r('Claro que sí, te ayudo con tu plan de *' + a.nombre + '* 👑. ¿Qué pasó?', chips);
  }

  function pagado() {
    var a = st.app ? APPS[st.app] : null;
    nota('Dice que ya realizó el pago');
    pedirAsesor(st);
    return r('¡Gracias por tu pago! 🙌\n\n1. Envía aquí la *foto del comprobante* con el botón 📎 (abajo, junto a donde escribes).\n2. Escribe el *correo* de tu cuenta' +
      (a ? ' de ' + a.nombre : '') + '.\n\nUn asesor lo verifica y te responde *aquí mismo*. ' + (a ? a.activar : ''), [{ t: '📎 Adjuntar comprobante', a: 'adjuntar' }]);
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
    st.modo = 'soporte';
    var a = APPS[st.app];
    var lista = listaDe(st.app, 'problema').slice(0, 7);
    var chips = lista.map(function (p) { return { t: p.titulo, a: 'prob:' + p.id }; });
    if (listaDe(st.app, 'guia').length) chips.push({ t: '📘 Aprender a usar ' + a.nombre, a: 'guias' });
    chips.push(CH.todo);
    return r((prefijo || 'Claro que sí, estamos para ayudarte con *' + a.nombre + '* 🛠️.') + '\n\nCuéntame qué está pasando con tus palabras, o elige una opción:', chips);
  }

  // Respuestas de una app: primero las propias de la app y luego las generales
  function listaDe(k, tipo) {
    var ok = function (p) { return aplica(p, k) && (!tipo || (tipo === 'guia' ? p.tipo === 'guia' : p.tipo !== 'guia')); };
    var propias = PROBLEMAS.filter(function (p) { return ok(p) && p.apps.indexOf('*') === -1; });
    var generales = PROBLEMAS.filter(function (p) { return ok(p) && p.apps.indexOf('*') !== -1; });
    return propias.concat(generales);
  }

  function guias(prefijo) {
    if (!st.app) return pedirApp('guias', '¿Cuál app quieres aprender a usar?');
    st.modo = 'soporte';
    var a = APPS[st.app];
    return r((prefijo || '📘 ¿Qué quieres aprender a hacer en *' + a.nombre + '*?') + '\n\nElige una opción o escríbeme tu pregunta:',
      listaDe(st.app, 'guia').map(function (p) { return { t: p.titulo, a: 'prob:' + p.id }; }).concat([{ t: '🛠️ Tengo un problema', a: 'soporte' }]));
  }

  function todo(prefijo) {
    if (!st.app) return pedirApp('todo', '¿De cuál app?');
    st.modo = 'soporte';
    var a = APPS[st.app];
    return r((prefijo || 'Estas son todas las respuestas que tengo para *' + a.nombre + '* 📋:'),
      listaDe(st.app).map(function (p) { return { t: p.titulo, a: 'prob:' + p.id }; }).concat([CH.menu]));
  }

  function textoRespuesta(p, campo) {
    var a = APPS[st.app] || { nombre: 'la app', planes: [] };
    var t = String(p[campo] || '')
      .replace(/\{app\}/g, a.nombre)
      .replace(/\{empresa\}/g, EMPRESA)
      .replace(/\{activar\}/g, a.activar || '')
      .replace(/\{pago\}/g, a.pago || '')
      .replace(/\{consejo_ingreso\}/g, a.login ? '\n\n💡 ' + a.login : '')
      .replace(/\{consejo_datos\}/g, a.gratisLocal ? '\n\n💡 ' + a.gratisLocal : '')
      .replace(/\{planes_detalle\}/g, a.planes && a.planes.length ? textoPlanes(a, false) : '')
      .replace(/\{planes\}/g, a.planes && a.planes.length ? textoPlanes(a, true) : '');
    if (campo === 'respuesta' && p.porApp && p.porApp[st.app]) t += '\n\n' + p.porApp[st.app];
    return t;
  }

  function resolver(p) {
    var a = APPS[st.app];
    st.problema = p; st.alternativa = false; st.modo = 'confirmar'; st.fallos = 0;
    nota('Problema: ' + p.titulo.replace(/^\S+\s/, ''));
    var texto = textoRespuesta(p, 'respuesta');
    if (p.whatsapp) {
      st.modo = null;
      return r(texto, [CH.wa, CH.otra]);
    }
    if (p.mostrarPlanes) {
      st.modo = null;
      return r(texto, a.planes.filter(function (x) { return x.p; }).map(function (x) { return { t: 'Quiero ' + x.n, a: 'plan:' + x.id }; }).concat([CH.otra]));
    }
    if (p.preguntar === false) { st.modo = null; return r(texto, [CH.otra, { t: '📘 Ver más ayuda', a: 'todo' }]); }
    return r(texto + '\n\n¿Pudiste solucionarlo?', [{ t: '✅ Sí, gracias', a: 'si' }, { t: '❌ No, sigue igual', a: 'no' }]);
  }

  function aAsesor(motivo) {
    st.modo = null;
    if (motivo) nota(motivo);
    var msj = String(GENERAL.mensajeAsesor || GENERAL_DEF.mensajeAsesor);
    if (/whatsapp/i.test(msj)) msj = GENERAL_DEF.mensajeAsesor; // textos viejos que mandaban a WhatsApp
    pedirAsesor(st);
    return r(msj.replace(/\{empresa\}/g, EMPRESA), []);
  }

  function infoApp(k) {
    st.app = k; var a = APPS[k];
    nota('Pidió información de ' + a.nombre);
    return r(a.icono + ' *' + a.nombre + '*\n\n' + a.desc + '\n\nPuedes *probarla gratis* y activar un plan cuando quieras más funciones.',
      [{ t: '🚀 Probar gratis', a: 'abrir:' + a.url }, CH.planes, { t: '🙋 Tengo más preguntas', a: 'menu' }]);
  }

  function aLaMedida() {
    st.modo = 'detalles';
    nota('Quiere una app o página personalizada');
    return r('¡Claro! ✨ Creamos apps y páginas *a la medida*, con tu marca y lo que tu negocio necesita, y nosotros las mantenemos. ' + (st.origen === 'web' ? '(Ejemplo: *El Arte en Tus Manos*, academia de manualidades).' : '') + '\n\n' +
      'Para cotizarte, escríbeme aquí:\n1. ¿Qué tipo de negocio tienes?\n2. ¿Qué necesitas controlar o mostrar?\n3. ¿App, página web o ambas?\n\nCuando termines toca *📨 Enviar a un asesor* y te respondemos aquí mismo con la propuesta.',
      [{ t: '📨 Enviar a un asesor', a: 'asesor_si' }, CH.menu]);
  }

  function pacientes() {
    st.modo = 'detalles';
    nota('Le interesa la app de control de pacientes y citas');
    return r('🩺 La *app de control de pacientes y citas* está en desarrollo (odontología, fisioterapia, estética y más: datos del paciente, agenda y recordatorios).\n\n' +
      'Cuéntame aquí tu *tipo de negocio* y te avisamos apenas salga. Luego toca *📨 Enviar a un asesor* 👇', [{ t: '📨 Enviar a un asesor', a: 'asesor_si' }, { t: '📱 Ver las apps disponibles', a: 'apps' }]);
  }

  function despedida() {
    st.modo = null;
    return r(String(GENERAL.mensajeDespedida || GENERAL_DEF.mensajeDespedida).replace(/\{empresa\}/g, EMPRESA), [CH.menu]);
  }

  // ----- primer mensaje (lo que traía el botón) -----
  function interpretarPrimero(texto) {
    var t = norm(texto);
    // La app de origen manda: si el cliente viene de una app, no se cambia.
    if (!st.app) { var app = detectarApp(t.replace(/vengo de la pagina web/, '')); if (app) st.app = app; }
    var cab = presentacion();
    var resp = interpretar(t, true);
    resp.texto = cab + ' ' + resp.texto;
    return resp;
  }

  function interpretar(t, primero) {
    var planId = detectarPlan(t);
    var anual = /anual|14 meses/.test(t);
    var meses = detectarMeses(t);
    if (meses && st.app && !/cancel|renov|vence|vencio|reembols|devol|pague|pago realizado|comprobante|transferi|consigne/.test(t)) return verPlanes(planId, anual || meses === 12, meses);

    if (/(ya )?(realice|hice|pague|envie|transferi|consigne) (mi |el )?pago|ya pague|comprobante/.test(t)) return pagado();
    if (/problemas? para acceder a un plan|problema con (el|mi) plan|codigo no (sirve|funciona)|no me (llego|ha llegado) el codigo/.test(t)) return problemaPlan();
    if (/codigo/.test(t) && /(no (sirve|funciona|deja|acepta)|invalido|incorrecto)/.test(t)) { if (!st.app) return pedirApp('codigo_malo'); return codigoMalo(); }
    if (/(^|\s)(asesor|humano|una persona|hablar con alguien|agente)(\s|$)/.test(t)) return accion('asesor');
    // Si nombra un plan para comprarlo, ir directo a la compra
    if (planId && /(^|\s)plan(\s|$)/.test(t) && !/cancel|renov|vence|vencio|reembols|devol|app personalizada/.test(t)) return verPlanes(planId, anual);
    // Si el mensaje coincide claramente con una respuesta, darla de una vez
    var fuerte = detectarProblema(t, st.app);
    if (fuerte && puntos(t, fuerte.claves) >= 2 && (st.app || !fuerte.apps || fuerte.apps.indexOf('*') !== -1 || fuerte.apps.length === 1)) {
      if (!st.app && fuerte.apps.length === 1 && fuerte.apps[0] !== '*') st.app = fuerte.apps[0];
      if (st.app) return resolver(fuerte);
    }

    if (/(quiero|deseo|me interesa|necesito|como (compro|pago|activo))( comprar| el| activar el| pagar el| adquirir| un| una)* (plan|codigo|membresia|suscripcion)|comprar|precio|precios|cuanto (cuesta|vale)|planes|cotizar|pagar el plan/.test(t)
      && !/app personalizada|a la medida/.test(t)) {
      return verPlanes(planId, anual);
    }
    if (/app personalizada|a la medida|pagina web para|mi propia app|una app para mi negocio/.test(t)) return aLaMedida();
    if (/control de pacientes|app de pacientes|app de citas/.test(t) || (st.origen === 'web' && !st.app && /pacientes|citas|odontolog|fisioterap|estetica/.test(t))) return pacientes();
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
    if (st.estado === 'humano') {
      // Ya lo atiende una persona: el mensaje le llega al asesor (se guardó al mostrarlo)
      if (Date.now() - st.avisoHumano < 10 * 60000) return null;
      st.avisoHumano = Date.now();
      return r('📨 Tu mensaje le llegó al asesor. Te responderá *aquí mismo*.', []);
    }

    if (st.modo === 'detalles') {
      nota('Detalles: ' + texto.slice(0, 300));
      return r('¡Anotado! ✍️ Si quieres agregar algo más, escríbelo. Cuando termines toca *📨 Enviar a un asesor* y te respondemos aquí mismo.', [{ t: '📨 Enviar a un asesor', a: 'asesor_si' }]);
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

    // Apenas se sabe de qué app habla el cliente (porque viene de esa app o porque la eligió),
    // todo se responde sobre ESA app: no se buscan, no se mencionan y no se ofrecen otras apps.
    var resp = interpretar(t, false);
    if (resp) return resp;

    st.fallos++;
    nota('Escribió: "' + texto.slice(0, 200) + '"');
    reportarPendiente(texto);
    var limite = Math.max(2, Number(GENERAL.intentosAsesor) || 3);
    if (st.fallos >= limite) {
      st.modo = null;
      return r('No encontré una respuesta para eso 😔. Puedes escribirlo de otra forma o revisar todas las opciones.\n\nSi aun así no lo encuentras, como *último recurso* te comunico con un asesor.',
        [CH.todo, CH.asesorFinal]);
    }
    if (st.fallos === 1) return st.app ? soporte('Quiero ayudarte bien 🙏 pero no logré entenderlo. ¿Es alguna de estas opciones?')
      : menuPrincipal('Quiero ayudarte bien 🙏 pero no logré entenderlo.');
    return st.app ? todo('Intenta escribirlo con otras palabras, o busca aquí tu caso 👇')
      : menuPrincipal('Intenta escribirlo con otras palabras, o elige una opción 👇');
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
    if (a === 'asesor') {
      if (st.pidioAsesor) return aAsesor('Pidió hablar con un asesor');
      st.pidioAsesor = true;
      return r('Claro 🙌. Antes cuéntame qué necesitas: la mayoría de casos los resuelvo *al instante*, sin que tengas que esperar.\n\nEscríbelo con tus palabras o elige una opción:',
        [{ t: '🛠️ Tengo un problema', a: 'soporte' }, { t: '📘 Aprender a usar la app', a: 'guias' }, CH.planes, { t: '👨‍💻 Aun así, quiero un asesor', a: 'asesor_si' }]);
    }
    if (a === 'asesor_si') return aAsesor('Pidió hablar con un asesor');
    if (a === 'pedir_plan') return aAsesor('Pidió activar el plan');
    if (a === 'comprobante') return pagado();
    if (a === 'guias') return guias();
    if (a === 'todo') return todo();
    if (a === 'medida') return aLaMedida();
    if (a === 'apps') return r('Estas son nuestras apps 📱. Todas se pueden *probar gratis*:',
      ORDEN_APPS.map(function (k) { return { t: APPS[k].icono + ' ' + APPS[k].nombre, a: 'info:' + k }; }).concat([{ t: '🩺 Control de pacientes (pronto)', a: 'pacientes' }]));
    if (a === 'pacientes') return pacientes();
    if (a.indexOf('info:') === 0) return infoApp(a.slice(5));
    if (a.indexOf('cambiar:') === 0) {
      if (st.origen === 'app') return menuPrincipal('');
      st.app = a.slice(8); st.modo = null; st.fallos = 0; nota('Cambió a ' + APPS[st.app].nombre);
      return menuPrincipal('Listo 👍.');
    }
    if (a.indexOf('plan:') === 0) return verPlanes(a.slice(5));
    if (a.indexOf('prob:') === 0) return resolver(problemaPorId(a.slice(5)));
    if (a.indexOf('app:') === 0 && st.origen === 'app' && st.app) return menuPrincipal('');
    if (a.indexOf('app:') === 0) {
      st.app = a.slice(4); var sig = st.siguiente; st.siguiente = null; st.modo = null;
      if (sig === 'planes') return verPlanes(null);
      if (sig === 'activar') return comoActivar();
      if (sig === 'guias') return guias();
      if (sig === 'todo') return todo();
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
      st.modo = null;
      nota('No se solucionó: ' + (p ? p.titulo.replace(/^\S+\s/, '') : ''));
      return r('Lamento que no se haya solucionado 😔. Revisemos otras opciones: puede que tu caso sea otro de la lista.\n\nSi ya probaste todo, como *último recurso* te comunico con un asesor.',
        [CH.todo, CH.asesorFinal]);
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
    '.av{width:42px;height:42px;border-radius:50%;flex:none;display:block;object-fit:cover;background:#0b1220;box-shadow:0 0 0 2px rgba(212,175,55,.7)}' +
    '.tit{flex:1;min-width:0}.tit b{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.tit span{font-size:12px;color:#8fd6a8;display:flex;align-items:center;gap:5px}.tit span:before{content:"";width:7px;height:7px;border-radius:50%;background:#22c55e}' +
    '.ib{width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.08);color:#fff;font-size:18px;cursor:pointer;display:grid;place-items:center;flex:none}' +
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
    '.pie{text-align:center;font-size:10.5px;color:#6b7aa0;padding:0 0 2px}' +
    '.m.asesor{align-self:flex-start;background:#123326;border:1px solid rgba(34,197,94,.45);border-top-left-radius:4px}' +
    '.m.asesor .quien{display:block;font-size:11.5px;font-weight:700;color:#5ee69a;margin-bottom:3px}' +
    '.m img{display:block;max-width:220px;max-height:260px;border-radius:10px;margin-top:4px}' +
    '.m .est{display:block;text-align:right;font-size:10.5px;opacity:.75;margin-top:3px}.m .est.mal{opacity:1;color:#ffd0d0}' +
    '.aviso-sis{align-self:center;font-size:12px;color:#8fa3c8;background:rgba(255,255,255,.05);border-radius:10px;padding:5px 10px;text-align:center}' +
    'form .clip{background:rgba(255,255,255,.08);color:#e8eefc;font-size:19px}' +
    '.pastilla{position:fixed;right:14px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:3;pointer-events:auto;display:flex;align-items:center;gap:8px;' +
    'background:linear-gradient(135deg,#0f1b33,#16213a);color:#e8eefc;border:1px solid rgba(34,197,94,.6);border-radius:24px;padding:10px 14px 10px 12px;' +
    'font-size:14px;font-weight:700;box-shadow:0 8px 26px rgba(0,0,0,.45);cursor:pointer;animation:e .25s ease-out}' +
    '.pastilla img{width:26px;height:26px;border-radius:50%}' +
    '.pastilla i{font-style:normal;background:#22c55e;color:#04210f;border-radius:10px;padding:1px 7px;font-size:12px}' +
    '.oculto{display:none!important}';


  function construir() {
    if (host) return;
    host = document.createElement('div');
    host.id = 'dl-chat';
    host.setAttribute('translate', 'no'); host.className = 'notranslate'; // que el traductor de Chrome no cambie "planes" por "aviones"
    host.lang = 'es';
    host.style.cssText = 'position:fixed;inset:0;z-index:2147483000;pointer-events:none';
    raiz = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    raiz.innerHTML = '<style>' + CSS + '</style>' +
      '<div class="cont"><div class="fondo"></div><div class="panel" role="dialog" aria-label="ARIA, asistente de DL COMPANY">' +
      '<div class="cab"><img class="av" src="' + ARIA_LOGO + '" alt="ARIA"><div class="tit"><b>ARIA · Asistente de DL COMPANY</b><span>En línea · responde al instante</span></div>' +
      '<button class="ib x" type="button" aria-label="Cerrar">✕</button></div>' +
      '<div class="msgs"></div><div class="chips"></div>' +
      '<form><button type="button" class="clip" aria-label="Adjuntar comprobante" title="Adjuntar foto o PDF">📎</button>' +
      '<input class="txt" placeholder="Escribe tu mensaje…" autocomplete="off" aria-label="Mensaje"><button aria-label="Enviar">➤</button>' +
      '<input class="archivo" type="file" accept="image/*,application/pdf" hidden></form>' +
      '<div class="pie">ARIA · asistente virtual de ' + EMPRESA + '</div></div></div>' +
      '<button type="button" class="pastilla oculto"><img src="' + ARIA_LOGO + '" alt="">Tienes una respuesta <i>1</i></button>';
    document.body.appendChild(host);
    ui.cont = raiz.querySelector('.cont');
    ui.msgs = raiz.querySelector('.msgs');
    ui.chips = raiz.querySelector('.chips');
    ui.input = raiz.querySelector('input.txt');
    ui.archivo = raiz.querySelector('input.archivo');
    ui.pastilla = raiz.querySelector('.pastilla');
    raiz.querySelector('.fondo').onclick = cerrar;
    raiz.querySelector('.x').onclick = cerrar;
    raiz.querySelector('.clip').onclick = function () { ui.archivo.click(); };
    ui.archivo.onchange = function () { var f = ui.archivo.files && ui.archivo.files[0]; ui.archivo.value = ''; if (f) enviarAdjunto(f); };
    ui.pastilla.onclick = function () { ui.pastilla.classList.add('oculto'); abrir(); };
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
  function burbuja(texto, quien, opciones) {
    opciones = opciones || {};
    if (st && st.chat) { st.chat.push({ de: quien === 'yo' ? 'cliente' : quien === 'asesor' ? 'admin' : 'asistente', t: String(texto).slice(0, 700) }); if (st.chat.length > 60) st.chat.shift(); }
    var d = document.createElement('div'); d.className = 'm ' + quien;
    d.innerHTML = (quien === 'asesor' ? '<span class="quien">👨‍💻 Asesor DL COMPANY</span>' : '') + formato(texto) +
      (opciones.img ? '<img alt="Adjunto" src="' + opciones.img + '">' : '');
    if (!opciones.historial && quien !== 'asesor') {
      var est = null;
      if (quien === 'yo' && !configFija) { est = document.createElement('span'); est.className = 'est'; est.textContent = '🕓'; d.appendChild(est); }
      registrar(quien === 'yo' ? 'cliente' : 'asistente', texto, opciones.adjunto, est && function (e) {
        est.className = 'est' + (e === 'ok' ? '' : ' mal');
        est.textContent = e === 'ok' ? '✓ Enviado' : e === 'error' ? '⚠️ No se pudo enviar' : '⚠️ Sin conexión · reintentando…';
      });
    }
    ui.msgs.appendChild(d); bajar();
    // Respuesta larga: mostrarla desde el inicio
    if (quien === 'bot' && d.offsetHeight > ui.msgs.clientHeight - 20) ui.msgs.scrollTop = d.offsetTop - 10;
  }
  function avisoSistema(texto) {
    var d = document.createElement('div'); d.className = 'aviso-sis'; d.textContent = texto; ui.msgs.appendChild(d); bajar();
  }
  function pintarChips(chips) {
    ui.chips.innerHTML = '';
    (chips || []).forEach(function (c) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = c.t;
      if (c.wa) b.className = 'w';
      b.onclick = function () {
        if (ocupado) return;
        if (c.a === 'adjuntar') return ui.archivo.click();
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

  // Reduce la foto (máx. 1600 px) para que suba rápido
  function comprimir(f) {
    return new Promise(function (ok) {
      if (!/^image\/(jpeg|png|webp)$/.test(f.type)) return ok(f);
      var img = new Image(), url = URL.createObjectURL(f);
      img.onload = function () {
        var k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        c.toBlob(function (b) { URL.revokeObjectURL(url); ok(b && b.size < f.size ? new File([b], 'comprobante.jpg', { type: 'image/jpeg' }) : f); }, 'image/jpeg', 0.82);
      };
      img.onerror = function () { URL.revokeObjectURL(url); ok(f); };
      img.src = url;
    });
  }
  function enviarAdjunto(f) {
    if (f.size > 15 * 1024 * 1024) { avisoSistema('El archivo es muy grande. Envía una foto o un PDF de menos de 5 MB.'); return; }
    var s2 = st, esImg = /^image\//.test(f.type);
    var vista = esImg ? URL.createObjectURL(f) : null;
    var d = document.createElement('div'); d.className = 'm yo';
    d.innerHTML = formato(esImg ? '📎 Comprobante' : '📎 ' + f.name) + (vista ? '<img alt="Adjunto" src="' + vista + '">' : '');
    ui.msgs.appendChild(d); bajar();
    if (s2.chat) s2.chat.push({ de: 'cliente', t: '📎 Adjunto' });
    if (configFija) { avisoSistema('(En las pruebas de la administración el archivo no se sube.)'); return; }
    var estado = document.createElement('div'); estado.className = 'aviso-sis'; estado.textContent = 'Enviando…'; ui.msgs.appendChild(estado); bajar();
    comprimir(f).then(function (f2) {
      return asegurarConv(s2).then(function (id) {
        var ext = f2.type === 'application/pdf' ? 'pdf' : f2.type === 'image/png' ? 'png' : f2.type === 'image/webp' ? 'webp' : f2.type === 'image/heic' ? 'heic' : 'jpg';
        var ruta = id + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
        return fetch(NUBE.url.replace('/rest/v1/', '/storage/v1/object/') + 'chatbot-adjuntos/' + ruta, {
          method: 'POST', headers: { apikey: NUBE.llave, Authorization: 'Bearer ' + NUBE.llave, 'Content-Type': f2.type || 'application/octet-stream' }, body: f2,
        }).then(function (r) { if (!r.ok) throw new Error('subida'); return ruta; });
      });
    }).then(function (ruta) {
      estado.textContent = '✓ Enviado';
      var nombre = esImg ? '📎 Comprobante' : '📎 ' + f.name;
      cola = cola.then(function () { return rpc('chat_enviar', { p_id: s2.convId, p_token: token(), p_de: 'cliente', p_texto: nombre, p_adjunto: ruta, p_app: s2.app || null }); })
        .then(function (mid) { if (mid) { s2.vistos = s2.vistos || {}; s2.vistos[mid] = 1; } }).catch(function () {});
      if (s2.estado !== 'humano') {
        nota('Envió un comprobante');
        s2.estado = 'humano';
        pedirAsesor(s2);
        responder(r('¡Recibido! 🙌 Un asesor revisa tu comprobante y te responde *aquí mismo*. Si no lo has hecho, escribe el *correo* de tu cuenta.', []));
      }
    }).catch(function () { estado.textContent = '⚠️ No se pudo enviar. Revisa tu internet e inténtalo de nuevo.'; });
  }

  /* ---------- Recibir las respuestas del asesor ---------- */
  var tPoll = null;
  function leerNuevos(s2, todo) {
    if (!s2 || !s2.convId || configFija) return Promise.resolve();
    // una sola lectura a la vez (si no, dos lecturas simultáneas pintaban el mismo mensaje dos veces)
    if (s2._leyendo && !todo) return s2._leyendo;
    var p = rpc('chat_leer', { p_id: s2.convId, p_token: token(), p_desde: todo ? 0 : s2.ultimoId }).then(function (res) {
      if (!res || s2 !== st) return;
      s2.vistos = s2.vistos || {};
      (res.mensajes || []).forEach(function (m) {
        if (m.id > s2.ultimoId) s2.ultimoId = m.id;
        if (s2.vistos[m.id]) return; // ya está en pantalla
        s2.vistos[m.id] = 1;
        if (todo) burbuja(m.texto || (m.adjunto ? '📎 Adjunto' : ''), m.de === 'cliente' ? 'yo' : m.de === 'admin' ? 'asesor' : 'bot', { historial: true });
        else if (m.de === 'admin') { burbuja(m.texto, 'asesor', { historial: true }); pintarChips([]); }
      });
      if (res.estado && res.estado !== s2.estado) {
        s2.estado = res.estado === 'resuelta' ? 'bot' : res.estado;
        guardarLocal(s2);
        if (res.estado === 'resuelta') avisoSistema('El asesor marcó la conversación como resuelta ✅');
      }
    }).catch(function () {});
    if (!todo) { s2._leyendo = p; p.then(function () { s2._leyendo = null; }); }
    return p;
  }
  function programarLectura() {
    clearInterval(tPoll);
    tPoll = setInterval(function () {
      if (document.visibilityState !== 'visible') return;
      if (abierto && st && st.convId) leerNuevos(st, false);
      else if (!abierto) revisarRespuestas();
    }, 5000);
  }
  // Con el chat cerrado: avisar si el asesor respondió
  var ultimaRevision = 0;
  function revisarRespuestas() {
    if (configFija || Date.now() - ultimaRevision < 30000) return;
    ultimaRevision = Date.now();
    var loc = leerLocal();
    if (!loc || loc.estado !== 'humano') return;
    rpc('chat_estado', { p_id: loc.id, p_token: token() }).then(function (e) {
      if (!e) return;
      if (e.no_leidos > 0 && !abierto) {
        construir();
        ui.pastilla.querySelector('i').textContent = e.no_leidos;
        ui.pastilla.classList.remove('oculto');
      }
      if (e.estado !== 'humano') { try { localStorage.setItem(CLAVE_CONV, JSON.stringify({ id: loc.id, estado: e.estado, t: Date.now() })); } catch (x) {} }
    }).catch(function () {});
  }

  function abrir(textoOriginal, urlOriginal) {
    construir();
    ui.pastilla.classList.add('oculto');
    host.style.pointerEvents = 'auto';
    abierto = true;
    requestAnimationFrame(function () { ui.cont.classList.add('on'); });
    programarLectura();
    // ¿Tiene una conversación abierta con un asesor? Se continúa ahí mismo.
    var loc = !configFija && leerLocal();
    if (loc && loc.estado === 'humano' && (!st || st.convId !== loc.id)) {
      nuevaConversacion('', urlOriginal);
      st.convId = loc.id; st.estado = 'humano'; st.avisoHumano = Date.now();
      ui.msgs.innerHTML = '';
      avisoSistema('Tu conversación con DL COMPANY');
      leerNuevos(st, true).then(function () {
        var extra = textoOriginal && textoOriginal.replace(/^¡?hola dl company!?\s*👋?\s*/i, '').trim();
        if (extra && !/^vengo de (la p[aá]gina web|la app [^.]*)\.?$/i.test(extra)) burbuja(extra, 'yo');
        pintarChips([]);
      });
      return;
    }
    if (st && st.estado === 'humano' && textoOriginal === undefined) { leerNuevos(st, false); return; }
    var nuevo = !st || textoOriginal !== undefined;
    if (nuevo) {
      nuevaConversacion(textoOriginal, urlOriginal);
      ui.msgs.innerHTML = '';
    }
    if (!nuevo) return;
    if (textoOriginal) {
      burbuja(textoOriginal.replace(/^¡?hola dl company!?\s*👋?\s*/i, ''), 'yo');
      var resp = interpretarPrimero(textoOriginal) ;
      responder(resp);
    } else {
      var m = menuPrincipal('');
      responder(r(presentacion() + ' ' + (st.app ? 'Estoy aquí para ayudarte con todo lo de *' + APPS[st.app].nombre + '* ' + APPS[st.app].icono + '.\n\n' : 'Estoy aquí para ayudarte.\n\n') + m.texto, m.chips));
    }
  }
  function cerrar() {
    if (!host) return;
    abierto = false;
    ultimaRevision = Date.now();
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
    if (d && pasaDirecto(d.texto)) {
      var w = abrirOriginal(url, '_blank');
      if (w) { try { w.opener = null; } catch (e) {} return w; }
      return abrirOriginal.apply(window, arguments);
    }
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

  /* =====================================================================
   * VESTIR LOS BOTONES DE WHATSAPP CON EL LOGO DE ARIA
   * (en la web y en todas las apps que cargan este archivo)
   * ===================================================================== */
  var VERDE = /37,\s*211,\s*102|18,\s*140,\s*126|7,\s*94,\s*84/; // verdes de WhatsApp
  function logoImg(px) {
    var img = document.createElement('img');
    img.src = ARIA_LOGO; img.alt = 'ARIA'; img.className = 'dl-aria-logo';
    img.style.cssText = px ? 'width:100%;height:100%;border-radius:50%;object-fit:cover;display:block'
      : 'width:1.35em;height:1.35em;border-radius:50%;object-fit:cover;vertical-align:-.3em;display:inline-block;flex:none';
    return img;
  }
  function quitarVerde(el) {
    var cs = getComputedStyle(el);
    if (VERDE.test(cs.backgroundColor) || VERDE.test(cs.backgroundImage)) {
      var transp = /rgba\([^)]*,\s*0?\.\d+\)/.test(cs.backgroundColor);
      el.style.setProperty('background', transp ? 'rgba(212,175,55,.1)' : 'linear-gradient(135deg,#d4af37,#f5d77a)', 'important');
      if (!transp) el.style.setProperty('color', '#1a1405', 'important');
    }
    if (VERDE.test(cs.borderTopColor) && parseFloat(cs.borderTopWidth) > 0) el.style.setProperty('border-color', '#d4af37', 'important');
    if (VERDE.test(cs.boxShadow)) el.style.setProperty('box-shadow', '0 8px 24px rgba(212,175,55,.35)', 'important');
  }
  function vestir(a) {
    if (a.getAttribute('data-aria') || a.closest('#dl-chat')) return;
    var d = datosWhatsApp(a.getAttribute('href'));
    if (!d || pasaDirecto(d.texto)) return;
    a.setAttribute('data-aria', '1');
    var flotante = getComputedStyle(a).position === 'fixed';
    if (flotante) {
      // Botón flotante: se vuelve el logo de ARIA completo
      a.innerHTML = ''; a.appendChild(logoImg(true));
      a.style.setProperty('background', '#0b1220', 'important');
      a.style.setProperty('padding', '0', 'important');
      a.style.setProperty('overflow', 'hidden', 'important');
      a.style.setProperty('box-shadow', '0 0 0 2px rgba(212,175,55,.75), 0 10px 28px rgba(0,0,0,.45)', 'important');
    } else {
      // Íconos de WhatsApp (svg o Font Awesome) → logo de ARIA
      var iconos = a.querySelectorAll('svg, i[class*="whatsapp"], img[src*="whatsapp" i]');
      Array.prototype.forEach.call(iconos, function (ic) {
        var cont = ic.parentNode;
        if (cont !== a && cont.children.length === 1 && !cont.textContent.trim()) {
          cont.style.setProperty('background', 'transparent', 'important');
          cont.style.setProperty('padding', '0', 'important');
          cont.innerHTML = ''; cont.appendChild(logoImg(true));
        } else ic.parentNode.replaceChild(logoImg(false), ic);
      });
      // Textos: "por WhatsApp" → "con ARIA"; un 💬/📲 inicial → logo
      var tw = document.createTreeWalker(a, NodeFilter.SHOW_TEXT), nodos = [], n;
      while ((n = tw.nextNode())) nodos.push(n);
      var primero = true;
      nodos.forEach(function (t) {
        var v = t.nodeValue;
        if (primero && v.trim()) {
          primero = false;
          var mm = v.match(/^(\s*)(💬|📲|📱)\s*/);
          if (mm && !iconos.length) { t.parentNode.insertBefore(logoImg(false), t); t.parentNode.insertBefore(document.createTextNode(' '), t); v = v.slice(mm[0].length); }
        }
        v = v.replace(/\b(por|a|al|en|v[ií]a) WhatsApp\b/gi, 'con ARIA').replace(/WhatsApp/gi, 'ARIA');
        if (v !== t.nodeValue) t.nodeValue = v;
      });
    }
    ['title', 'aria-label'].forEach(function (k) {
      var v = a.getAttribute(k);
      if (v && /whatsapp/i.test(v)) a.setAttribute(k, v.replace(/\b(por|a|al|en) WhatsApp\b/gi, 'con ARIA').replace(/WhatsApp/gi, 'ARIA'));
    });
    if (!a.getAttribute('title')) a.setAttribute('title', 'Habla con ARIA, la asistente de DL COMPANY');
    try {
      quitarVerde(a);
      Array.prototype.forEach.call(a.querySelectorAll('*'), function (el) { if (!el.classList.contains('dl-aria-logo')) quitarVerde(el); });
    } catch (e) {}
  }
  // Textos de soporte en toda la página: "Soporte (prioritario) por WhatsApp" → "con ARIA"
  var RE_SOPORTE = /(soporte(?: prioritario)?) (?:por|v[ií]a) WhatsApp/gi;
  function textosSoporte() {
    var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) { return /whatsapp/i.test(n.nodeValue) && !(n.parentNode && /^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName)) ? 1 : 3; },
    }), n, lista = [];
    while ((n = tw.nextNode())) lista.push(n);
    lista.forEach(function (t) { var v = t.nodeValue.replace(RE_SOPORTE, '$1 con ARIA'); if (v !== t.nodeValue) t.nodeValue = v; });
  }
  var tVestir = 0;
  function vestirTodo() {
    tVestir = 0;
    if (GENERAL.activo === false || !document.body) return;
    try { textosSoporte(); } catch (e) {}
    Array.prototype.forEach.call(document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]'), function (a) { try { vestir(a); } catch (e) {} });
  }
  function programarVestir() { if (!tVestir) tVestir = setTimeout(vestirTodo, 120); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', vestirTodo); else vestirTodo();
  try { new MutationObserver(programarVestir).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}

  // Al cargar la página: si el asesor respondió mientras el cliente no estaba, mostrar el aviso
  setTimeout(function () { revisarRespuestas(); programarLectura(); }, 2500);

  window.DLChat = {
    abrir: function (texto) { abrir(texto || undefined); },
    // Abrir como si el cliente viniera de una app (web, finanzas, stock, cuadra, comanda, arte)
    abrirComo: function (app, texto) { APP_ACTUAL = String(app || 'web'); st = null; abrir(texto || undefined); },
    // Para la app de administración: probar cambios sin guardarlos
    usarConfig: function (c) { configFija = true; aplicarConfig(c); st = null; },
    defecto: function () { return copiar(DEFECTO); },
    config: function () { return copiar(CFG); },
    cerrar: cerrar,
    version: '2.1.0',
    // Para pruebas: simula una conversación sin interfaz
    _probar: function (texto, app) {
      var prev = APP_ACTUAL; APP_ACTUAL = app || APP_ACTUAL;
      nuevaConversacion(texto); var out = interpretarPrimero(texto); APP_ACTUAL = prev; return out;
    },
    _texto: function (t) { return procesarTexto(t); },
    _estado: function () { return st ? { app: st.app, origen: st.origen, original: st.original, codigo: st.codigo, chat: st.chat } : null; },
    _accion: function (a) { return accion(a); },
  };
})();
