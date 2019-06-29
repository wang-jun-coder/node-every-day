export class Observable<T> {

}
declare global {
  interface Array<T> {
    toObservable():Observable<T>;
  }
}
Array.prototype.toObservable = function<T>():Observable<T> {
  let x:Observable<T> = {};
  return x;
}