let body = document.querySelector('body');
let faCartShopping=document.querySelector('.fa-cart-shopping');
let closeButton = document.querySelector('.close');
let listCoffeHTML = document.querySelector('.listCoffe');
let listCartHTML =document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let minus =document.querySelectorAll('.quantity .minus');

let coffes = [];
let cart = [];

 //carousel
faCartShopping.addEventListener('click',() => {
   body.classList.toggle('showCart')
})

closeButton.addEventListener('click', () =>{
   body.classList.toggle('showCart');
})

const addDataToHTML = () =>
{
   listCoffeHTML.innerHTML = '';
   if(coffes.length > 0)
   {
      //Kahveler Sayfada
      coffes.forEach(coffe =>{
         let newCoffe = document.createElement('div');
         newCoffe.classList.add('item');
         newCoffe.dataset.id=coffe.id;
         newCoffe.innerHTML = `
                <img src="../../images/${coffe.imgUrl}" alt="">
                <h2>${coffe.name}</h2>
                <div class="price">${coffe.price}$</div>
                <button class="addCart">AddCart</button>
         `;
         listCoffeHTML.appendChild(newCoffe);
      })
   }
}
listCoffeHTML.addEventListener('click' , (event) =>
{
   let positionClick = event.target;
   if(positionClick.classList.contains("addCart"))
   {
      let coffe_id = positionClick.parentElement.dataset.id;
      addToCart(coffe_id);
   }
})

const addToCart = (coffe_id) =>
{
   //quantity hazırlamak ve satır hazılama
   let positionThisCoffeInCart = cart.findIndex((value) =>value.coffe_id == coffe_id)
   if(cart.length <= 0)
   {
      cart =
      [
         {
            coffe_id: coffe_id,
            quantity: 1
         }
      ]
   }
   else if(positionThisCoffeInCart < 0)
   {
      cart.push
      (
         {
            coffe_id: coffe_id,
            quantity: 1
         }
      )
   } 
   else
   {
      cart[positionThisCoffeInCart].quantity = cart[positionThisCoffeInCart].quantity +1;
   }
   addCartToHtml()
}

const addCartToHtml = () =>
{
   listCartHTML.innerHTML = '';
   let totalquantity = 0;
   if(cart.length >0)
   {
      cart.forEach(cart =>
         {
           totalquantity = totalquantity +cart.quantity; 
           let newCart = document.createElement('div')
           newCart.classList.add('item');
           newCart.dataset.id = cart.coffe_id;
           let clikedCoffe = coffes.findIndex((value) => value.id == cart.coffe_id);
           let info = coffes[clikedCoffe];
           newCart.innerHTML = `
                <div class="image">
                    <img src="../../images/${info.imgUrl}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    ${info.price * cart.quantity}$
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
           `;
            listCartHTML.appendChild(newCart);
         })
   }
   iconCartSpan.innerText = totalquantity;
}
   listCartHTML.addEventListener('click', (event) =>
   {
      //bura çalışıyor
      let positionClick = event.target;
      if(positionClick.classList.contains("minus")  ||  positionClick.classList.contains('plus'))
      {
         let coffe_id = positionClick.parentElement.parentElement.dataset.id
         let type = 'minus';
         if(positionClick.classList.contains('plus'))
         {
            type = 'plus';
         }
         changeQuantityCart(coffe_id, type)
      }
   })

   const changeQuantityCart = (coffe_id, type) => {
      let positionItemInCart = cart.findIndex((value) => value.coffe_id == coffe_id);      
      if(positionItemInCart >= 0){
          let info = cart[positionItemInCart];
          switch (type) {
              case 'plus':
                  cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                  break;
          
              default:
                  let changeQuantity = cart[positionItemInCart].quantity - 1;
                  if (changeQuantity > 0) {
                      cart[positionItemInCart].quantity = changeQuantity;
                  }else{
                      cart.splice(positionItemInCart, 1);
                  }
                  break;
                  
          }
          
      }
      addCartToHtml();
  }

   





const initApp = () =>
{
   fetch('coffes.json')
   .then(response => response.json())
   .then(data =>
   {
      coffes = data;
      addDataToHTML();
   })
   
}




initApp()