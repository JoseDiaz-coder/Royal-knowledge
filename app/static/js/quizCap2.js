const questions = [
    {
        question: "¿Qué abarca la WAN Redes de Área Ancha?",
        answers: [
            { text: "Es una red de conexión punto a punto", correct: false},
            { text: "Es una red que permite conexiones inalambrica", correct: false},
            { text: "Es una red que interconectan empresas a largas distancias", correct: true},
            { text: "Es una red de una area grande", correct: false},
        ]
    },
    {
        question: "¿Cuál es la red de área local inalámbrica?",
        answers: [
            { text: "VLANS", correct: false},
            { text: "Ethernet", correct: false},
            { text: "Wired LAN", correct: false},
            { text: "Wireless LAN", correct: true},
        ]
    },
    {
        question: "Tiene función similar al switch que permite la conexión a los dispositivos a la red…",
        answers: [
            { text: "Switch", correct: false},
            { text: "Access Point", correct: true},
            { text: "Modem", correct: false},
            { text: "Router", correct: false},
        ]
    },
    {
        question: "Cada puerto del Switch ¿Qué dominios tiene?",
        answers: [
            { text: "Un dominio de colisión y un gran dominio de broadcast", correct: true},
            { text: "Un dominio de colisión y un dominio de broadcast", correct: false},
            { text: "Un gran dominio de colisión y un gran dominio de broadcast", correct: false},
            { text: "Un gran dominio de colisión y un dominio de broadcast", correct: false},
        ]
    },
    {
        question: "¿Qué permiten hacer las VLANS?",
        answers: [
            { text: "Permite una funcion de Enlace de Datos", correct: false},
            { text: "Permite la conexión inalámbrica entre switches", correct: false},
            { text: "Interconectar Redes de larga distancia", correct: false},
            { text: "Separar el trafico de una red y tener los dispositivos en redes mas pequeñas", correct: true},
        ]
    },
    {
        question: "¿Cuál es la importancia de las VLANS?",
        answers: [
            { text: "El incremento del número de switches", correct: false},
            { text: "No usar tantos switches para cada red y ahorraríamos dinero", correct: true},
            { text: "Incrementar la complejidad de la red", correct: false},
            { text: "El hacer un direccionamiento fisico", correct: false},
        ]
    },
    {
        question: "¿Se puede separar el router con un switch en VLANS?",
        answers: [
            { text: "Si", correct: true},
            { text: "Si, con un cable especial", correct: false},
            { text: "No", correct: false},
            { text: "No, solo con switches separados", correct: false},
        ]
    },
    {
        question: "FastEthernet opera a una velocidad de…",
        answers: [
            { text: "10 Mbps", correct: false},
            { text: "100 Mbps", correct: true},
            { text: "1000 Mbps", correct: false},
            { text: "10000 Mbps", correct: false},
        ]
    },
    {
        question: "Ethernet esta definido en el estándar IEEE…",
        answers: [
            { text: "802.3ab", correct: false},
            { text: "802.3z", correct: false},
            { text: "802.3u", correct: false},
            { text: "802.3", correct: true},
        ]
    },
    {
        question: "¿Qué tipo de medio físico es necesario en una red 1000BASE-LX?",
        answers: [
            { text: "Cable coaxial", correct: false},
            { text: "Fibra Optica", correct: true},
            { text: "Cableado STP", correct: false},
            { text: "Cableado UTP", correct: false},
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