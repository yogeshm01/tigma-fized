/**
 * Mock Data for Smart Restart Learning Platform
 * Contains sample courses, leaderboard data, quiz questions, and recap cards
 */

// Available courses with detailed information
export const COURSES = [
    {
        id: 'python-basics',
        name: 'Python Programming Basics',
        description: 'Learn Python from scratch with hands-on exercises and real-world projects.',
        category: 'Programming',
        estimatedTime: '10 min/day',
        totalLessons: 20,
        xpAvailable: 2000,
        difficulty: 'Beginner',
        icon: '🐍',
        color: 'from-emerald-500 to-teal-600',
    },
    {
        id: 'web-dev',
        name: 'Web Development Fundamentals',
        description: 'Master HTML, CSS, and JavaScript to build stunning websites.',
        category: 'Web Development',
        estimatedTime: '15 min/day',
        totalLessons: 25,
        xpAvailable: 2500,
        difficulty: 'Beginner',
        icon: '🌐',
        color: 'from-blue-500 to-indigo-600',
    },
    {
        id: 'data-science',
        name: 'Data Science Essentials',
        description: 'Explore data analysis, visualization, and machine learning fundamentals.',
        category: 'Data Science',
        estimatedTime: '20 min/day',
        totalLessons: 30,
        xpAvailable: 3000,
        difficulty: 'Intermediate',
        icon: '📊',
        color: 'from-purple-500 to-pink-600',
    },
    {
        id: 'ui-design',
        name: 'UI/UX Design Principles',
        description: 'Create beautiful, user-friendly interfaces that people love.',
        category: 'Design',
        estimatedTime: '10 min/day',
        totalLessons: 18,
        xpAvailable: 1800,
        difficulty: 'Beginner',
        icon: '🎨',
        color: 'from-orange-500 to-red-600',
    },
];

// Mock leaderboard data
export const LEADERBOARD = [
    { id: 1, name: 'Alex Chen', xp: 12500, streak: 45, avatar: '👨‍💻' },
    { id: 2, name: 'Sarah Miller', xp: 11200, streak: 38, avatar: '👩‍🎓' },
    { id: 3, name: 'Raj Patel', xp: 10800, streak: 32, avatar: '🧑‍💼' },
    { id: 4, name: 'Emma Wilson', xp: 9500, streak: 28, avatar: '👩‍🔬' },
    { id: 5, name: 'James Kim', xp: 8900, streak: 25, avatar: '👨‍🎨' },
    { id: 6, name: 'Maria Garcia', xp: 8200, streak: 22, avatar: '👩‍💻' },
    { id: 7, name: 'David Brown', xp: 7500, streak: 18, avatar: '🧑‍🏫' },
    { id: 8, name: 'Lisa Johnson', xp: 6800, streak: 15, avatar: '👩‍🚀' },
];

