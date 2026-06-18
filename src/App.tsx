import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Database,
  Globe,
  Hotel,
  Menu,
  MessageSquare,
  Percent,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';

type Section = 'inicio' | 'diagnostico' | 'metodo' | 'servicios' | 'faq';
type FormData = {
  nombre: string;
  hotel: string;
  ciudad: string;
  habitaciones: string;
  canal: string;
  problema: string;
  contacto: string;
  mensaje: string;
};

const navItems: { label: string; value: Section }[] = [
  { label: 'Inicio', value: 'inicio' },
  { label: 'Diagnostico', value: 'diagnostico' },
  { label: 'Metodo', value: 'metodo' },
  { label: 'Servicios', value: 'servicios' },
  { label: 'FAQ', value: 'faq' },
];

const painPoints = [
  { icon: Percent, title: 'Dependencia de Booking y Expedia', desc: 'Las reservas llegan, pero parte del margen se queda en comisiones.' },
  { icon: MessageSquare, title: 'WhatsApp sin seguimiento claro', desc: 'Cada solicitud depende de memoria, rapidez y disciplina manual.' },
  { icon: Globe, title: 'Web que no convierte o no existe', desc: 'Una visita interesada no siempre termina en solicitud directa.' },
  { icon: Database, title: 'Sin CRM ni base de datos util', desc: 'El hotel pierde datos, recompra, trazabilidad y control comercial.' },
  { icon: CreditCard, title: 'Margen comido por plataformas', desc: 'Crecer ocupacion no siempre significa crecer utilidad.' },
  { icon: BarChart3, title: 'Decisiones por intuicion', desc: 'Lo que no se mide se convierte en una intuicion cara.' },
];

const diagnosticAxes = [
  ['Reservas directas', 'Revisamos si web, WhatsApp y canales propios convierten interes en solicitudes.', 'Que porcentaje de tus reservas llega por canal directo?'],
  ['Dependencia OTA', 'Medimos el peso comercial de Booking, Expedia, Airbnb y comisiones asociadas.', 'Cuanto margen se va cada mes en intermediacion?'],
  ['WhatsApp y CRM', 'Auditamos tiempos de respuesta, seguimiento, etiquetas, datos y recompra.', 'Cuantas oportunidades se pierden por falta de seguimiento?'],
  ['Presencia web', 'Evaluamos claridad de oferta, confianza, velocidad, CTA y conversion.', 'Tu pagina responde en 5 segundos por que reservar directo?'],
  ['Operacion comercial', 'Mapeamos roles, procesos, responsables, objeciones y seguimiento interno.', 'Quien es responsable de convertir cada solicitud?'],
  ['Oportunidades financieras', 'Ordenamos prioridades de inversion, documentacion y decisiones de crecimiento.', 'Que inversion debe moverse primero y por que?'],
];

const deliverables = [
  'Mapa de fugas comerciales.',
  'Analisis de dependencia de plataformas.',
  'Revision de presencia digital y web.',
  'Revision de seguimiento de prospectos y huespedes.',
  'Prioridades de implementacion.',
  'Ruta AVORA de 90 dias.',
  'Recomendacion de modulo directo, operativo, financiero o comercial.',
];

const method = [
  ['A', 'Alto', 'Detenemos la operacion diaria para ver donde se pierde margen, seguimiento y control.'],
  ['V', 'Ve tu contexto', 'Analizamos canales, huespedes, procesos, equipo, plataformas y datos reales.'],
  ['O', 'Organizate', 'Convertimos hallazgos en prioridades, responsables, entregables y metricas.'],
  ['R', 'Rompe tu esquema', 'Dejamos atras la operacion improvisada y la dependencia total de terceros.'],
  ['A', 'Avanza', 'Implementamos una ruta medible para que el crecimiento tenga direccion.'],
];

