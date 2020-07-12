import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipantsPage } from './participants.page';

import { Tab1PageRoutingModule } from './participants-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [ParticipantsPage]
})
export class Tab1PageModule {}
