import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeechInterpreterService {

  private data: any;
  constructor(private http: HttpClient) {
    console.log(environment.endPoint);
    ;
  }

  loadFeedings() {
    const jsonURL = environment.endPoint + '/data';
    this.http.get(jsonURL).subscribe((resp: any) => {
      this.data = resp;
    });
  }

  interpretSpeech(speechText: string) {

    if (!this.data) {
      this.loadFeedings();
    }
    speechText = 'get repos from June 19th to 20th';

    const speechMappings = this.data.speechMappings;

    let mappedActions = [];
    speechMappings.forEach(wordMap => {
      wordMap.keys.forEach((key) => {
        if (speechText.indexOf(key) > -1) {
          mappedActions.push(wordMap.action);
          speechText = speechText.replace(key, '');
        }
      });
    });

    console.log(mappedActions);
  }

  dateParser(dates: Array<string>) {

  }
}