const roadmap = [
  ['Dia 1 a 15', 'Diagnostico profundo', 'Ver lo que hoy no se esta midiendo.', 'Canales, web, OTAs, WhatsApp, CRM, procesos y reputacion.', 'Mapa claro de fugas y oportunidades.'],
  ['Dia 16 a 30', 'Ruta y prioridades', 'Ordenar decisiones antes de gastar.', 'Priorizacion, responsables, herramientas y secuencia de trabajo.', 'Plan de accion con foco comercial.'],
  ['Dia 31 a 60', 'Sistema comercial', 'Convertir interes en solicitudes directas.', 'Web, WhatsApp, CRM basico, guiones, seguimiento y medicion.', 'Operacion comercial mas trazable.'],
  ['Dia 61 a 90', 'Medicion y escalamiento', 'Ajustar lo que mueve reservas y margen.', 'Revision de metricas, objeciones, procesos y proximos modulos.', 'Ruta lista para sostener crecimiento.'],
];

const modules = [
  { icon: Route, title: 'Ruta Directa', problem: 'Demasiada intermediacion y poco canal propio.', intervention: 'Web, WhatsApp, CRM, embudo y mensajes de reserva directa.', result: 'Mas control sobre solicitudes, datos y margen.' },
  { icon: ClipboardList, title: 'Ruta Operativa', problem: 'Seguimiento comercial disperso y roles poco claros.', intervention: 'Procesos, responsables, capacitacion, checklists y tableros.', result: 'Menos oportunidades perdidas por desorden.' },
  { icon: CreditCard, title: 'Ruta Financiera', problem: 'Inversiones decididas sin informacion suficiente.', intervention: 'Prioridades, estructura documental y preparacion para decisiones de capital.', result: 'Crecimiento financiero mas ordenado y defendible.' },
  { icon: TrendingUp, title: 'Ruta Comercial', problem: 'Reputacion, campanas y alianzas sin sistema.', intervention: 'Prospeccion, reputacion, campanas, alianzas y datos.', result: 'Demanda trabajada con medicion y seguimiento.' },
];

const faqs = [
  ['AVORA es una agencia de marketing?', 'No. AVORA es una firma de crecimiento hotelero. Puede construir web, CRM, mensajes o campanas, pero solo despues de diagnosticar donde se escapan reservas, margen y seguimiento.'],
  ['Tambien hacen paginas web?', 'Si, cuando la web es parte de la ruta correcta. No vendemos paginas a ciegas: primero revisamos canal directo, conversion, WhatsApp, reputacion y proceso comercial.'],
  ['Que pasa despues del diagnostico?', 'Recibes mapa de fugas, prioridades, ruta de 90 dias y recomendacion de modulo. Despues decides si implementas Ruta Directa, Operativa, Financiera o Comercial.'],
  ['Trabajan con hoteles pequenos?', 'Si. El enfoque esta pensado para hoteles independientes, pequenos y medianos que necesitan mas control comercial sin convertir su operacion en algo pesado.'],
  ['Pueden ayudar si ya uso Booking?', 'Si. Booking puede seguir siendo parte del mix. El objetivo es medir dependencia, proteger margen y desarrollar canales propios donde sea viable.'],
  ['Necesito tener CRM?', 'No. Si no existe, AVORA puede proponer una version simple para empezar a ordenar solicitudes, huespedes, seguimiento y recompra.'],
  ['Cuanto dura el proceso?', 'El diagnostico abre la ruta. La implementacion sugerida se organiza en 90 dias, con fases de diagnostico, prioridades, sistema comercial, medicion y ajuste.'],
  ['El diagnostico obliga a contratar implementacion?', 'No. El diagnostico debe darte claridad por si mismo. La implementacion posterior se propone solo si hay una ruta con sentido comercial.'],
];

const canalOptions = ['Booking / Expedia', 'Airbnb', 'WhatsApp directo', 'Pagina web', 'Redes sociales', 'Agencias / convenios', 'No lo tengo medido'];
const problemaOptions = ['Dependencia de OTAs', 'Pocas reservas directas', 'WhatsApp desordenado', 'No tengo CRM', 'Web que no convierte', 'Falta de seguimiento comercial', 'No se donde se pierde margen', 'Necesito ordenar la ruta de crecimiento'];

function Logo() {
  return <span className="logo" aria-label="AVORA Business Growth">AVORA</span>;
}

