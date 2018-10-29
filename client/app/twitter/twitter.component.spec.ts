import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoutingModule } from '../routing.module';
import { By } from '@angular/platform-browser';

import { TwitterComponent } from './twitter.component';
import { ToastComponent } from '../shared/toast/toast.component';
import { APP_BASE_HREF } from '@angular/common';
import { TwitterService } from '../services/twitter.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketService } from '../shared/services/socket.service';

describe('TwitterComponent', () => {
  let component: TwitterComponent;
  let fixture: ComponentFixture<TwitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterComponent, ToastComponent ],
      imports: [
        FormsModule,
        RoutingModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ToastComponent,
      TwitterService,
      HttpClient, 
      SocketService,
      HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not display tweets', () => {
    const el = fixture.debugElement.query(By.css('.timeline.chat-list'));
    expect(document).not.toContain(el);
  });
});
