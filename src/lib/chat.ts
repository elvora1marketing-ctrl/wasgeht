/**
 * Der Zeitplan eines Nachrichtenverlaufs.
 *
 * WARUM EIGENE DATEI: Der Verlauf im Telefon und die Zeitleiste daneben
 * müssen auf dieselbe Sekunde laufen. Würde jede Komponente ihre Zeiten
 * selbst ausrechnen, liefen die beiden früher oder später auseinander.
 * Beide holen sie deshalb hier.
 *
 * Alles wird beim Bauen ausgerechnet und landet als CSS-Verzögerung im
 * Markup. Zur Laufzeit rechnet nichts nach, es läuft kein Skript mit.
 */

export type Rolle = 'kunde' | 'assistenz';

/**
 * Wessen Telefon zu sehen ist.
 *
 * `kunde`   Das Telefon des Interessenten. Seine Nachrichten stehen rechts,
 *           die der Assistenz links mit Bild und Namen.
 * `betrieb` Das Telefon des Betriebs. Der Kunde steht links, die Antworten
 *           der Assistenz stehen rechts, weil sie über die eigene Nummer
 *           hinausgehen.
 */
export type Blickwinkel = 'kunde' | 'betrieb';

/**
 * Was die Automatisierung im Hintergrund getan hat.
 *
 * DER GRUND, WARUM ES DAS GIBT: Eine Blase mit dem Text „Eingetragen:
 * Donnerstag, 18:00 Uhr" ist eine BEHAUPTUNG. Man sieht einen Chat, und
 * Chats kann jeder von Hand tippen. Was man nicht sieht, ist die Arbeit:
 * dass ein Kalender abgefragt, ein Termin geschrieben, eine Erinnerung
 * gesetzt und eine Notiz weitergereicht wurde -- alles in derselben
 * Sekunde, in der die Antwort herausging.
 *
 * Genau das ist aber das Produkt. Deshalb laeuft neben dem Verlauf ein
 * Protokoll mit, das jeden dieser Schritte in dem Moment zeigt, in dem er
 * passiert. Aus „ein Bot schreibt zurueck" wird „ein System arbeitet".
 */
export type WirkungArt =
  | 'erkannt'
  | 'kalender'
  | 'erinnerung'
  | 'notiz'
  | 'weitergabe'
  | 'suche'
  | 'kontakt';

export interface Wirkung {
  art: WirkungArt;
  /** Was getan wurde, in der Sprache des Betriebs und nicht der Technik. */
  text: string;
}

export interface Nachricht {
  von: Rolle;
  text: string;
  /** Uhrzeit an der Blase. */
  zeit: string;
  /**
   * Was die Assistenz in diesem Moment getan hat. Steht im Protokoll
   * neben dem Verlauf, zeitgleich mit der Blase.
   */
  wirkung?: Wirkung | Wirkung[];
}

/**
 * Der Rhythmus eines Verlaufs.
 *
 * VORHER LIEF ALLES IM GLEICHEN TAKT. Drei Telefone nebeneinander, jedes
 * mit derselben Vorlaufzeit, derselben Tippdauer, denselben Pausen -- und
 * dadurch mit derselben Melodie. Nach dem ersten Verlauf kannte man den
 * zweiten schon, und Wiederholung ist das Gegenteil von Aufmerksamkeit.
 *
 * Ein Notfall um Viertel nach acht wird anders getippt als eine Frage um
 * kurz nach sechs Uhr morgens. Die drei Profile bilden das ab:
 *
 * `dringend`  Kurze Saetze, schnelles Tippen, kaum Pausen. Es brennt.
 * `sachlich`  Der Normalfall. Ruhig, aber ohne Trödeln.
 * `bedacht`   Jemand schreibt abends nebenbei, denkt zwischendurch nach.
 */
export type Takt = 'dringend' | 'sachlich' | 'bedacht';

export interface Gespraech {
  /** Rhythmus dieses Verlaufs. Ohne Angabe `sachlich`. */
  takt?: Takt;
  /** Name im Kopf des Verlaufs. */
  name?: string;
  /** Zeile unter dem Namen. */
  status?: string;
  /** Uhrzeit in der Statusleiste. */
  uhrzeit?: string;
  /** Stempel über der ersten Nachricht. Ohne Angabe steht dort "Heute". */
  stempel?: string;
  /** Bild im Kopf. Fehlt es, stehen dort die Anfangsbuchstaben. */
  bild?: string;
  /** Ersetzt die errechneten Anfangsbuchstaben, etwa bei Rufnummern. */
  kuerzel?: string;
  nachrichten: Nachricht[];
}

