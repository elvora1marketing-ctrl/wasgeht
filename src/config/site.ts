/**
 * Zentrale Stammdaten der Website.
 *
 * ALLE noch offenen Angaben stehen ausschließlich hier und sind mit
 * TODO markiert. Kein anderer Ort im Projekt enthält Platzhalter.
 * Sobald ein Wert hier gefüllt ist, greift er auf allen Seiten.
 */

export const site = {
  name: 'Elvora',
  domain: 'elvora.me',
  url: 'https://elvora.me',
  /** Kurzbeschreibung, u. a. für OpenGraph-Fallback und JSON-LD. */
  tagline: 'Digitalagentur für Betriebe und Selbstständige in Essen',
} as const;

/** Die Person hinter Elvora. */
export const owner = {
  firstName: 'Luan',
  lastName: 'Qerkini',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  /** Ausbildungsberuf, so wie er selbst ihn nennt. */
  trade: 'Gas- und Wasserinstallateur',
} as const;

/** Geschäftsadresse. Bestätigt. */
export const address = {
  street: 'Prinzenstraße 58A',
  postalCode: '45355',
  city: 'Essen',
  region: 'Nordrhein-Westfalen',
  country: 'DE',
} as const;

/**
 * Kontaktwege.
 *
 * WICHTIG zur Schreibweise:
 *  - `phoneRaw` / `whatsappRaw` im internationalen Format ohne Zeichen
 *    (E.164 ohne führendes Plus), z. B. '4920112345678'. Wird für tel:- und
 *    wa.me-Links verwendet.
 *  - `phoneDisplay` ist die menschenlesbare Fassung für die Anzeige.
 */
export const contact = {
  phoneRaw: '491608524279',
  phoneDisplay: '0160 8524279',
  /** Identisch mit der Mobilnummer, dort läuft die KI-Assistenz. */
  whatsappRaw: '491608524279',
  // TODO: echte E-Mail-Adresse bestätigen
  email: 'kontakt@elvora.me',
  /** Vorbelegter Text des WhatsApp-Links. */
  whatsappText: 'Guten Tag, ich interessiere mich für Ihre Unterstützung.',
} as const;

export const contactLinks = {
  tel: `tel:+${contact.phoneRaw}`,
  whatsapp: `https://wa.me/${contact.whatsappRaw}?text=${encodeURIComponent(contact.whatsappText)}`,
  mail: `mailto:${contact.email}`,
} as const;

/** Erreichbarkeit, fließt in JSON-LD und in die Kontaktseite. */
export const openingHours = {
  display: 'Montag bis Freitag, 8 bis 18 Uhr',
  schema: ['Mo-Fr 08:00-18:00'],
} as const;

/**
 * Terminbuchung über die selbst gehostete cal.com-Instanz.
 *
 * Sie läuft unter einer eigenen Subdomain. Besucher sehen also nie
 * "cal.com", sondern durchgehend elvora.me. Das ist der Grund, warum hier
 * `origin` konfigurierbar ist und nicht fest auf cal.com zeigt.
 */
export const booking = {
  /** Herkunft der Instanz, ohne abschließenden Schrägstrich. */
  origin: 'https://termine.elvora.me',
  /** Pfad zum Event-Typ: Benutzername/Termin-Art. */
  link: 'elvora/beratung',
  get url() {
    return `${this.origin}/${this.link}`;
  },
  /** Skript für die Einbettung, wird ausschließlich nach einem Klick geladen. */
  get embedScript() {
    return `${this.origin}/embed/embed.js`;
  },
  /**
   * Die im Kalender hinterlegte Dauer.
   *
   * STEHT ABSICHTLICH AUF KEINER SEITE MEHR. „15 Minuten, unverbindlich,
   * ohne Verkaufsgespraech" steht so oder so aehnlich auf jeder zweiten
   * Seite dieser Art -- als Ueberschrift verspricht die Zahl ausserdem das
   * Falsche: niemand will fuenfzehn Minuten, alle wollen wissen, was bei
   * ihnen liegen bleibt. Wer die Dauer sucht, sieht sie im Kalender.
   */
  durationLabel: '15 Minuten',
} as const;

/**
 * Zustellung der Formularanfragen, bewusst zweigleisig.
 *
 * 1. `webhook` ist der Hauptweg: der eigene n8n-Workflow. Die Anfrage landet
 *    sofort als WhatsApp-Nachricht und als Ereignis im Dashboard.
 * 2. `endpoint` (Web3Forms) ist die Rückfallebene. Sie greift, wenn n8n nicht
 *    erreichbar ist, und trägt zusätzlich den Fall ohne JavaScript.
 *
 * Ein ausgefallener Server darf keine Anfrage kosten, deshalb zwei Wege.
 * Der Web3Forms-Schlüssel ist ein öffentlicher Schlüssel und darf im
 * Quelltext stehen.
 */
