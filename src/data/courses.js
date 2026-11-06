// Course catalog. Each lesson has short content blocks and a quiz.
// Block types: { p }, { code }, { tip }.

export const SUBJECTS = [
  { id: 'school', name: 'School', desc: 'Maths, science, history', icon: 'book' },
  { id: 'languages', name: 'Languages', desc: 'English, Sinhala, Tamil, IELTS', icon: 'chat' },
  { id: 'technology', name: 'Technology', desc: 'Coding, data, AI, digital skills', icon: 'code' },
  { id: 'career', name: 'Career', desc: 'CVs, interviews, marketing', icon: 'briefcase' },
  { id: 'money', name: 'Money', desc: 'Budgeting, saving, taxes', icon: 'wallet' },
  { id: 'creative', name: 'Creative', desc: 'Design, photos, music', icon: 'pen' },
  { id: 'health', name: 'Health', desc: 'Fitness, food, first aid', icon: 'heart' },
  { id: 'life', name: 'Life skills', desc: 'Cooking, speaking, time', icon: 'home' },
  { id: 'trades', name: 'Trades', desc: 'Electrical, plumbing, wood', icon: 'tool' },
  { id: 'exam', name: 'Exam prep', desc: 'O/L, A/L, certifications', icon: 'check' },
];

const L = (id, title, minutes, body, quiz) => ({ id, title, minutes, body, quiz });
const Q = (q, options, answer, explain) => ({ q, options, answer, explain });

