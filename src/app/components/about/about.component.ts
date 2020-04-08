import { Component, OnInit } from '@angular/core';

const about =
  // tslint:disable-next-line: max-line-length
  'De naam van dit project is \'VoetbalVereniging\'. Dit project houdt in dat ieder persoon een eigen team kan registreren. Bij het registreren van een team wordt de gebruiker automatisch als coach van het team aangewezen. Binnen het team is het mogelijk om leden toe te voegen. Om te kunnen voetballen zijn er verschillende velden beschikbaar, de enige persoon die de beschikbare velden kan toevoegen aan het systeem is de administrator. De administrator organiseert ook de wedstrijden, bij het organiseren worden er aan twee teams een voetbalveld en een datum toegewezen. In totaal zijn er dus, buiten de gebruikers om, 3 entiteiten, namelijk: team, veld en wedstrijd.';
const ENTITIY_DATA = [
  {
    entityName: 'User',
    properties: [{ _id: 'mongoose.Types.ObjectId' }, { name: 'string' }, { password: 'string' }],
  },
  {
    entityName: 'Team',
    properties: [
      { _id: 'mongoose.Types.ObjectId' },
      { name: 'string' },
      { city: 'string' },
      { coach: 'User' },
      { players: 'User[]' },
      { gender: '\'men\' | \'women\' | \'mixed\''},
      { description: 'string' }
    ],
  },
  {
    entityName: 'Field',
    properties: [
      { _id: 'mongoose.Types.ObjectId' },
      { name: 'string' },
      { owner: 'User' },
      { location: '{ address: string, postalCode: string }' },
      { facilities: 'string[]' },
      { length: 'number' },
      { width: 'number' },
      { description: 'string' }
    ],
  },
  {
    entityName: 'Match',
    properties: [
      { id: 'mongoose.Types.ObjectId' },
      { organizer: 'User' },
      { homeTeam: 'Team' },
      { awayTeam: 'Team' },
      { field: 'Field' },
      { startDateTime: 'Date' },
      { endDateTime: 'Date' }
    ],
  },
];

