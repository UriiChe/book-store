import { Pipe, PipeTransform } from '@angular/core';
import { toDate } from '@angular/common/src/i18n/format_date';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, locale?: any, format?:any): any {
    let longDate = value.toDate();
    let date = new Date(longDate);
    let result;
    switch(format){
      case 'full': 
        result = date.toLocaleString(locale, { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' });
        break;
        case 'short':
        result = date.toLocaleString(locale, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' });
        break;
      default:
        result = date.toLocaleString(locale);
        break;
    }
    return result;
  }

}
