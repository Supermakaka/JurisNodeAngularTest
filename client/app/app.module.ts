import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { TwitterComponent } from './twitter/twitter.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SocketService } from './shared/services/socket.service';
import { TwitterService } from './services/twitter.service';

import {MaxWordCountValidator} from './services/validators/max-word-count.validator';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    TwitterComponent,
    NotFoundComponent,
    MaxWordCountValidator
  ],
  imports: [
    RoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    })
  ],
  providers: [
    SocketService,
    TwitterService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
