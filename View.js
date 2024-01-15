'use strict';
class View{
  constructor(db){
    this.db = db;
     
    this.productsTableBody = (document.querySelector('table#products')).querySelector('tbody');
    this.cartTableBody = (document.querySelector('table#cart')).querySelector('tbody');
    this.cartTableFoot = (document.querySelector('table#cart')).querySelector('tfoot');

    // console.log(this.cartTableBody);
  }
  request(event, action){
    if(action === 'increaseProductQuantity'){
      let productsQuantity = event.target.parentNode.querySelector('span.productsQuantity');
      productsQuantity.innerText = Number(productsQuantity.innerText) +1;
      // console.log(productsQuantity);
    }else if(action === 'decreaseProductQuantity'){
      let productsQuantity = event.target.parentNode.querySelector('span.productsQuantity');
      productsQuantity.innerText = (Number(productsQuantity.innerText) - 1)<0? 0 : (Number(productsQuantity.innerText) - 1);

      // console.log(productsQuantity);
    }
  }

  lazyLoadImages(){
    let lazyImages = document.querySelectorAll("img[loading='lazy']");
    lazyImages.forEach(function(img) {
      // img.addEventListener("load", function() {
      //   // Optional: Do something after the image is loaded
      // });
      img.src = img.getAttribute("data-src");
    });
  }

  // to convert currency into lakhs and crores
    convertCurrencyIntoLakhsCrores(currency){
      let formattedCurrency = '';
      if(currency >= 100000 && currency <= 9999999){
        formattedCurrency = currency/100000;
        formattedCurrency = `₹ ${formattedCurrency} ${formattedCurrency >1 ? 'Lakhs' : 'Lakh'}`;
      }else if(currency >= 10000000){
        formattedCurrency = currency/10000000;
        formattedCurrency = `₹ ${formattedCurrency} ${formattedCurrency >1 ? 'Crores' : 'Crore'}`;
      }
      return formattedCurrency;
    }
  
  refreshCart(){
    // clearing old data
      this.cartTableBody.innerHTML = "";
      this.cartTableFoot.innerHTML = "";
    // refreshing
      // <tr>
      //   <td>
      //     <figure>
      //       <img src='Images/loader.png' data-src="Images/mmtcGold.png" alt="MMTC PAMP 999.9 Pure Gold (1Kg)" loading="lazy">
      //       <figcaption>MMTC PAMP 999.9 Pure Gold (1Kg)</figcaption>
      //     </figure>   
      //   </td>
      //   <td><span>2</span> x <span>₹70 Lakhs</span></td>
      // </tr> 
      let cartTotal =0;   
      for(let key in this.db){
        let product = this.db[key];
        if(product.quantity > 0){
          // console.log(product);
          let tr = document.createElement('tr');
            let td1 = document.createElement('td');
              let figure = document.createElement('figure');
              let img = document.createElement('img');
                img.setAttribute('src','Images/loader.png');
                img.setAttribute('data-src',product.imgPath);
                img.setAttribute('alt',product.name);
                img.setAttribute('loading','lazy');                            
              let figcaption = document.createElement('figcaption'); 
                figcaption.innerText=product.name;           
              figure.appendChild(img);
              figure.appendChild(figcaption);
            td1.appendChild(figure);              
          tr.appendChild(td1);

          let td2= document.createElement('td2');
            let span = document.createElement('span');
              
              let currentTotal = product.quantity * product.price;
              cartTotal +=currentTotal;
              span.innerText = `#${product.quantity} x ${this.convertCurrencyIntoLakhsCrores(currentTotal)}`;  
            td2.appendChild(span);          
          tr.appendChild(td2);        
          this.cartTableBody.appendChild(tr);

        }
      }

      // Total Row
      if(cartTotal > 0){
        // <tr>
        //   <th colspan =2 >Total: ₹8,00,000/-</th>        
        // </tr>
        let tr = document.createElement('tr');
          let th = document.createElement('th');        
            th.setAttribute('colspan', 2);
            th.innerText = `Total : ${this.convertCurrencyIntoLakhsCrores(cartTotal)} Only`;
          tr.appendChild(th);
        this.cartTableFoot.appendChild(tr);
        this.lazyLoadImages();
      }else{
        let tr = document.createElement('tr');
          let th = document.createElement('th');        
            th.setAttribute('colspan', 2);
            th.innerText = `No Product added to the cart 🛒.`;
          tr.appendChild(th);
        this.cartTableFoot.appendChild(tr);        
        
      }

  }

  renderProducts(){
    // console.log(this.productsTableBody);
    this.productsTableBody.innerHTML = "";
    for(let key in this.db){
      let product = this.db[key];
      // console.log(product);
      //   <tr>
      //     <td>
      //       <figure>
      //         <img  src='Images/loader.png' data-src="Images/mmtcGold.png" alt="MMTC PAMP 999.9 Pure Gold (1Kg)" loading="lazy">
      //         <figcaption>MMTC PAMP 999.9 Pure Gold (1Kg)</figcaption>
      //       </figure>          
      //     </td>
      //     <td>₹70 Lakhs</td>
      //     <td>
      //       <div class="wrapperMinusPlusQuantity">
      //         <span class="btnMinus">-</span>
      //         <span class="productsQuantity">0</span>
      //         <span class="btnPlus">+</span>
      //       </div>
      //    </td>
      // </tr>
      let tr = document.createElement('tr');
        let td1 = document.createElement('td');
          let figure = document.createElement('figure');
            let img = document.createElement('img');
              img.setAttribute('src','Images/loader.png');
              img.setAttribute('data-src',product.imgPath);
              img.setAttribute('alt',product.name);
              img.setAttribute('loading','lazy');                            
            let figcaption = document.createElement('figcaption'); 
              figcaption.innerText=product.name;           
            figure.appendChild(img);
            figure.appendChild(figcaption);
          td1.appendChild(figure);
        tr.appendChild(td1);

        let td2= document.createElement('td2');
          td2.innerText = this.convertCurrencyIntoLakhsCrores(product.price);
        tr.appendChild(td2);

        let td3 = document.createElement('td');
          let div = document.createElement('div');
            div.setAttribute('class', 'wrapperMinusPlusQuantity');
            div.setAttribute('dbID', key); // to track which item it is according to key in db
              let span1 = document.createElement('span');
                span1.setAttribute('class', 'btnMinus');
                span1.innerText = '-';
              div.appendChild(span1);
              let span2 = document.createElement('span');
              span2.setAttribute('class', 'productsQuantity');
              span2.innerText = product.quantity;
              div.appendChild(span2);
              let span3 = document.createElement('span');
              span3.setAttribute('class', 'btnPlus');
              span3.innerText = '+';
              div.appendChild(span3);
          td3.appendChild(div);
        tr.appendChild(td3);
        this.productsTableBody.appendChild(tr);


    }

    this.lazyLoadImages();
  }

}
