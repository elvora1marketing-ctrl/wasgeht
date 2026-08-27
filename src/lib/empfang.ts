import mark from '~/assets/mark.svg';
import type { Gespraech } from '~/lib/chat';

/**
 * Der Empfang, den man auf WhatsApp tatsächlich bekommt.
 *
 * GESCHRIEBEN WIE ECHTE VERLÄUFE: Kunden schreiben abends und klein,
 * fragen zuerst nach dem Preis, nennen Zeitfenster. Die Assistenz nimmt
 * in jedem Verlauf sichtbar Arbeit ab: sie qualifiziert, trägt ein,
 * organisiert den Rückruf und bereitet Luan vor. Die Preisantwort ist
 * dieselbe wie in der Fragenliste der Seite (kein Preis ohne Gespräch,
 * dann fest und schriftlich), damit die Vorführung nicht etwas
 * verspricht, was die Seite verneint.
 *
 * EINE Quelle für jede Stelle, an der die Assistenz aus Kundensicht
 * vorgeführt wird: das Telefon im ersten Sichtbereich der Startseite und
 * das Telefon auf der Kontaktseite. Vorher hatten beide eigene, leicht
 * unterschiedliche Verläufe, und genau solche Abweichungen lassen eine
 * Seite zusammengestückelt wirken.
 *
 * Das Telefon blättert durch die drei Verläufe wie ein Bildwechsler, mit
 * Punkten als Anzeige. Der Website-Verlauf steht am Ende, denn der letzte
 * bleibt stehen.
 *
 * Blickwinkel ist das Telefon des Interessenten: seine Nachrichten stehen
 * rechts, die der Assistenz links mit Profilbild.
 */
export const empfangGespraeche: Gespraech[] = [
  {
    name: 'Elvora',
    status: 'online',
    uhrzeit: '22:41',
    stempel: 'Termin anfragen',
    bild: mark.src,
    nachrichten: [
      { von: 'kunde', zeit: '22:41', text: 'Guten Abend, geht so ein Erstgespräch auch abends? Tagsüber steh ich aufm Gerüst.' },
      { von: 'assistenz', zeit: '22:41', text: 'Guten Abend. Das geht, früh wie abends. Diese Woche wäre Donnerstag um 7:30 Uhr oder um 18:00 Uhr frei.' },
      { von: 'kunde', zeit: '22:43', text: 'dann donnerstag 18 uhr' },
      { von: 'assistenz', zeit: '22:43', text: 'Eingetragen: Donnerstag, 18:00 Uhr. Worum soll es vor allem gehen, damit Luan sich vorbereiten kann?' },
      { von: 'kunde', zeit: '22:44', text: 'Wir verpassen ständig Anrufe, wenn wir auf dem Dach stehen.' },
      { von: 'assistenz', zeit: '22:44', text: 'Notiert. Genau dafür gibt es eine Lösung, die zeigt Luan Ihnen am Donnerstag live.' },
    ],
  },
  {
    name: 'Elvora',
    status: 'online',
    uhrzeit: '11:06',
    stempel: 'Nach verpasstem Anruf',
    bild: mark.src,
    nachrichten: [
      { von: 'assistenz', zeit: '11:06', text: 'Guten Tag, hier ist die Assistenz von Elvora. Sie haben gerade angerufen, Luan sitzt bis 12 Uhr in einem Termin. Worum geht es?' },
      { von: 'kunde', zeit: '11:09', text: 'Ah ok. Unsere Website ist von 2016 und auf dem Handy völlig kaputt.' },
      { von: 'assistenz', zeit: '11:09', text: 'Verstanden. Schicken Sie mir gern den Link, dann sieht Luan ihn sich heute noch an und ruft Sie mit einer ehrlichen Einschätzung zurück.' },
      { von: 'kunde', zeit: '11:11', text: 'www.mustermann-haustechnik.de. Ab 14 Uhr bin ich erreichbar.' },
      { von: 'assistenz', zeit: '11:11', text: 'Danke, ist notiert. Der Rückruf kommt heute zwischen 14 und 15 Uhr an diese Nummer.' },
    ],
  },
  {
    name: 'Elvora',
    status: 'online',
    uhrzeit: '06:12',
    stempel: 'Anfrage stellen',
    bild: mark.src,
    nachrichten: [
      { von: 'kunde', zeit: '06:12', text: 'Hallo, was kostet bei euch ungefähr eine Website? Malerbetrieb, 6 Leute.' },
      { von: 'assistenz', zeit: '06:12', text: 'Hallo. Ehrliche Antwort: das hängt vom Umfang ab. Luan nennt Preise erst nach einem kurzen Gespräch, dann aber fest und schriftlich, ohne Nachforderungen.' },
      { von: 'kunde', zeit: '06:15', text: 'ok, fair. Habt ihr Beispiele von anderen Betrieben?' },
      { von: 'assistenz', zeit: '06:15', text: 'Ja, die zeigt er Ihnen im Gespräch. Passt es Ihnen heute Mittag um 12:30 Uhr?' },
      { von: 'kunde', zeit: '06:16', text: 'passt 👍' },
      { von: 'assistenz', zeit: '06:16', text: 'Steht: heute um 12:30 Uhr ruft Luan Sie an. Die Bestätigung kommt gleich hier herein.' },
    ],
  },
];
