# Contenido de las páginas legales de LOOPI (terminos.html, privacidad.html, cookies.html).
# Regenerar: python3 tools/legal/legalgen.py tools/legal/config.py .
# Al cambiar un texto de fondo, sube VERSION y la fecha de UPDATED.
#
# PENDIENTE (lo da el dueño): razón social y RIF. Cuando estén, añadirlos en
# "Quiénes somos" (Términos) y "Responsable" (Privacidad).
# CONFIRMAR con el dueño: la regla de cancelación (sección 6) y la de entregas fallidas (sección 4).

VERSION = "2026-10-25.3"
WA = '<a href="https://wa.me/584223332505">+58 422-333-2505</a>'
MAIL = '<a href="mailto:Loopicaracas@gmail.com">Loopicaracas@gmail.com</a>'
IG = '<a href="https://www.instagram.com/loopi.ccs" rel="noopener">@loopi.ccs</a>'

SITE = {
    "name": "loopi",
    "brand_html": 'loopi',
    "kicker": {"es": "loopi · Caracas"},
    "langs": ["es"],
    "lang_key": None,
    "home": {"es": "./index.html"},
    "files": {"terms": "terminos.html", "privacy": "privacidad.html", "cookies": "cookies.html"},
    "version": VERSION,
    # Versión de cada documento (sube solo la del que cambió)
    "versions": {"terms": VERSION, "privacy": "2026-10-25", "cookies": "2026-10-25"},
    "updated": {"es": "25 de octubre de 2026"},
    "head": '<link rel="icon" type="image/svg+xml" href="./assets/logo/loopi-isotipo.svg">\n'
            '<link rel="icon" href="./favicon.ico" sizes="any">\n'
            '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
            '<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">',
    "style": {
        "bg": "#FFF8EE", "ink": "#111111", "muted": "#5f5a55", "accent": "#870089", "line": "#EADFCF", "card": "#FFEFD6",
        "display": "'Bungee', 'Poppins', sans-serif", "body": "'Poppins', system-ui, sans-serif",
        "brand_size": "26px", "brand_track": "0.02em", "h_weight": "400",
    },
}

