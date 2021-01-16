// testing logic through e-mail link.

// not being entered as a string

// Header Buttons

//Building object for cart

var items = [{
    meal:'Chicken Strips',
    selection:['honey mustard','Ranch'],
    cost: 10
    },
    {
    meal:'Burger',
    selection:['pickles','ketchup'],
    cost: 10
    },
    {
    meal: 'Chicken Sandwich',
    selection: ['sharp cheddar', 'pepperjack'],
    cost: 10
    },
    {
    meal: 'Salad',
    selection: ['ranch','vinegar'],
    cost: 10

}]

item1Cost = items[0].cost
item2Cost = items[1].cost
item3Cost = items[2].cost
item4Cost = items[3].cost

totalCost = item1Cost + item2Cost + item3Cost + item4Cost;

//Building menu for orders for checkout

menuItems = $(".menuitems");

var mealOne = $("<h5>");
mealOne.attr("class", "mealone")
mealOne.text("1. " +items[0].meal + " with " + items[0].selection[0]);
menuItems.append(mealOne);

var mealTwo = $("<h5>");
mealTwo.attr("class", "mealtwo");
mealTwo.text("2. "+ items[1].meal + " with " + items[1].selection[0]);
menuItems.append(mealTwo);

var mealThree = $("<h5>");
mealThree.attr("class", "mealtwo");
mealThree.text("3. "+ items[2].meal + " with " + items[2].selection[1]);
menuItems.append(mealThree);





// building html from object in items of cart //

var cartBuild = $(".cartItems"); // Div for cart items start

var rowCart = $("<div>");
rowCart.attr("class", "row");
cartBuild.append(rowCart);

headingCart = $("<h5>");
headingCart.attr("class", "cartHeading col-md-6");
headingCart.text("The following items have been added to your cart")
rowCart.append(headingCart);

cartItemH5 = $("<h5>");
cartItemH5.attr("class", "cartItem1 col-md-6");
cartItemH5.text("Meal Ordered: " + items[0].meal + " with "+items[0].selection[1]);

cartItemCost1 = $("<h5>");
cartItemCost1.attr("class", "cartCost1");
cartItemCost1.text("Order Total is: " + totalCost + " USD");
rowCart.append(cartItemH5,cartItemCost1);
// setting local storage for cart Item 1
localStorage.setItem("cost1", totalCost) // setting a value to use for currency cost


// var headButton = $(".topnav");

// var buttonHead1 = $("<button>");
// var buttonLink1 = $("<a>");
// buttonHead1.attr("type","submit");
// buttonHead1.text("Homepage");
// buttonLink1.attr({"class":"active", "href":"#main.html"});
// headButton.append(buttonHead1);
// buttonHead1.append(buttonLink1);

// var buttonHead2 = $("<button>");
// var buttonLink2 = $("<a>");
// buttonHead2.attr("type","submit");
// buttonHead2.text("Menu");
// buttonLink2.attr({"class":"active", "href":"#menu.html"});
// headButton.append(buttonHead2);
// buttonHead2.append(buttonLink2);


// $(".enterbutton").on("click", function(){
//     var pretendCurrency = document.getElementById("emailtext").value;
//     localStorage.setItem("currency",pretendCurrency);

// })



//var currencyAmount = localStorage.getItem("currency");

//taking from a new source variable 
var currencyAmount = localStorage.getItem("cost1")

findTheCurrency();

costButton = $(".costButtons"); // Div for Cost Buttons

finalHeading = $(".headingFinal"); // Div for final cost


// Information for next Application

var newApp = $(".nextApp");

