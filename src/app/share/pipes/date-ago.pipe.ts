import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
   name: 'dateAgo',
   pure: true
})
export class DateAgoPipe implements PipeTransform {

   transform(value: any, args?: any): any {
      if (value) {
         const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
         if (seconds < 29) {
            return 'Just now';
         }
         const intervals = {
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
         };
         let counter;
         // tslint:disable-next-line:forin
         for (const i in intervals) {
            counter = Math.floor(seconds / intervals[i]);
            if (counter > 0) {
               if (counter === 1) {
                  return counter + ' ' + i + ' ago';
               } else {
                  if (counter <= 7 && intervals[i] === intervals.day) {
                     return counter + ' ' + i + 's ago';
                  } else {
                     return moment(new Date()).format('DD/MM/YYYY');
                  }
               }
            }
         }
      }
      return value;
   }
}
