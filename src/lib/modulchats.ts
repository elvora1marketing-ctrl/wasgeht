import betrieb from '~/assets/betrieb.svg';
import type { Gespraech } from '~/lib/chat';

/**
 * Die Verläufe der drei Chat-Module, aus Sicht des Kunden eines Betriebs.
 *
 * EINE Quelle für zwei Stellen auf der Automatisierungsseite: das
 * Karussell im Abschnitt „Wo es klemmt" und die Telefone in den
 * Modulzeilen weiter unten. Vorher hätten beide eigene Fassungen gehabt,
 * und solche Abweichungen lassen eine Seite zusammengestückelt wirken.
 *
 * Geschrieben wie echte Verläufe: jeder zeigt einen Handgriff, den die
 * Assistenz wirklich übernimmt (Foto anfordern, Sofortmaßnahme nennen und
 * Rückruf mit Zeitfenster zusagen, Termin verschieben samt Erinnerung).
 * Der `stempel` nennt das Modul, damit im Karussell zu sehen ist, welcher
 * Baustein gerade arbeitet.
 *
 * WARUM „IHR BETRIEB" IM KOPF STEHT
 *
 * Vorher stand dort „Musterbetrieb". Ehrlich, aber es las sich wie ein
 * ausgefülltes Formular, und der Besucher blieb Zuschauer.
 *
 * Ein erfundener Firmenname wäre die naheliegende Alternative und wäre
 * falsch: „Haustechnik Wenzel" gibt es irgendwo wirklich, und dann steht
 * ein fremder Betrieb ungefragt als Referenz auf dieser Seite.
 *
 * „Ihr Betrieb" löst beides. Es behauptet keine Firma, die es nicht gibt,
 * und der Betriebsinhaber, der hier liest, sieht im Kopf des Telefons
 * seinen eigenen Laden. Zusammen mit der Bildunterschrift „Schematische
 * Darstellung" bleibt unmissverständlich, dass das eine Vorführung ist.
 *
 * TONFALL DER ASSISTENZ: knapp, zugewandt, ohne Ausrufezeichen-Inflation.
 * Sie sagt, was sie tut, nennt Zeiten und fragt genau einmal nach. Wer
 * einen Betrieb anschreibt, will keine gute Laune, sondern eine Antwort.
 */
export const modulGespraeche: Record<string, Gespraech> = {
  'whatsapp-assistenz': {
    name: 'Ihr Betrieb',
    status: 'online',
    uhrzeit: '9:41',
    stempel: 'WhatsApp-Assistenz',
    bild: betrieb.src,
    nachrichten: [
      {
        von: 'kunde',
        zeit: '9:41',
        text: 'Guten Tag, unser Heizkörper im Bad wird nicht mehr warm. Wechseln Sie auch einzelne Thermostate?',
      },
      {
        von: 'assistenz',
        zeit: '9:41',
        text: 'Guten Tag. Ja, das machen wir regelmäßig. Schicken Sie mir bitte ein Foto vom Thermostat, dann bringt der Kollege das passende Ersatzteil gleich mit.',
      },
      { von: 'kunde', zeit: '9:43', text: 'Foto kommt gleich. Wäre nächste Woche etwas frei?' },
      {
        von: 'assistenz',
        zeit: '9:43',
        text: 'Dienstag um 8:30 Uhr wäre möglich. Soll ich den Termin für Sie eintragen?',
      },
    ],
  },
  'anruf-retter': {
    name: 'Ihr Betrieb',
    status: 'online',
    uhrzeit: '10:03',
    stempel: 'Anruf-Retter',
    bild: betrieb.src,
    nachrichten: [
      {
        von: 'assistenz',
        zeit: '10:03',
        text: 'Guten Tag, Sie haben uns gerade angerufen. Wir sind bis mittags auf einer Baustelle. Worum geht es? Ich leite es direkt weiter.',
      },
      {
        von: 'kunde',
        zeit: '10:06',
        text: 'Bei uns tropft es unter der Spüle, es wird langsam mehr.',
      },
      {
        von: 'assistenz',
        zeit: '10:06',
        text: 'Danke für die Rückmeldung, das sollte zügig angesehen werden. Stellen Sie bitte einen Eimer darunter und drehen Sie das Eckventil zu. Sie bekommen heute bis 13 Uhr einen Rückruf mit Terminvorschlag.',
      },
    ],
  },
  terminbuchung: {
    name: 'Ihr Betrieb',
    status: 'online',
    uhrzeit: '14:12',
    stempel: 'Terminbuchung',
    bild: betrieb.src,
    nachrichten: [
      {
        von: 'kunde',
        zeit: '14:12',
        text: 'Hallo, ich schaffe es morgen um 9 Uhr leider nicht. Lässt sich der Termin verschieben?',
      },
      {
        von: 'assistenz',
        zeit: '14:12',
        text: 'Selbstverständlich. Frei wäre Donnerstag um 13:00 Uhr oder Freitag um 9:30 Uhr.',
      },
      { von: 'kunde', zeit: '14:13', text: 'Freitag passt besser.' },
      {
        von: 'assistenz',
        zeit: '14:13',
        text: 'Notiert: Freitag, 9:30 Uhr. Die alte Erinnerung ist gelöscht, die neue geht Donnerstag raus.',
      },
    ],
  },
};

/** Dieselben drei in fester Reihenfolge, für das Karussell. */
export const modulGespraechFolge: Gespraech[] = [
  modulGespraeche['whatsapp-assistenz']!,
  modulGespraeche['anruf-retter']!,
  modulGespraeche['terminbuchung']!,
];