function App() {
  const [section, setSection] = useState<Section>('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState<FormData>({ nombre: '', hotel: '', ciudad: '', habitaciones: '', canal: '', problema: '', contacto: '', mensaje: '' });
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState('');

  const go = (next: Section) => {
    setSection(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = () => {
    const message = [
      `Hola, soy ${form.nombre || '[nombre]'}.`,
      `Me interesa solicitar un Diagnostico AVORA 360 para ${form.hotel || 'mi hotel'}.`,
      'Quiero revisar reservas directas, dependencia de OTAs y oportunidades de crecimiento.',
      form.ciudad ? `Ciudad: ${form.ciudad}.` : '',
      form.habitaciones ? `Habitaciones: ${form.habitaciones}.` : '',
      form.canal ? `Canal principal: ${form.canal}.` : '',
      form.problema ? `Problema principal: ${form.problema}.` : '',
      form.contacto ? `Contacto: ${form.contacto}.` : '',
    ].filter(Boolean).join(' ');
    return `https://wa.me/525639472727?text=${encodeURIComponent(message)}`;
  };

  const submitLead = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('Enviando...');
    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, oferta: 'Diagnostico AVORA 360' }),
      });
      if (!response.ok) throw new Error('backend');
      setSent(true);
      setStatus('');
    } catch {
      setStatus('El formulario quedo listo, pero falta validar el backend de correo. Puedes continuar por WhatsApp.');
    }
  };

  return (
    <div>
      <div className="background" />
      <header className="nav">
        <button className="brand" onClick={() => go('inicio')}><Logo /></button>
        <nav className="desktop-nav">
          {navItems.map((item) => <button key={item.value} onClick={() => go(item.value)} className={section === item.value ? 'active' : ''}>{item.label}</button>)}
        </nav>
        <button className="nav-cta" onClick={() => go('diagnostico')}>Solicitar diagnostico</button>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <div className="mobile-nav">{navItems.map((item) => <button key={item.value} onClick={() => go(item.value)}>{item.label}</button>)}<button className="primary" onClick={() => go('diagnostico')}>Solicitar diagnostico hotelero</button></div>}

      {section === 'inicio' && <main>
        <section className="hero">
          <div className="hero-art"><div className="hotel-lines" /><div className="hotel-frame" /></div>
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Firma de crecimiento hotelero</p>
              <h1>Tu hotel no necesita mas plataformas. Necesita un sistema de crecimiento.</h1>
              <p className="lead">AVORA ayuda a hoteles independientes a detectar fugas comerciales, ordenar reservas directas, reducir dependencia de OTAs y construir una ruta de crecimiento en 90 dias.</p>
              <div className="actions"><button className="primary" onClick={() => go('diagnostico')}>Solicitar diagnostico hotelero <ArrowRight size={18} /></button><button className="secondary" onClick={() => go('metodo')}>Ver metodologia</button></div>
              <p className="micro">Para hoteles independientes, pequenos y medianos que quieren vender con mas control.</p>
            </div>
            <div className="metric-grid">
              <article className="card"><Hotel /><strong>360</strong><span>Diagnostico de canales, operacion y seguimiento.</span></article>
              <article className="card"><Percent /><strong>Margen</strong><span>Lectura de comisiones, fugas y canal directo.</span></article>
              <article className="card wide"><BadgeCheck /><strong>90 dias</strong><span>Ruta de prioridades, implementacion, medicion y ajuste.</span></article>
            </div>
          </div>
        </section>

        <section className="band"><div className="container pain-grid">{painPoints.map((card) => <article className="card" key={card.title}><card.icon /><h2>{card.title}</h2><p>{card.desc}</p></article>)}</div></section>

        <section className="container split"><div><p className="eyebrow">El problema real</p><h2>El problema no es solo vender mas. Es no saber donde se esta escapando el crecimiento.</h2></div><div><p>Muchos hoteles tienen demanda, ubicacion, habitaciones y equipo, pero pierden margen porque su operacion comercial vive fragmentada entre OTAs, WhatsApp, llamadas, redes sociales y procesos manuales.</p><p>Si el hotel no mide origen de reserva, seguimiento, comision, conversion y recompra, no sabe realmente que esta perdiendo. AVORA ordena ese mapa antes de proponer cualquier solucion.</p></div></section>

        <DiagnosticBlock go={go} />
        <MethodBlock />
        <RoadmapBlock />
        <ModulesBlock />
        <ComparisonBlock />
        <CaseBlock />
        <TrustBlock />
        <FaqPreview go={go} />
        <FinalCta go={go} />
      </main>}

      {section === 'diagnostico' && <main><DiagnosticPage form={form} setForm={setForm} submitLead={submitLead} sent={sent} status={status} whatsappUrl={whatsappUrl} /></main>}
      {section === 'metodo' && <main><MethodPage /></main>}
      {section === 'servicios' && <main><ServicesPage go={go} /></main>}
      {section === 'faq' && <main><FaqPage openFaq={openFaq} setOpenFaq={setOpenFaq} go={go} /></main>}

      <Footer go={go} />
    </div>
  );
}

