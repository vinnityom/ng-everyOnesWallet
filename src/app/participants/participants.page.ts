import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { uniqueId } from 'lodash';
import { Participant } from '../shared/models';
import { AddParticipant } from '../core/states/participants/participants.actions';
import { ParticipantsState } from '../core/states/participants/participants.state';

@Component({
  selector: 'app-tab1',
  templateUrl: 'participants.page.html',
  styleUrls: ['participants.page.scss']
})
export class ParticipantsPage {
  @Select(ParticipantsState.getParticipants) public participants$: Observable<Participant[]>;

  constructor(
    private alertController: AlertController,
    private store: Store,
  ) {}

  public async showAddParticipantModal(): Promise<void> {
    const modal = await this.alertController.create({
      header: 'Введите имя нового участника',
      inputs: [{ type: 'text', attributes: { autoFocus: true } }],
      buttons: [
        { role: 'cancel', text: 'Отмена' },
        { role: 'add', text: 'Добавить', handler: (data) => this.addParticipant(data['0']) },
      ]
    });

    modal.present();
  }

  private addParticipant(name: string): void {
    if (!name.length) {
      return;
    }

    const newParticipant: Participant = { name, id: Number(uniqueId()) };
    this.store.dispatch(new AddParticipant(newParticipant));
  }

}
