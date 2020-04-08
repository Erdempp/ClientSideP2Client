import { User } from './user.model';

export class Field {
    // tslint:disable-next-line: variable-name
    _id: string;
    name: string;
    owner: User;
    location: {
        address: string;
        postalCode: string;
    };
    facilities: string[];
    length: number;
    width: number;
    description: string;
}