export const forms = {
  webhook: 'https://n8n.elvora.me/webhook/website-kontakt',
  accessKey: 'd7a8e08a-7a06-4c3b-bbbf-38b1d9e05745',
  endpoint: 'https://api.web3forms.com/submit',
  subject: 'Neue Anfrage über elvora.me',
  redirectPath: '/kontakt/danke/',
} as const;

/**
 * Kundenstimmen. Erscheinen im ersten Sichtbereich der Startseite und an
 * jedem Abschluss-Aufruf.
 *
 * `enabled: false` blendet den Bewertungsbeleg überall aus. So steht nie
 * eine Bewertungsbehauptung ohne Grundlage auf der Seite.
 */
export const reviews = {
  /*
   * ABGESCHALTET, bis echte Kundenstimmen vorliegen.
   *
   * Die Alternative waere gewesen, `platzhalter` auf false zu setzen --
   * dann verschwindet zwar die Marke „Beispieldaten", die erfundene
   * Bewertung stuende aber als Tatsachenbehauptung auf der Seite und im
   * JSON-LD. Das ist eine irrefuehrende geschaeftliche Handlung nach
   * § 5 UWG und abmahnfaehig.
   *
   * Also lieber gar kein Bewertungsbeleg als ein erfundener. Sobald echte
   * Rueckmeldungen in `items` stehen: hier auf true, `platzhalter` auf
   * false, `rating` und `count` anpassen. Dann erscheint der Beleg an
   * allen Stellen wieder von selbst.
   */
  enabled: false,

  /**
   * ACHTUNG: Alles hier sind Platzhalter, damit die Gestaltung beurteilt
   * werden kann. Die Stimmen sind frei erfunden, auch wenn sie nur Branche
   * und Stadt nennen.
   *
   * VOR DEM LIVEGANG durch echte Rückmeldungen ersetzen. Erfundene
   * Kundenstimmen sind eine irreführende geschäftliche Handlung nach
   * § 5 UWG und abmahnfähig, mit und ohne Namen.
   *
   * Solange `platzhalter: true` steht, zeigt die Seite an sichtbarer Stelle
   * den Hinweis „Beispieldaten". Erst wenn hier `false` steht, verschwindet
   * er. Das ist die Sicherung dagegen, dass die Platzhalter versehentlich
   * online gehen.
   */
  platzhalter: true,

  rating: 4.9,
  count: 12,

  /**
   * Woher die Stimmen kommen, so wie es neben der Zahl steht.
   *
   * Bewusst NICHT „Google-Bewertungen": auf Google gibt es noch keine, und
   * eine falsche Quellenangabe ist schlimmer als gar keine. Sobald das
   * Google-Profil Bewertungen hat, hier umstellen und `profileUrl` setzen.
   */
  quelle: 'Kundenstimmen',
  profileUrl: '',

  /**
   * Einzelstimmen. Anonym mit Branche und Stadt: das ist ehrlicher als
   * erfundene Namen und wirkt trotzdem. Jede Stimme nennt ein konkretes
   * Ergebnis statt allgemeinem Lob, so liest sich eine echte Rückmeldung.
   */
  items: [
    {
      author: 'Sanitärbetrieb aus Essen',
      rating: 5,
      text: 'Platzhalter: Vorher gingen Anrufe verloren, wenn wir auf der Baustelle waren. Jetzt fängt die Assistenz sie auf, und wir rufen abends mit Name und Anliegen zurück statt einer unbekannten Nummer hinterherzutelefonieren.',
      date: '2026-05-14',
    },
    {
      author: 'Zahnarztpraxis aus Bochum',
      rating: 5,
      text: 'Platzhalter: Die Terminanfragen über WhatsApp landen direkt im Kalender, ohne dass die Anmeldung telefonieren muss. Das Team wurde spürbar entlastet, und die Patienten loben die schnellen Antworten.',
      date: '2026-04-02',
    },
    {
      author: 'Steuerkanzlei aus Essen',
      rating: 4,
      text: 'Platzhalter: Über die neue Website kommen erstmals regelmäßig Anfragen von Mandanten aus dem Umkreis. Die Abstimmung war unkompliziert, ein Ansprechpartner für alles.',
      date: '2026-02-19',
    },
  ] as Array<{
    author: string;
    business?: string;
    rating: number;
    text: string;
    date: string;
  }>,
} as const;

