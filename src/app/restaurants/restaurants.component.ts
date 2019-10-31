import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Observable} from 'rxjs/observable';

import {Restaurant} from './restaurant/restaurant.model';
import {RestaurantsService} from './restaurants.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
  	trigger('toggleSearch', [
  		state('hidden', style({opacity: 0, 'max-height': '0px'})),
  		state('visible', style({opacity: 1, 'max-height': '70px', 'margin-top': '20px'})),
  		transition('* => *', animate('250ms 0ms ease-in-out'))
  	])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState: string = 'hidden';
  restaurants: Restaurant[];
  saerchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantService: RestaurantsService,
  		private formBuilder: FormBuilder) { }

  ngOnInit() {
  	this.searchControl = this.formBuilder.control('');
  	this.saerchForm = this.formBuilder.group({
  		searchControl: this.searchControl
  	});
  	
  	this.searchControl.valueChanges
  		.debounceTime(500)
  		.distinctUntilChanged()
  		.switchMap(s => this.restaurantService
  			.restaurants(s)
  			.catch(e => Observable.from([])))
  		.subscribe(r => this.restaurants = r);

    this.restaurantService.restaurants()
    	.subscribe(r => this.restaurants = r);
  }

  toggleSearch():void {
  	this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
