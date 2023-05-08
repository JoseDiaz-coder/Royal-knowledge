const questions = [
    {
        question: "¿Que tipo de conexión tiene la capa 4 del modelo OSI?",
        answers: [
            { text: "Conexión punto a punto", correct: false},
            { text: "Conexión extremo a extremo", correct: true},
            { text: "Conexión de Transporte", correct: false},
            { text: "Conexión a internet", correct: false},
        ]
    },
    {
        question: "¿En cuantas capas se divide el modelo OSI?",
        answers: [
            { text: "Cuatro", correct: false},
            { text: "Cinco", correct: false},
            { text: "Seis", correct: false},
            { text: "Siete", correct: true},
        ]
    },
    {
        question: "¿Que capa del modelo OSI define los estandares de cables y conectores?",
        answers: [
            { text: "Capa 1", correct: true},
            { text: "Capa 2", correct: false},
            { text: "Capa 3", correct: false},
            { text: "Capa 4", correct: false},
        ]
    },
    {
        question: "¿Que nombre recibe la capa 4 del modelo OSI?",
        answers: [
            { text: "Red", correct: false},
            { text: "Enlace de datos", correct: false},
            { text: "Transporte", correct: true},
            { text: "Fisica", correct: false},
        ]
    },
    {
        question: "¿En cuantas capas se divide el modelo TCP/IP?",
        answers: [
            { text: "Cuatro", correct: true},
            { text: "Cinco", correct: false},
            { text: "Seis", correct: false},
            { text: "Siete", correct: false},
        ]
    },
    {
        question: "¿En que consiste el modelo TCP/IP?",
        answers: [
            { text: "En darle una funcion a los protocolos TCP y IP", correct: false},
            { text: "En establecer una IP", correct: false},
            { text: "En escoger el modelo OSI y quitarle capas", correct: true},
            { text: "En hacer un direccionamiento fisico", correct: false},
        ]
    },
    {
        question: "En el modelo OSI ¿Cual es la capa que verifica que todos los datos llegan bien?",
        answers: [
            { text: "Capa 1", correct: false},
            { text: "Capa 2", correct: true},
            { text: "Capa 4", correct: false},
            { text: "Capa 5", correct: false},
        ]
    },
    {
        question: "¿Cual es el nombre de la primera capa del modelo TCP/IP?",
        answers: [
            { text: "Transporte", correct: false},
            { text: "Aplicacion", correct: false},
            { text: "Internet", correct: false},
            { text: "Acceso a la Red", correct: true},
        ]
    },
    {
        question: "En el modelo TCP/IP ¿Que numero de capas es la de Aplicacion?",
        answers: [
            { text: "Capa 2", correct: false},
            { text: "Capa 3", correct: false},
            { text: "Capa 4", correct: false},
            { text: "Capa 7", correct: true},
        ]
    },
    {
        question: "¿En que capas del modelo OSI se engloba la primera capa del modelo TCP/IP?",
        answers: [
            { text: "Transporte y Sesion", correct: false},
            { text: "Enlace de datos y Fisica", correct: true},
            { text: "Transporte y Red", correct: false},
            { text: "Enlace de datos y Aplicacion", correct: false},
        ]
    }
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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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