import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true,
})

/*
  como visto em outra parte, não precisa implementar o PipeTransform para usar como pipe
  ter ele no entanto, ajuda a não errar o nome do metodo
*/
export class TemperaturePipe implements PipeTransform {
  transform(
    value: number | string,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah',
  ): string {
    let val: number;

    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    let outputTemp;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = val * 1.8 + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = (val - 32) / 1.8;
    } else {
      outputTemp = val;
    }

    let symbol: '°C' | '°F';
    symbol = (outputType ?? inputType) === 'cel' ? '°C' : '°F';

    return `${outputTemp.toFixed(2)} ${symbol}`;
  }
  // transform(value: number | string, ...args: string[]) {
  //   console.log('value', value);
  //   console.log('args', args);

  //   this.argsValidation(args);
  //   const inputType = args.length > 0 ? args[0] : 'C';
  //   const inputPrecision = args.length > 1 ? parseInt(args[1]) : 2;

  //   let val: number = typeof value === 'string' ? parseFloat(value) : value;

  //   if (inputType === 'F') {
  //     val = val * 1.8 + 32; //converte para Fahrenheit
  //   }

  //   return val.toFixed(inputPrecision) + ' °' + inputType;
  // }

  // private argsValidation(args: string[]) {
  //   if (args.length > 0 && args[0] !== 'C' && args[0] !== 'F')
  //     throw new Error('Invalid temperature unit. Use "C" or "F".');

  //   if (args.length > 1 && isNaN(parseInt(args[1])))
  //     throw new Error('Invalid precision value. Use a number.');
  // }
}
