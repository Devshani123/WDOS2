// console.log("Hey just checking");

//Reffering to the DOM elements of three checkings on top of the page//
const branchInput = document.getElementsByName("selectBranch");
const checkInInput = document.getElementById("checkIn");
const checkOutInput = document.getElementById("checkOut");

//Reffering to the DOM elements of hotel booking form//
const nationalityInput = document.getElementById("nationality");
const singleRoomInput = document.getElementById("SingleRoom");
const doubleRoomInput = document.getElementById("DoubleRoom");
const tripleRoomInput = document.getElementById("TripleRoom");
const roomTypeInput = document.getElementsByName("RoomType");
const extraInput = document.getElementsByName("extraRequirements");
const nameInput = document.getElementById("fullName");
const numberInput = document.getElementById("phoneNumber");
const emailInput = document.getElementById("email");
const adultsInput = document.getElementById("noOfAdults");
const childrenInput = document.getElementById("noOfChildren");
const kidsAbove5Input = document.getElementById("kidsAbove5");
//const roomsInput = document.getElementById("No-of-rooms");
const singleRoomQInput = document.getElementById("singleRoomQuantity");
const doubleRoomQInput = document.getElementById("doubleRoomQuantity");
const tripleRoomQInput = document.getElementById("tripleRoomQuantity");
const promoInput = document.getElementById("promoCode");
const currentBookingInfoText = document.getElementById("currentBookingInfo");
const currentBookingCostText = document.getElementById("CurrentBookingCost");
const addBookingButton = document.getElementById("addBookingBtn");
const addAnotherBookingBtton = document.getElementById("addAnotherBookingBtn");

//Reffering to the DOM elements of adventure booking form//
const nameAdventureInput = document.getElementById("fullNameAdventure");
const adventureTypeInput = document.getElementsByName("adventureType");
const scubaDivingAdventure = document.getElementById("scubaDiving");
const divingGuideInput = document.getElementsByName("divingGuide");
const adultsAdInput = document.getElementById("noofAdultsAd");
const childrenAdInput = document.getElementById("noofChildrenAd");
const kidsAbove5AdInput = document.getElementById("kidsAbove5Ad");
const addAdventureButton = document.getElementById("addAdventureBtn");
const overallCostBtutton = document.getElementById("overallCostBtn");
const overallBookingInfoText = document.getElementById("overallBookingInfo");
const adventureInfoText = document.getElementById("adventureInfo");
const overallCostOutputText = document.getElementById("OverallCostOutput");
const addToFaviouritesButton = document.getElementById("addToFaviouritesBtn");
const checkLoyaltyPointsButton = document.getElementById("CheckLoyaltyPointsBtn");
const loyaltyPointsInfoText = document.getElementById("loyaltyPointsInfo");
const faviouritesInfoText = document.getElementById("faviouritesInfo");


//adding the event listernes to code//
addBookingButton.addEventListener("click", addBooking);
roomTypeInput.forEach(item => item.addEventListener("change",changeRoomType));
extraInput.forEach(item => item.addEventListener("change",changeExtra));
addAnotherBookingBtton.addEventListener("click", addAnotherHotelBooking);


 //adding the event listernes to adventure booking code//
divingGuideInput.forEach(item => item.addEventListener("change",changeDivingGuide));
addAdventureButton.addEventListener("click", addAdventure);
overallCostBtutton.addEventListener("click", calculateOverallCost);
addToFaviouritesButton.addEventListener("click", addToFavourites);
checkLoyaltyPointsButton.addEventListener("click", LoyaltyPoints1);


//declaring the variables of hetel booking part //

let noOfSingleRooms;
let noOfDoubleRooms;
let noOfTripleRooms;
let roomCostSingle;
let roomCostDouble;
let roomCostTriple;
let roomTypeSingle;
let roomTypeDouble;
let roomTypeTriple;
let kidsAbove5;
let promoText;
let total;
let current;
let extraBedCost;
let extraBed;
let totalHotelCost;

