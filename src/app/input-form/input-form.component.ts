import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  constructor(private data: DataService) { }

  autoCompleteArray = [];
  myControl1 = new FormControl();
  myControl2 = new FormControl();
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autoCompleteArray.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.fetchFlightData();
  }

  fetchFlightData(){
    this.data.getFlightData()
    .subscribe((data) => 
      {
        this.data.flightData = data;
        this.populateAutoCompleteArray();
      }
    );
  }

  populateAutoCompleteArray() {
    for (let flightObject of this.data.flightData) {
      this.autoCompleteArray.push(flightObject.source);
      this.autoCompleteArray.push(flightObject.destination);
    }
    this.autoCompleteArray = this.autoCompleteArray.filter((v, i, a) => a.indexOf(v) === i).sort();
    console.log(this.autoCompleteArray);
    this.filteredOptions1 = this.myControl1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredOptions2 = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

}
