import { APP_INITIALIZER, NgModule } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { authAppInitializerFactory, AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [OAuthModule.forRoot()],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: authAppInitializerFactory,
      deps: [AuthService],
      multi: true,
    },
  ],
  exports: [],
})
export class CoreModule {}
