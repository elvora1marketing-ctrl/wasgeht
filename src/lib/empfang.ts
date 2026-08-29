import mark from '~/assets/mark.svg';
import type { Gespraech } from '~/lib/chat';

/**
 * Der Empfang, den man auf WhatsApp tatsächlich bekommt.
 *
 * GESCHRIEBEN WIE ECHTE VERLÄUFE: Kunden schreiben abends und klein,
 * nennen Zeitfenster, fragen nach Beispielen. Die Assistenz nimmt in
 * jedem Verlauf sichtbar Arbeit ab: sie qualifiziert, trägt ein,
 * organisiert den Rückruf und bereitet Luan vor.
 *
 * EINE Quelle für jede Stelle, an der die Assistenz aus Kundensicht
 * vorgeführt wird: das Telefon im ersten Sichtbereich der Startseite und
 * das Telefon auf der Kontaktseite. Vorher hatten beide eigene, leicht
 * unterschiedliche Verläufe, und genau solche Abweichungen lassen eine
 * Seite zusammengestückelt wirken.
 *
 * JEDER VERLAUF HAT SEINEN EIGENEN TAKT UND SEIN EIGENES PROTOKOLL.
 *
 * Vorher liefen alle drei im selben Rhythmus: gleiche Vorlaufzeit,
 * gleiche Tippdauer, gleiche Pausen. Nach dem ersten Verlauf kannte man
 * den zweiten schon. Jetzt schreibt der Mann auf dem Gerüst um 22:41
 * bedächtig, der verpasste Anrufer wird zügig aufgefangen, und die Frage
 * um kurz nach sechs läuft sachlich durch.
 *
 * Und neben jedem Verlauf steht, was die Assistenz dabei GETAN hat --
 * nicht was sie geschrieben hat. Das ist der Unterschied zwischen einem
 * Chat, den jeder von Hand tippen könnte, und einem System, das arbeitet.
 *
 * Blickwinkel ist das Telefon des Interessenten: seine Nachrichten stehen
 * rechts, die der Assistenz links mit Profilbild.
 */