// Recap cards for memory refresh (per course)
export const RECAP_CARDS = {
    'python-basics': [
        {
            id: 1,
            icon: '📝',
            keyword: 'Variables',
            shortExplanation: 'Containers for storing data values',
            fullExplanation: 'Variables in Python are like labeled containers that store data. You create them by assigning a value using the = operator. For example: name = "Alex" creates a variable called name that stores the text "Alex".',
            xp: 10,
        },
        {
            id: 2,
            icon: '🔢',
            keyword: 'Data Types',
            shortExplanation: 'Different kinds of data in Python',
            fullExplanation: 'Python has several built-in data types: strings (text), integers (whole numbers), floats (decimal numbers), booleans (True/False), lists (ordered collections), and dictionaries (key-value pairs).',
            xp: 10,
        },
        {
            id: 3,
            icon: '🔄',
            keyword: 'Loops',
            shortExplanation: 'Repeat actions multiple times',
            fullExplanation: 'Loops let you repeat code multiple times. "for" loops iterate over sequences (like lists), while "while" loops continue as long as a condition is true. They\'re powerful tools for automation!',
            xp: 10,
        },
        {
            id: 4,
            icon: '🎯',
            keyword: 'Functions',
            shortExplanation: 'Reusable blocks of code',
            fullExplanation: 'Functions are reusable pieces of code that perform specific tasks. Define them with "def", give them a name, and call them whenever needed. They help keep your code organized and DRY (Don\'t Repeat Yourself).',
            xp: 10,
        },
        {
            id: 5,
            icon: '⚡',
            keyword: 'Conditionals',
            shortExplanation: 'Make decisions in your code',
            fullExplanation: 'Conditionals (if/elif/else statements) let your program make decisions. They check if conditions are true or false and execute different code accordingly. This is how programs become "smart"!',
            xp: 10,
        },
        {
            id: 6,
            icon: '📦',
            keyword: 'Lists',
            shortExplanation: 'Ordered collections of items',
            fullExplanation: 'Lists are one of 4 built-in data types in Python used to store collections of data. Lists are created using square brackets: []. They are ordered, changeable, and allow duplicate values.',
            xp: 10,
        },
        {
            id: 7,
            icon: '📚',
            keyword: 'Dictionaries',
            shortExplanation: 'Key-value pairs',
            fullExplanation: 'Dictionaries are used to store data values in key:value pairs. A dictionary is a collection which is ordered, changeable and does not allow duplicates. Written with curly brackets: {}.',
            xp: 10,
        },
        {
            id: 8,
            icon: '⚠️',
            keyword: 'Error Handling',
            shortExplanation: 'Managing exceptions elegantly',
            fullExplanation: 'The try...except block lets you handle errors gracefully. Instead of crashing, your program can catch specific errors and execute alternative code, making your applications more robust.',
            xp: 10,
        },
    ],
    'web-dev': [
        {
            id: 1,
            icon: '📄',
            keyword: 'HTML Elements',
            shortExplanation: 'Building blocks of web pages',
            fullExplanation: 'HTML elements are the foundation of every web page. Tags like <div>, <p>, <h1>, and <img> define the structure and content of your site. Think of them as LEGO blocks for the web!',
            xp: 10,
        },
        {
            id: 2,
            icon: '🎨',
            keyword: 'CSS Selectors',
            shortExplanation: 'Target elements to style',
            fullExplanation: 'CSS selectors help you target specific HTML elements to apply styles. Use class selectors (.class), ID selectors (#id), or element selectors (div) to make your pages beautiful.',
            xp: 10,
        },
        {
            id: 3,
            icon: '📦',
            keyword: 'Box Model',
            shortExplanation: 'How elements take up space',
            fullExplanation: 'Every element is a box with content, padding, border, and margin. Understanding the box model is key to creating precise layouts and spacing in your designs.',
            xp: 10,
        },
        {
            id: 4,
            icon: '⚡',
            keyword: 'JavaScript Basics',
            shortExplanation: 'Add interactivity to pages',
            fullExplanation: 'JavaScript brings pages to life! Use it to respond to clicks, validate forms, update content dynamically, and create engaging user experiences.',
            xp: 10,
        },
        {
            id: 5,
            icon: '📱',
            keyword: 'Responsive Design',
            shortExplanation: 'Adapt to any screen size',
            fullExplanation: 'Responsive design ensures your website looks great on phones, tablets, and desktops. Use media queries, flexible grids, and relative units to create adaptive layouts.',
            xp: 10,
        },
    ],
};

// Quiz questions for confidence check (per course)
export const QUIZ_QUESTIONS = {
    'python-basics': [
        {
            id: 1,
            lessonId: 1, // Variables
            question: 'Which of these is a valid Python variable name?',
            options: ['2cool4school', 'my_variable', 'my-variable', 'my variable'],
            correctAnswer: 1,
            explanation: 'Variable names can contain letters, numbers, and underscores, but cannot start with a number or contain spaces or hyphens.',
        },
        {
            id: 2,
            lessonId: 2, // Data Types
            question: 'What is the type of: 3.14?',
            options: ['Integer', 'String', 'Float', 'Boolean'],
            correctAnswer: 2,
            explanation: '3.14 is a floating-point number (decimal), so its type is float.',
        },
        {
            id: 3,
            lessonId: 3, // Math
            question: 'What is the result of 10 % 3?',
            options: ['3', '1', '10', '0'],
            correctAnswer: 1,
            explanation: 'The modulo operator (%) returns the remainder of the division. 10 divided by 3 is 3 with a remainder of 1.',
        },
        {
            id: 4,
            lessonId: 6, // Conditionals
            question: 'Which keyword is used for "else if" in Python?',
            options: ['elseif', 'else if', 'elif', 'otherwise'],
            correctAnswer: 2,
            explanation: 'Python uses the keyword "elif" as a shorthand for "else if".',
        },
        {
            id: 5,
            lessonId: 8, // Lists
            question: 'How do you access the first element of a list named "fruits"?',
            options: ['fruits[1]', 'fruits(0)', 'fruits[0]', 'fruits.first()'],
            correctAnswer: 2,
            explanation: 'Python lists are zero-indexed, meaning the first element is at index 0. You access it using square brackets: fruits[0].',
        },
        {
            id: 6,
            lessonId: 9, // For Loops (Updated from original Q2)
            question: 'What does a "for" loop do?',
            options: [
                'Tests if a condition is true',
                'Defines a new function',
                'Iterates over a sequence',
                'Stores data in a variable',
            ],
            correctAnswer: 2,
            explanation: 'A "for" loop is used to iterate over a sequence (like a list or range) and execute code for each item.',
        },
        {
            id: 7,
            lessonId: 11, // Functions (Updated from original Q3)
            question: 'How do you define a function in Python?',
            options: ['function myFunc():', 'def myFunc():', 'create myFunc():', 'func myFunc():'],
            correctAnswer: 1,
            explanation: 'In Python, functions are defined using the "def" keyword followed by the function name and parentheses.',
        },
    ],
    'web-dev': [
        {
            id: 1,
            question: 'Which HTML tag is used for the largest heading?',
            options: ['<heading>', '<h6>', '<h1>', '<head>'],
            correctAnswer: 2,
            explanation: '<h1> is the largest heading tag. Headings go from <h1> (largest) to <h6> (smallest).',
        },
        {
            id: 2,
            question: 'How do you select an element with class "button" in CSS?',
            options: ['#button', '.button', 'button', '*button'],
            correctAnswer: 1,
            explanation: 'Class selectors in CSS use a dot (.) followed by the class name.',
        },
        {
            id: 3,
            question: 'Which CSS property controls text color?',
            options: ['text-color', 'font-color', 'color', 'foreground'],
            correctAnswer: 2,
            explanation: 'The "color" property in CSS is used to set the text color of an element.',
        },
    ],
};

