import { Component, OnInit } from '@angular/core';

const about = 'De naam van dit project is \'VoetbalVereniging\'. Dit project houdt in dat ieder persoon een eigen team kan registreren. Bij het registreren van een team wordt de gebruiker automatisch als coach van het team aangewezen. Binnen het team is het mogelijk om leden toe te voegen. Om te kunnen voetballen zijn er verschillende velden beschikbaar, de enige persoon die de beschikbare velden kan toevoegen aan het systeem is de administrator. De administrator organiseert ook de wedstrijden, bij het organiseren worden er aan twee teams een voetbalveld en een datum toegewezen. In totaal zijn er dus, buiten de gebruikers om, 3 entiteiten, namelijk: team, veld en wedstrijd.'; 
const ENTITIY_DATA = [
  {
    entityName: 'User',
    properties: [
      { id: 'Mongoose.Types.ObjectId', },
      { name: 'string', }
    ],
  },
  {
    entityName: 'FootballTeam',
    properties: [
      { id: 'Mongoose.Types.ObjectId', },
      { name: 'string', },
      { coach: 'User', },
      { members: 'User[]', }
    ]
  },
  {
    entityName: 'FootballField',
    properties: [
      { id: 'Mongoose.Types.ObjectId', },
      { name: 'string', },
      { coach: 'User', },
      { members: 'User[]', }
    ]
  },
  {
    entityName: 'FootballMatch',
    properties: [
      { id: 'Mongoose.Types.ObjectId', },
      { teams: 'Team[2]', },
      { field: 'FootballField', },
      { date: 'Date', }
    ]
  }
];

