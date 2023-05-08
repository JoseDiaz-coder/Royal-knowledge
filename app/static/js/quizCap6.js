const questions = [
    {
        question: "¿Qué protocolo se le conoce como no orientado a la conexión y no confiable?",
        answers: [
            { text: "TCP", correct: false},
            { text: "UDP", correct: true},
            { text: "HTTP", correct: false},
            { text: "FTP", correct: false},
        ]
    },
    {
        question: "Es un modelo que permite la comunicación entre dos aplicaciones distintas… ",
        answers: [
            { text: "Point to Point", correct: false},
            { text: "DHCP", correct: false},
            { text: "Enlace de datos", correct: false},
            { text: "Cliente-servidor", correct: true},
        ]
    },
    {
        question: "¿Qué protocolo es más fiable en cuanto a entrega de extremo a extremo?",
        answers: [
            { text: "TCP", correct: true},
            { text: "UDP", correct: false},
            { text: "IP", correct: false},
            { text: "SSH", correct: false},
        ]
    },
    {
        question: "¿Cuál protocolo es más lento?",
        answers: [
            { text: "UDP", correct: false},
            { text: "HTTP", correct: false},
            { text: "TCP", correct: true},
            { text: "UTP", correct: false},
        ]
    },
    {
        question: "¿Cuál de las siguientes funciones es ejecutada por los protocolos TCP y UDP?",
        answers: [
            { text: "Multiplexacion y utilización de puertos", correct: true},
            { text: "Entrega fiable", correct: false},
            { text: "Recuperación de errores", correct: false},
            { text: "Ninguna de las anteriores", correct: false},
        ]
    },
    {
        question: "¿Qué es un servidor?",
        answers: [
            { text: "Es el encargado de identificar al origen de la conexión", correct: false},
            { text: "Un dominio de colision de sus puertos", correct: false},
            { text: "Una o varias computadoras en espera de peticiones", correct: true},
            { text: "Un dispositivo que solo usan las empresas", correct: false},
        ]
    },
    {
        question: "¿Qué protocolo es más rápido y es usado en las video-conferencias?",
        answers: [
            { text: "TCP", correct: false},
            { text: "UDP", correct: true},
            { text: "HTTP", correct: false},
            { text: "UTP", correct: false},
        ]
    },
    {
        question: "¿Cuál es un dispositivo que realiza peticiones de recursos a un servidor?",
        answers: [
            { text: "El Hub", correct: false},
            { text: "El Router", correct: false},
            { text: "El Switch", correct: false},
            { text: "El Cliente", correct: true},
        ]
    },
    {
        question: "¿Por qué el protocolo UDP no es confiable?",
        answers: [
            { text: "No comunica la selección de rutas", correct: false},
            { text: "No envía la misma IP en la red", correct: false},
            { text: "Nunca es eficiente en el segmento de la red", correct: false},
            { text: "No realiza la función de recuperación de errores", correct: true},
        ]
    },
    {
        question: "¿Cuál es el protocolo más usado para la comunicación del modelo cliente-servidor?",
        answers: [
            { text: "UDP", correct: false},
            { text: "HTTP", correct: true},
            { text: "TCP", correct: false},
            { text: "HTTPS", correct: false},
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