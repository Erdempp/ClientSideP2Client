import { Team } from './team.model';
import { Field } from './field.model';
import { User } from './user.model';

export class Match {
    constructor(awayTeam, field, startDateTime, endDateTime) {
        this.awayTeam = awayTeam;
        this.field = field;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }
    // tslint:disable-next-line: variable-name
    _id: string;
    organizer: User
    homeTeam: Team;
    awayTeam: Team;
    field: Field;
    startDateTime: Date;
    endDateTime: Date;
}