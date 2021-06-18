export class Tool{
    printObj = function(obj:any) {
        var string = '';
  
        for(var prop in obj) {
            if(typeof obj[prop] == 'string') {
                string+=  prop + ': ' + obj[prop]+'; \n' ;
            }
            else {
              string+= prop + ': { \n' + obj[prop].print() + '}';
            }
        }
  
        return '{ ' + string  + ' }'
    }
  
  
    printState = function(obj:any) {
      var string = '';
  
      for(var prop in obj) {
          if(typeof obj[prop] == 'string') {
              string+=  prop + ': ' + obj[prop]+',\n' ;
          }
          else {
            string+= prop + ': { \n' + obj[prop].print() + '}';
          }
      }
  
      return '{ ' + string  + ' }'
  }
}