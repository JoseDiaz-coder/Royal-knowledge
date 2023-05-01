const questions =[
  {
    question: "¿Que significan las siglas JDK?",
    answers: [
      { text: "Java virtual Machine", correct:false},
      { text: "Java Disaster KEY", correct:false},
      { text: "Java Developer Kit", correct:true},
      { text: "José dice Kevin", correct:false},
    ]
  },

  {
    question: "¿Que es una variable?",
    answers: [
      { text: "Una comida mexicana", correct:false},
      { text: "Donde se almacenan datos de un programa", correct:true},
      { text: "Donde guardo mis cosas personales", correct:false},
      { text: "Donde se almacenan dulces", correct:false},
    ]
  },

  {
    question: "¿Cuales son los tipos de datos en Java?",
    answers: [
      { text: "byte, short, int, long, float, double, boolean, char", correct:true},
      { text: "byte, short, int, long, float, double, string, binario", correct:false},
      { text: "pequeño, grande, mega grande, false, true", correct:false},
      { text: "Jelly, beans, byte, short, long", correct:false},
    ]
  },
];

console.log('${questions.length}');
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


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

function showScore(){
  resetState();
  questionElement.innerHTML = "Tu puntaje  " + score;
  nextButton.innerHTML = "Intentar de nuevo";
  nextButton.style.display = "block";
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
