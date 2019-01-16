$(document).ready(function() {

	//GLOBAL VAR
	var currentQ;		//Used for Displaying Currently being used Info

	var correctAnswer;	// ------------------
	var wrongAnswer;	//Score Count
	var unanswered;		// ------------------

	var answered; 		//Used as Boolean
	
						//=============
	var seconds;		//TIMER
	var time;			//=============
	
	var userChoice;		// User Input

	var text = {

		correct: "Muy Bien! You know what you are doing.",
		incorrect: "Lo siento mucho!... Better luck next time.",
		noTime: "Excuse me but you are out of TIEMPO!",
		done: "You are Spanish speaking natural! and if you missed a few, then keep on trying! ADELANTE!",
	};

	var triviaQuestions = [
		{	



			
			question: "When you really need to go! Badly! You would ask?",
			choices: ["Disculpe donde esta el lavatorio?", "Donde esta la bana?", "A donde se encuentra el lavadero?", "Quiero pipi!"],
			correct: 0,
			image: "assets/images/farley.gif",
			answerText: "el 'lavatorio' is the proper way to ask for the bathroom in Spanish..",
		},

		{
			question: "If you are finished with your meal you would ask the waiter...?",
			choices: ["Quiere my checke?", "La cuenta porfavor?", "Me gustar el cuento?", "Dinero tu...ahora!"],
			correct: 1,
			image: "assets/images/will.gif",
			answerText: "'la cuenta' is the common way to ask fo the check",
		},

		{
			question: "When you are at a party and that attractive dancer invites you to boogie...",
			choices: ["Danzar! Ops no siento¡", "Bailar! cuanto cuesta?", "Bailar! Claro me encantaria!", "le danso al ganso!"],
			correct: 2,
			image: "assets/images/dance.gif",
			answerText: "Latin America is the birth place of many legendary styles of dance such as Tango and Salsa!",
		},

		{
			question: "When you are at the airport and need transportation",
			choices: ["Le burro por mis maletas por favor?", "Yer necesitor uno carro porfavor!", "Un taxi porfavor!", "La taxi!"],
			correct: 2,
			image: "assets/images/taxi.gif",
			answerText: "An alternative, folk-etymology holds that 'taxi' was named for Franz von Taxis, a 16th-century postmaster for Philip of Burgundy.",
		},
		{
			question: "When you are lost and need directions to Insurgentes ave  you would ask?",
			
			choices: ["No saber calle Insurgentes!", "Estar loco perdido por Insurgentes!", "porfavor donde esta casita Insurgentes?", "Disculpe donde esta la avenida Insurgentes?"],
			correct: 3,
			image: "assets/images/lost.gif",
			answerText: 'Did you know that Buenos Aires, Argentina is often referred to as the Paris of South America?',
		},
		{
			question: "There's a crazy drunk lunatic at  the bar and  he thinks you are their lovers  object of affection: They confront you and you say...?",
			choices: ["Yo soy el mas guapo!", "Tu amor tener aliento de chiva!", " Amigo yo nunca te faltaria al respeto de esa manera", "Tu amorcito esta perdida enamorada de mi!"],
			correct: 2,
			image: "assets/images/angry.gif",
			answerText: 'did you know that In some countries, notably France, crime passionnel (or crime of passion) was a valid defense to murder charges.'
		},
		{
			question: "Everyone is happy and toasting for the New Year! You raise your glass and say...",
			choices: ["Salute!", "Salud!", "Felicidades!", "Noroc!"],
			correct: 1,
			image: "assets/images/toast.gif",
			answerText: "While many Americans nab a kiss at the stroke of midnight or toast to the new year, Mexicans are busy eating 12 grapes with each chime of the clock's bell. "
		},

		{
			question: "You need change for the train and need to break a large bill...you ask the station agent...",
			choices: ["Me cambio porfavor?", "Me changer le dinero?", "Me podria dar cambio porfavor?", "Tu dar moneda a mi porfavor?"],
			correct: 2,
			image: "assets/images/underground.gif",
			answerText: "Santiago's Chile Subterraneo line opened in 1975 and today the system is extensive and modern, a primarily underground maze of trains that serves more than 6 million people, and it works great. . "
		},
	];

	// Hides Content at Start Up
	$("#gameArea").hide();

	// Start Button Click and Hide
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	// Reset Button
	$("#startOverBtn").on("click", function(){
		$("#Res").hide();
		newGame();
	});

	// ======================================================
	//Function to Start Game After Initial Click
	// ======================================================
	function newGame() {
		$("#gameArea").show();
		$("#Ans").hide();
		$("#Res").hide();		
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswered = 0;
		currentQ = 0;
		questions();
	}
	// ==================
	// Displays Question
	// ==================
	function questions() {
		$("#Ans").hide();
		$("#Qs").show();
		answered = true;
		// Prints Question from Array
		$(".question").html(triviaQuestions[currentQ].question);

		// -----------------------------------------
		//Loops through possible choices and appends
		// -----------------------------------------
		for (var i = 0; i <= 5; i++) {
			var list = $("<div>");
			list.text(triviaQuestions[currentQ].choices[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".choices").append(list);
		}

		//Calls Timer
		countdown();

		// USERCLICK
		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	// ==================
	// TIMER COUNTDOWN
	// ==================
	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		//Delay of 1 sec before timer goes off
		time = setInterval(countDownSho, 1000);
	}

	// ==================
	// SHOWS TIMER
	// ==================
	function countDownSho() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "red"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}
	// ====================================
	// DISPLAYS ANSWER DIV
	// ====================================
	function shoAnswer() {
		$("#Qs").hide();
		$("#Res").hide();
		$("#Ans").show();
		$(".thisChoice").empty();

		var rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];
		var rightAnswerIndex = triviaQuestions[currentQ].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);
		//GIF IMG
		var gifLink = triviaQuestions[currentQ].image;
		var Giffy = $("<img>");
		Giffy.attr("Src", gifLink);
		Giffy.addClass("gifImg");
		$("#gif").html(Giffy);
		// GIF TEXT
		var gifText = triviaQuestions[currentQ].answerText;
			newCap = $("<div>");
			newCap.html(gifText);
			newCap.addClass("gifCap");
			$("#gifText").html(newCap);


		// DISPLAYS AND COUNTS USER ANSWERS/ UnANSWERS
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//Last Answer Reveal Timer
		if (currentQ === (triviaQuestions.length-1)) {
			setTimeout(results, 10000);
		} else {
			currentQ++;
			setTimeout(questions, 10000);
		}

	}

	function results() {
		$("#Ans").hide();
		$("#Qs").hide();
		$("#Res").show();
		$("#resultText").html(text.done);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	
});