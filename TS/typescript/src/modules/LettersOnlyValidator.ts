import { StringValidator } from './StringValidator';
const reg = /^[a-zA-Z]%/;
export class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string):boolean {
    return reg.test(s);
  }
}