T = [
    ("1. Quiénes somos", [
        f"loopi hace mini lumpias en Caracas, Venezuela, y las vende para delivery, pick up y eventos. Atendemos de lunes a domingo, de 9:00 a. m. a 6:00 p. m. Contacto: WhatsApp {WA}, correo {MAIL} e Instagram {IG}.",
    ]),
    ("2. Cómo se hace un pedido", [[
        "Al usar «Mi pedido» y pulsar «Enviar pedido por WhatsApp» se prepara un mensaje con tu pedido. Es una solicitud: el pedido queda confirmado cuando te confirmamos por WhatsApp la disponibilidad, el total, la forma de entrega y la forma de pago.",
        "Las comunicaciones y aceptaciones por WhatsApp o correo tienen plena validez, conforme a la Ley sobre Mensajes de Datos y Firmas Electrónicas.",
        "Quien hace el pedido debe ser mayor de edad.",
    ]]),
    ("3. Precios y pagos", [[
        "Los precios publicados están en dólares estadounidenses y son referenciales. El precio es el mismo cualquiera sea la moneda de pago: si pagas en bolívares, se calcula a la tasa oficial del Banco Central de Venezuela del día del pago.",
        "Aceptamos los medios de pago indicados en el sitio (pago móvil, Zelle, efectivo y Binance).",
        "El total de tu pedido es el que te confirmamos por WhatsApp, con el costo de delivery incluido cuando corresponda.",
    ]]),
    ("4. Entregas", [[
        "Pick up: sin costo, en el lugar y la hora que coordinemos por WhatsApp.",
        "Delivery: en las zonas de Caracas indicadas en el sitio, con el costo de cada zona. La hora de entrega se coordina por WhatsApp y es aproximada: puede variar por tráfico, lluvia u otras causas ajenas a nosotros.",
        "Para el delivery debes darnos una dirección correcta y que haya alguien para recibir. Si la dirección es incorrecta o nadie recibe, coordinaremos una nueva entrega, que puede tener costo adicional.",
    ]]),
    ("5. Alimentos, alérgenos y conservación", [[
        "Nuestras lumpias se hacen el mismo día. Las fotos son ilustrativas: la presentación puede variar un poco.",
        "Nuestros productos pueden contener o haber estado en contacto con alérgenos comunes, como trigo (gluten), leche, huevo, soya y frutos secos. Si tienes alguna alergia o intolerancia, pregúntanos antes de pedir.",
        "Desde que recibes el pedido, su conservación y consumo quedan bajo tu responsabilidad: sigue las indicaciones que te demos.",
    ]]),
    ("6. Cambios, cancelaciones y reclamos por pedidos", [[
        "Puedes cancelar sin costo antes de que confirmemos tu pedido. Una vez confirmado y en preparación, por tratarse de comida hecha al momento, no es posible cancelarlo ni devolverlo.",
        "Si el pedido llega en mal estado o no corresponde con lo que pediste, escríbenos por WhatsApp el mismo día, con una foto, y te lo reponemos o te devolvemos lo pagado por ese producto.",
    ]]),
    ("7. Eventos", [
        "Las cotizaciones para eventos se piden por WhatsApp, correo o Instagram. Cada evento se rige por su propuesta escrita (fecha, cantidades, precio, anticipo, entrega y condiciones de cancelación), que aceptas al confirmarla y pagar.",
    ]),
    ("8. Fuerza mayor", [
        "Ninguna de las partes responde por retrasos o incumplimientos causados por hechos ajenos a su control que no pudo prever ni evitar (causa extraña no imputable, artículo 1.272 del Código Civil): cortes de electricidad o de comunicaciones, falta de insumos, lluvias fuertes, problemas graves de tránsito o decisiones de autoridades. Si ocurre, te avisaremos lo antes posible y reprogramaremos la entrega o te devolveremos lo pagado por lo que no podamos entregar.",
    ]),
    ("9. Contenido de este sitio", [
        "La marca loopi, el logotipo, los textos, las fotos y el diseño de este sitio pertenecen a loopi. No pueden copiarse ni reutilizarse sin permiso escrito.",
    ]),
    ("10. Servicios de terceros", [
        "El sitio enlaza con WhatsApp e Instagram. Esos servicios se rigen por sus propias condiciones y políticas de privacidad.",
    ]),
    ("11. Responsabilidad", [
        "Hacemos lo posible para que la información del sitio sea exacta y esté actualizada, pero la disponibilidad y el total de cada pedido solo son definitivos en nuestra confirmación por WhatsApp. Nada de lo aquí escrito limita los derechos que la ley te reconoce como consumidor, que son irrenunciables.",
    ]),
    ("12. Si nos visitas o contratas desde otro país", [
        "Nuestros servicios se prestan en Venezuela y se rigen por la ley venezolana. Si usas el sitio o contratas desde otro país, eres responsable de cumplir las leyes de tu país.",
    ]),
    ("13. Uso del sitio", [
        "No está permitido usar el sitio o nuestros canales de contacto con fines ilícitos o fraudulentos, enviar mensajes masivos no solicitados, intentar acceder sin autorización a sus sistemas ni copiar su contenido de forma automatizada.",
    ]),
    ("14. Acuerdo completo", [
        "Estos términos, junto con la confirmación de tu pedido o la propuesta de tu evento, forman todo lo acordado entre las partes. No valen promesas ni acuerdos de palabra que no consten por escrito (correo o WhatsApp).",
    ]),
    ("15. Ley aplicable y reclamos", [
        "Estos términos se rigen por las leyes de la República Bolivariana de Venezuela. Si tienes un reclamo, escríbenos por WhatsApp o correo y te responderemos en un plazo máximo de 10 días hábiles. También puedes acudir a la Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos (SUNDDE) o a los tribunales competentes. Para cualquier controversia, las partes eligen como domicilio especial la ciudad de Caracas, a cuyos tribunales se someten, sin perjuicio del fuero que la ley reconozca al consumidor.",
    ]),
    ("16. Cambios", [
        "Podemos actualizar estos términos. La versión vigente es la publicada en esta página con su fecha; cada pedido se rige por la versión vigente cuando fue confirmado.",
    ]),
]

