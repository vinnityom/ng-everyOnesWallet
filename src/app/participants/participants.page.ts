import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Participant } from '../shared/models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'participants.page.html',
  styleUrls: ['participants.page.scss']
})
export class ParticipantsPage {
  public participants: Array<Participant> = [
    { name: 'Андрей', id: 1 },
    { name: 'Артём', id: 2 },
  ];

  constructor(
    private alertController: AlertController,
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

    const newParticipant: Participant = { name, id: this.participants.length + 1 };
    this.participants = [...this.participants, newParticipant];
  }

}