export const COURSES = [
  {
    id: 'python',
    title: 'Python for Beginners',
    subject: 'technology',
    level: 'Beginner',
    symbol: '</>',
    color: 'blue',
    summary: 'Write your first programs, learn how code thinks, and build a small quiz game. No experience needed.',
    outcomes: ['Variables, numbers and text', 'Making decisions with if / else', 'Repeating work with loops', 'Writing your own functions', 'Working with lists', 'Building a quiz game'],
    modules: [
      {
        title: 'Getting started',
        lessons: [
          L('py-1', 'What is programming?', 6, [
            { p: 'A program is a list of instructions a computer follows, one step at a time. Python is a popular language because its instructions read almost like English.' },
            { p: 'You will write code, run it, and see the result. Mistakes are normal: the computer tells you what went wrong so you can fix it.' },
          ], [
            Q('What is a program?', ['A list of instructions for a computer', 'A type of computer screen', 'A website address', 'A computer virus'], 0, 'A program is a set of step-by-step instructions.'),
            Q('Why is Python popular with beginners?', ['It only works on phones', 'Its code reads almost like English', 'It never has errors', 'It needs no computer'], 1, 'Python is known for clear, readable code.'),
          ]),
          L('py-2', 'Your first program', 8, [
            { p: 'The print() function shows text on the screen. Text goes inside quotes.' },
            { code: 'print("Hello, LearnAll!")' },
            { tip: 'Every opening bracket ( needs a closing bracket ). Missing one is the most common beginner error.' },
          ], [
            Q('What does print("Hi") do?', ['Prints on paper', 'Shows Hi on the screen', 'Deletes Hi', 'Nothing'], 1, 'print() displays output on the screen.'),
            Q('Which line is written correctly?', ['print(Hello)', 'print("Hello"', 'print("Hello")', 'print "Hello"'], 2, 'Text needs quotes and the brackets must be closed.'),
          ]),
          L('py-3', 'Variables', 10, [
            { p: 'A variable is a name that stores a value so you can use it later. Use = to store a value.' },
            { code: 'name = "Nimal"\nage = 16\nprint(name)\nprint(age)' },
            { tip: 'Variable names can’t have spaces. Use underscores instead: first_name.' },
          ], [
            Q('What does age = 16 do?', ['Compares age with 16', 'Stores 16 in a variable called age', 'Prints 16', 'Deletes age'], 1, 'A single = stores (assigns) a value.'),
            Q('Which is a valid variable name?', ['first name', 'first_name', '1stname', 'first-name'], 1, 'No spaces, no leading digits, no dashes.'),
          ]),
          L('py-4', 'Numbers and text', 9, [
            { p: 'Python can do maths with numbers: + - * /. Text (called a string) can be joined with +.' },
            { code: 'print(7 + 3)        # 10\nprint("Hi " + "there")  # Hi there' },
            { tip: 'You can’t add a number to text directly. Convert with str(): "Age: " + str(16).' },
          ], [
            Q('What does print(2 * 5) show?', ['25', '10', '7', '2*5'], 1, '* means multiply.'),
            Q('What does "Sri" + "Lanka" give?', ['Sri Lanka', 'SriLanka', 'An error', 'Sri+Lanka'], 1, '+ joins strings with no space added.'),
          ]),
        ],
      },
      {
        title: 'Making decisions',
        lessons: [
          L('py-5', 'True or false? Booleans', 7, [
            { p: 'A Boolean is a value that can only be True or False. Comparing two values gives you a Boolean.' },
            { code: 'age = 16\nprint(age >= 18)   # False\nprint(age == 16)   # True' },
            { tip: '= stores a value. == compares two values.' },
          ], [
            Q('What does print(5 > 3) show?', ['True', 'False', '5 > 3', 'An error'], 0, '5 is greater than 3, so the comparison is True.'),
            Q('Which symbol checks if two values are equal?', ['=', '==', '=>', '!='], 1, '== compares; = assigns.'),
            Q('What is the value of 10 < 2?', ['True', 'False', '8', '12'], 1, '10 is not less than 2.'),
          ]),
          L('py-6', 'if, elif and else', 11, [
            { p: 'Use if to run code only when something is True. elif checks another condition, and else runs when nothing matched.' },
            { code: 'marks = 72\nif marks >= 75:\n    print("A")\nelif marks >= 65:\n    print("B")\nelse:\n    print("Keep practising")' },
            { tip: 'The indented lines (4 spaces) belong to the if above them.' },
          ], [
            Q('With marks = 72, what does the example print?', ['A', 'B', 'Keep practising', 'Nothing'], 1, '72 is not ≥ 75 but is ≥ 65.'),
            Q('When does the else block run?', ['Always', 'When no condition above was True', 'Before the if', 'Never'], 1, 'else is the fallback.'),
          ]),
        ],
      },
      {
        title: 'Loops and lists',
        lessons: [
          L('py-7', 'Lists', 9, [
            { p: 'A list stores many values in order, inside square brackets.' },
            { code: 'fruits = ["mango", "banana", "papaya"]\nprint(fruits[0])   # mango\nprint(len(fruits)) # 3' },
            { tip: 'Counting starts at 0, so the first item is fruits[0].' },
          ], [
            Q('What is fruits[1] in the example?', ['mango', 'banana', 'papaya', 'An error'], 1, 'Index 1 is the second item.'),
            Q('What does len(fruits) return?', ['2', '3', '4', 'mango'], 1, 'len() counts the items.'),
          ]),
          L('py-8', 'for loops', 10, [
            { p: 'A for loop repeats code once for each item in a list.' },
            { code: 'for fruit in ["mango", "banana"]:\n    print("I like " + fruit)' },
          ], [
            Q('How many times does the example loop run?', ['1', '2', '3', 'Forever'], 1, 'Once per item; there are 2 items.'),
          ]),
          L('py-9', 'while loops', 8, [
            { p: 'A while loop repeats as long as a condition stays True.' },
            { code: 'count = 3\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("Go!")' },
            { tip: 'Make sure the condition eventually becomes False, or the loop never ends.' },
          ], [
            Q('What is printed last?', ['0', '1', 'Go!', '3'], 2, 'After the loop ends, "Go!" is printed.'),
          ]),
        ],
      },
      {
        title: 'Final project: quiz game',
        lessons: [
          L('py-10', 'Functions', 10, [
            { p: 'A function is a named block of code you can reuse. Define it with def.' },
            { code: 'def greet(name):\n    print("Welcome, " + name)\n\ngreet("Amaya")' },
          ], [
            Q('Which keyword creates a function?', ['func', 'def', 'make', 'function'], 1, 'def defines a function in Python.'),
          ]),
          L('py-11', 'Planning the game', 7, [
            { p: 'Our game asks questions stored in a list, checks the answer with if, and counts the score with a variable.' },
            { code: 'questions = [("2 + 2", "4"), ("Capital of Sri Lanka", "Sri Jayawardenepura Kotte")]\nscore = 0' },
          ], [
            Q('Which tool keeps track of the score?', ['A list', 'A variable', 'print()', 'A comment'], 1, 'A variable like score stores a changing number.'),
          ]),
          L('py-12', 'Building it', 14, [
            { p: 'Loop through the questions, use input() to get an answer, and add 1 to the score when it is right.' },
            { code: 'for q, a in questions:\n    reply = input(q + "? ")\n    if reply == a:\n        score = score + 1\nprint("Score:", score)' },
            { tip: 'Try adding more questions, or tell the player their percentage at the end.' },
          ], [
            Q('What does input() do?', ['Prints text', 'Reads what the user types', 'Ends the program', 'Makes a list'], 1, 'input() waits for the user to type and press Enter.'),
            Q('How does the score go up?', ['score = score + 1', 'score == 1', 'print(score)', 'score = 0'], 0, 'Add 1 to the current value and store it back.'),
          ]),
        ],
      },
    ],
  },
  {
    id: 'html-css',
    title: 'HTML & CSS Essentials',
    subject: 'technology',
    level: 'Beginner',
    symbol: '{ }',
    color: 'ink',
    summary: 'Build and style a simple personal web page from scratch.',
    outcomes: ['How web pages are structured', 'Headings, paragraphs and links', 'Styling with colours and fonts', 'Layout basics'],
    modules: [
      {
        title: 'HTML basics',
        lessons: [
          L('hc-1', 'How a web page works', 6, [{ p: 'Web pages are written in HTML. Tags like <h1> and <p> tell the browser what each piece of content is.' }, { code: '<h1>My page</h1>\n<p>Hello!</p>' }], [Q('What does HTML describe?', ['The structure of a page', 'Only colours', 'The internet speed', 'Images only'], 0, 'HTML gives content its structure.')]),
          L('hc-2', 'Links and images', 8, [{ p: 'Use <a href> for links and <img src> for pictures.' }, { code: '<a href="https://example.com">Visit</a>\n<img src="me.jpg" alt="A photo of me">' }, { tip: 'Always add alt text so screen readers can describe the image.' }], [Q('Which tag makes a link?', ['<link>', '<a>', '<img>', '<p>'], 1, '<a> stands for anchor (a link).')]),
        ],
      },
      {
        title: 'Styling with CSS',
        lessons: [
          L('hc-3', 'Colours and fonts', 9, [{ p: 'CSS changes how HTML looks.' }, { code: 'h1 { color: blue; font-family: sans-serif; }' }], [Q('What does CSS control?', ['Page structure', 'How the page looks', 'Server speed', 'Passwords'], 1, 'CSS is for presentation.')]),
          L('hc-4', 'Boxes and spacing', 8, [{ p: 'Every element is a box with padding (inside space), border, and margin (outside space).' }], [Q('Space inside the border is called…', ['margin', 'padding', 'gap', 'outline'], 1, 'Padding sits inside the border.')]),
          L('hc-5', 'Publish your page', 7, [{ p: 'Free services can host a simple HTML page so anyone can visit it.' }, { tip: 'Keep your files organised: index.html, style.css, images/.' }], [Q('Which file is usually the home page?', ['home.css', 'index.html', 'page.txt', 'main.jpg'], 1, 'Servers open index.html by default.')]),
        ],
      },
    ],
  },
  {
    id: 'everyday-english',
    title: 'Everyday English',
    subject: 'languages',
    level: 'All levels',
    symbol: 'Aa',
    color: 'yellow',
    summary: 'Speak with confidence in daily and work situations.',
    outcomes: ['Greetings and introductions', 'Asking for help politely', 'Talking about your day', 'Common workplace phrases'],
    modules: [
      {
        title: 'Getting by',
        lessons: [
          L('en-1', 'Introducing yourself', 6, [{ p: 'A simple introduction: your name, where you are from, and what you do.' }, { p: '“Hi, I’m Nimal. I’m from Kandy and I’m a student.”' }], [Q('Which is a natural introduction?', ['I Nimal am.', 'Hi, I’m Nimal.', 'Me Nimal.', 'Nimal I am called is.'], 1, 'Use “I’m” (I am) + name.')]),
          L('en-2', 'Asking politely', 7, [{ p: 'Start requests with “Could you…?” or “Would you mind…?” to sound polite.' }, { tip: '“Could you help me, please?” is polite in almost every situation.' }], [Q('Which request is most polite?', ['Give me that.', 'Could you pass that, please?', 'That. Now.', 'You give.'], 1, '“Could you… please?” is polite.')]),
          L('en-3', 'Talking about your day', 8, [{ p: 'Use the past simple for finished actions: I went, I ate, I studied.' }], [Q('Choose the correct sentence.', ['Yesterday I go to school.', 'Yesterday I went to school.', 'Yesterday I going school.', 'Yesterday I goes to school.'], 1, '“went” is the past of “go”.')]),
        ],
      },
      {
        title: 'At work',
        lessons: [
          L('en-4', 'Emails that sound professional', 9, [{ p: 'Open with “Dear…” or “Hello…”, state your reason in the first line, and close with “Kind regards”.' }], [Q('A good email closing is…', ['Bye!!', 'Kind regards', 'See ya', 'Whatever'], 1, '“Kind regards” is professional and friendly.')]),
          L('en-5', 'Phone calls', 7, [{ p: 'Say who you are and why you are calling: “Hello, this is Nimal from ABC. I’m calling about…”' }], [Q('What should you say first on a work call?', ['Your name and reason', 'Nothing', 'A joke', 'Goodbye'], 0, 'Introduce yourself and your purpose.')]),
        ],
      },
    ],
  },
  {
    id: 'ol-maths',
    title: 'O/L Maths Revision',
    subject: 'exam',
    level: 'Grade 10–11',
    symbol: 'x²',
    color: 'ink',
    summary: 'Key syllabus topics with worked examples and practice questions.',
    outcomes: ['Fractions and percentages', 'Algebra basics', 'Solving equations', 'Area and perimeter'],
    modules: [
      {
        title: 'Number',
        lessons: [
          L('om-1', 'Percentages', 8, [{ p: 'To find a percentage of a number, multiply by the percentage and divide by 100.' }, { p: '20% of 150 = 150 × 20 ÷ 100 = 30.' }], [Q('What is 10% of 250?', ['2.5', '25', '250', '10'], 1, '250 × 10 ÷ 100 = 25.'), Q('What is 50% of 90?', ['45', '40', '50', '9'], 0, 'Half of 90 is 45.')]),
          L('om-2', 'Fractions', 8, [{ p: 'To add fractions, make the bottom numbers (denominators) the same first.' }, { p: '1/2 + 1/4 = 2/4 + 1/4 = 3/4.' }], [Q('1/3 + 1/3 = ?', ['2/6', '2/3', '1/6', '1'], 1, 'Same denominator: add the tops.')]),
        ],
      },
      {
        title: 'Algebra',
        lessons: [
          L('om-3', 'Simplifying expressions', 9, [{ p: 'Collect like terms: 3x + 2x = 5x.' }], [Q('Simplify 4a + 3a − a', ['6a', '7a', '8a', '6'], 0, '4 + 3 − 1 = 6.')]),
          L('om-4', 'Solving equations', 10, [{ p: 'Do the same thing to both sides to get x on its own.' }, { p: '2x + 3 = 11 → 2x = 8 → x = 4.' }], [Q('Solve x + 7 = 12', ['5', '19', '7', '12'], 0, 'Subtract 7 from both sides.'), Q('Solve 3x = 21', ['18', '7', '24', '63'], 1, 'Divide both sides by 3.')]),
          L('om-5', 'Area and perimeter', 8, [{ p: 'Rectangle: area = length × width; perimeter = 2 × (length + width).' }], [Q('Area of a 5 cm × 3 cm rectangle?', ['8 cm²', '15 cm²', '16 cm²', '30 cm²'], 1, '5 × 3 = 15.')]),
        ],
      },
    ],
  },
  {
    id: 'budgeting',
    title: 'Budgeting Basics',
    subject: 'money',
    level: 'Beginner',
    symbol: 'Rs',
    color: 'blue',
    summary: 'Plan your money, save a little every month and avoid debt traps.',
    outcomes: ['Tracking income and spending', 'The 50/30/20 rule', 'Building an emergency fund', 'Understanding interest'],
    modules: [
      {
        title: 'Planning your money',
        lessons: [
          L('bu-1', 'Track where money goes', 6, [{ p: 'Write down every expense for one month. Most people are surprised by small daily costs.' }], [Q('First step in budgeting?', ['Borrow money', 'Track your spending', 'Buy shares', 'Ignore small costs'], 1, 'You can’t plan what you don’t measure.')]),
          L('bu-2', 'The 50/30/20 rule', 7, [{ p: 'A simple guide: 50% needs, 30% wants, 20% savings.' }], [Q('Under 50/30/20, how much goes to savings?', ['50%', '30%', '20%', '0%'], 2, '20% is set aside for savings.')]),
          L('bu-3', 'Emergency fund', 6, [{ p: 'Aim to save enough for 3 months of essential costs, kept somewhere easy to reach.' }], [Q('An emergency fund is for…', ['Holidays', 'Unexpected costs', 'New phones', 'Gifts'], 1, 'It protects you from surprises.')]),
          L('bu-4', 'Interest and loans', 8, [{ p: 'Interest is the cost of borrowing. Higher interest means you repay much more than you borrowed.' }, { tip: 'Compare the total amount you’ll repay, not just the monthly payment.' }], [Q('Which loan costs less overall?', ['Higher interest', 'Lower interest', 'They cost the same', 'Longer term always'], 1, 'Lower interest means less extra to repay.')]),
        ],
      },
    ],
  },
  {
    id: 'cv-skills',
    title: 'CV & Interview Skills',
    subject: 'career',
    level: 'All levels',
    symbol: 'CV',
    color: 'yellow',
    summary: 'Write a clear CV and prepare confidently for interviews.',
    outcomes: ['What to include in a CV', 'Writing strong bullet points', 'Common interview questions', 'Following up'],
    modules: [
      {
        title: 'Getting hired',
        lessons: [
          L('cv-1', 'What goes in a CV', 7, [{ p: 'Contact details, a short profile, education, experience, and skills. Keep it to one or two pages.' }], [Q('Ideal CV length for most people?', ['1–2 pages', '5 pages', 'Half a line', '10 pages'], 0, 'Short and focused is best.')]),
          L('cv-2', 'Strong bullet points', 8, [{ p: 'Start with an action verb and show a result: “Organised a school event for 200 students.”' }], [Q('Which bullet is strongest?', ['Was there for events', 'Organised a 200-person school event', 'Events', 'I like events'], 1, 'Action + result.')]),
          L('cv-3', 'Interview questions', 9, [{ p: 'Prepare for “Tell me about yourself”, “Why this role?” and “Describe a challenge you solved.”' }], [Q('Good preparation for interviews is…', ['Practising common questions', 'Arriving late', 'Not researching', 'Memorising jokes'], 0, 'Practice builds confidence.')]),
          L('cv-4', 'Following up', 5, [{ p: 'Send a short thank-you message within a day of the interview.' }], [Q('When should you send a thank-you?', ['Within a day', 'After a month', 'Never', 'Before applying'], 0, 'Prompt follow-ups leave a good impression.')]),
        ],
      },
    ],
  },
  {
    id: 'science',
    title: 'Science Foundations',
    subject: 'school',
    level: 'Grade 6–9',
    symbol: 'H₂O',
    color: 'blue',
    summary: 'Physics, chemistry and biology basics, clearly explained.',
    outcomes: ['States of matter', 'Forces and motion', 'Cells', 'The water cycle'],
    modules: [
      {
        title: 'The world around us',
        lessons: [
          L('sc-1', 'States of matter', 7, [{ p: 'Matter can be solid, liquid or gas. Heating usually turns solids into liquids and liquids into gases.' }], [Q('Ice melting is a change from…', ['gas to liquid', 'solid to liquid', 'liquid to gas', 'liquid to solid'], 1, 'Ice (solid) becomes water (liquid).')]),
          L('sc-2', 'Forces', 7, [{ p: 'A force is a push or a pull. Gravity pulls things towards the Earth.' }], [Q('Gravity is a…', ['push', 'pull', 'colour', 'sound'], 1, 'Gravity pulls objects together.')]),
          L('sc-3', 'Cells', 8, [{ p: 'All living things are made of cells. Plant cells have a cell wall; animal cells don’t.' }], [Q('Which has a cell wall?', ['Animal cells', 'Plant cells', 'Both', 'Neither'], 1, 'Plant cells have a rigid cell wall.')]),
          L('sc-4', 'The water cycle', 6, [{ p: 'Water evaporates, condenses into clouds, and falls as rain.' }], [Q('Clouds form by…', ['evaporation', 'condensation', 'melting', 'freezing'], 1, 'Water vapour condenses into droplets.')]),
        ],
      },
    ],
  },
];

