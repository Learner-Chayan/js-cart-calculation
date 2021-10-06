
//DECLARE VARIABLES
let allProductsList = "";
let cart = [
    // {
    //     id:0,
    //     name:'',
    //     img:"",
    //     countTotal:0,
    //     price:0
    // }
];

const products = [
    {
        id:1,
        name:"Oxford Button-Down Shirt",
        img :"1.jpg",
        price:100
    },
    {
        id:2,
        name:"Dress Shirt.",
        img :"2.jpg",
        price:200
    },
    {
        id:3,
        name:"Cuban Collar Shirt.",
        img :"3.jpg",
        price:300
    },
    {
        id:4,
        name:"Overshirt.",
        img :"4.jpg",
        price:400
    },
    {
        id:5,
        name:"Flannel Shirt.",
        img :"5.jpg",
        price:1000
    },
    {
        id:6,
        name:"Classic Short Sleeve Shirt.",
        img :"6.png",
        price:800
    },
    {
        id:7,
        name:"Normal Shirt",
        img :"7.jpg",
        price:400
    }
]

  products.map((product,index)=>{
        const product_name = product.name.length > 10 
                ? product.name.slice(0,10).concat("...")
                 : product.name;
        allProductsList +=
            `<div class="col grid_1_of_6">
                <div onclick="addToCart(${product.id},${index},${product.price})" class="product-card">
                    <img src="./images/${product.img}" width="100%" height="150px" alt="">
                <p>${product_name}</p>
                </div>
            </div>`;
    })

document.getElementById("show_products").innerHTML = allProductsList;

function addToCart(product_id,index,price){

   let exist_id_index = undefined;
   for (let i = 0; i < cart.length; i++) {
       const {id} = cart[i];
       if(id == product_id){
        exist_id_index = i;
        break;
       }
   }

   if(exist_id_index != undefined){
       cart[exist_id_index].countTotal++;
      // cart[exist_id_index].price = cart[exist_id_index].total * price;
   }else{
    addNewItemToCart(product_id,index)
    }
    console.log(cart);   
    showCart(); 
}


function addNewItemToCart(product_id,index){
    let newCartItem = {
        id:product_id,
        name:products[index].name,
        img:products[index].img,
        countTotal:1,
        price:products[index].price
    }
    cart = [...cart,newCartItem];
}


function showCart()
{
    let cartItemsList = "";
    cart.map((item,index)=>{
        cartItemsList += 
                `<tr>
                <td>
                <img width="35" src="./images/${item.img}" alt=""> (${item.countTotal})
                </td>
                <td>
                    <span>${item.name}</span>
                </td>
                <td>
                    <span>BDT ${item.price}</span>
                </td>
                <td>
                    <button onclick="removeFromCart(${item.id})">Delete</button>
                </td>
            </tr>
             `
    })
    document.getElementById("card_product_list").innerHTML = cartItemsList;
    showPaymentTotal();
}


function showPaymentTotal(){
    let totalAmount = 0;
    for (let i = 0; i < cart.length; i++) {
        const {price} = cart[i];
        const {countTotal} = cart[i];
        //console.log('countTotal',countTotal,'price',price);
        totalAmount += countTotal * price;
    }

    console.log(totalAmount);
    document.getElementById("payableTotal").innerText = totalAmount;
    document.getElementById("total").innerText = totalAmount;
    document.getElementById("subtotal").innerText = totalAmount;
}


function removeFromCart(itemId){
    let newCartValues = [];
    for (let i = 0; i < cart.length; i++) {
        const {id} = cart[i];
        if(id != itemId)
        {
            newCartValues.push(cart[i]);
        }
    }

    cart = newCartValues;
    showCart();
}
