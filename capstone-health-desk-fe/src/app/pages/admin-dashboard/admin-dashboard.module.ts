import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SidenavModule } from '../../shared/sidenav/sidenav.module';
import { PanelComponent } from './panel/panel.component';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { AddAddressModule } from '../../shared/add-address/add-address.module';

@NgModule({
  declarations: [AdminDashboardComponent, PanelComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SidenavModule,
    ButtonsModule,
    NgIconsModule,
    FormsModule,
  ],
})
export class AdminDashboardModule {}
