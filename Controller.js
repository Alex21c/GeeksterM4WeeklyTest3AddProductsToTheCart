'use strict';
class Controller{ 

  constructor(view, model){
    this.view = view;
    this.view.renderProducts();
    this.view.refreshCart();
    this.model = model;
  }
  request(event){
    // console.log(event);
    if(event.target.className === 'btnPlus'){
      // console.log('plus btn clicked!');
      this.view.request(event, 'increaseProductQuantity');
      this.model.request(event, 'increaseProductQuantity');
      this.view.refreshCart();
    }
    else if(event.target.className === 'btnMinus'){
      // console.log('minus btn clicked!');
      this.view.request(event, 'decreaseProductQuantity');
      this.model.request(event, 'decreaseProductQuantity');
      this.view.refreshCart();
    }
  }
 

}
