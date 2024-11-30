const questions = [
    {
        question: "Who is the Roman god of love?",
        answers: [
            { text: "Cupid", correct: true },
            { text: "Mars", correct: false },
            { text: "Venus", correct: false },
            { text: "Apollo", correct: false },
        ],
    },
    {
        question: "What is the traditional flower symbol of love?",
        answers: [
            { text: "Lily", correct: false },
            { text: "Tulip", correct: false },
            { text: "Rose", correct: true },
            { text: "Orchid", correct: false },
        ],
    },
    {
        question: "In Shakespeare's play, who is Juliet's lover?",
        answers: [
            { text: "Romeo", correct: true },
            { text: "Hamlet", correct: false },
            { text: "Othello", correct: false },
            { text: "Macbeth", correct: false },
        ],
    },
    {
        question: "Which day is widely celebrated as Valentine's Day?",
        answers: [
            { text: "February 12", correct: false },
            { text: "February 14", correct: true },
            { text: "March 14", correct: false },
            { text: "February 13", correct: false },
        ],
    },
    {
        question: "Which movie is known for the line 'You complete me'?",
        answers: [
            { text: "Titanic", correct: false },
            { text: "The Notebook", correct: false },
            { text: "Jerry Maguire", correct: true },
            { text: "Pride and Prejudice", correct: false },
        ],
    },
    {
        question: "Which monument is considered a symbol of eternal love?",
        answers: [
            { text: "The Eiffel Tower", correct: false },
            { text: "The Great Wall of China", correct: false },
            { text: "The Taj Mahal", correct: true },
            { text: "The Statue of Liberty", correct: false },
        ],
    },
    {
        question: "What chemical is often called the 'love hormone'?",
        answers: [
            { text: "Dopamine", correct: false },
            { text: "Oxytocin", correct: true },
            { text: "Serotonin", correct: false },
            { text: "Endorphin", correct: false },
        ],
    },
    {
        question: "Which Shakespearean couple said, 'Love is not love which alters when it alteration finds'?",
        answers: [
            { text: "Romeo and Juliet", correct: false },
            { text: "Benedick and Beatrice", correct: false },
            { text: "Written in Sonnet 116 (not a couple)", correct: true },
            { text: "Othello and Desdemona", correct: false },
        ],
    },
    {
        question: "What color is most associated with love?",
        answers: [
            { text: "Red", correct: true },
            { text: "Blue", correct: false },
            { text: "Pink", correct: false },
            { text: "White", correct: false },
        ],
    },
    {
        question: "What famous couple is known for their tragic love story in Indian folklore?",
        answers: [
            { text: "Heer and Ranjha", correct: false },
            { text: "Laila and Majnu", correct: false },
            { text: "Salim and Anarkali", correct: false },
            { text: "All of the above", correct: true },
        ],
    },
];

const questionEle = document.getElementById("questions");
const answerBtn = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");

let curr = 0;
let score = 0;

function startQuiz() {
    curr = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currQues = questions[curr];
    let questionNo = curr + 1;
    questionEle.innerHTML = questionNo + ". " + currQues.question;
    currQues.answers.forEach((it) => {
        const btn = document.createElement("button");
        btn.innerHTML = it.text;
        btn.classList.add("btn");
        answerBtn.appendChild(btn);
        if (it.correct) {
            btn.dataset.correct = true;
        }
        btn.addEventListener("click", selectAns);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAns(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    curr++;
    if (curr < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionEle.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Restart";
    nextBtn.style.display = "block";
    nextBtn.addEventListener("click", startQuiz);
}

startQuiz();