function DiagnosticBlock({ go }: { go: (s: Section) => void }) {
  return <section className="band" id="diagnostico"><div className="container"><div className="intro"><p className="eyebrow">Oferta central</p><h2>Diagnostico AVORA 360</h2><p>Antes de construir una web, contratar anuncios o implementar un CRM, tu hotel necesita saber donde se escapan las reservas, el margen y el seguimiento.</p></div><div className="axis-grid">{diagnosticAxes.map(([title, desc, question]) => <article className="card" key={title}><Search /><h3>{title}</h3><p>{desc}</p><small>{question}</small></article>)}</div><div className="deliverables"><article className="card"><h3>Que recibe el hotel</h3><p>El diagnostico evita gastar en tecnologia antes de saber que problema se quiere resolver.</p><button className="primary" onClick={() => go('diagnostico')}>Quiero diagnosticar mi hotel</button></article><div>{deliverables.map((item) => <p key={item}><CheckCircle2 size={18} /> {item}</p>)}</div></div></div></section>;
}

function MethodBlock() {
  return <section className="container section"><div className="intro center"><p className="eyebrow">Metodo AVORA</p><h2>Cambiar el cerebro, no la piel.</h2><p>La identidad visual se mantiene; lo que cambia es la arquitectura comercial y el sistema de conversion.</p></div><div className="method-grid">{method.map(([letter, title, desc]) => <article className="card center-card" key={title}><b>{letter}</b><h3>{title}</h3><p>{desc}</p></article>)}</div></section>;
}

function RoadmapBlock() {
  return <section className="band"><div className="container"><div className="intro"><p className="eyebrow">Ruta AVORA 90 dias</p><h2>De diagnostico a sistema en 90 dias.</h2><p>AVORA no entrega ideas sueltas. Construimos una secuencia con prioridades, responsables y metricas.</p></div><div className="roadmap">{roadmap.map(([range, title, objective, actions, result], index) => <article className="card" key={range}><span>{index + 1}</span><small>{range}</small><h3>{title}</h3><p className="gold">{objective}</p><p>{actions}</p><p className="muted">Resultado: {result}</p></article>)}</div></div></section>;
}

function ModulesBlock() {
  return <section className="container section"><div className="intro"><p className="eyebrow">Despues del diagnostico</p><h2>Modulos de implementacion</h2><p>AVORA primero define que fuga importa mas y luego implementa la ruta adecuada.</p></div><div className="module-grid">{modules.map((module) => <article className="card" key={module.title}><module.icon /><h3>{module.title}</h3><p><strong>Problema:</strong> {module.problem}</p><p><strong>Intervencion:</strong> {module.intervention}</p><p><strong>Resultado:</strong> {module.result}</p></article>)}</div></section>;
}

