import { Observable } from './Observable';

// declare module "./Observable" {
//     interface Observalbe<T> {
//       map<U>(f:(x:T) => U): Observalbe<T>;
//     }
// }
// Observable.prototype.map = function(f) {

// }

declare module "./observable" {
    interface Observable<T> {
        map<U>(f: (x: T) => U): Observable<U>;
    }
}
// Observable.prototype.map = function (f) {
//     // ... another exercise for the reader
// }