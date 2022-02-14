
let redoAllowed:boolean = true;
let undoCount:number = 0;

interface storeData
{
 action: string,
 key: any,
 value: any,
 preValue : any
}

let history: storeData[] = [];
let redoHistory: storeData[] = [];

const undoRedo = (object: any) => {
  undoCount = 0;
  redoAllowed = true;
  history = [];
  redoHistory = [];
  
  return {
    set(key: any, value: any) {       
       redoAllowed = false;
       var record:storeData={action: "S", key: key, value: value, preValue: object[key]};
       object[key] = value;
       history.push(record);
       undoCount++;
    },
    
    get(key: any) {
      return object[key];
    },
    
    del(key: any) {
       redoAllowed = false;
       var record:storeData={action: "D", key: key, value: object[key], preValue: null};
       history.push(record);
       undoCount++;
       delete object[key];
    },
    
    undo() {
      if(history.length > 0){
        redoAllowed = true;
        let lastOperation = history[history.length - 1]; 
        if(lastOperation.action == 'S'){          
          if(lastOperation.preValue == undefined || lastOperation.preValue == null) {
            var record:storeData={action: "D", key: lastOperation.key, value: null, preValue: object[lastOperation.key]};
             delete object[lastOperation.key];
             history.splice(-1);
             redoHistory.push(record);
             undoCount--;
            }else{ 
              object[lastOperation.key] = lastOperation.preValue; 
              var record:storeData={action: "S", key: lastOperation.key, value: object[lastOperation.key], preValue: lastOperation.value};
               history.splice(-1);
               redoHistory.push(record);
               undoCount--;
            }            
          } else if(lastOperation.action == 'D'){            
             object[lastOperation.key] = lastOperation.value; 
            var record:storeData={action: "S", key: lastOperation.key, value: object[lastOperation.key], preValue: lastOperation.preValue};             
             history.splice(-1);
             redoHistory.push(record);
             undoCount--;
          }else{
            throw new Error("No operation to undo");
          }
        }
      else{
            throw new Error("No operation to undo");
          }
    },
    
    redo() {        
      if(redoAllowed && redoHistory.length>0)
      {
        let lastOperation = redoHistory[redoHistory.length - 1]; 
        redoHistory.splice(-1);
        if(lastOperation.action == 'D'){          
           object[lastOperation.key] = lastOperation.preValue;
          var record:storeData={action: "S", key: lastOperation.key, value: lastOperation.preValue, preValue: object[lastOperation.key]}; 
          history.push(record);
        }
        else if(lastOperation.action == 'S'){
          if(lastOperation.preValue !=  null){
             object[lastOperation.key] = lastOperation.preValue;
            var record:storeData={action: "S", key: lastOperation.key, value: lastOperation.preValue, preValue: object[lastOperation.key]}; 
          history.push(record);
          }else{
             var record:storeData={action: "D", key: lastOperation.key, value:  object[lastOperation.key], preValue: null};
            history.push(record);
            delete object[lastOperation.key];
          }
        }
       }else{
                throw new Error("No operation to redo");
          }
    }
  };
};
export {undoRedo};



