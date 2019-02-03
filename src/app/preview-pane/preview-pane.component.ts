import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-preview-pane',
  templateUrl: './preview-pane.component.html',
  styleUrls: ['./preview-pane.component.css']
})
export class PreviewPaneComponent implements OnInit {

  constructor(public data: DataService) { }

  flightCardsArray = [];

  ngOnInit() {
    this.populateFlightCards();
    this.data.notifyObservable.subscribe(
      data => {
        this.populateFlightCards();
      }
    )
  }

  starsArray(number){
    return Array(number).fill(4);
  }

  populateFlightCards() {
    this.flightCardsArray = [];
    this.data.flightData.forEach(element => {
      if (this.data.selectedOrigin === element.source &&
        this.data.selectedDestination === element.destination) {
        this.flightCardsArray.push(element);
      }
      if (this.data.isReturnFlightNeeded) {
        if (this.data.selectedOrigin === element.destination &&
          this.data.selectedDestination === element.source) {
          this.flightCardsArray.push(element);
        }
      }
    });
  }

}
