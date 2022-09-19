import { of, from, timer } from 'rxjs'; 
import { map, mergeMap, delay, mergeAll,tap, delayWhen, concatMap, switchMap } from 'rxjs/operators';

const getData = (param) => {
  return of(`retrieved new data with param ${param}`).pipe(
    tap(param => {return param;
    }),
    delayWhen(param => {
      if(param === 'retrieved new data with param 2') {
  
       return timer(5000);
       } else {
       
        return timer(1)
       }
    })
    
  )
}


// using mergeMap
from([1,2,3,4]).pipe(
  mergeMap(param => getData(param))
).subscribe(val => console.log('mergeMap ' + val));

from([1,2,3,4]).pipe(
  concatMap(param => getData(param))
).subscribe(val => console.log('concatMap ' + val));

from([1,2,3,4]).pipe(
  switchMap(param => getData(param))
).subscribe(val => console.log('switchMap ' + val));