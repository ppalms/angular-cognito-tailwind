import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [ProfileComponent, SettingsComponent],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