const USE_CASES = [
  {
    name: 'UC-01 Registreren.',
    description: 'Hiermee registreert een nieuwe gebruiker zich.',
    actor: 'Nieuwe gebruiker.',
    precondition: 'Geen.',
    scenario: ['Gebruiker klikt op de knop Registreren.', 'Gebruiker vult de gevraagde gegevens in.', 'De gegevens worden gevalideerd en indien correct wordt de gebruiker doorverwezen naar het loginscherm.'],
    postcondition: 'Een nieuw account is geregistreerd.',
  },
  {
    name: 'UC-02 Inloggen.',
    description: 'Hiermee logt een bestaande gebruiker in.',
    actor: 'Bestaande gebruiker.',
    precondition: 'Geen.',
    scenario: ['Gebruiker vult de gevraagde gegevens in.', 'Gebruiker klikt op de knop Inloggen.', 'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het beginscherm.'],
    postcondition: 'De gebruiker is ingelogd.',
  },
  {
    name: 'UC-03 Team registreren.',
    description: 'Hiermee kan een bestaande gebruiker een team registreren.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: ['De gebruiker klikt op de knop Team aanmaken.', 'De gebruiker vult de gevraagde gegevens in.', 'De gebruiker klikt op de knop Aanmaken.', 'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.'],
    postcondition: 'De gebruiker heeft een team aangemaakt en is automatisch aangewezen als coach van het team.',
  },
  {
    name: 'UC-04 Team wijzigen.',
    description: 'Hiermee kan een bestaande gebruiker een team wijzigen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: ['De gebruiker klikt op de knop Team wijzigen.', 'De gebruiker vult de gevraagde gegevens in.', 'De gebruiker klikt op de knop Wijzigen.', 'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.'],
    postcondition: 'De gebruiker heeft een team gewijzigd.',
  },
  {
    name: 'UC-05 Team verwijderen.',
    description: 'Hiermee kan een bestaande gebruiker een team verwijderen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd.',
    scenario: ['De gebruiker klikt op de knop Team verwijderen.', 'De gebruiker vult de gevraagde gegevens in.', 'De gebruiker klikt op de knop Verwijderen.', 'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.'],
    postcondition: 'De gebruiker heeft een team verwijderd.',
  },
  {
    name: 'UC-06 Lid toevoegen.',
    description: 'Hiermee kan een bestaande gebruiker een lid toevoegen aan een geregistreerde team.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd en is coach van het desbetreffende team.',
    scenario: ['De gebruiker klikt op de knop Lid toevoegen.', 'De gebruiker vult de gevraagde gegevens in.', 'De gebruiker klikt op de knop Toevoegen.', 'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.'],
    postcondition: 'De gebruiker heeft een lid toegevoegd aan het team.',
  },
  {
    name: 'UC-07 Lid verwijderen.',
    description: 'Hiermee kan een bestaande gebruiker een lid van een team verwijderen.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd en is coach van het desbetreffende team.',
    scenario: ['De gebruiker klikt op de knop Lid verwijderen.', 'De gebruiker vult de gevraagde gegevens in.', 'De gebruiker klikt op de knop Verwijderen.', 'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.'],
    postcondition: 'De gebruiker heeft een lid verwijderd van het team.',
  },
  {
    name: 'UC-08 Afmelden bij team.',
    description: 'Hiermee kan een bestaande gebruiker zichzelf afmelden bij een team.',
    actor: 'Bestaande gebruiker.',
    precondition: 'De gebruiker is ingelogd en staat ingeschreven bij het desbetreffende team.',
    scenario: ['De gebruiker klikt op de knop Afmelden.', 'De gegevens worden gecontroleerd en indien correct wordt de gebruiker doorverwezen naar het teamscherm.'],
    postcondition: 'De gebruiker heeft zich afgemeld bij het team.',
  },
  {
    name: 'UC-09 Voetbalveld toevoegen.',
    description: 'Hiermee kan een administrator een voetbalveld toevoegen.',
    actor: 'Administrator.',
    precondition: 'De administrator is ingelogd.',
    scenario: ['De administrator klikt op de knop Voetbalveld toevoegen.', 'De administrator vult de gevraagde gegevens in.', 'De administrator klikt op de knop Toevoegen.', 'De gegevens worden gecontroleerd en indien correct wordt de administrator doorverwezen naar het voetbalveldscherm.'],
    postcondition: 'De administrator heeft een voetbalveld toegevoegd.',
  },
  {
    name: 'UC-10 Voetbalveld wijzigen.',
    description: 'Hiermee kan een administrator een voetbalveld wijzigen.',
    actor: 'Administrator.',
    precondition: 'De administrator is ingelogd.',
    scenario: ['De administrator klikt op de knop Voetbalveld wijzigen.', 'De administrator vult de gevraagde gegevens in.', 'De administrator klikt op de knop Wijzigen.', 'De gegevens worden gecontroleerd en indien correct wordt de administrator doorverwezen naar het voetbalveldscherm.'],
    postcondition: 'De administrator heeft een voetbalveld gewijzigd.',
  },
  {
    name: 'UC-11 Voetbalveld verwijderen.',
    description: 'Hiermee kan een administrator een voetbalveld verwijderen.',
    actor: 'Administrator.',
    precondition: 'De administrator is ingelogd.',
    scenario: ['De administrator klikt op de knop Voetbalveld verwijderen.', 'De administrator vult de gevraagde gegevens in.', 'De administrator klikt op de knop Verwijderen.', 'De gegevens worden gecontroleerd en indien correct wordt de administrator doorverwezen naar het voetbalveldscherm.'],
    postcondition: 'De administrator heeft een voetbalveld verwijderd.',
  },
  {
    name: 'UC-12 Wedstrijd organiseren.',
    description: 'Hiermee kan een administrator een wedstrijd organiseren.',
    actor: 'Administrator.',
    precondition: 'De administrator is ingelogd.',
    scenario: ['De administrator klikt op de knop Wedstrijd organiseren.', 'De administrator vult de gevraagde gegevens in.', 'De administrator klikt op de knop Organiseren.', 'De gegevens worden gecontroleerd en indien correct wordt de administrator doorverwezen naar het wedstrijdscherm.'],
    postcondition: 'De administrator heeft een wedstrijd georganiseerd.',
  },
  {
    name: 'UC-13 Wedstrijd wijzigen.',
    description: 'Hiermee kan een administrator een wedstrijd wijzigen.',
    actor: 'Administrator.',
    precondition: 'De administrator is ingelogd.',
    scenario: ['De administrator klikt op de knop Wedstrijd wijzigen.', 'De administrator vult de gevraagde gegevens in.', 'De administrator klikt op de knop Wijzigen.', 'De gegevens worden gecontroleerd en indien correct wordt de administrator doorverwezen naar het wedstrijdscherm.'],
    postcondition: 'De administrator heeft een wedstrijd gewijzigd.',
  },
  {
    name: 'UC-14 Wedstrijd annuleren.',
    description: 'Hiermee kan een administrator een wedstrijd annuleren.',
    actor: 'Administrator.',
    precondition: 'De administrator is ingelogd.',
    scenario: ['De administrator klikt op de knop Wedstrijd annuleren.', 'De administrator vult de gevraagde gegevens in.', 'De administrator klikt op de knop Annuleren.', 'De gegevens worden gecontroleerd en indien correct wordt de administrator doorverwezen naar het wedstrijdscherm.'],
    postcondition: 'De administrator heeft een wedstrijd geannuleerd.',
  },
]

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

  convert(property) {
    const key = Object.keys(property)[0];
    const value = property[key];
    return key + ': ' + value;
  }

  applicationInfo = about; 
  entities = ENTITIY_DATA;
  cases = USE_CASES;

  constructor() { }

  ngOnInit() {
  }

}
