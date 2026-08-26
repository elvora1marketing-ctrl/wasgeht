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

export interface Nachricht {
  von: Rolle;
  text: string;
  /** Uhrzeit an der Blase. */
  zeit: string;
}

export interface Gespraech {
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

/** Ruhe, bevor die erste Nachricht kommt. */
const VORLAUF = 0.55;
/** Grundzeit der Tippanzeige, unabhängig von der Länge. */
const TIPP_GRUND = 0.9;
/** Zuschlag je Zeichen, damit ein langer Text nicht sofort fertig ist. */
const TIPP_JE_ZEICHEN = 0.018;
/** Deckel, sonst wartet man bei langen Antworten zu lange. */
const TIPP_DECKEL = 2.8;
/** Pause, nachdem das Gegenüber geschrieben hat. */
const PAUSE_LINKS = 1.35;
/** Pause, nachdem die eigene Seite geschrieben hat. */
const PAUSE_RECHTS = 1.45;

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
    let uhr = VORLAUF;

    const nachrichten: GeplanteNachricht[] = gespraech.nachrichten.map((n) => {
      const links = n.von === linksRolle;

      if (!links) {
        const eintrag = { ...n, links, ab: uhr, tippenAb: 0, tippenDauer: 0 };
        uhr += PAUSE_RECHTS;
        return eintrag;
      }

      const tippenDauer = Math.min(TIPP_DECKEL, TIPP_GRUND + n.text.length * TIPP_JE_ZEICHEN);
      const eintrag = { ...n, links, tippenAb: uhr, tippenDauer, ab: uhr + tippenDauer };
      uhr += tippenDauer + PAUSE_LINKS;
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
      von: start,
      fertig,
      bis: start + uhr * tempo + HALTEN,
    };

    start = geplant.bis;
    return geplant;
  });

  return { folge, gesamt: start };
}
