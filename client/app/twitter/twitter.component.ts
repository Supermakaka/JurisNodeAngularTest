import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '../shared/services/socket.service';
import { Message } from '../shared/services/model/message';
import { Event } from '../shared/services/model/event';
import { TwitterService } from '../services/twitter.service';

import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './twitter.component.html',

})
export class TwitterComponent implements OnInit {

  searchForm: FormGroup;
  ioConnection: any;
  twits: Message[] = [];
  messageContent: string;
  query = new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_-\\s]*'),
  ]));

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private twitterService: TwitterService,
              private socketService: SocketService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: this.query
    });
  }

  private initIoConnection(): void {
    this.socketService.initSocket(this.query.value);

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        if (message.hasOwnProperty('user'))
          this.twits.push(message);
        else
          this.toast.setMessage(message, 'danger');
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
      });
  }

  search() {
    if (this.searchForm.valid) {
      this.socketService.disconnectSocket();
      this.twitterService.getMessages(this.query.value).subscribe(
        res => {
          this.twits = [];
          this.twits = res;
          this.initIoConnection();
        },
      );
    } else {
      if(this.query.value.length > 0)
        this.toast.setMessage('Query length must be less than 10 words.', 'danger');
      else
        this.toast.setMessage('Query is required.', 'danger');
    }
  }
}
