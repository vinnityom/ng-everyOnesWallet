import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { PickerController, AlertController } from '@ionic/angular';
import { uniqueId } from 'lodash';
import { Transaction, Participant } from '../shared/models';
import { ParticipantsState } from '../core/states/participants/participants.state';
import { TransactionsState } from '../core/states/transactions/transactions.state';
import { AddTransaction } from '../core/states/transactions/transactions.actions';

@Component({
  selector: 'app-tab2',
  templateUrl: 'transactions.page.html',
  styleUrls: ['transactions.page.scss']
})
export class TransactionsPage {
  @Select(ParticipantsState.getParticipants) public participants$: Observable<Participant[]>;
  @Select(TransactionsState.getTransactions) public transactions$: Observable<Transaction[]>;

  constructor(
    private pickerController: PickerController,
    private alertController: AlertController,
    private store: Store,
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
    const transactionsWithId = { ...transaction, id: uniqueId() };
    this.store.dispatch(new AddTransaction(transactionsWithId));
  }

  private mapParticipants(): Array<{ text: string, value: number }> {
    const columnOptions = [];
    this.participants$.forEach(participants => participants.forEach(
      ({ id, name }) => columnOptions.push({ text: name, value: id })
    ));

    return columnOptions;
  }

}
