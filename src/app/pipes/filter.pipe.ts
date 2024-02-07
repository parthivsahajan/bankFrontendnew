import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allTransactions:[],searchkey:string,propertyName:string): any[] {
   
    const result:any = []
    if(!allTransactions || searchkey=='' || propertyName==''){
      return allTransactions
    }
    allTransactions.forEach((item:any)=>{
      if(item[propertyName].trim().toLowerCase().includes(searchkey.toLowerCase())){
        result.push(item)
      }
    })
     
    return result;
  }

}
