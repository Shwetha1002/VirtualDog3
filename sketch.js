var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;
var addFood, feedDog;
var fedTime, lastFed=0;
var dogFood;
var gameState;
var dog;
var playing1;
var currenttime;
var bedroom, garden, washroom;
var stateVal;
var readGameState
var foodS=0
function preload()
{
	dogImage = loadImage("images/dogImg.png")
  happyDogImage = loadImage("images/dogImg1.png")
  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
  LazyDog = loadImage("images/Lazy.png")
}


function setup() {
  database = firebase.database();
  readGameState = database.ref('gameState');
  readGameState.on("value", ReadState)
	createCanvas(800, 700);
  foodObj = new Food();
  //.ref refers to the location of the value we care about.
  foodStock = database.ref('Food');
playing1 = createSprite( 600, 350, 50,50)
playing1.visibile = false;

  foodStock.on("value", readStock);
   dog = createSprite(400, 350 , 50, 50);
  dog.addImage(dogImage);
  dog.scale= 0.5

 

  //happyDog.addImage(happyDogImage);
feed = createButton("Feed your dog now!")
feed.position(400,100);
AddSomeFood = createButton("Add some food to your storage!")
AddSomeFood.position(700,100);

feed.mousePressed(feedDog)
AddSomeFood.mousePressed(addFoods)

if(gameState !== "hungry"){
  feed.hide();
  dog.addImage(LazyDog)
}

}


function draw() {  
  background(46,139,87);
 foodObj.display();
 
  fedTime = database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed = data.val();
  } );

  currenttime = hour ();
 if(currenttime === lastFed +1  || currenttime === lastFed){
   textSize(30)
   fill("purple")
   text("Playing! Not in a mood to eat, but you can collect food!", 40, 600)
   dog.scale = 0.001
   feed.hide();
   playing1.visible = true;
   playing1.addImage(garden);
   playing1.scale = 0.5;
   //background(garden)
   WriteState("playing");
 }

 else if(currenttime >= lastFed + 2 && currenttime <= lastFed + 4) {
  textSize(30)
  fill("purple")
   text("Do not disturb :P", 40, 600)
   playing1.visible = true;
   feed.hide();
   dog.scale = 0.001
   playing1.addImage(washroom);
   playing1.scale = 0.5;
   //foodObj.washroom();
   WriteState("bathing");
 }

 else {
   WriteState("hungry");
   text("Hungry... Need some food :)", 100, 100)
 background("green");
   feed.show();
   dog.addImage(dogImage);
   dog.scale = 0.75;
 }



  /*if(feed.mousePressed){
    dogFood.deductFoodStock(foodS);
    gameState = 3;
    feedDog();
    
  }
  if(AddSomeFood.mousePressed){
    dogFood.addFoodStock(foodS);
    gameState = 0;
    
  }*/

  drawSprites();
  textSize(20);
  fill ("red")
  text ( "Food:" + foodS, 100,100 );
  //add styles here
 fill("purple")

 fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
}

function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS)


}
function feedDog(){
  dog.addImage(happyDogImage);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
  
    Food:foodObj.getFoodStock(),
    
    FeedTime: hour()

  })
}



function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function ReadState(){
 stateVal = data.val();
}


function WriteState(x){
 //gameState = x;
 database.ref('/').update({
gameState : x
 });
}

