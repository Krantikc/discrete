import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  themeChange: Subject<any> = new Subject<any>();
  constructor() { }
}
