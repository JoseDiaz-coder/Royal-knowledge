
const questions =[
  {
    question: "¿?Cuál es el comando utilizado para Crear una tabla en MySQL",
    answers: [
      { text: "CREATE DATABASE", correct:false},
      { text: "CREATE QUE", correct:false},
      { text: "CREATE TABLE", correct:true},
      { text: "CREATE NEW TABLE", correct:false},
    ]
  },

  {
    question: "¿Cuál es el comando utilizado para eliminar una tabla en MySQL?",
    answers: [
      { text: "DELETE TABLE", correct:false},
      { text: "DROP DATABASE", correct:false},
      { text: "DROP TABLE", correct:true},
      { text: "DROP VIEW", correct:false},
    ]
  },

  {
    question: "¿Cuál es el operador utilizado para comparar dos valores en MySQL?",
    answers: [
      { text: "==", correct:false},
      { text: "=", correct:false},
      { text: "!=", correct:false},
      { text: "<>", correct:true},
    ]
  },
  {
    question: "¿Cual de los siguientes es un operador logico de MySQL?",
    answers: [
      { text: "OR", correct:true},
      { text: "&&", correct:false},
      { text: "!", correct:false},
      { text: "==", correct:false},
    ]
  },
];

console.log('${questions.length}');
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const endButton = document.getElementById("end-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Siguiente";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

   currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
     button.innerHTML = answer.text;
     button.classList.add("btn");
     answerButtons.appendChild(button);
     if(answer.correct){
       button.dataset.correct = answer.correct;
     }
     button.addEventListener("click", selectAnswer);
   });
}

function resetState(){
  nextButton.style.display = "none";
  endButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function endButtonFunc(){
  endButton.style.display = "block";
  showIndex();

}
function showIndex(){

}
function showScore(){
  resetState();
  questionElement.innerHTML = "Tu puntaje  " + score + " de " + questions.length;
  nextButton.innerHTML = "Intentar de nuevo";
  nextButton.style.display = "block";
  endButtonFunc();

}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
      handleNextButton();
  }else{
    startQuiz();
  }

});

startQuiz();
