

//Building object for cart
var Cart ={
    'items' : [],

    'subtotal': 0,

    'total':0,
    
     addItem(nameOf, price, picURL){


        objItem = {
            meal: nameOf,

            selection: picURL,

            cost: price
            
        }
        this.items.push(objItem)
        localStorage.setItem('cart', JSON.stringify(this.items))
    },



    getSubtotal(){
        this.items.forEach(e =>{


            this.subtotal = this.subtotal + parseInt(e.cost)
            console.log(this.subtotal)
        })
        return Cart.subtotal
    },
    getTotal(){
        this.total= this.subtotal * 1.07
        return Cart.total
    }
    ,
    clearCart(){
        this.items = []
        localStorage.setItem('cart', JSON.stringify(this.items))


    },
    checkCart(){
        retrieve = localStorage.getItem("cart")
    if(retrieve != null){
    Cart.items = JSON.parse(retrieve)
}
    }
}


Cart.checkCart();

//Building menu for orders for checko



menuItems = $(".menuitems");
Cart.items.forEach(e =>{
    
    var mealOne = $("<h3>");
    mealOne.attr("class", "mealone")
    mealOne.text( e.meal);
    menuItems.append(mealOne);
    
})

orderText = 'Meals Ordered:'
textFunction()
function textFunction(){
    Cart.items.forEach(e=>{
        orderText = orderText  + e.meal + ", ";
        console.log(orderText)
    })
    return orderText
}


// building html from object in items of cart //

var cartBuild = $(".cartItems"); 
headingCart = $("<h3>");
headingCart.attr("class", "cartHeading");
headingCart.text("The following items have been added to your cart")
cartBuild.append(headingCart);// Div for cart items start

Cart.items.forEach(e =>{

})


cartItemH5 = $("<h5>");
cartItemH5.attr("class", "cartItem1");


cartItemH5.text(orderText);
cartItemCost1 = $("<h5>");
cartItemCost1.attr("class", "cartCost1");
cartItemCost1.text("Order subtotal is : " + Cart.getSubtotal() + " USD");
headingCart.append(cartItemH5,cartItemCost1);
// setting local storage for cart Item 1
localStorage.setItem("cost1", Cart.subtotal) // setting a value to use for currency cost

var rowCart = $("<div>");
rowCart.attr("class", "row");
cartBuild.append(rowCart);



cartItemCost1 = $("<h2>");
cartItemCost1.attr("class", "cartCost1 col-md-12");
cartItemCost1.text("Order Total is: " + Cart.getTotal() + " USD");
rowCart.append(cartItemCost1);
// setting local storage for cart Item 1
localStorage.setItem("cost1", Cart.getTotal()) // setting a value to use for currency cost


//var currencyAmount = localStorage.getItem("currency");

//taking from a new source variable 
var currencyAmount = localStorage.getItem("cost1")

findTheCurrency();

costButton = $(".costButtons"); // Div for Cost Buttons

finalHeading = $(".headingFinal"); // Div for final cost


// Building Button for Click Event

var newApp = $(".nextApp");
var newAppRow = $(".nextAppRow");
var areaForJoke = $(".areaforjoke");

buttonNewApp = $("<button>");
buttonNewApp.attr({"class":"newButtonApp col-md-12"},{"type":"submit"});
buttonNewApp.text("Click Here! We want you to laugh today - Would you like to hear a joke?");
newAppRow.append(buttonNewApp);


// API for Joke

$(".newButtonApp").on("click", function(event){
    event.preventDefault();

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://joke3.p.rapidapi.com/v1/joke",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e6c11a1393msh3c8cfb271ca5e65p1b33bbjsn5dcaa2747580",
            "x-rapidapi-host": "joke3.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        console.log(response.content);
        var jokeToday = response.content;

        var jokeResponseH5 = $("<h3>");
        jokeResponseH5.attr("class","jokeresponse");
        jokeResponseH5.text(jokeToday);
        areaForJoke.append(jokeResponseH5)
    
    });

})




// URL for latest rates from USD
function findTheCurrency(){
    
    var currencyURL = "https://openexchangerates.org/api/latest.json?app_id=44872a8125c54b61a87af8a492745d21";
    
    $.ajax({
        url: currencyURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var rate1 = response.rates.CAD
        var rate2 = response.rates.ZAR
        var rate3 = response.rates.EUR
        var rate4 = response.rates.JPY
        var rate5 = response.rates.GBP
        var rate6 = response.rates.CHF


        //Canadian
        yourChargeCAD = rate1 * currencyAmount
        cadRate = yourChargeCAD.toFixed(2);

        // ZAR
        yourChargeZAR = rate2 * currencyAmount;
        zarRate = yourChargeZAR.toFixed(2);

        // EUR
        yourChargeEUR = rate3 * currencyAmount;
        eurRate = yourChargeEUR.toFixed(2); // 2 decimal places

        // YEN

        yourChargeJPY = rate4 * currencyAmount;
        yenRate = yourChargeJPY.toFixed(2);

        // British Pound
        yourChargeGBP = rate5 * currencyAmount;
        gbpRate = yourChargeGBP.toFixed(2);
        
        //Swiss Franc
        yourChargeCHF = rate6 * currencyAmount;
        chfRate = yourChargeCHF.toFixed(2);

        rateArray = [zarRate,eurRate,yenRate,gbpRate,chfRate];

        buttonAttributes = [{"type":"submit", "class":"cadButton currencybuttons","id":"cad"},
        {"type":"submit", "class":"zarButton currencybuttons","id":"zar"},
        {"type":"submit", "class":"eurButton currencybuttons","id":"eur"},
        {"type":"submit", "class":"yenButton currencybuttons","id":"yen"},
        {"type":"submit", "class":"gbpButton currencybuttons","id":"gbp"},
        {"type":"submit", "class":"chfButton currencybuttons","id":"chf"}]

        textButtons = ["Canadian Dollars (CAD)","South African Rand (ZAR)",
        "Euro (EUR)","Japanese Yen (YEN)","British Pound (GBP)",
        "Swiss Franc (CHF)"]

        buttonArea = $(".buttonarea");

        // for loop to build buttons

        for (var i=0; i<6; i++){
            buttonBTN = $("<button>");
            buttonBTN.attr(buttonAttributes[i]);
            buttonBTN.text(textButtons[i]);
            buttonArea.append(buttonBTN);

        }
    
        //costButton = $(".costButtons"); // Div for Cost Buttons

        //div for clickable event

        buttonArea = $(".buttonarea");

        $(".currencybuttons").on("click", function(){
            var value = $(this).attr("id");
            console.log(value);
            if (value === "cad"){
                displayCurrencyMessage(cadRate+" CAD Canadian Dollars");
            }else if(value === "zar"){
                displayCurrencyMessage(zarRate+" South African Rand");
            }else if(value === "eur"){
                displayCurrencyMessage(eurRate+" Euros");
            }else if(value === "yen"){
                displayCurrencyMessage(yenRate+" YEN");
            }else if(value === "gbp"){
                displayCurrencyMessage(gbpRate+" GBP");
            }else{
                displayCurrencyMessage(chfRate+" CHF");
            }
        })

        function displayCurrencyMessage(currencyRate){
            var h1Element = $("<h1>").addClass('text-stuff');
            h1Element.text("Your final Order Cost is: "+ currencyRate);
            clear();
            costButton.append(h1Element);
        }


    });
}


// clearing button div after click

const clear = function(){
    costButton.empty();
}