export const empfangGespraeche: Gespraech[] = [
  {
    /* Abends, nebenbei, mit dem Daumen. Er legt das Telefon zwischendurch
       weg -- deshalb die langen Pausen nach seinen Nachrichten. */
    takt: 'bedacht',
    name: 'Elvora',
    status: 'online',
    uhrzeit: '22:41',
    stempel: 'Termin anfragen',
    bild: mark.src,
    nachrichten: [
      {
        von: 'kunde',
        zeit: '22:41',
        text: 'Guten Abend, geht so ein Erstgespräch auch abends? Tagsüber steh ich aufm Gerüst.',
        wirkung: { art: 'erkannt', text: 'Anliegen erkannt: Terminwunsch, außerhalb der Bürozeit' },
      },
      {
        von: 'assistenz',
        zeit: '22:41',
        text: 'Guten Abend. Das geht, früh wie abends. Diese Woche wäre Donnerstag um 7:30 Uhr oder um 18:00 Uhr frei.',
        wirkung: { art: 'suche', text: 'Kalender geprüft, zwei freie Randzeiten gefunden' },
      },
      { von: 'kunde', zeit: '22:43', text: 'dann donnerstag 18 uhr' },
      {
        von: 'assistenz',
        zeit: '22:43',
        text: 'Eingetragen: Donnerstag, 18:00 Uhr. Worum soll es vor allem gehen, damit Luan sich vorbereiten kann?',
        wirkung: [
          { art: 'kalender', text: 'Termin eingetragen: Do, 18:00 Uhr' },
          { art: 'erinnerung', text: 'Erinnerung gesetzt für Mittwoch, 18:00 Uhr' },
        ],
      },
      { von: 'kunde', zeit: '22:44', text: 'Wir verpassen ständig Anrufe, wenn wir auf dem Dach stehen.' },
      {
        von: 'assistenz',
        zeit: '22:44',
        text: 'Notiert. Genau dafür gibt es eine Lösung, die zeigt Luan Ihnen am Donnerstag live.',
        wirkung: [
          { art: 'notiz', text: 'Thema am Termin vermerkt: verpasste Anrufe' },
          { art: 'weitergabe', text: 'Zusammenfassung an Luan geschickt' },
        ],
      },
    ],
  },
  {
    /* Er hat gerade vergeblich angerufen und wartet auf Antwort. Hier
       zählt Tempo, und der erste Zug kommt von der Maschine. */
    takt: 'dringend',
    name: 'Elvora',
    status: 'online',
    uhrzeit: '11:06',
    stempel: 'Nach verpasstem Anruf',
    bild: mark.src,
    nachrichten: [
      {
        von: 'assistenz',
        zeit: '11:06',
        text: 'Guten Tag, hier ist die Assistenz von Elvora. Sie haben gerade angerufen, Luan sitzt bis 12 Uhr in einem Termin. Worum geht es?',
        wirkung: [
          { art: 'erkannt', text: 'Verpasster Anruf erkannt, 11:06 Uhr' },
          { art: 'kontakt', text: 'Nummer angeschrieben, 14 Sekunden nach dem Klingeln' },
        ],
      },
      { von: 'kunde', zeit: '11:09', text: 'Ah ok. Unsere Website ist von 2016 und auf dem Handy völlig kaputt.' },
      {
        von: 'assistenz',
        zeit: '11:09',
        text: 'Verstanden. Schicken Sie mir gern den Link, dann sieht Luan ihn sich heute noch an und ruft Sie mit einer ehrlichen Einschätzung zurück.',
        wirkung: { art: 'notiz', text: 'Anliegen erfasst: Website veraltet, mobil unbrauchbar' },
      },
      { von: 'kunde', zeit: '11:11', text: 'www.mustermann-haustechnik.de. Ab 14 Uhr bin ich erreichbar.' },
      {
        von: 'assistenz',
        zeit: '11:11',
        text: 'Danke, ist notiert. Der Rückruf kommt heute zwischen 14 und 15 Uhr an diese Nummer.',
        wirkung: [
          { art: 'kalender', text: 'Rückruffenster geblockt: heute, 14–15 Uhr' },
          { art: 'weitergabe', text: 'Adresse und Notiz liegen auf Luans Telefon' },
        ],
      },
    ],
  },
  {
    /* Kurz nach sechs, vor der ersten Baustelle. Sachlich, zügig,
       nichts Dramatisches. */
    takt: 'sachlich',
    name: 'Elvora',
    status: 'online',
    uhrzeit: '06:12',
    stempel: 'Anfrage stellen',
    bild: mark.src,
    nachrichten: [
      {
        von: 'kunde',
        zeit: '06:12',
        text: 'Hallo, sorgt ihr auch dafür, dass man uns bei Google findet? Malerbetrieb, 6 Leute.',
        wirkung: { art: 'erkannt', text: 'Betriebsart und Größe erfasst: Maler, 6 Mitarbeiter' },
      },
      {
        von: 'assistenz',
        zeit: '06:12',
        text: 'Hallo. Ja, genau dafür gibt es einen eigenen Baustein. Luan sieht sich an, wo Sie heute stehen, und sagt Ihnen, was zuerst wirkt.',
        wirkung: { art: 'suche', text: 'Passenden Baustein zugeordnet: lokale Sichtbarkeit' },
      },
      { von: 'kunde', zeit: '06:15', text: 'ok. Habt ihr Beispiele von anderen Betrieben?' },
      {
        von: 'assistenz',
        zeit: '06:15',
        text: 'Ja, die zeigt er Ihnen im Gespräch. Passt es Ihnen heute Mittag um 12:30 Uhr?',
        wirkung: { art: 'suche', text: 'Freien Termin am selben Tag gefunden' },
      },
      { von: 'kunde', zeit: '06:16', text: 'passt 👍' },
      {
        von: 'assistenz',
        zeit: '06:16',
        text: 'Steht: heute um 12:30 Uhr ruft Luan Sie an. Die Bestätigung kommt gleich hier herein.',
        wirkung: [
          { art: 'kalender', text: 'Anruf eingetragen: heute, 12:30 Uhr' },
          { art: 'weitergabe', text: 'Bestätigung verschickt, Luan vorbereitet' },
        ],
      },
    ],
  },
];