P = [
    ("1. Responsable", [
        f"loopi, con sede en Caracas, Venezuela, es responsable de los datos que nos das. Para cualquier pregunta sobre tus datos: WhatsApp {WA} o {MAIL}.",
    ]),
    ("2. Qué datos tratamos y para qué", [
        "El sitio no tiene formularios ni registro de usuarios, no usa cookies propias ni herramientas de analítica o publicidad, y no guarda en ningún servidor información sobre ti. Solo tratamos lo que tú decides enviarnos:",
        ("table", ["Cuándo", "Datos", "Para qué"], [
            ["Al armar tu pedido", "Sabores, cantidades, salsas, forma de entrega y zona. Se guardan solo en tu navegador hasta que envías el pedido por WhatsApp.", "Preparar tu pedido."],
            ["Si nos escribes por WhatsApp, correo o Instagram", "Tu número, correo o usuario y lo que nos escribas.", "Responderte y gestionar tu pedido o evento."],
            ["Si pides delivery", "Tu nombre, dirección y teléfono de contacto.", "Hacer la entrega."],
            ["Al pagar", "Los datos del pago que nos envíes (por ejemplo, el comprobante).", "Verificar el pago y cumplir obligaciones legales y fiscales."],
            ["Al visitar el sitio", "Datos técnicos de conexión (dirección IP, navegador) que reciben el alojamiento y los proveedores de contenido.", "Entregar la página de forma segura. No accedemos a ellos."],
        ]),
        "Usamos tus datos con tu consentimiento, que das al escribirnos, y para cumplir tu pedido. No vendemos datos, no los usamos para publicidad y no te enviaremos mensajes promocionales sin tu permiso.",
    ]),
    ("3. Con quién se comparten", [
        "Solo con quien hace falta para atenderte, y con las autoridades cuando la ley lo exija:",
        [
            "La persona que hace el delivery, solo con tu nombre, dirección y teléfono.",
            "Meta (WhatsApp e Instagram) y Google (Gmail), para las conversaciones que inicias.",
            "El banco o la plataforma con la que pagas, según sus propias políticas.",
            "Vercel y GitHub (alojamiento del sitio) y Google (fuentes tipográficas), que reciben datos técnicos de conexión, como la IP, para entregar la página.",
        ],
        "Algunos de estos proveedores procesan datos fuera de Venezuela, principalmente en Estados Unidos.",
    ]),
    ("4. Cuánto tiempo los guardamos", [[
        "Conversaciones y datos de entrega: hasta 12 meses después de tu último pedido.",
        "Datos de pagos: el tiempo que exija la normativa tributaria y mercantil.",
    ]]),
    ("5. Tus derechos", [
        "Según los artículos 28 y 60 de la Constitución, puedes pedir en cualquier momento saber qué datos tenemos sobre ti y para qué, que los actualicemos, corrijamos o eliminemos, y retirar tu consentimiento, sin efecto sobre lo hecho antes. Escríbenos y responderemos en un máximo de 15 días hábiles. Si pides eliminar tus datos, solo conservaremos lo que exija la ley.",
    ]),
    ("6. Seguridad y menores", [
        "El sitio funciona con conexión cifrada (HTTPS) y tus conversaciones solo las atiende el equipo de loopi. Los pedidos deben hacerlos personas mayores de edad.",
    ]),
    ("7. Cambios", [
        "Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha.",
    ]),
]

C = [
    ("1. Cookies propias", [
        "loopi no usa cookies propias, ni de analítica ni de publicidad. Solo guarda en tu navegador tu pedido en curso, que no te identifica y no sale de tu dispositivo hasta que lo envías por WhatsApp:",
        ("table", ["Nombre", "Para qué", "Duración"], [
            ["loopi-pedido-v1 (almacenamiento local)", "Guardar los sabores, cantidades y forma de entrega de tu pedido mientras navegas.", "Hasta que vacíes el pedido o lo borres."],
        ]),
    ]),
    ("2. Fuentes tipográficas", [
        "Las tipografías del sitio se descargan de Google Fonts. No instalan cookies, pero Google recibe datos técnicos de conexión, como la IP, para entregarlas.",
    ]),
    ("3. WhatsApp e Instagram", [
        "Los botones de WhatsApp e Instagram son enlaces normales: no cargan nada de esos servicios hasta que los pulsas. A partir de ahí aplican sus propias políticas.",
    ]),
    ("4. Cómo controlarlas", [
        "Puedes borrar el almacenamiento y bloquear o borrar cookies desde la configuración de tu navegador; el sitio seguirá funcionando (si borras el almacenamiento, se vacía tu pedido).",
    ]),
]

DOCS = {
    "terms": {"es": {"title": "Términos y condiciones", "description": "Condiciones de los pedidos, entregas y eventos de loopi en Caracas.",
                     "intro": ["Estos términos regulan el uso de este sitio y los pedidos de loopi. Al usar el sitio o hacer un pedido, aceptas estos términos."],
                     "sections": T}},
    "privacy": {"es": {"title": "Política de privacidad", "description": "Qué datos trata loopi, para qué, con quién se comparten y cómo ejercer tus derechos.",
                       "intro": ["Aquí te contamos qué datos tuyos usamos, para qué, cuánto tiempo los guardamos y cómo puedes pedir que los cambiemos o borremos."],
                       "sections": P}},
    "cookies": {"es": {"title": "Política de cookies", "description": "loopi no usa cookies propias. Qué guarda tu navegador mientras armas tu pedido.",
                       "intro": ["Las cookies son pequeños archivos que un sitio guarda en tu navegador. Esta página explica qué se guarda al visitar loopi."],
                       "sections": C}},
}
