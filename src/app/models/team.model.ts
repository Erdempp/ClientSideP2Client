import { User } from './user.model';

export class Team {
    // tslint:disable-next-line: variable-name
    _id: string;
    name: string;
    city: string;
    coach: User;
    players: User[];
    gender: 'men' | 'women' | 'mixed';
    description: string
}