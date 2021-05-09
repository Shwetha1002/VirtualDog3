
class Food{
  constructor(){
      this.image = loadImage("Milk.png")
      this.foodStock = 0;
      this.lastFed
      
  }

 /* getFoodStock(){
      var FoodStockLoc = database.ref('Food');
      FoodStockLoc.on("value", function(data){
          foodS= data.val();
      })
  }*/

   updateFoodStock(foodStock){
    this.foodStock= foodStock
   }

   deductFoodStock(){


     if(this.foodStock>0){
   this.foodStock=this.foodStock-1;
  }
}
 /* if(food === 0){
    food = 0;
    
    database.ref('/').update({
      Food: food
    
      });
   // text (" Sorry! You don't have any food now! Please add some more before feeding the dog", 200, 200)
  }
  else{
    food = food -1;
    gameState = "happyFace";
    database.ref('/').update({
      Food: food
    
      });
  }*/
   getFoodStock(){
    return this.foodStock;
  }

  getFedTime(lastFed){
    this.lastFed=lastFed;
  }

  bedroom(){
 background(bedroom);

  }

  garden(){
    background(garden);
   
     }

washroom(){
  background(washroom);
}

display(){

/* if(gameState === 3)  { 
var pos =this.body.position;
imageMode(CENTER);
image(this.image, pos.x, pos.y, 100,100);
 }
 else{
 }*/

 var x= 80, y = 100;
 imageMode(CENTER);
//image(this.image, 720, 220, 70,70);
 if(this.foodStock!=0){
 for(var i = 0; i < this.foodStock; i++){
   if(i%10 ==0){
     x = 80;
     y = y+ 50;
   }
  image(this.image, x , y , 50 ,50);
  x = x + 30;
 }
 
}
  

}






  






















}




 
    






















