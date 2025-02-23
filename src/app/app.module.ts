import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgIconsModule } from '@ng-icons/core';
import { RefreshTokenInterceptor } from './auth/refreshtoken.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbDropdown,
  NgbDropdownModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from './shared/directives/directives.module';
import { HeaderComponent } from './main-components/header/header.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { ButtonsModule } from './shared/buttons/buttons.module';
import {
  ionCalendarOutline,
  ionPeopleCircleOutline,
  ionPeopleOutline,
  ionMenuOutline,
  ionSettingsOutline,
  ionGitNetworkOutline,
  ionAccessibilityOutline,
  ionLocationOutline,
  ionTrashBinOutline,
  ionAddOutline,
  ionRemoveOutline,
  ionBusinessOutline,
  ionVideocamOutline,
  ionSearchOutline,
  ionEyeOutline,
  ionEyeOffOutline,
  ionChevronDownOutline,
  ionChevronUpOutline,
  ionCallOutline,
  ionMailOutline,
  ionArrowUndoOutline,
  ionCloudUploadOutline,
  ionFolderOpenOutline,
  ionMedkitOutline,
  ionDownloadOutline,
  ionChevronForwardOutline,
  ionChevronBackOutline,
  ionCloseCircleOutline,
  ionCheckmarkCircleOutline,
  ionCloseOutline,
  ionAlarmOutline,
  ionConstructOutline,
  ionListOutline,
  ionPencilOutline,
} from '@ng-icons/ionicons';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { FrontHeaderComponent } from './main-components/header/front-header/front-header.component';
import { DashboardHeaderComponent } from './main-components/header/dashboard-header/dashboard-header.component';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { FormsModule } from '@angular/forms';
import { ManageAppointmentModule } from './shared/manage-appointment/manage-appointment.module';
import { AddBookingModule } from './shared/add-booking/add-booking.module';
import { CreateBookingModule } from './shared/create-booking/create-booking.module';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FrontHeaderComponent,
    DashboardHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DirectivesModule,
    ButtonsModule,
    NgIconsModule.withIcons({
      ionMenuOutline,
      ionCalendarOutline,
      ionPeopleCircleOutline,
      ionSettingsOutline,
      ionGitNetworkOutline,
      ionLocationOutline,
      ionAccessibilityOutline,
      ionTrashBinOutline,
      ionAddOutline,
      ionRemoveOutline,
      ionBusinessOutline,
      ionVideocamOutline,
      ionSearchOutline,
      ionEyeOutline,
      ionEyeOffOutline,
      ionChevronDownOutline,
      ionChevronUpOutline,
      ionCallOutline,
      ionMailOutline,
      ionArrowUndoOutline,
      ionCloudUploadOutline,
      ionFolderOpenOutline,
      ionMedkitOutline,
      ionDownloadOutline,
      ionChevronForwardOutline,
      ionChevronBackOutline,
      ionCloseCircleOutline,
      ionCheckmarkCircleOutline,
      ionCloseOutline,
      ionAlarmOutline,
      ionConstructOutline,
      ionListOutline,
      ionPeopleOutline,
      ionPencilOutline,
    }),
    NgbDropdownModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'it' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
