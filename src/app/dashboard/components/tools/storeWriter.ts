export class storeWriter {

    writeAction(string: string){
        for(let i=0 ; i<JSON.parse(localStorage.getItem('Actions') || '{}').length ; i++){
          string  += 
         "let "+JSON.parse(localStorage.getItem('Actions') || '{}')[i].type+" = createAction("+"'"+JSON.parse(localStorage.getItem('Actions') || '{}')[i].type+"'"+
         ","+JSON.parse(localStorage.getItem('Actions') || '{}')[i].payload+");\n "
       }
       return string
      }
    
    
      writeReducer(stringR: string){
        let string=""
        for(let i=0 ; i<JSON.parse(localStorage.getItem('Reducers') || '{}').length;i++){
          for(let j=0 ; j<JSON.parse(localStorage.getItem('Reducers') || '{}')[i].ac.length;j++){
            string += " case '"+JSON.parse(localStorage.getItem('Reducers') || '{}')[i].ac[j]+"' :\n"+
            "   return {\n"+
            "           ...currentState,\n"+
            "           //Add Something You Want!!\n"+
            "           }\n"
          }
        
          stringR += "function "+JSON.parse(localStorage.getItem('Reducers') || '{}')[i].state+"Reducer(currentState = "+JSON.parse(localStorage.getItem('Reducers') || '{}')[i].state+", action) {\n"+
        "switch (action.type) {\n"+
         string+
        " default:\n"+
        "   return currentState\n"+
        "}}\n"+
        "const store = createStore("+JSON.parse(localStorage.getItem('Reducers') || '{}')[i].state+"Reducer)\n";
        string="";
        
        }
        return stringR
      }
    
      writeInitialState(){
        let initialState="";
        for(let i=0 ; i<JSON.parse(localStorage.getItem('States') || '{}').length;i++){
      initialState += JSON.parse(localStorage.getItem('States') || '{}')[i].string;
      }
      return initialState;
      }
    

}