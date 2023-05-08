const questions = [
    {
        question: "¿Qué significa las siglas RIP?",
        answers: [
            { text: "Red de Información Protocol", correct: false},
            { text: "Protocolo IP de Enrutamiento", correct: false},
            { text: "Protocolo de Informacion de Enrutamiento", correct: true},
            { text: "Router de información Protocol", correct: false},
        ]
    },
    {
        question: "¿Para que funciona el DHCP versión 4?",
        answers: [
            { text: "Funciona para tener información detallada", correct: false},
            { text: "Funciona en un modo cliente-servidor", correct: true},
            { text: "Funciona para sacar la dirección IP", correct: false},
            { text: "Funciona para tener una mejor conexión con el cliente", correct: false},
        ]
    },
    {
        question: "La dirección IP 00001010.10010110.00001110.00010101 es representada en formato decimal como…",
        answers: [
            { text: "10.65.14.99", correct: false},
            { text: "10.22.128.64", correct: false},
            { text: "10.150.14.21", correct: true},
            { text: "10.190.15.251", correct: false},
        ]
    },
    {
        question: "¿Cuáles son los 2 elementos de un vector distancia?",
        answers: [
            { text: "La distancia y el Vector", correct: true},
            { text: "La dirección y el Vector", correct: false},
            { text: "La distancia y el Router", correct: false},
            { text: "La dirección y el Router", correct: false},
        ]
    },
    {
        question: "Se define como un procedimiento para realizar cierta tarea…",
        answers: [
            { text: "Algoritmos de los protocolos de enrutamiento", correct: true},
            { text: "Algoritmos de direccionamiento IP", correct: false},
            { text: "Los protocolos de enrutamientos", correct: false},
            { text: "Algoritmos de los vectores de distancia", correct: false},
        ]
    },
    {
        question: "¿Qué significa las siglas EIGRP?",
        answers: [
            { text: "Enrutamiento interior Gateway de Red Protocol", correct: false},
            { text: "Protocolo inferior de enrutamiento de Gateway mejorado", correct: false},
            { text: "Protocolo de enrutamiento de Gateway interior mejorado", correct: true},
            { text: "Protocolo de enrutamiento de Gateway inferior de red", correct: false},
        ]
    },
    {
        question: "Las direcciones IP de clase A ¿Cómo están divididas?",
        answers: [
            { text: "Con una parte de estructura y otra de Red", correct: false},
            { text: "Con una porción de Red y una porción de host", correct: true},
            { text: "Con una porción de clase A y otra de clase B", correct: false},
            { text: "Con una parte de UTP y una porción de host", correct: false},
        ]
    },
    {
        question: "¿Qué es un DHCP Relay?",
        answers: [
            { text: "Es un DHCP que va más lento", correct: false},
            { text: "Es un DCHP que se restribuye a redes remotas", correct: true},
            { text: "Es un protocolo del router", correct: false},
            { text: "Es un DHCP con las redes", correct: false},
        ]
    },
    {
        question: "¿Que significa DHCP?",
        answers: [
            { text: "Protocolo de configuración Dinamica de Host", correct: true},
            { text: "Dynamica Host de configuración de Puertos", correct: false},
            { text: "Puertos de host con direccionamiento", correct: false},
            { text: "Protocol Host de configuración dinámica", correct: false},
        ]
    },
    {
        question: "La dirección IP 192.168.50.33 es representada en binario como…",
        answers: [
            { text: "11000000.10101000.00111010.10100001", correct: false},
            { text: "11000000.10101000.00110010.00100001", correct: true},
            { text: "11000000.10101000.10110010.00100000", correct: false},
            { text: "11000000.10101000.00111010.00111101", correct: false},
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