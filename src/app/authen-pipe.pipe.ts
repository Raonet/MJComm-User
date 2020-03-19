import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authenPipe'
})
export class AuthenPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
