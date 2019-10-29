import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import {NotificationService} from '../notification.service';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
  	trigger('snack-visibility', [
  		state('hidden', style({
  			opacity: 0,
  			bottom: '0px'
  		})),
  		state('visible', style({
  			opacity: 1,
  			bottom: '30px'
  		})),
  		transition('hidden => visible', animate('500ms 0ms ease-in')),
  		transition('visible => hidden', animate('500ms 0ms ease-out'))
  	]) 
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!';
  snackVisibility: string = "hidden";

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
      .do(m => {
        this.message = m;
        this.snackVisibility = 'visible'; })
      .switchMap(m => Observable.timer(3000))
      .subscribe(() => this.snackVisibility = 'hidden');
  }

}
