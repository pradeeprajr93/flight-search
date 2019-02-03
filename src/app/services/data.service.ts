import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private notifySource = new Subject<string>();
  notifyObservable = this.notifySource.asObservable();

  flightData;
  isReturnFlightNeeded = false;
  showPreview = false;
  selectedOrigin;
  selectedDestination;
  selectedDepartDate;
  selectedReturnDate;
  selectedPassengerCount;

  notify(){
    this.notifySource.next('test');
  }

  getFlightData() {
    return this.http.get('assets/data/flights.json');
  }
}
