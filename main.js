const questions = [
  {
    question:
      'Для решения какого уравнения нужно из уменьшаемого вычесть разность?',
    answers: ['154 − х = 99', 'х − 154 = 99', 'х + 99 = 154', '99 + х = 154'],
    correct: 1,
  },
  {
    question: 'Значение какого уравнения равно 0?',
    answers: [
      '25 : 5 ∙ 8 :4 : 10',
      '32 : 4 ∙ 6 − 9 ∙ 5',
      '7 ∙ 4 : 8 ∙ 0 ∙ 6',
      '6 ∙ 3 : 2 ∙ 5 − 40',
    ],
    correct: 3,
  },
  {
    question: 'Какое уравнение решается умножением?',
    answers: ['х ∙ 25 = 100', '25 ∙ х = 100', 'х : 25 = 100', '100 : х = 25'],
    correct: 3,
  },
  {
    question: 'Длина прямоугольника 12 см, а ширина 4 см. Найди его периметр.',
    answers: ['16 см', '48 см', '3 см', '32 см'],
    correct: 4,
  },
  {
    question:
      'В каком ряду правильно записано выражение и его значение? Сумму чисел 337 и 154 умножить на 2.',
    answers: [
      '337 + 154 · 2 = 645',
      '(337 + 154) · 2 = 982',
      '(337 − 154) · 2 = 336',
      '337 − 154 · 2 = 24',
    ],
    correct: 2,
  },
  {
    question:
      'Три ящика с яблоками весят 36 кг. Сколько весит один ящик с яблоками?',
    answers: [
      '36 ∙ 3 = 108 (кг)',
      '36 : 3 = 12 (кг)',
      '36 − 3 = 33 (кг)',
      '36 + 3 = 39 (кг)',
    ],
    correct: 2,
  },
  {
    question: 'В каком выражении знак поставлен неверно?',
    answers: [
      '1 кг > 965 г',
      '6 дм 4 см = 64 мм',
      '59 см < 6 дм',
      '25 ч > 1 сут.',
    ],
    correct: 2,
  },
  {
    question: 'Какая доля самая большая?',
    answers: ['одна пятая', 'одна десятая', 'одна восьмая', 'одна вторая'],
    correct: 4,
  },
  {
    question:
      'Одна пятая часть отрезка равна 10 см. Чему равна длина всего отрезка?',
    answers: ['2 см', '5 см', '15 см', '50 см'],
    correct: 4,
  },
  {
    question: 'В каком примере ответ 14?',
    answers: ['91 : 7', '84 : 6', '90 : 6', '96 : 4'],
    correct: 2,
  },
];

// DOM
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// variables
let score = 0;
let questionIndex = 0;

console.log(questions.length);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// functions
clearHtml();
showQuestions();

submitBtn.onclick = checkAnswer;

function clearHtml() {
  headerContainer.innerHTML = `<h2 class="title">Загружаем вопрос...</h2>`;
  listContainer.innerHTML = '';
}

function showQuestions() {
  console.log('showQuestions');
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const titleOfQuestion = headerTemplate.replace(
    '%title%',
    questions[questionIndex]['question']
  );
  headerContainer.innerHTML = titleOfQuestion;
  for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
    const questionTemplate = `
		<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>
		`;
    const answerHTML = questionTemplate
      .replace('%answer%', answerText)
      .replace('%number%', index + 1);
    listContainer.innerHTML += answerHTML;
  }
}

function checkAnswer(params) {
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );

  if (!checkedRadio) {
    submitBtn.blur();
    return alert('Вы должны выбрать один из вариантов ответа!');
  }
  const userAnswer = parseInt(checkedRadio.value);
  if (userAnswer === questions[questionIndex]['correct']) {
    score++;
  } else {
    showQuestions();
  }
  console.log(score);
  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearHtml();
    setTimeout(() => {
      showQuestions();
    }, 500);
    return;
  } else {
    clearHtml();
    showResults();
  }
}

function showResults(params) {
  const resultsTemplate = `
      <h2 class="title">%title%</h2>
      <h3 class="summary">%message%</h3>
      <p class="result">%result%</p>
  `;
  let title, message;
  if (score === questions.length) {
    title = 'Тест окончен.Поздравляем!!! ✨ ✨ ✨';
    message = 'Вы ответили верно на все вопросы! 👏👏👏';
  } else if ((score * 100) / questions.length >= 50) {
    title = 'Тест окончен.Неплохо!!! ✨ ✨ ';
    message = 'Вы дали более половины правильных ответов! 👏👏';
  } else {
    title = 'Тест окончен.Печально(((🥹 ';
    message = 'Вы дали менее половины правильных ответов.Попробуйте еще. 😮‍💨';
  }
  let result = `${score} из ${questions.length}`;
  const finalMessage = resultsTemplate
    .replace('%title%', title)
    .replace('%message%', message)
    .replace('%result%', result);
  headerContainer.innerHTML = finalMessage;

  submitBtn.blur();
  submitBtn.innerText = 'Начать заново!';
  submitBtn.onclick = function () {
    history.go();
    shuffle(questions);
  };
}
