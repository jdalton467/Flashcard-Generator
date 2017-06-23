

var fs = require("fs"); // setting up filesystem to read/write files
var inquirer = require("inquirer"); //importing the npm inquirer package

var Basiccard = require("./basiccard.js"); //importing the basic card constructor
var Clozecard = require("./clozecard.js"); //importing the cloze card constructor
var count = 0;


inquirer.prompt([
	{
		"type": "list",
		"name": "type",
		"choices": ["user","admin"],//if user selected then you will be able to study the cards, if admin is selected then you can create cards
		"message": "Please select a login type:"
	}
		]).then(function(info){
			if(info.type == "admin"){ //if the admin option was selected
			inquirer.prompt([
				{
					"type": "list",
					"name": "type",
					"choices":["yes","no"], //decide between yes or no
					"message": "Would you like to make flashcards?"
				}
			]).then(function(info){
					if(info.type == "yes"){ //if yes, then choose which type of card to make
						inquirer.prompt([
				        {
					      "type": "list",
					      "name": "type",
					      "choices":["Basic","cloze"],
					      "message": "Basic cards or Cloze cards?"
				         }	
				         ]).then(function(info){
				         	if(info.type == "Basic"){//if basic chosen

				         		var makeCard = function(){
				         		if(count < 10){
				         		inquirer.prompt([
				         			{
                                      name: "front",
                                      message: "Enter the question the front of the card"
                                    },
                                    {
                                      name: "back",
                                      message:"Enter the answer on the back"
                                    }

				         		]).then(function(newCard){
				         			var newCard = new Basiccard(
				         				newCard.front,
				         				newCard.back);
				         			console.log(newCard.front);
				         			fs.appendFile("front.txt", newCard.front +",",function(err){
				         				if(err){
				         					return console.log(err); // append the created front to front.txt
				         				}

				         			});
				         			console.log(newCard.back);
				         			fs.appendFile("back.txt", newCard.back +",",function(err){
				         				if(err){
				         					return console.log(err); //appends the answer on the back to back.txt
				         				}
				         			});
				         			count++;
				         			makeCard();
				         		})
				         			//activate makeCard function again
				         	   }
				         	};
				         	makeCard();
				          }else{
				          	var makeCard = function(){
				         	if(count < 10){
				          	inquirer.prompt([
				         			{
                                      name: "text",
                                      message: "Enter the full statement."
                                    },
                                    {
                                      name: "cloze",
                                      message:"Enter the portion to be omitted."
                                    }

				         		]).then(function(newCard){
				         			var newCard = new Clozecard(
				         				newCard.text,
				         				newCard.cloze);
				         			console.log(newCard.text);
				         			fs.appendFile("text.txt", newCard.text +",",function(err){
				         				if(err){
				         					return console.log(err); // append the created front to front.txt
				         				}


				         			});
				         			console.log(newCard.cloze);
				         			fs.appendFile("cloze.txt", newCard.partialtext +",",function(err){
				         				if(err){
				         					return console.log(err); //appends the answer on the back to back.txt
				         				}
				         			});
				         			count++;
				         			makeCard();
								  })
				         	   }
				         	 };
				         	 makeCard();
				          }
				       })					
					}else{
						inquirer.prompt([
	                      {
		                  "type": "list",
						  "name": "type",
		                  "choices": ["user","admin"],//if user selected then you will be able to study the cards, if admin is selected then you can create cards
		                  "message": "Please select a login type:"
	                      }
		                   ]).then(function(info){
			               if(info.type == "admin"){ //if the admin option was selected
			                inquirer.prompt([
				             {
					          "type": "list",
					          "name": "type",
					          "choices":["yes","no"], //decide between yes or no
					          "message": "Would you like to make flashcards?"
				             }
				            
			               ])
			              }
			           })
			         }
			     })
		   	   }else{
		   	   	inquirer.prompt([
				        {
					      "type": "list",
					      "name": "type",
					      "choices":["Basic","cloze"],
					      "message": "Which type of flash card would you like to study?" //  users have a choice between what type of flashcard to study
				         }	
		                ]).then(function(info){
		                	count = 0;
				         	if(info.type == "Basic"){
				         		var displayFront = function(){
				         		if(count < 10){
				         		fs.readFile("front.txt", "utf8", function(err,front){
				         			if(err){
				         				return(console.log(err))
				         			}
				         			var frontArr = front.split(",");
				         			inquirer.prompt([
				                     {
					                   "type": "list",
					                   "name": "type",
					                   "choices":["showback"],
					                   "message": frontArr[count]
				                   }	
				                   ]).then(function(info){
				                   	if(info.type == "showback"){
				                   	  fs.readFile("back.txt", "utf8", function(err,back){
				         			    if(err){
				         				return(console.log(err))
				         			   }
				         			  var backArr = back.split(",");
				         			  console.log(">>"+backArr[count]);
				         			  count++
				                   	  displayFront();
				         			  })
				                   	 
				                   	}
				                   })
				         		 });
				         	    }
				         	 };
				         	displayFront();
				         }else{
				         	var displayCloze = function(){
				         		if(count < 10){
				         		fs.readFile("cloze.txt", "utf8", function(err,cloze){
				         			if(err){
				         				return(console.log(err))
				         			}
				         			var clozeArr = cloze.split(",");
				    
				         			inquirer.prompt([
				                     {
					                   "type": "list",
					                   "name": "type",
					                   "choices":["showfull"],
					                   "message": clozeArr[count]
				                   }	
				                   ]).then(function(info){
				                   	if(info.type == "showfull"){
				                   	  fs.readFile("text.txt", "utf8", function(err,text){
				         			    if(err){
				         				return(console.log(err))
				         			   }
				         			  var textArr = text.split(",");
				         			  var textreplace = textArr[count];
				         			  console.log(">>"+ textreplace.replace(clozeArr[count],textArr[count]));
				         			  count++
				                   	  displayCloze();
				         			  })
				                   	 
				                   	}
				                   })
				         		 });
				         	    }
				         	 };
				         	displayCloze();
				         }
                      })
		          }
		      })
		


