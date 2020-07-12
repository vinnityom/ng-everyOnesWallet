import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultPage } from './result.page';

import { Tab3PageRoutingModule } from './result-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ResultPage }]),
    Tab3PageRoutingModule,
  ],
  declarations: [ResultPage]
})
export class Tab3PageModule {}