/**
 * Handlungsaufrufe.
 *
 * Grundregel: genau EIN Haupt-CTA, farblich hervorgehoben. Der sekundäre
 * CTA ist visuell klar untergeordnet und tritt nie in der Akzentfarbe auf.
 * Ein Wechsel des Haupt-CTA passiert ausschließlich hier.
 */
/**
 * Zusagen, die Reibung nehmen.
 *
 * BITTE PRÜFEN, das sind IHRE Aussagen, nicht meine: beides steht künftig
 * sichtbar auf der Seite, und was dort steht, müssen Sie einhalten können.
 *
 * `antwortzeit` stand bisher NUR in der Beschreibung für Google und nirgends
 * auf der Seite selbst. Ein Versprechen, das nur die Suchmaschine liest,
 * nimmt keinem Besucher die Hemmung.
 *
 * `aufwand` ist die Antwort auf die Frage, die jeder Betriebsinhaber
 * zuerst stellt: was kommt an Arbeit auf MICH zu. Nicht was es kostet --
 * auf dieser Seite geht es nirgends um Geld, sondern um Funktionen und
 * darum, was sie bringen. Wer wissen will, was etwas kostet, fragt im
 * Gespräch, und dort gehört die Antwort auch hin.
 */
export const versprechen = {
  /*
   * Vorher stand hier „Antwort innerhalb von 24 Stunden". Das war der
   * Satz einer Agentur ohne Assistenz -- und damit ausgerechnet an der
   * Stelle, an der die eigene Leistung beworben wird, das Gegenteil von
   * dem, was diese Seite verkauft. Wer eine Assistenz einrichtet, die
   * rund um die Uhr antwortet, darf sich nicht selbst einen Werktag Zeit
   * geben.
   *
   * Bewusst zweigeteilt: die Assistenz antwortet sofort, Luan meldet sich
   * danach persoenlich. Ein blosses „sofortige Antwort" waere die
   * Behauptung, ER sei rund um die Uhr am Telefon, und das waere gelogen.
   */
  antwortzeit: 'Sofortige Antwort über die Assistenz, persönlich melde ich mich am selben Tag',
  aufwand:
    'Wenig. Sie erzählen mir einmal, wie Ihr Betrieb arbeitet, und liefern Ihre Bilder und Angaben. Den Rest baue ich und zeige es Ihnen fertig. Sie sagen dann, was noch anders soll. Laufend müssen Sie nichts tun: die Assistenz arbeitet, ohne dass jemand sie bedient.',
} as const;

export const cta = {
  primary: {
    /*
     * OHNE „kostenlos". Das Wort ist die einzige Stelle, an der auf der
     * ganzen Seite noch Geld vorkam -- und es verspricht ausgerechnet im
     * entscheidenden Moment nichts ueber die Sache, sondern ueber den
     * Preis. „Vereinbaren" sagt stattdessen, was passiert, wenn man
     * klickt. Das ist der Grund, warum jemand klickt.
     */
    label: 'Erstgespräch vereinbaren',
    /**
     * Kurzfassung für den klebenden Kopfbereich auf Mobil.
     *
     * Bewusst dasselbe Wort wie in der Langfassung. Vorher stand hier
     * „Termin sichern", also ein zweiter Name für dieselbe Handlung. Wer
     * am Schreibtisch „Erstgespräch vereinbaren" liest und auf dem Handy
     * „Termin sichern", hat zwei Angebote im Kopf statt einem.
     */
    labelShort: 'Erstgespräch',
    href: '/termin/',
    /**
     * Kurzer Zusatz direkt unter dem Button.
     *
     * HIER STAND „15 Minuten, unverbindlich, ohne Verkaufsgespräch".
     *
     * Der Satz ist nicht falsch, er ist nur nicht mehr Ihrer. Er steht
     * inzwischen unter jedem zweiten Terminknopf im Netz, besonders auf
     * KI-Seiten, und wer ihn zum dritten Mal liest, liest ihn nicht mehr.
     * Ein Versprechen, das jeder gibt, ist keins.
     *
     * Der Zusatz sagt jetzt, was NACH dem Gespräch anders ist. Das kann
     * nur sagen, wer das Gespräch auch führt.
     */
    note: 'Danach wissen Sie, was in Ihrem Betrieb künftig von allein läuft.',
  },
  secondary: {
    label: 'Lieber anrufen',
    href: contactLinks.tel,
  },
} as const;

