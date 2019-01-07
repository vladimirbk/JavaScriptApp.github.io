//https://api.myjson.com/bins/min54
const quizContainer = document.querySelector("#quiz");
const resultsContainer = document.querySelector("#results");
const newButton = document.querySelector("#new");
const submitButton = document.querySelector("#submit");
const shareButton = document.querySelector("#share");
const saveButton = document.querySelector("#save");
var alertWindow = document.querySelector(".alert-window");
var closeWindow = document.querySelectorAll(".close")[0];
var message = document.querySelector(".alert-window-text");
var listOfQuestions = [];

var initiateQuiz = function(){
    var jQuiz = new XMLHttpRequest();
    jQuiz.open("GET", "https://api.myjson.com/bins/min54");
    jQuiz.addEventListener("load", function(){
        var data = JSON.parse(jQuiz.responseText);
        
        listOfQuestions = data;
        resultsContainer.innerHTML = "";
        var output = [];
        quizContainer.innerHTML = '<img srs="images/loader.gif">';
        
        listOfQuestions.forEach((currentQuestion, questionNumber) => {
            var answers = [];
            
            for (letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input type="checkbox" name="question${questionNumber}" class="disableMe" value="${letter}">
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                 <div class="answers"> ${answers.join("")} </div>`
            );
            
        });
        
        quizContainer.innerHTML = output.join("");
    });
    jQuiz.send();
    $("html, body").animate({ scrollTop: 0}, "slow")
};

var getResults = function(){
    if (resultsContainer.innerHTML){
        return false;
    }
    
    var answerContainers = quizContainer.querySelectorAll(".answers");
    var numCorrect = 0;
    
    listOfQuestions.forEach((currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var checkedQues = [];
        
        $(`input[name=question${questionNumber}]:checked`).each(function(){
            checkedQues.push($(this).val());
        });
        
        checkedQues.sort();
        if(checkedQues.toString() === currentQuestion.correctAnswer.toString()){
            numCorrect++;
            answerContainer.style.color = "lightgreen";
        }else{
            answerContainer.style.color = "red";
        }
    });

};

var disableInputs = function(){
    $(".disableMe").prop("disabled", true);
};

var share = function() {
    if(!resultsContainer.innerHTML){
        return false;
    }
    
    var url = "https://twitter.com/intent/tweet";
    var text = $("#results").text();
    var via = "vladimirbk16";
    url=url + "?text=" + text + ";via=" + via;
    
    window.open(url, "Share your results on twitter", "width=450,heght=250");
};

initiateQuiz();
submitButton.addEventListener("click", getResults);
newButton.addEventListener("click", initiateQuiz);
shareButton.addEventListener("click", share);