import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

const components = [HomeComponent];
const modules = [CommonModule, HomeRoutingModule, SharedModule];
@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class HomeModule {}