// Sample lesson content
export const LESSON_CONTENT = {
    'python-basics': {
        title: 'Introduction to Variables',
        duration: '5 min',
        content: `
      Welcome to your first Python lesson! 🎉
      
      Today we'll learn about variables - one of the most fundamental concepts in programming.
      
      **What is a variable?**
      A variable is like a labeled box where you can store information. Think of it as a sticky note with a name on it, attached to a piece of data.
      
      **Creating your first variable:**
      \`\`\`python
      message = "Hello, World!"
      age = 25
      is_learning = True
      \`\`\`
      
      **Key points to remember:**
      • Variable names should be descriptive
      • Use lowercase letters and underscores
      • Cannot start with numbers
      • Python is case-sensitive
      
      Practice exercise: Try creating variables to store your name, age, and favorite color!
    `,
    },
    'web-dev': {
        title: 'Your First HTML Page',
        duration: '5 min',
        content: `
      Welcome to Web Development! 🌐
      
      Today we'll create your very first HTML page.
      
      **What is HTML?**
      HTML (HyperText Markup Language) is the skeleton of every website. It defines the structure and content of web pages.
      
      **Your first HTML code:**
      \`\`\`html
      <!DOCTYPE html>
      <html>
        <head>
          <title>My First Page</title>
        </head>
        <body>
          <h1>Hello, World!</h1>
          <p>This is my first website.</p>
        </body>
      </html>
      \`\`\`
      
      **Key elements:**
      • <html> - The root element
      • <head> - Meta information
      • <body> - Visible content
      • <h1> - Main heading
      • <p> - Paragraph
      
      Practice: Try adding more headings and paragraphs!
    `,
    },
};

// Available badges
export const BADGES = [
    {
        id: 'first-lesson',
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🌟',
        requirement: 1,
        type: 'lessons',
        color: 'from-yellow-400 to-orange-500',
    },
    {
        id: 'three-day-streak',
        name: 'On Fire',
        description: 'Maintain a 3-day learning streak',
        icon: '🔥',
        requirement: 3,
        type: 'streak',
        color: 'from-orange-500 to-red-600',
    },
    {
        id: 'week-streak',
        name: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        icon: '⚔️',
        requirement: 7,
        type: 'streak',
        color: 'from-purple-500 to-indigo-600',
    },
    {
        id: 'xp-champion',
        name: 'XP Champion',
        description: 'Earn 500 XP',
        icon: '🏆',
        requirement: 500,
        type: 'xp',
        color: 'from-emerald-500 to-teal-600',
    },
    {
        id: 'consistency-champion',
        name: 'Consistency Champion',
        description: 'Maintain a 14-day learning streak',
        icon: '👑',
        requirement: 14,
        type: 'streak',
        color: 'from-cyan-400 to-blue-600',
    },
    {
        id: 'quick-learner',
        name: 'Quick Learner',
        description: 'Complete 5 lessons',
        icon: '⚡',
        requirement: 5,
        type: 'lessons',
        color: 'from-pink-500 to-rose-600',
    },
];

// Goal options
export const GOAL_OPTIONS = [
    { id: 'job', label: 'Get a job', icon: '💼', description: 'Land your dream role' },
    { id: 'skill', label: 'Learn a new skill', icon: '🎯', description: 'Expand your abilities' },
    { id: 'exam', label: 'Exam preparation', icon: '📚', description: 'Ace your upcoming test' },
    { id: 'personal', label: 'Personal interest', icon: '💡', description: 'Feed your curiosity' },
];

