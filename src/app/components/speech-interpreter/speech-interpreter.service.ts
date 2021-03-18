import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import * as feedings from '../../../assets/data/feedings.json';

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
    this.data = feedings;
  }

  interpretSpeech(speechText: string) {

    if (!this.data) {
      this.loadFeedings();
    }
    speechText = 'get repos from June 19th';

    const speechMappings = this.data.speechMappings;

    let mappedActions = [];
    // speechMappings.forEach(wordMap => {
    //   wordMap.keys.forEach((key) => {

    //     let keys = [];
    //     if (key.indexOf('+') > -1) {
    //       keys = key.split('+');

    //       keys.forEach((key) => {
    //         const speechTextMatchIndex = speechText.indexOf(key);
    //         if (speechTextMatchIndex > -1) {
    //           mappedActions.push(wordMap.action);
    //           if (wordMap.action === 'DATE_RANGE') {
    //             mappedActions.push(speechText.substr(speechTextMatchIndex));
    //           }
    //           speechText = speechText.replace(key, '');
    //         }
    //       });

    //     } else {
    //       const speechTextMatchIndex = speechText.indexOf(key);
    //         if (speechTextMatchIndex > -1) {
    //           mappedActions.push(wordMap.action);
    //           if (wordMap.action === 'DATE_RANGE') {
    //             mappedActions.push(speechText.substr(speechTextMatchIndex));
    //           }
    //           speechText = speechText.replace(key, '');
    //         }
    //     }
    //   });
    // });


    let speechTextArr = speechText.split(' ');

    speechTextArr.map((speechTextWord: string) => {
      

      const mappedObj = speechMappings.find((speechMapping: any) => {
        return speechMapping.keys.includes(speechTextWord);
      });

      if (mappedObj) {
        mappedActions.push(mappedObj.action);
      } else {
        mappedActions.push(speechTextWord);
      }
    })


    console.log(mappedActions);
  }

  dateParser(dates: Array<string>) {

  }
}