//functions of the event listers for the hotel booking part//

let hotelBookings = [];

function initialize_hotel() {
    noOfSingleRooms =0;
    noOfDoubleRooms =0;
    noOfTripleRooms =0;
    roomCostSingle = 0;
    roomCostDouble = 0;
    roomCostTriple = 0;
    roomTypeSingle = "";
    roomTypeDouble = "";
    roomTypeTriple = "";
    kidsAbove5 = 0;
    promoText = "";
    total = 0;
    current = 0;
    extraBedCost = 0;
    extraBed = " No Extra bed Included";
    totalHotelCost = 0; 
}

initialize_hotel();

//declaring the variables of adventure booking part //
let adventureCost;
let adultGuide;
let kidGuide;
let adultGuideCost;
let kidGuideCost;
let LoyaltyPoints;
let adventureType;
let overallBookings;
let divingAdults;
let divingChild;

let adventureBookings = [];
let overallHotelCost = 0;
let overallCost = 0;

function initialize_adventure() {
    adventureCost =0;
    adultGuide = "no adult guide needed";
    kidGuide ="no kid guide needed";
    adultGuideCost = 0;
    kidGuideCost = 0;
    LoyaltyPoints = 0;
    adventureType = "";
    overallBookings =[];
    divingAdults =0;
    divingChild =0;

}

initialize_adventure();



function addBooking(){

    const hotelInfo = collectHotelBookingInfo(); 
    totalHotelCost = hotelInfo.numOfSingleRooms*(roomCostSingle) + hotelInfo.numOfDoubleRooms*(roomCostDouble)+ hotelInfo.numOfTripleRooms*(roomCostTriple)+ extraBedCost + hotelInfo.numOfKidsAbove5*5000;

    var promoCode = promoInput.value;
    if(promoCode == "Promo 123"){
        totalHotelCost *= 0.95;
        promoText = "And the promotion code is added.";
        localStorage.setItem("TotalHotelCost",totalHotelCost);           
    }else
    {
        promoText = "";
    }    
    
    hotelInfo.totalHotelCost = totalHotelCost;
    currentBookingCostText.innerText = ` LKR ${totalHotelCost}/-  `; 
    currentBookingInfoText.innerText = `You have booked ${hotelInfo.numOfSingleRooms} ${roomTypeSingle}(s),  ${hotelInfo.numOfDoubleRooms} ${roomTypeDouble}(s) and ${hotelInfo.numOfTripleRooms} ${roomTypeTriple}(s). Also ${extraBed}, LKR ${hotelInfo.numOfKidsAbove5*5000}/-  for kids meals and the final amount is LKR ${totalHotelCost}/- .${promoText}`

    if(hotelInfo.roomType != ""){
        hotelBookings.push(hotelInfo);
    }    
}


function changeRoomType(){

    if(this.value == "SingleRoom"){
        roomCostSingle = 25000;
        roomTypeSingle = "SingleRoom";
    } else if(this.value == "DoubleRoom"){
        roomCostDouble= 35000;
        roomTypeDouble = "DoubleRoom";
    } else {
        roomCostTriple= 40000;
        roomTypeTriple = "TripleRoom";
    }
    const hotelInfo = collectHotelBookingInfo(); 
    totalHotelCost = hotelInfo.numOfSingleRooms*(roomCostSingle) + hotelInfo.numOfDoubleRooms*(roomCostDouble)+ hotelInfo.numOfTripleRooms*(roomCostTriple)+ extraBedCost + hotelInfo.numOfKidsAbove5*5000;    

    hotelInfo.totalHotelCost = totalHotelCost;
    currentBookingCostText.innerText = ` LKR ${totalHotelCost}/-  `; 
    currentBookingInfoText.innerText = `You have booked ${hotelInfo.numOfSingleRooms} ${roomTypeSingle}(s),  ${hotelInfo.numOfDoubleRooms} ${roomTypeDouble}(s) and ${hotelInfo.numOfTripleRooms} ${roomTypeTriple}(s). Also ${extraBed}, LKR ${hotelInfo.numOfKidsAbove5*5000}/-  for kids meals and the final amount is LKR ${totalHotelCost}/- .${promoText}`
}