const USE_CASES = [
  {
    name: 'UC-01 Registreren.',
    description: 'Hiermee registreert een nieuwe gebruiker zich.',
    actor: 'Nieuwe gebruiker.',
    precondition: 'Geen.',
    scenario: [
      'Gebruiker klikt op de knop Registreren.',
      'Gebruiker vult de gevraagde gegevens in.',
      'De gegevens worden gevalideerd en indien correct wordt de gebruiker doorverwezen naar het loginscherm.',
    ],
    postcondition: 'Een nieuw account is geregistreerd.',
  },
  {
    name: 'UC-02 Inloggen.',
    description: 'Hiermee logt een bestaande gebruiker in.',
    actor: 'Bestaande gebruiker.',
    precondition: 'Geen.',
    scenario: [
      'Gebruiker vult de gevraagde gegevens in.',
      'Gebruiker klikt op de knop Inloggen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het beginscherm.',
    ],
    postcondition: 'De gebruiker is ingelogd.',
  },
  {
    name: 'UC-03 Team registreren.',
    description: 'Hiermee kan een bestaande gebruiker een team registreren.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Team aanmaken.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Aanmaken.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.',
    ],
    postcondition:
      'De gebruiker heeft een team aangemaakt en is automatisch aangewezen als coach van het team.',
  },
  {
    name: 'UC-04 Team wijzigen.',
    description: 'Hiermee kan een bestaande gebruiker een team wijzigen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Team wijzigen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Wijzigen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.',
    ],
    postcondition: 'De gebruiker heeft een team gewijzigd.',
  },
  {
    name: 'UC-05 Team verwijderen.',
    description: 'Hiermee kan een bestaande gebruiker een team verwijderen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Team verwijderen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Verwijderen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.',
    ],
    postcondition: 'De gebruiker heeft een team verwijderd.',
  },
  {
    name: 'UC-06 Lid toevoegen.',
    description:
      'Hiermee kan een bestaande gebruiker een lid toevoegen aan een geregistreerde team.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd en is coach van het desbetreffende team.',
    scenario: [
      'De gebruiker klikt op de knop Lid toevoegen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Toevoegen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.',
    ],
    postcondition: 'De gebruiker heeft een lid toegevoegd aan het team.',
  },
  {
    name: 'UC-07 Lid verwijderen.',
    description: 'Hiermee kan een bestaande gebruiker een lid van een team verwijderen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd en is coach van het desbetreffende team.',
    scenario: [
      'De gebruiker klikt op de knop Lid verwijderen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Verwijderen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.',
    ],
    postcondition: 'De gebruiker heeft een lid verwijderd van het team.',
  },
  {
    name: 'UC-08 Voetbalveld toevoegen.',
    description: 'Hiermee kan een gebruiker een voetbalveld toevoegen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Voetbalveld toevoegen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Toevoegen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het voetbalveldscherm.',
    ],
    postcondition: 'De gebruiker heeft een voetbalveld toegevoegd en is automatisch aangewezen als eigenaar van het veld.',
  },
  {
    name: 'UC-09 Voetbalveld wijzigen.',
    description: 'Hiermee kan een gebruiker een voetbalveld wijzigen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Voetbalveld wijzigen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Wijzigen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het voetbalveldscherm.',
    ],
    postcondition: 'De gebruiker heeft een voetbalveld gewijzigd.',
  },
  {
    name: 'UC-10 Voetbalveld verwijderen.',
    description: 'Hiermee kan een gebruiker een voetbalveld verwijderen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Voetbalveld verwijderen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Verwijderen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het voetbalveldscherm.',
    ],
    postcondition: 'De gebruiker heeft een voetbalveld verwijderd.',
  },
  {
    name: 'UC-11 Wedstrijd organiseren.',
    description: 'Hiermee kan een gebruiker een wedstrijd organiseren.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Wedstrijd organiseren.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Organiseren.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het wedstrijdscherm.',
    ],
    postcondition: 'De gebruiker heeft een wedstrijd georganiseerd.',
  },
  {
    name: 'UC-12 Wedstrijd wijzigen.',
    description: 'Hiermee kan een gebruiker een wedstrijd wijzigen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Wedstrijd wijzigen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Wijzigen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het wedstrijdscherm.',
    ],
    postcondition: 'De gebruiker heeft een wedstrijd gewijzigd.',
  },
  {
    name: 'UC-13 Wedstrijd annuleren.',
    description: 'Hiermee kan een gebruiker een wedstrijd annuleren.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Wedstrijd annuleren.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Annuleren.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het wedstrijdscherm.',
    ],
    postcondition: 'De gebruiker heeft een wedstrijd geannuleerd.',
  },
  {
    name: 'UC-14 Faciliteit toevoegen aan voetbalveld.',
    description: 'Hiermee kan een gebruiker een faciliteit toevoegen aan een voetbalveld.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Faciliteit toevoegen.',
      'De gebruiker vult de gevraagde gegevens in.',
      'De gebruiker klikt op de knop Opslaan.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het wedstrijdscherm.',
    ],
    postcondition: 'De gebruiker heeft een faciliteit toegevoegd aan een voetbalveld.',
  },
  {
    name: 'UC-15 Faciliteit verwijderen van voetbalveld.',
    description: 'Hiermee kan een gebruiker een faciliteit verwijderen van een voetbalveld.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: [
      'De gebruiker klikt op de knop Faciliteit verwijderen.',
      'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het wedstrijdscherm.',
    ],
    postcondition: 'De gebruiker heeft een faciliteit verwijderd van een voetbalveld.',
  },
];

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  applicationInfo = about;
  entities = ENTITIY_DATA;
  cases = USE_CASES;

  convert(property) {
    const key = Object.keys(property)[0];
    const value = property[key];
    return key + ': ' + value;
  }

  constructor() {}

  ngOnInit() {}
}
