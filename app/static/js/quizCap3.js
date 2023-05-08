const questions = [
    {
        question: "¿Que es un enlace Ethernet?",
        answers: [
            { text: "Un enlace de datos directo", correct: false},
            { text: "Cualquier cable físico utilizado para conectar 2 nodos entre si", correct: true},
            { text: "Es un protocolo de conexiones", correct: false},
            { text: "Es un enlace serial del Switch", correct: false},
        ]
    },
    {
        question: "¿Qué tipo de cable UTP utilizo cuando tienen el mismo número de pin para enviar datos?",
        answers: [
            { text: "Cable cruzado", correct: true},
            { text: "Cable directo", correct: false},
            { text: "Fibra óptica", correct: false},
            { text: "Cable coaxial", correct: false},
        ]
    },
    {
        question: "¿Cuántos pines tiene un conector RJ45?",
        answers: [
            { text: "4 pines", correct: false},
            { text: "6 pines", correct: false},
            { text: "7 pines", correct: false},
            { text: "8 pines", correct: true},
        ]
    },
    {
        question: "¿Cuáles son las 2 normas para los cables?",
        answers: [
            { text: "TIA/EIA 568A y 568B", correct: false},
            { text: "EIA/TIA 586A y 568B", correct: false},
            { text: "EIA/TIA 568A y 568B", correct: true},
            { text: "TIA/EIA 568A y 586B", correct: false},
        ]
    },
    {
        question: "¿Qué es lo importante en los cables directos?",
        answers: [
            { text: "Uso de la misma norma en ambos extremos", correct: true},
            { text: "Tener diferentes extremos con la misma norma", correct: false},
            { text: "Tener diferente norma en ambos extremos", correct: false},
            { text: "Siempre usar la norma 560A", correct: false},
        ]
    },
    {
        question: "¿Que es un nodo?",
        answers: [
            { text: "Es un cable que se utiliza para conectar un dispositivo", correct: false},
            { text: "Es un dispositivo switch", correct: false},
            { text: "Un protocolo de direccionamiento", correct: false},
            { text: "Es un dispositivo conectado en una red", correct: true},
        ]
    },
    {
        question: "¿Qué es el protocolo de la capa de enlace de datos?",
        answers: [
            { text: "Es el enlace que opera correctamente en un protocolo", correct: false},
            { text: "La que proporciona un medio para intercambiar datos entre la capa de red y la capa física", correct: true},
            { text: "Es un proceso ejecutado en la capa 1 del modelo OSI", correct: false},
            { text: "Es el protocolo que se utiliza para generar direcciones IP", correct: false},
        ]
    },
    {
        question: "¿Qué contiene la trama de enlace de datos?",
        answers: [
            { text: "Trama Enlaces y Datos", correct: false},
            { text: "PDU, Protocolo y Trailer", correct: false},
            { text: "Protocolos, Datos y Encabezado", correct: false},
            { text: "Datos, Encabezado y Trailer", correct: true},
        ]
    },
    {
        question: "¿Qué es un PDU?",
        answers: [
            { text: "Un tipo de protocolo para mandar datos", correct: false},
            { text: "Un dispositivo en una red", correct: false},
            { text: "Una capa de enlace de datos en una trama", correct: true},
            { text: "Es un tipo de enlace de datos en una red", correct: false},
        ]
    },
    {
        question: "¿Qué tipo de cable UTP utilizo cuando el número de pines son distintos para enviar datos?",
        answers: [
            { text: "Cable cruzado", correct: false},
            { text: "Fibra óptica", correct: false},
            { text: "Cable directo", correct: true},
            { text: "Cable coaxial", correct: false},
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