function changeExtra() 
{
    if(this.value =="Extra-Bed")
    {
        if(this.checked) {
         extraBed =" Extra bed Included";
         extraBedCost = 8000.00 ;
        }
        else
        {
            extraBed =" Extra bed Not Included";
            extraBedCost = 0;
        }
    } 
    
    const hotelInfo = collectHotelBookingInfo(); 
    totalHotelCost = hotelInfo.numOfSingleRooms*(roomCostSingle) + hotelInfo.numOfDoubleRooms*(roomCostDouble)+ hotelInfo.numOfTripleRooms*(roomCostTriple)+ extraBedCost + hotelInfo.numOfKidsAbove5*5000;    

    hotelInfo.totalHotelCost = totalHotelCost;
    currentBookingCostText.innerText = ` LKR ${totalHotelCost}/-  `; 
    currentBookingInfoText.innerText = `You have booked ${hotelInfo.numOfSingleRooms} ${roomTypeSingle}(s),  ${hotelInfo.numOfDoubleRooms} ${roomTypeDouble}(s) and ${hotelInfo.numOfTripleRooms} ${roomTypeTriple}(s). Also ${extraBed}, LKR ${hotelInfo.numOfKidsAbove5*5000}/-  for kids meals and the final amount is LKR ${totalHotelCost}/- .${promoText}`
}    


//functions for the diving part//

function changeDivingGuide() {

    if(this.value =="adult"){
        if(this.checked) {
            adultGuide =" A guide booked for adults"
            adultGuideCost =1000.00 ;
        } 
        else {
            adultGuideCost = 0.00 ;
        }
    } 
    else if(this.value =="kid"){
        if(this.checked) {
            kidGuide =" A guide booked for kids"
            kidGuideCost = 500.00 ;
        } else {
            kidGuideCost = 0.00 ;
        }
    }
}

function addAdventure(){

    let adultAd = adultsAdInput.value;
    let childAd = childrenAdInput.value;
    let kidAd = kidsAbove5AdInput.value;
    let name = nameInput.value;
    
    let nationality = nationalityInput.value; 
    if (nationality.toLowerCase() == "sri lanka"){
        divingAdults = 5000;
        divingChild = 2000;
    }else {
        divingAdults = 10000;
        divingChild = 5000;
    }

    adventureCost =  adultAd*divingAdults + childAd*divingChild + adultGuideCost + kidGuideCost
    //console.log("hi");
    localStorage.setItem("TotalAdventureCost",adventureCost);  
    adventureInfoText.innerText = `Thank you ${name} for booking our adventures. You have booked a diving seession for ${adultAd} adult(s),${childAd} kids(s) and ${kidAd} kid(s) above 5. And ${adultGuide} , ${kidGuide} .The total price for your adventure booking is LKR ${adventureCost}/-`
}

function addAnotherHotelBooking() {

    // Clear the input fields
    
    nameInput.value ="";
    numberInput.value = "";
    emailInput.value = "";
    adultsInput.value = 0;
    childrenInput.value = 0;
    nationalityInput.value ="";
    singleRoomQInput.value = 0;
    doubleRoomQInput.value = 0;
    tripleRoomQInput.value = 0;
    kidsAbove5Input.value = 0;
    promoInput.value = "";

    extraInput.forEach(item => {
        item.checked = false;
    });

    roomTypeInput.forEach(item => {
        item.checked = false;
    });

    currentBookingCostText.innerText = "0.00 LKR";
    currentBookingInfoText.innerText = "Your booking details have been added to overall booking.Kindly proceed with your other booking";
}


