let questions = [
    {
        "question": "Wer hat HTML erfunden",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Welche Wirksubstanzen beinhaltet Cannabis?",
        "answer_1": "THC",
        "answer_2": "CDB",
        "answer_3": "KTC",
        "answer_4": "Alle 3",
        "right_answer": 1
        //THC = Tetrahydrocannabinol ist der psychoaktive Wirkstoff in der weiblichen Cannabispflanze, der für den Rausch verantwortlich ist.
        //CBD = Cannabidiol hat keine psychoaktive Wirkung (kein Rausch). Man schreibt diesem Wirkstoff entzündungshemmende und angstlösende Eigenschaften zu.
    },
    {
        "question": "Es gibt 3 Varianten von Cannabis. Welche der 3 Formen ist am stärksten?",
        "answer_1": "Marihuana",
        "answer_2": "Haschisch ",
        "answer_3": "Haschischöl ",
        "answer_4": "Alle 3",
        "right_answer": 3 
        //- Haschischöl in der Regel zw. 15 und 20% variiert, teilweise jedoch bis zu 60 oder 70% 
        //- Haschisch ca. 12-18% in Ausnahmefällen bis 30% Wirkstoffgehalt 
        //- Marihuana ca. 8-12% in Ausnahmefällen bis 30% Wirkstoffgehalt
    }
];
let currentQuestion = 0;
let rightAnswers = 0;
let wrongAnswers = 0;


function startQuiz(){
    document.getElementById('starting-page').style = 'display:none;';
    document.getElementById('quiz-page').style = '';
    showQuestion()
    document.getElementById('questions-length').innerHTML = questions.length;
}

function showQuestion(){

    if(gameIsOver()) {
        updateProgressBar();
        showEndScreen();
    }else{
        updatToNextQuestion();
    }
}

function updateProgressBar(){
    let quizProgress = Math.round(currentQuestion / questions.length * 100);
        document.getElementById('progress-bar-questions').style.width = `${quizProgress}%`;
        document.getElementById('progress-bar-questions').innerHTML = `${quizProgress}%`;
}

function showEndScreen(){
    document.getElementById('quiz-page').innerHTML = /*html*/`
    <div id="end-screen">            
    <img src="assets/img/brain result.png" class="img-fluid rounded-start">
    <h3 class="header-text-endscreen rubik-bold">COMPLETE HTML QUIZ</h2>

    <div id="score-wrapper">
        <div class="score rubik-bold">YOUR SCORE  </div>
        <span class="rubik-bold">${rightAnswers}/${questions.length}</span>
    </div>
    <button class="btn btn-primary end-screen-btn rubik-regular" >SHARE</button>
    <button class="btn btn-primary end-screen-btn rubik-regular" onclick="window.location.reload(true)">REPLAY</button>
    </div>`;
}

function updatToNextQuestion(){
    let quizProgress = Math.round(currentQuestion / questions.length * 100);
        document.getElementById('progress-bar-questions').style.width = `${quizProgress}%`;
        document.getElementById('progress-bar-questions').innerHTML = `${quizProgress}%`;

        document.getElementById('actual-question').innerHTML = currentQuestion + 1;
        let question = questions[currentQuestion];

        document.getElementById('question').innerHTML = question["question"];
        document.getElementById('answer_1').innerHTML = question["answer_1"];
        document.getElementById('answer_2').innerHTML = question["answer_2"];
        document.getElementById('answer_3').innerHTML = question["answer_3"];
        document.getElementById('answer_4').innerHTML = question["answer_4"];
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}

function answer(selection){
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idRightAnswer = `answer_${question['right_answer']}`;

    if(rightAnswerSelected(selectedQuestionNumber, question)){
        document.getElementById(selection).parentNode.classList.add('md-bg-success');
        document.getElementById(selection).parentNode.querySelector('div').style.backgroundColor = 'rgb(0, 204, 0)';
        document.getElementById(selection).parentNode.querySelector('div').classList.add('text-white');          
        rightAnswers++;
        document.getElementById('next-button').disabled = false;
    }else{
        document.getElementById(idRightAnswer).parentNode.classList.add('md-bg-success');
        document.getElementById(selection).parentNode.classList.add('md-bg-danger');
        document.getElementById(selection).parentNode.querySelector('div').style.backgroundColor = 'rgb(255, 0, 0)';
        document.getElementById(selection).parentNode.querySelector('div').classList.add('text-white');
        wrongAnswers++;
        document.getElementById('next-button').disabled = false;  
    }
}

function rightAnswerSelected(selectedQuestionNumber, question){
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion(){    
    currentQuestion++;
    
    document.getElementById('next-button').disabled = true;
      

    const bgDanger = document.querySelectorAll('.md-bg-danger');
    bgDanger.forEach((element) => {
        element.classList.remove('md-bg-danger')
      });

    const bgSuccess = document.querySelectorAll('.md-bg-success');
    bgSuccess.forEach((element) => {
        element.classList.remove('md-bg-success');
      });
      
    const bgChoice = document.querySelectorAll('.choice');
    bgChoice.forEach((element) => {
        element.style.backgroundColor = '';
        element.style.color = '';
      });

    showQuestion();
}

function selectedQuiz(quizType){
    const activeQuiz = document.querySelectorAll('.active-quiz');
    activeQuiz.forEach((element) => {
        element.classList.remove('active-quiz');
      });

    quizType.classList.add('active-quiz');
}