export const PATHS = [
  { id: 'web', title: 'Become a web developer', level: 'Beginner', courses: ['python', 'html-css'], desc: 'Python, HTML and CSS — build and publish your first site.', color: 'blue', symbol: '</>' },
  { id: 'english', title: 'Speak English with confidence', level: 'All levels', courses: ['everyday-english', 'cv-skills'], desc: 'Daily speaking practice, emails and interviews.', color: 'yellow', symbol: 'Aa' },
  { id: 'ol', title: 'O/L Maths revision', level: 'Grade 10–11', courses: ['ol-maths', 'science'], desc: 'Every key topic with practice questions.', color: 'ink', symbol: 'x²' },
];

export function getCourse(id) {
  return COURSES.find((c) => c.id === id) || null;
}

export function allLessons(course) {
  return course.modules.flatMap((m) => m.lessons);
}

export function findLesson(course, lessonId) {
  const list = allLessons(course);
  const i = list.findIndex((l) => l.id === lessonId);
  if (i === -1) return null;
  const moduleIndex = course.modules.findIndex((m) => m.lessons.some((l) => l.id === lessonId));
  return { lesson: list[i], index: i, prev: list[i - 1] || null, next: list[i + 1] || null, moduleIndex, total: list.length };
}

export function courseMinutes(course) {
  return allLessons(course).reduce((a, l) => a + l.minutes, 0);
}

export function subjectName(id) {
  const s = SUBJECTS.find((x) => x.id === id);
  return s ? s.name : id;
}
