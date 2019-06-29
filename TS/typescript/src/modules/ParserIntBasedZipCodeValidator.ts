import { StringValidator } from './StringValidator';
export class ParserIntBasedZipCodeValidator implements StringValidator{
  isAcceptable(s: string) {
    return s.length === 5 && parseInt(s).toString() === s;
  }
}

export { ZipCodeValidator as RegExpBasedZipCodeValidator } from './ZipCodeValidator';