/** Hauptnavigation. */
export const nav = [
  { label: 'Leistungen', href: '/leistungen/' },
  { label: 'Über mich', href: '/ueber-mich/' },
  { label: 'Kontakt', href: '/kontakt/' },
] as const;

/**
 * Die vier Leistungen.
 *
 * `benefit` ist die Nutzenaussage und steht in der Überschrift.
 * `label` ist nur die Fachbezeichnung und tritt untergeordnet auf.
 * `color` ist die Farbwelt der Leistung, abgeleitet aus dem Markenverlauf.
 * Dieselbe Farbe trägt die Fläche auf der Startseite und den Kopfbereich
 * der Detailseite, dadurch gehören beide sichtbar zusammen.
 */
export const services = [
  {
    slug: 'webdesign',
    color: '#2b2f7a',
    label: 'Webdesign',
    benefit: 'Eine Website, die Anfragen bringt statt nur gut auszusehen',
    teaser:
      'Ihre Kundschaft entscheidet in wenigen Sekunden, ob sie anruft oder weiterklickt. Ich baue die Seite so, dass sie anruft.',
    href: '/leistungen/webdesign/',
  },
  {
    slug: 'seo',
    color: '#5c3491',
    label: 'SEO',
    benefit: 'Gefunden werden, wenn im Umkreis nach Ihnen gesucht wird',
    teaser:
      'Wer heute etwas sucht, tippt es ins Handy und ruft einen der ersten Treffer an. Genau dort gehören Sie hin.',
    href: '/leistungen/seo/',
  },
  {
    slug: 'branding',
    color: '#a63082',
    label: 'Branding & Print',
    benefit: 'Ein Auftritt, der nach Fachbetrieb aussieht, nicht nach Nebenerwerb',
    teaser:
      'Vom Logo über den Briefkopf bis zum Angebot: ein einheitliches Bild, an dem man den Fachbetrieb erkennt.',
    href: '/leistungen/branding/',
  },
  {
    slug: 'automatisierung',
    color: '#a93d28',
    label: 'KI-Prozessautomatisierung',
    benefit: 'Kein verpasster Anruf, kein Angebot, das liegen bleibt',
    teaser:
      'Anfragen werden erfasst, beantwortet und nachgefasst, während Sie bei Ihren Kunden sind.',
    href: '/leistungen/automatisierung/',
  },
] as const;

export type AutomationModule = {
  slug: string;
  /** Produktname. */
  name: string;
  /** Nutzenaussage in der Sprache des Betriebs, steht in der Überschrift. */
  benefit: string;
  /** Erklärung in ein bis zwei Sätzen. */
  text: string;
  /**
   * Bildbeschreibung des Beleg-Screenshots.
   *
   * Der Screenshot selbst wird NICHT hier eingetragen: es genügt, eine Datei
   * unter `src/assets/module/<slug>.png` (auch .jpg oder .webp) abzulegen.
   * Sie wird automatisch beim passenden Modul angezeigt und optimiert.
   * Ohne Datei erscheint das Modul schlicht ohne Bild.
   */
  screenshotAlt: string;
};

/**
 * Fertige Automatisierungs-Module.
 *
 * Reihenfolge = Reihenfolge auf der Seite. Vorn steht, was den größten
 * unmittelbaren Schmerz löst.
 */
