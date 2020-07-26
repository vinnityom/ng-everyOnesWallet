import {Pipe, PipeTransform} from '@angular/core';
import {Select} from '@ngxs/store';
import {ParticipantsState} from '../../core/states/participants/participants.state';
import {Observable} from 'rxjs';
import {Participant} from '../models/models';
import {map} from 'rxjs/operators';

@Pipe({ name: 'toName' })
export class ToNamePipe implements PipeTransform {
    @Select(ParticipantsState.getParticipants) public participants$: Observable<Participant[]>;
    protected name: string;

    transform(neededId: number): any {
        return this.participants$.pipe(
            map(participants => participants.find(({id}) => id === neededId).name),
        );
    }

}
