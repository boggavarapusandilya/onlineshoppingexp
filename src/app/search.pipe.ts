import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchTerm:String): any[]{
    if(!searchTerm){
      return products;
    }
    else 
    {
    
      return products.filter(obj=>obj.pname.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1)
      
    } 
}
}