export const automationModules: AutomationModule[] = [
  {
    slug: 'whatsapp-assistenz',
    name: 'WhatsApp-Assistenz',
    benefit: 'Anfragen werden beantwortet, auch wenn Sie gerade keine Hand frei haben',
    text: 'Die KI beantwortet Anfragen auf Ihrer Geschäftsnummer und übergibt an Sie, sobald es persönlich wird.',
    screenshotAlt:
      'WhatsApp-Verlauf: die Assistenz beantwortet eine Kundenanfrage und übergibt anschließend an den Betrieb',
  },
  {
    slug: 'anruf-retter',
    name: 'Anruf-Retter',
    benefit: 'Kein verpasster Anruf ist mehr ein verlorener Auftrag',
    text: 'Verpasste Anrufe werden automatisch per WhatsApp aufgefangen, der Bot führt das Gespräch weiter.',
    screenshotAlt:
      'WhatsApp-Nachricht, die nach einem verpassten Anruf automatisch an den Anrufer herausgegangen ist',
  },
  {
    slug: 'telefon-assistenz',
    name: 'Telefon-Assistenz',
    benefit: 'Es geht jemand ans Telefon, immer',
    text: 'Sprachassistentin Lea nimmt ab, erfasst Anliegen und Rückrufwunsch und schickt Ihnen die Notiz weiter.',
    screenshotAlt:
      'Gesprächsnotiz der Sprachassistentin mit Anliegen und Rückrufwunsch',
  },
  {
    slug: 'terminbuchung',
    name: 'Terminbuchung',
    benefit: 'Termine stehen im Kalender, ohne dass Sie telefonieren',
    text: 'Kunden buchen freie Termine direkt im Chat, Ihr Kalender bleibt synchron.',
    screenshotAlt:
      'Chat-Verlauf, in dem ein Kunde einen freien Termin auswählt und bestätigt bekommt',
  },
  {
    slug: 'bewertungs-service',
    name: 'Bewertungs-Service',
    benefit: 'Mehr Google-Bewertungen, ohne peinliches Nachfragen',
    text: 'Auf ein kurzes Kommando hin geht die Bewertungsanfrage automatisch an den Kunden raus.',
    screenshotAlt:
      'Automatisch versendete Bewertungsanfrage samt Link zum Google-Profil',
  },
  {
    slug: 'bewerber-assistenz',
    name: 'Bewerber-Assistenz',
    benefit: 'Nur noch Bewerbungen lesen, die wirklich passen',
    text: 'Bewerbungen laufen über den Bot, unpassende werden vorab aussortiert.',
    screenshotAlt:
      'Vorqualifizierte Bewerbung mit den vom Bot erfassten Angaben',
  },
  {
    slug: 'dashboard',
    name: 'Dashboard',
    benefit: 'Ein Blick genügt, um zu wissen, was läuft',
    text: 'Alle Anfragen, Termine, geretteten Anrufe und Bewertungen auf einer Übersichtsseite.',
    screenshotAlt:
      'Übersichtsseite mit Anfragen, Terminen, geretteten Anrufen und Bewertungen',
  },
];

/** Einzugsgebiet, fließt in JSON-LD und in die Texte. */
export const serviceArea = {
  primary: 'Essen',
  places: ['Essen', 'Mülheim an der Ruhr', 'Bochum', 'Gelsenkirchen', 'Oberhausen', 'Duisburg'],
  display: 'Essen, dem Ruhrgebiet und darüber hinaus',
} as const;

/**
 * Angaben für Impressum und Datenschutzerklärung.
 *
 * Rechtsgrundlage für das Impressum ist § 5 DDG (loest seit 2024 § 5 TMG ab).
 * Die Steuernummer gehoert ausdruecklich NICHT hinein, nur die
 * Umsatzsteuer-Identifikationsnummer oder die Wirtschafts-Identifikationsnummer.
 */
export const legal = {
  /** Kommt aus `owner`. Dort den Nachnamen ergänzen, nicht hier. */
  get name() {
    return owner.fullName;
  },
  /**
   * Umsatzsteuer-Identifikationsnummer nach § 27a UStG.
   * Bei Kleinunternehmerregelung meist nicht vorhanden, dann auf null lassen.
   */
  vatId: null as string | null,
  /**
   * Wirtschafts-Identifikationsnummer nach § 139c AO.
   * Noch nicht zugeteilt (Stand August 2026). Sobald das Bundeszentralamt
   * für Steuern sie vergibt, muss sie nach § 5 DDG hier eingetragen werden;
   * das Impressum blendet den Abschnitt dann von selbst ein.
   */
  economicId: null as string | null,
  /** true, wenn nach § 19 UStG keine Umsatzsteuer ausgewiesen wird. */
  smallBusiness: true,
  /**
   * Bereitschaft zur Verbraucherschlichtung nach § 36 VSBG.
   * Die EU-Streitschlichtungsplattform wurde im Juli 2025 eingestellt; ein
   * Link darauf ist heute ein toter Verweis und gehört nicht mehr hinein.
   */
  disputeResolution: false,
  /** Hostinganbieter, wird in der Datenschutzerklärung benannt. */
  host: {
    name: 'netcup GmbH',
    address: 'Daimlerstraße 25, 76185 Karlsruhe',
  },
  /** Zuständige Aufsichtsbehörde nach dem Sitz des Verantwortlichen. */
  authority: {
    name: 'Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen',
    address: 'Kavalleriestraße 2-4, 40213 Düsseldorf',
    url: 'https://www.ldi.nrw.de',
  },
  /** Stand der Rechtstexte, wird auf den Seiten ausgewiesen. */
  lastUpdated: 'August 2026',
} as const;