// Time commitment options
export const TIME_OPTIONS = [
    { id: '5min', label: '5 min/day', description: 'Quick daily boost', icon: '⚡' },
    { id: '10min', label: '10 min/day', description: 'Steady progress', icon: '🚀' },
    { id: '20min', label: '20+ min/day', description: 'Deep learning', icon: '🎓' },
];

// Default add to use when generating recap cards for a course without specific ones
export const DEFAULT_RECAP_CARDS = [
    {
        id: 1,
        icon: '📘',
        keyword: 'Foundation',
        shortExplanation: 'Core concepts you\'ve learned',
        fullExplanation: 'These are the fundamental building blocks that everything else is built upon. Understanding these concepts deeply will help you progress faster.',
        xp: 10,
    },
    {
        id: 2,
        icon: '🔧',
        keyword: 'Tools',
        shortExplanation: 'Essential tools and techniques',
        fullExplanation: 'The tools and techniques you\'ve been practicing are industry-standard. Keep honing these skills as they\'ll serve you throughout your career.',
        xp: 10,
    },
    {
        id: 3,
        icon: '💡',
        keyword: 'Best Practices',
        shortExplanation: 'Professional approaches',
        fullExplanation: 'Following best practices helps you write clean, maintainable work that others can understand and build upon.',
        xp: 10,
    },
    {
        id: 4,
        icon: '🎯',
        keyword: 'Application',
        shortExplanation: 'Real-world usage',
        fullExplanation: 'Applying what you learn to real projects is the best way to solidify your knowledge and build your portfolio.',
        xp: 10,
    },
    {
        id: 5,
        icon: '🚀',
        keyword: 'Next Steps',
        shortExplanation: 'Where to go from here',
        fullExplanation: 'Once you master these concepts, you\'ll be ready to tackle more advanced topics and take on bigger challenges.',
        xp: 10,
    },
];

// Helper function to get recap cards for a course
export const getRecapCards = (courseId) => {
    return RECAP_CARDS[courseId] || DEFAULT_RECAP_CARDS;
};

// Helper function to get quiz questions for a course
export const getQuizQuestions = (courseId) => {
    return QUIZ_QUESTIONS[courseId] || QUIZ_QUESTIONS['python-basics'];
};

// Helper function to get lesson content for a course
export const getLessonContent = (courseId) => {
    return LESSON_CONTENT[courseId] || LESSON_CONTENT['python-basics'];
};

// Full list of lessons for each course
export const COURSE_LESSONS = {
    'python-basics': [
        { id: 1, title: 'Introduction to Variables', duration: '5 min' },
        { id: 2, title: 'Data Types: Strings & Integers', duration: '8 min' },
        { id: 3, title: 'Basic Math Operations', duration: '6 min' },
        { id: 4, title: 'Comments & Documentation', duration: '4 min' },
        { id: 5, title: 'Input & Output', duration: '7 min' },
        { id: 6, title: 'Conditional Statements', duration: '10 min' },
        { id: 7, title: 'Logical Operators', duration: '6 min' },
        { id: 8, title: 'Lists & Arrays', duration: '12 min' },
        { id: 9, title: 'For Loops', duration: '10 min' },
        { id: 10, title: 'While Loops', duration: '8 min' },
        { id: 11, title: 'Functions Basics', duration: '12 min' },
        { id: 12, title: 'Function Parameters', duration: '10 min' },
        { id: 13, title: 'Return Values', duration: '8 min' },
        { id: 14, title: 'Dictionaries', duration: '12 min' },
        { id: 15, title: 'Sets & Tuples', duration: '10 min' },
        { id: 16, title: 'Error Handling', duration: '10 min' },
        { id: 17, title: 'File Handling', duration: '15 min' },
        { id: 18, title: 'Modules & Imports', duration: '8 min' },
        { id: 19, title: 'Classes & Objects', duration: '15 min' },
        { id: 20, title: 'Final Project', duration: '30 min' },
    ],
    'web-dev': [
        { id: 1, title: 'HTML Basics', duration: '5 min' },
        { id: 2, title: 'Page Structure', duration: '8 min' },
        { id: 3, title: 'Text Formatting', duration: '6 min' },
        { id: 4, title: 'Lists & Tables', duration: '10 min' },
        { id: 5, title: 'Forms & Inputs', duration: '12 min' },
        { id: 6, title: 'CSS Introduction', duration: '8 min' },
        { id: 7, title: 'Colors & Backgrounds', duration: '8 min' },
        { id: 8, title: 'Box Model', duration: '12 min' },
        { id: 9, title: 'Flexbox Layout', duration: '15 min' },
        { id: 10, title: 'Grid Layout', duration: '15 min' },
    ]
};

// Helper to get full list of lessons
export const getCourseLessons = (courseId) => {
    return COURSE_LESSONS[courseId] || COURSE_LESSONS['python-basics'];
};