/** Ein Protokolleintrag mit dem Zeitpunkt, an dem er erscheint. */
export interface GeplanteWirkung extends Wirkung {
  ab: number;
}

export interface GeplanteNachricht extends Nachricht {
  /** Steht diese Blase links, also beim Gegenüber? */
  links: boolean;
  /** Sekunde, in der die Blase erscheint. */
  ab: number;
  /** Sekunde, in der die Tippanzeige erscheint. */
  tippenAb: number;
  /** Dauer der Tippanzeige. Null, wenn keine läuft. */
  tippenDauer: number;
}

export interface GeplantesGespraech {
  name: string;
  status: string;
  uhrzeit: string;
  stempel: string;
  bild?: string;
  kuerzel: string;
  nachrichten: GeplanteNachricht[];
  /** Das Protokoll der Automatisierung, in derselben Zeitrechnung. */
  wirkungen: GeplanteWirkung[];
  /** Sekunde, in der dieser Verlauf auf den Schirm kommt. */
  von: number;
  /** Sekunde, in der die letzte Nachricht steht. */
  fertig: number;
  /** Sekunde, in der der Verlauf den Schirm wieder verlässt. */
  bis: number;
}

/* --- Stellschrauben des Ablaufs, alles in Sekunden -------------------- */

/* Der Ablauf lief zu hastig: die Blasen sprangen schneller herein, als man
   sie lesen konnte, und wer den ersten Satz zu Ende gelesen hatte, stand
   schon vor der Antwort. Ein Verlauf, den man nicht mitlesen kann, zeigt
   nichts -- er flackert nur.

   Alle Werte deshalb um rund ein Drittel gestreckt. Bewusst nicht mehr:
   noch langsamer wirkt es zaeh, und die Aussage der Vorfuehrung ist ja
   gerade, dass die Antwort schnell da ist. */

/**
 * Die Stellschrauben, je Takt einmal.
 *
 * Alle Werte sind gegenueber der ersten Fassung um rund ein Drittel
 * gestreckt: der Ablauf lief zu hastig, die Blasen sprangen schneller
 * herein, als man sie lesen konnte. Ein Verlauf, den man nicht mitlesen
 * kann, zeigt nichts -- er flackert nur.
 *
 * `sachlich` ist dieser gestreckte Normalfall. `dringend` liegt rund ein
 * Viertel darunter, `bedacht` ein Viertel darueber, mit spuerbar
 * laengeren Denkpausen beim Kunden.
 */
interface Stellschrauben {
  /** Ruhe, bevor die erste Nachricht kommt. */
  vorlauf: number;
  /** Grundzeit der Tippanzeige, unabhaengig von der Laenge. */
  tippGrund: number;
  /** Zuschlag je Zeichen, damit ein langer Text nicht sofort fertig ist. */
  tippJeZeichen: number;
  /** Deckel, sonst wartet man bei langen Antworten zu lange. */
  tippDeckel: number;
  /** Pause, nachdem das Gegenueber geschrieben hat. */
  pauseLinks: number;
  /** Pause, nachdem die eigene Seite geschrieben hat. */
  pauseRechts: number;
}

/*
 * ALLE WERTE SIND GEGENUEBER DEM ERSTEN ENTWURF ETWA HALBIERT.
 *
 * Der laengste Verlauf im Aufschlag lief 23,7 Sekunden. Das ist keine
 * Vorfuehrung mehr, das ist ein Film -- und solange er laeuft, steht auf
 * der Seite ein leeres Telefon neben einem leeren Kasten. Wer in der
 * Zeit weiterscrollt, und das tun fast alle, sieht die Vorfuehrung nie.
 *
 * Ausserdem war der `vorlauf` mit bis zu 0,9 Sekunden die teuerste Zahl
 * hier: eine knappe Sekunde, in der auf einem grossen Telefonbildschirm
 * NICHTS steht, direkt im ersten Sichtbereich. Der Blick faellt genau
 * dann darauf.
 *
 * Die Unterschiede zwischen den drei Takten bleiben erhalten -- ein
 * dringender Verlauf laeuft weiter spuerbar haetiger als ein bedachter.
 * Gestaucht ist der Massstab, nicht das Verhaeltnis.
 */
const TAKTE: Record<Takt, Stellschrauben> = {
  dringend: {
    vorlauf: 0.2,
    tippGrund: 0.34,
    tippJeZeichen: 0.0075,
    tippDeckel: 1.1,
    pauseLinks: 0.42,
    pauseRechts: 0.36,
  },
  sachlich: {
    vorlauf: 0.3,
    tippGrund: 0.5,
    tippJeZeichen: 0.0105,
    tippDeckel: 1.5,
    pauseLinks: 0.66,
    pauseRechts: 0.72,
  },
  bedacht: {
    vorlauf: 0.42,
    tippGrund: 0.6,
    tippJeZeichen: 0.0125,
    tippDeckel: 1.75,
    pauseLinks: 0.8,
    pauseRechts: 1.15,
  },
};

