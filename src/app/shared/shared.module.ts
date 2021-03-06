import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddParticipantMessageComponent } from './components/add-participant-message/add-participant-message.component';
import {ToNamePipe} from './pipes/to-name.pipe';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
      AddParticipantMessageComponent,
      ToNamePipe,
  ],
    exports: [AddParticipantMessageComponent, ToNamePipe],
})
export class SharedModule {}
