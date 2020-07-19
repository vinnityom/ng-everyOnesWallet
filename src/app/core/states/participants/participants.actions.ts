import { Participant } from '../../../shared/models';

export class AddParticipant {
    static readonly type = '[PARTICIPANT] Add';

    constructor(public payload: Participant) {};
}

export class RemoveParticipant {
    static readonly type = '[PARTICIPANT] Remove';

    constructor(public payload: number) {};
}