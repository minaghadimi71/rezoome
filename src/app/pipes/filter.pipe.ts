import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'Filter',
  pure: false,
})
export class FilterPipe  implements PipeTransform {
  transform(value: any[], searchParam: string, prob: string) {
    if (value.length === 0 || searchParam.length === 0) {
      return value;
    }
    const resolve = [];
    value.forEach(item => {
      if (item[prob] === searchParam) {
        resolve.push(item);
      }
    });
    return resolve;
  }
}