/** Wie lange ein fertiger Verlauf stehen bleibt, bevor der nächste kommt. */
export const HALTEN = 2.1;
/** Dauer des Übergangs von einem Verlauf zum nächsten. */
export const WECHSEL = 0.45;

/** Anfangsbuchstaben für den Kreis im Kopf, höchstens zwei. */
function kuerzelAus(name: string): string {
  const woerter = name.split(/\s+/).filter((wort) => /\p{L}/u.test(wort));
  if (!woerter.length) return '?';

  return woerter
    .slice(0, 2)
    .map((wort) => (wort.match(/\p{L}/u) ?? [''])[0])
    .join('')
    .toUpperCase();
}

/**
 * Rechnet aus, wann welches Stück erscheint.
 *
 * Regel: Was das Gegenüber schreibt, kündigt sich mit der Tippanzeige an.
 * Was von der eigenen Seite kommt, steht sofort da. Genau darin liegt die
 * Aussage der Assistenz: die Antwort ist schon geschrieben, während man
 * beim Kunden steht.
 *
 * @param tempo Streckt oder staucht den gesamten Ablauf. Kleiner ist schneller.
 */
export function planen(
  gespraeche: Gespraech[],
  blickwinkel: Blickwinkel = 'kunde',
  tempo = 1,
): { folge: GeplantesGespraech[]; gesamt: number } {
  const linksRolle: Rolle = blickwinkel === 'kunde' ? 'assistenz' : 'kunde';
  let start = 0;

  const folge = gespraeche.map((gespraech) => {
    const s = TAKTE[gespraech.takt ?? 'sachlich'];
    let uhr = s.vorlauf;

    const nachrichten: GeplanteNachricht[] = gespraech.nachrichten.map((n) => {
      const links = n.von === linksRolle;

      if (!links) {
        const eintrag = { ...n, links, ab: uhr, tippenAb: 0, tippenDauer: 0 };
        uhr += s.pauseRechts;
        return eintrag;
      }

      const tippenDauer = Math.min(s.tippDeckel, s.tippGrund + n.text.length * s.tippJeZeichen);
      const eintrag = { ...n, links, tippenAb: uhr, tippenDauer, ab: uhr + tippenDauer };
      uhr += tippenDauer + s.pauseLinks;
      return eintrag;
    });

    /* Erst jetzt das Tempo anlegen, danach die Startzeit des Verlaufs
       aufschlagen. Andersherum würde das Tempo auch die Startzeiten der
       vorherigen Verläufe noch einmal strecken. */
    const skaliert = nachrichten.map((n) => ({
      ...n,
      ab: start + n.ab * tempo,
      tippenAb: start + n.tippenAb * tempo,
      tippenDauer: n.tippenDauer * tempo,
    }));

    /* Das Protokoll kommt aus denselben Zeiten wie die Blasen -- es kann
       also gar nicht auseinanderlaufen. Der kleine Nachlauf ist Absicht:
       erst steht die Antwort da, einen Wimpernschlag spaeter zeigt das
       Protokoll, was dafuer im Hintergrund passiert ist. Andersherum
       saehe es aus, als kuendige die Maschine ihre eigene Antwort an. */
    const wirkungen: GeplanteWirkung[] = [];
    for (const n of skaliert) {
      if (!n.wirkung) continue;
      const liste = Array.isArray(n.wirkung) ? n.wirkung : [n.wirkung];
      liste.forEach((w, i) => {
        wirkungen.push({ ...w, ab: n.ab + 0.28 + i * 0.42 });
      });
    }

    const name = gespraech.name ?? 'Elvora';
    const letzte = skaliert[skaliert.length - 1];
    const fertig = letzte ? letzte.ab + 0.34 : start;
    const geplant: GeplantesGespraech = {
      name,
      status: gespraech.status ?? 'online',
      uhrzeit: gespraech.uhrzeit ?? '9:41',
      stempel: gespraech.stempel ?? 'Heute',
      bild: gespraech.bild,
      kuerzel: gespraech.kuerzel ?? kuerzelAus(name),
      nachrichten: skaliert,
      wirkungen,
      von: start,
      fertig,
      bis: start + uhr * tempo + HALTEN,
    };

    start = geplant.bis;
    return geplant;
  });

  return { folge, gesamt: start };
}
