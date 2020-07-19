import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { PickerController, AlertController } from '@ionic/angular';
import { Transaction, Participant } from '../shared/models';
import { ParticipantsState } from '../core/states/participants/participants.state';

@Component({
  selector: 'app-tab2',
  templateUrl: 'transactions.page.html',
  styleUrls: ['transactions.page.scss']
})
export class TransactionsPage {
  public transactions: Array<Transaction> = [
    { from: 1, to: 2, howMuch: 200 },
    { from: 2, to: 1, howMuch: 300 },
  ];

  @Select(ParticipantsState.getParticipants) public participants$: Observable<Participant[]>;

  constructor(
    private pickerController: PickerController,
    private alertController: AlertController,
  ) {}

  public async showPicker(): Promise<void> {
    const picker = await this.pickerController.create({
      buttons: [
        { role: 'cancel', text: 'Отмена' },
        { text: 'Добавить', handler: (value) => { this.handlePicking(value) } },
      ],
      columns: [
        { name: 'to', options: this.mapParticipants() },
        { name: 'from', options: this.mapParticipants() },
      ],
    });

    picker.present();
  }
  
  private async handlePicking(pickerValue): Promise<void> {
    const { from, to } = pickerValue;
    const partialTransaction = { from: from.value, to: to.value };

    const alert = await this.alertController.create({
      header: 'Введите сумму',
      inputs: [{ type: 'tel', attributes: { autofocus: true } }],
      buttons: [
        { role: 'cancel', text: 'Не добавлять' },
        { text: 'Добавить', handler: (value) => this.addTransaction({ ...partialTransaction, howMuch: value['0'] }) },
      ],
    });
    
    alert.present();
  }

  private addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction)
  }

  private mapParticipants(): Array<{ text: string, value: number }> {
    const columnOptions = [];
    this.participants$.forEach(participants => participants.forEach(
      ({ id, name }) => columnOptions.push({ text: name, value: id })
    ));

    return columnOptions;
  }

}