function ComparisonBlock() {
  const rows = [['Vende web, anuncios o contenido aislado.', 'Diagnostica fugas antes de implementar.'], ['Mide entregables de marketing.', 'Mide reservas, seguimiento, margen y control.'], ['Trabaja la apariencia del canal.', 'Conecta tecnologia con procesos y responsables.'], ['Propone actividades.', 'Construye una ruta de crecimiento hotelero.']];
  return <section className="band"><div className="container split"><div><p className="eyebrow">Diferenciacion</p><h2>AVORA no vende piezas sueltas.</h2><p>Una agencia tradicional puede resolver una pieza. AVORA ordena el sistema que hace que esa pieza tenga sentido comercial.</p></div><div className="table-card"><div className="table-head"><b>Agencia tradicional</b><b>AVORA</b></div>{rows.map(([a, b]) => <div className="table-row" key={a}><span>{a}</span><span>{b}</span></div>)}</div></div></section>;
}

function CaseBlock() {
  const rows = [['Situacion inicial', 'Hotel independiente con oportunidad de ordenar presencia digital, seguimiento y crecimiento directo.'], ['Problema detectado', 'Fugas probables en medicion comercial, canal directo y estructura de seguimiento.'], ['Hipotesis de crecimiento', 'Mayor claridad de canales, mejor respuesta y ruta directa pueden recuperar control comercial.'], ['Proximos pasos', 'Completar diagnostico, priorizar acciones y definir implementacion de 90 dias.']];
  return <section className="container section split"><div><p className="eyebrow">Cliente en proceso</p><h2>Caso de diagnostico en construccion</h2><p>Cuando un caso aun no tiene resultados cerrados, se comunica con honestidad: situacion inicial, hipotesis y ruta de trabajo.</p></div><article className="card"><h3>Hotel San Diego</h3><div className="mini-grid">{rows.map(([title, desc]) => <div key={title}><b>{title}</b><p>{desc}</p></div>)}</div></article></section>;
}

function TrustBlock() {
  const signals = ['Metodologia clara antes de implementar.', 'Diagnostico documentado, no solo opinion.', 'Enfoque especifico en hoteles independientes.', 'Ruta de 90 dias con prioridades y responsables.', 'Acompanamiento humano y operativo.', 'Tecnologia conectada con procesos reales.'];
  return <section className="band"><div className="container"><div className="intro center"><p className="eyebrow">Confianza</p><h2>Seriedad antes que promesas infladas.</h2></div><div className="trust-grid">{signals.map((signal) => <article className="card inline" key={signal}><ShieldCheck /> <p>{signal}</p></article>)}</div></div></section>;
}

