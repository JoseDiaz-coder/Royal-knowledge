const questions =[
  {
    question: "Sintaxis de if en Java",
    answers: [
        { text: "if condición:", correct:false},
      { text: "if(condicion){}", correct:false},
        { text: "if(condicion):", correct:true},
      { text: "if{condicion}", correct:false},
    ]
  },

  {
    question: "¿Para que se utiliza un if?",
    answers: [
      { text: "Hacer comparaciones entre uno o mas valores", correct:true},
      { text: "Para ciclar", correct:false},
      { text: "Para mostrar informacion", correct:false},
      { text: "Capturar datos", correct:false},
    ]
  },

  {
    question: "¿Para que sirve la clase Scanner?",
    answers: [
      { text: "Ciclar un arreglo", correct:false},
      { text: "Leer dato de un fichero", correct:false},
      { text: "Capturar datos desde el teclado", correct:true},
      { text: "Mostrar datos", correct:false},
    ]
  },
];

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
