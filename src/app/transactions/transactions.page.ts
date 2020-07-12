import { Component } from '@angular/core';
import { Transaction, Participant } from '../shared/models';
import { PickerController, AlertController } from '@ionic/angular';

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

  private particapants: Array<Participant> = [
    { id: 1, name: 'Андрей' },
    { id: 2, name: 'Артём' },
  ]

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
        { name: 'to', options: this.particapants.map(({ id, name }) => { return { text: name, value: id } }) },
        { name: 'from', options: this.particapants.map(({ id, name }) => { return { text: name, value: id } }) },
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

}
