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
 * DIE UHRZEITEN SIND ABSICHT UND ABGESTIMMT
 *
 * 06:24, 19:42 und 23:51: früher Morgen, nach Feierabend, kurz vor
 * Mitternacht. Zusammen mit den drei Verläufen auf der Startseite (22:41,
 * 11:06, 06:12) ist damit der ganze Tag abgedeckt.
 *
 * Das ist der Beleg für die Rund-um-die-Uhr-Erreichbarkeit, und zwar ein
 * gezeigter statt eines behaupteten. „Wir sind 24/7 für Sie da" schreibt
 * jeder auf seine Seite; eine Terminverschiebung, die um 23:51 Uhr
 * beantwortet wird, muss man nicht glauben, man sieht sie.
 *
 * WER DIE UHRZEIT ÄNDERT, MUSS DEN TEXT MITLESEN. Beides hängt zusammen:
 * um 19:42 ist niemand mehr „bis mittags auf einer Baustelle", und um
 * 06:24 sagt man nicht „Guten Tag". Genau solche Kleinigkeiten verraten
 * eine gestellte Vorführung.
 *
 * TONFALL DER ASSISTENZ: knapp, zugewandt, ohne Ausrufezeichen-Inflation.
 * Sie sagt, was sie tut, nennt Zeiten und fragt genau einmal nach. Wer
 * einen Betrieb anschreibt, will keine gute Laune, sondern eine Antwort.
 *
 * JEDER VERLAUF HAT SEINEN EIGENEN TAKT UND SEIN EIGENES PROTOKOLL.
 *
 * Der Takt bildet ab, in welcher Lage jemand schreibt: der Wasserschaden
 * unter der Spüle ist dringend, die Terminverschiebung um kurz vor
 * Mitternacht bedächtig, die Thermostatfrage am frühen Morgen sachlich.
 * Vorher liefen alle drei im selben Rhythmus, und drei gleich getaktete
 * Vorführungen nebeneinander sehen aus wie eine einzige, dreimal
 * abgespielt.
 *
 * Das Protokoll zeigt, was die Assistenz DABEI GETAN hat -- nicht, was
 * sie geschrieben hat. Ohne das ist jedes Modul nur ein Chat, und einen
 * Chat kann jeder von Hand tippen. Genau daran hing bisher der ganze
 * Beweis, dass diese Module überhaupt etwas automatisieren.
 */
export const modulGespraeche: Record<string, Gespraech> = {
  'whatsapp-assistenz': {
    takt: 'sachlich',
    name: 'Ihr Betrieb',
    status: 'online',
    uhrzeit: '06:24',
    stempel: 'WhatsApp-Assistenz',
    bild: betrieb.src,
    nachrichten: [
      {
        von: 'kunde',
        zeit: '06:24',
        text: 'Guten Morgen, unser Heizkörper im Bad wird nicht mehr warm. Wechseln Sie auch einzelne Thermostate?',
        wirkung: { art: 'erkannt', text: 'Anliegen erkannt: Thermostat, Heizung' },
      },
      {
        von: 'assistenz',
        zeit: '06:24',
        text: 'Guten Morgen. Ja, das machen wir regelmäßig. Schicken Sie mir bitte ein Foto vom Thermostat, dann bringt der Kollege das passende Ersatzteil gleich mit.',
        wirkung: { art: 'notiz', text: 'Foto angefordert, damit das Ersatzteil mitkommt' },
      },
      { von: 'kunde', zeit: '06:26', text: 'Foto kommt gleich. Wäre nächste Woche etwas frei?' },
      {
        von: 'assistenz',
        zeit: '06:26',
        text: 'Dienstag um 8:30 Uhr wäre möglich. Soll ich den Termin für Sie eintragen?',
        wirkung: [
          { art: 'suche', text: 'Kalender geprüft, freien Vormittag gefunden' },
          { art: 'weitergabe', text: 'Anfrage liegt auf dem Telefon des Chefs' },
        ],
      },
    ],
  },
  'anruf-retter': {
    /* Es tropft. Kurze Sätze, schnelle Antwort, keine Denkpausen. */
    takt: 'dringend',
    name: 'Ihr Betrieb',
    status: 'online',
    uhrzeit: '19:42',
    stempel: 'Anruf-Retter',
    bild: betrieb.src,
    nachrichten: [
      {
        von: 'assistenz',
        zeit: '19:42',
        text: 'Guten Abend, Sie haben uns gerade angerufen. Wir sind für heute vom Hof. Worum geht es? Ich leite es direkt weiter.',
        wirkung: [
          { art: 'erkannt', text: 'Verpasster Anruf erkannt, 19:42 Uhr' },
          { art: 'kontakt', text: 'Anrufer angeschrieben, keine 20 Sekunden später' },
        ],
      },
      {
        von: 'kunde',
        zeit: '19:45',
        text: 'Bei uns tropft es unter der Spüle, es wird langsam mehr.',
        wirkung: { art: 'erkannt', text: 'Als dringend eingestuft: Wasserschaden' },
      },
      {
        von: 'assistenz',
        zeit: '19:45',
        text: 'Danke für die Rückmeldung, das sollte zügig angesehen werden. Stellen Sie bitte einen Eimer darunter und drehen Sie das Eckventil zu. Sie bekommen morgen früh bis 8 Uhr einen Rückruf mit Terminvorschlag.',
        wirkung: [
          { art: 'notiz', text: 'Sofortmaßnahme durchgegeben: Eckventil zu' },
          { art: 'kalender', text: 'Rückruf für morgen 7:30 Uhr vorgemerkt' },
          { art: 'weitergabe', text: 'Oben auf der Liste für den nächsten Morgen' },
        ],
      },
    ],
  },
  terminbuchung: {
    /* Kurz vor Mitternacht, im Bett, ohne Eile. */
    takt: 'bedacht',
    name: 'Ihr Betrieb',
    status: 'online',
    uhrzeit: '23:51',
    stempel: 'Terminbuchung',
    bild: betrieb.src,
    nachrichten: [
      {
        von: 'kunde',
        zeit: '23:51',
        text: 'Hallo, ich schaffe es morgen um 9 Uhr leider nicht. Lässt sich der Termin verschieben?',
        wirkung: { art: 'suche', text: 'Bestehenden Termin gefunden: morgen, 9:00 Uhr' },
      },
      {
        von: 'assistenz',
        zeit: '23:51',
        text: 'Selbstverständlich. Frei wäre Donnerstag um 13:00 Uhr oder Freitag um 9:30 Uhr.',
        wirkung: { art: 'suche', text: 'Zwei Ersatztermine aus dem Kalender geholt' },
      },
      { von: 'kunde', zeit: '23:52', text: 'Freitag passt besser.' },
      {
        von: 'assistenz',
        zeit: '23:52',
        text: 'Notiert: Freitag, 9:30 Uhr. Die alte Erinnerung ist gelöscht, die neue geht Donnerstag raus.',
        wirkung: [
          { art: 'kalender', text: 'Termin verschoben auf Freitag, 9:30 Uhr' },
          { art: 'erinnerung', text: 'Alte Erinnerung gelöscht, neue für Donnerstag' },
        ],
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