function calculateOverallCost() {
    overallCost = 0;
    overallHotelCost = 0;

    // calculate overall cost for hotel bookings
    hotelBookings.forEach(booking => {
        overallHotelCost += booking.totalHotelCost || 0;
    });
    
    //calculate the total of overall hotel bookings and adventure booking
    overallCost = (adventureCost + overallHotelCost);

    overallCostOutputText.innerText = `LKR ${overallCost}/-`;

    overallBookingInfoText.innerText = `The overall cost of hotel booking is LKR ${overallHotelCost}/- and the overall cost of adventure booking is LKR ${adventureCost}/- . The total cost for all hotel and adventure bookings LKR ${overallCost}/-`;

}

const adventureBooking = {
    name1 :"",
    adventureType : "",
    noOfAdultsAd : 0,
    noOfChildrenAd : 0,
    noOfKidsAbove5Ad : 0,
    adultGuideRequired : false,
    kidGuideRequired : false,
    adultGuideCost : 0,
    kidGuideCost : 0,
    totalAdventureCost : 0,
}

const hotelBooking = {
    hotelBranch : "",
    customerName : "",
    numOfSingleRooms : 0,
    numOfDoubleRooms : 0,
    numOfTripleRooms : 0, 
    roomType : "",   
    numOfAdults : 0,
    numOfChildren : 0,
    numOfKidsAbove5 : 0,
    totalHotelCost : 0,
    loyaltyPoints : 0,
}

//Read info from form fields and map them into the hotelBooking const
function collectHotelBookingInfo(){

    const branch = branchInput.value;
    const name = nameInput.value;

    const SingleRooms = parseInt(singleRoomQInput.value);
    const DoubleRooms = parseInt(doubleRoomQInput.value);
    const TripleRooms = parseInt(tripleRoomQInput.value);

    let roomType = "";
    if(SingleRooms != 0)
    {
        roomType = "Single Room";
    }
    if(DoubleRooms !=0){
        roomType += "Double Room";
    }
    if(TripleRooms != 0){
        roomType += "Triple Room";
    }

    const Adults = parseInt(adultsInput.value);
    const Children = parseInt(childrenInput.value);
    const kids  = parseInt(kidsAbove5Input.value);
    
    hotelBooking.hotelBranch = branch;
    hotelBooking.customerName = name;
    hotelBooking.numOfSingleRooms = SingleRooms;
    hotelBooking.numOfDoubleRooms = DoubleRooms;
    hotelBooking.numOfTripleRooms = TripleRooms;
    hotelBooking.roomType = roomType;
    hotelBooking.numOfAdults = Adults;
    hotelBooking.numOfChildren = Children;
    hotelBooking.numOfKidsAbove5 = kids;

    return hotelBooking;
}

function addToFavourites(){
    const hotelInfo = collectHotelBookingInfo();       
    localStorage.setItem('hotelBookingInfo',JSON.stringify(hotelInfo));
    setTextinOutput5();
}
    
function setTextinOutput5(){
    var jsonText = localStorage.getItem('hotelBookingInfo');
    var string = "";
    var listOfStrings = jsonText.split(",");
    for(var i=0; i<listOfStrings.length; i++){
        string += listOfStrings[i];
        string += "\n";
    }
    faviouritesInfoText.innerText = string;
}




function LoyaltyPoints1(){

    const SingleRooms = parseInt(singleRoomQInput.value);
    const DoubleRooms = parseInt(doubleRoomQInput.value);
    const TripleRooms = parseInt(tripleRoomQInput.value);
    let totalRooms = 0;

    totalRooms = (SingleRooms + DoubleRooms + TripleRooms);

    
    if(totalRooms >3){
        LoyaltyPoints += 20* totalRooms;
        
        const userInfo = {
            totalPoints : LoyaltyPoints,
            bookedRooms : totalRooms,
        }

        localStorage.setItem('LoyaltyPoints', JSON.stringify(userInfo));
        loyaltyPointsInfoText.innerText = `We highly appriciate your loyalty and trust towards us! You have earned ${LoyaltyPoints} loyalty points!`
    }else{
        loyaltyPointsInfoText.innerText = `No loyalty points earned yet!`
    }
    
}
