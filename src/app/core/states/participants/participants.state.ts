import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Participant } from '../../../shared/models';
import { AddParticipant, RemoveParticipant } from './participants.actions';

export class ParticipantsStateModel {
    participants: Array<Participant>;
}

@State<ParticipantsStateModel>({
    name: 'participants',
    defaults: {
        participants: [],
    }
})
export class ParticipantsState {
    @Selector()
    static getParticipants(state: ParticipantsStateModel) {
        return state.participants;
    }

    @Action(AddParticipant)
    add({ getState, patchState }: StateContext<ParticipantsStateModel>, { payload }: AddParticipant) {
        const currentState = getState();
        patchState({
            participants: [...currentState.participants, payload],
        });
    }

    @Action(RemoveParticipant)
    remove({ getState, patchState }: StateContext<ParticipantsStateModel>, { payload }: RemoveParticipant) {
        const newState = getState().participants.filter(({ id }) => id !== payload);
        patchState({
            participants: newState,
        });
    }
}