function FaqPreview({ go }: { go: (s: Section) => void }) {
  return <section className="container section split"><div><p className="eyebrow">Preguntas frecuentes</p><h2>Lo que pregunta un hotel antes de iniciar.</h2><button className="secondary" onClick={() => go('faq')}>Ver todas las preguntas</button></div><div>{faqs.slice(0, 4).map(([q, a]) => <article className="card faq-card" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section>;
}

function FinalCta({ go }: { go: (s: Section) => void }) {
  return <section className="final"><div className="container center"><BadgeCheck /><h2>Descubre donde se esta escapando el crecimiento de tu hotel.</h2><p>El primer paso no es comprar mas tecnologia. Es entender que esta frenando tus reservas directas, tu margen y tu operacion comercial.</p><button className="primary" onClick={() => go('diagnostico')}>Solicitar Diagnostico AVORA 360 <Sparkles size={18} /></button><small>Revision inicial para hoteles independientes y equipos que quieren crecer con mas control.</small></div></section>;
}

function DiagnosticPage({ form, setForm, submitLead, sent, status, whatsappUrl }: { form: FormData; setForm: (value: FormData) => void; submitLead: (event: React.FormEvent) => void; sent: boolean; status: string; whatsappUrl: () => string }) {
  const input = (name: keyof FormData, value: string) => setForm({ ...form, [name]: value });
  return <section className="container page"><div className="intro center"><p className="eyebrow">Puerta de entrada</p><h1>Diagnostico AVORA 360</h1><p>Antes de venderte una web, CRM o anuncios, revisamos donde se escapan reservas, margen y seguimiento.</p></div>{sent ? <article className="card success"><CheckCircle2 /><h2>Recibimos tu solicitud.</h2><p>Revisaremos el contexto del hotel y te contactaremos para definir el siguiente paso.</p></article> : <form className="form card" onSubmit={submitLead}><label>Nombre *<input required value={form.nombre} onChange={(e) => input('nombre', e.target.value)} /></label><label>Hotel *<input required value={form.hotel} onChange={(e) => input('hotel', e.target.value)} /></label><label>Ciudad *<input required value={form.ciudad} onChange={(e) => input('ciudad', e.target.value)} /></label><label>Numero de habitaciones<input type="number" min="1" value={form.habitaciones} onChange={(e) => input('habitaciones', e.target.value)} /></label><label>Canal principal<select value={form.canal} onChange={(e) => input('canal', e.target.value)}><option value="">Selecciona...</option>{canalOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>Problema principal<select value={form.problema} onChange={(e) => input('problema', e.target.value)}><option value="">Selecciona...</option>{problemaOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label className="full">WhatsApp o correo *<input required value={form.contacto} onChange={(e) => input('contacto', e.target.value)} /></label><label className="full">Contexto adicional<textarea rows={5} value={form.mensaje} onChange={(e) => input('mensaje', e.target.value)} /></label>{status && <p className="notice">{status}</p>}<div className="form-actions"><button className="primary" type="submit">Solicitar diagnostico</button><a className="secondary" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageSquare size={18} /> Continuar por WhatsApp</a></div><small>El diagnostico no obliga a contratar implementacion. Primero se detectan fugas; despues se propone ruta.</small></form>}</section>;
}

function MethodPage() {
  return <section className="container page"><div className="intro center"><p className="eyebrow">Metodo AVORA</p><h1>Cinco movimientos para convertir caos comercial en sistema.</h1><p>La metodologia A.V.O.R.A. diagnostica, ordena e implementa crecimiento hotelero sin vender tecnologia a ciegas.</p></div><MethodBlock /></section>;
}

function ServicesPage({ go }: { go: (s: Section) => void }) {
  return <section className="container page"><div className="intro center"><p className="eyebrow">Implementacion despues del diagnostico</p><h1>Servicios conectados a fugas reales.</h1><p>AVORA no empieza vendiendo piezas sueltas. Primero detecta que esta frenando reservas directas, margen y seguimiento.</p></div><ModulesBlock /><div className="center"><button className="primary" onClick={() => go('diagnostico')}>Solicitar Diagnostico AVORA 360</button></div></section>;
}

function FaqPage({ openFaq, setOpenFaq, go }: { openFaq: number; setOpenFaq: (value: number) => void; go: (s: Section) => void }) {
  return <section className="container page"><div className="intro center"><p className="eyebrow">FAQ</p><h1>Preguntas antes de solicitar diagnostico.</h1><p>Respuestas claras para hoteles que quieren crecer sin comprar tecnologia a ciegas.</p></div><div className="faq-list">{faqs.map(([q, a], index) => <article className="faq-item" key={q}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{q}</span></button>{openFaq === index && <p>{a}</p>}</article>)}</div><div className="center"><button className="primary" onClick={() => go('diagnostico')}>Solicitar diagnostico hotelero</button></div></section>;
}

function Footer({ go }: { go: (s: Section) => void }) {
  return <footer><div className="container footer-grid"><div><Logo /><p>Crecimiento hotelero con diagnostico, sistema y direccion.</p></div><div><b>Navegacion</b>{navItems.map((item) => <button key={item.value} onClick={() => go(item.value)}>{item.label}</button>)}</div><div><b>Contacto</b><p>avora.contacto@gmail.com</p><p>56 39 47 2727</p><a href="https://wa.me/525639472727?text=Hola%2C%20me%20interesa%20solicitar%20un%20Diagnostico%20AVORA%20360%20para%20mi%20hotel." target="_blank" rel="noreferrer">WhatsApp diagnostico</a></div><div><b>Criterio</b><p>AVORA no promete cifras inventadas ni vende tecnologia a ciegas. Primero diagnostica fugas comerciales, operativas y digitales.</p></div></div></footer>;
}

export default App;