buttonNewApp = $("<button>");
buttonNewApp.attr({"class":"newButtonApp"},{"type":"submit"});
buttonNewApp.text("We want you to laugh today - Would you like to hear a joke?");
newApp.append(buttonNewApp);

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
        // console.log(rate1);
        // console.log(rate2);
        // console.log(rate3);
        // console.log(rate4);
        // console.log(rate5);
        // console.log(rate6);


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

        buttonAttributes = [{"type":"submit", "class":"cadButton currencybuttons"},
        {"type":"submit", "class":"zarButton currencybuttons"},
        {"type":"submit", "class":"eurButton currencybuttons"},
        {"type":"submit", "class":"yenButton currencybuttons"},
        {"type":"submit", "class":"gbpButton currencybuttons"},
        {"type":"submit", "class":"chfButton currencybuttons"}]

        textButtons = ["Canadian Dollars (CAD)","South African Rand (ZAR)",
        "Euro (EUR)","Japanese Yen (YEN)","British Pound (GBP)",
        "Swiss Franc (CHF)"]

        buttonArea = $(".buttonarea");

        for (var i=0; i<6; i++){
            buttonBTN = $("<button>");
            buttonBTN.attr(buttonAttributes[i]);
            buttonBTN.text(textButtons[i]);
            buttonArea.append(buttonBTN);

        }
    

        //costButton = $(".costButtons"); // Div for Cost Buttons

        //div for clickable

        buttonArea = $(".buttonarea");

        


        // paymentPref = $("<h3>");
        // paymentPref.attr("class", "paymentPref");
        // paymentPref.text("What is your preferred currency to pay with?");
        // costButton.append(paymentPref);
        
        //creating button for canadian dollar
        // var button1 = $("<button>");
        // button1.attr({"type":"submit", "class":"cadButton currencybuttons"});
        // button1.text("Canadian Dollars (CAD)"); // canadian dollars
        // buttonArea.append(button1);

        // //creating button for south african dollar
        // var button2 = $("<button>");
        // button2.attr({"type":"submit", "class":"zarButton currencybuttons"});
        // button2.text("South African Rand (ZAR)"); // south african dollars
        // buttonArea.append(button2);

        // //creating button for euro
        // var button3 = $("<button>");
        // button3.attr({"type":"submit", "class":"eurButton currencybuttons"});
        // button3.text("Euro (EUR)"); // euros
        // buttonArea.append(button3);

        // //creating button for yen
        // var button4 = $("<button>");
        // button4.attr({"type":"submit", "class":"yenButton currencybuttons"});
        // button4.text("Japanese Yen (YEN)"); // japanese yen
        // buttonArea.append(button4);

        // //creating button for GBP
        // var button5 = $("<button>");
        // button5.attr({"type":"submit", "class":"gbpButton currencybuttons"});
        // button5.text("British Pound (GBP)"); // british pound
        // buttonArea.append(button5);

        // //creating button for CHF
        // var button6 = $("<button>");
        // button6.attr({"type":"submit", "class":"chfButton currencybuttons"});
        // button6.text("Swiss Franc (CHF)"); // swiss franc
        // buttonArea.append(button6);

        // canadian button click event

        $(".cadButton").on("click", function(){
            var cadCost = $("<h1>");
            cadCost.text("Your final Order Cost is: " + cadRate +" CAD Canadian Dollars");
            cadCost.attr("class", "cadcost")
            clear();
            costButton.empty();
            costButton.append(cadCost);
        
        });

        // south african rand cost click event

        $(".zarButton").on("click", function(){
            var zarCost = $("<h1>");
            zarCost.text("Your final Order Cost is: " + zarRate +" South African Rand");
            zarCost.attr("class", "zarcost");
            clear();
            costButton.append(zarCost);
        
        });

        // Euro cost click event

        $(".eurButton").on("click", function(){
            var eurCost = $("<h1>");
            eurCost.text("Your final Order Cost is: " + eurRate +" Euros");
            eurCost.attr("class", "eurcost")
            costButton.append(eurCost);
        });

        // YEN cost click event

        $(".yenButton").on("click", function(){
            var yenCost = $("<h1>");
            yenCost.text("Your final Order Cost is: " + yenRate +" YEN");
            yenCost.attr("class", "yencost")
            costButton.append(yenCost);
        });

        // GBP Cost Click Event

        $(".gbpButton").on("click", function(){
            var gbpCost = $("<h1>");
            gbpCost.text("Your final Order Cost is: " + gbpRate +" GBP");
            gbpCost.attr("class", "gbpcost")
            costButton.append(gbpCost);
        });

        // CHF Swiss Franc Cost Event

        $(".chfButton").on("click", function(){
            var chfCost = $("<h1>");
            chfCost.text("Your final Order Cost is: " + chfRate +" CHF");
            chfCost.attr("class", "gbpcost");
            costButton.append(chfCost);
        });

    });
}

const clear = function(){
    costButton.empty();
}



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
    console.log(response.content);
   
});

