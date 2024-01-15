'use strict';
class Model{
  constructor(db){
    this.db = db;
    
  }
  
  request(event, action){
    if(action === 'increaseProductQuantity'){
      let key = event.target.parentNode.attributes.dbID.nodeValue;
      this.db[key].quantity +=1;
      // console.log(db[key]);
      
      
    }else if(action === 'decreaseProductQuantity'){
      let key = event.target.parentNode.attributes.dbID.nodeValue;

      if(this.db[key].quantity > 0){
        this.db[key].quantity -=1;        
      }
      // console.log(db[key]);
    }
  }
  
}
