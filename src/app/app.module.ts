import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { HeaderComponent } from './main-components/header/header.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ButtonsModule } from './shared/buttons/buttons.module';

import { NgIconsModule } from '@ng-icons/core';
import {
  ionCalendarOutline,
  ionPeopleCircleOutline,
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
} from '@ng-icons/ionicons';
import { DirectivesModule } from './shared/directives/directives.module';
import { DashboardHeaderComponent } from './main-components/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './main-components/dashboard-footer/dashboard-footer.component';
import { DropdownModule } from './shared/dropdown/dropdown.module';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { RefreshTokenInterceptor } from './auth/refresh-token.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { environment } from '../environments/environment.development';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterLink,
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
    }),
    NgbModule,
    DirectivesModule,
    DropdownModule,
    NgbModalModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'it' },
    { provide: 'googleMapsApiKey', useValue: environment.googleMapsApiKey },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
