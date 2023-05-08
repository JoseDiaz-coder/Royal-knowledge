const questions = [
    {
        question: "En una red de área local LAN ¿Se puede tener acceso a internet?",
        answers: [
            { text: "Si", correct: true},
            { text: "Si, con un cable especial", correct: false},
            { text: "No", correct: false},
            { text: "No, solo con una IP", correct: false},
        ]
    },
    {
        question: "¿Cuáles son los 2 tipos de redes WAN que existen?",
        answers: [
            { text: "Internet WAN y Area WAN", correct: false},
            { text: "Lesed- WAN y Ethernet WAN", correct: false},
            { text: "Ethernet WAN y Protocolo WAN", correct: false},
            { text: "Leased-WAN y Ethernet WAN", correct: true},
        ]
    },
    {
        question: "¿Qué significan las siglas DNS?",
        answers: [
            { text: "Dominio Name System", correct: false},
            { text: "Domain None Syms", correct: false},
            { text: "Domain Name System", correct: true},
            { text: "Dominio None Syms", correct: false},
        ]
    },
    {
        question: "En una LAN ¿Qué dispositivo necesito si tengo más de 4 computadoras que quiero conectar?",
        answers: [
            { text: "Router", correct: false},
            { text: "Switch", correct: true},
            { text: "VLAN", correct: false},
            { text: "Consola", correct: false},
        ]
    },
    {
        question: "¿De qué está compuesto un circuito virtual?",
        answers: [
            { text: "SVV y PVC ", correct: false},
            { text: "SVC y PVC", correct: true},
            { text: "SVC y VCI", correct: false},
            { text: "VCC y PVC", correct: false},
        ]
    },
    {
        question: "¿Qué es el Frame Relay?",
        answers: [
            { text: "Es el que proporciona condiciones entre usuarios a través de una red pública o privada", correct: true},
            { text: "Es un dispositivo que solo tiene conexion a una red local", correct: false},
            { text: "Es un protocolo de enrutamiento de redes remotas", correct: false},
            { text: "Es una estructura de la configuracion de puertos", correct: false},
        ]
    },
    {
        question: "Point to Point Link se refiere a… ",
        answers: [
            { text: "Que es de un puerto a un puerto", correct: false},
            { text: "Que es de un Router a un Switch", correct: false},
            { text: "Que es de un punto a un punto", correct: true},
            { text: "Que es de un dispositivo a un dispositivo", correct: false},
        ]
    },
    {
        question: "En una LAN ¿Qué dispositivo necesito si tengo menos de 4 computadoras que quiero conectar?",
        answers: [
            { text: "Router ", correct: true},
            { text: "Switch", correct: false},
            { text: "VLAN", correct: false},
            { text: "Consola", correct: false},
        ]
    },
    {
        question: "¿Qué significa las siglas ARP?",
        answers: [
            { text: "Area Resolution Protocol", correct: false},
            { text: "Address Red Protocol", correct: false},
            { text: "Area Red Protocol", correct: false},
            { text: "Address Resolution Protocol", correct: true},
        ]
    },
    {
        question: "¿Qué se nos recomienda hacer si el cable de red se excede los 100 metros?",
        answers: [
            { text: "Crear unas VLANs para más alcance", correct: false},
            { text: "Poner una red Wireless", correct: false},
            { text: "Comprar mas cable", correct: false},
            { text: "Colocar un switch en medio de la conexión", correct: true},
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