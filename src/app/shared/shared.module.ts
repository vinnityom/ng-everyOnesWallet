import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddParticipantMessageComponent } from './components/add-participant-message/add-participant-message.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AddParticipantMessageComponent],
  exports: [AddParticipantMessageComponent],
})
export class SharedModule {}