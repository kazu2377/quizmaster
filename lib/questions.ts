export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2
  },
  {
    id: 4,
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3
  },
  {
    id: 5,
    text: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Copper", "Aluminum"],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: 2
  },
  {
    id: 7,
    text: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1
  },
  {
    id: 8,
    text: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1
  },
  {
    id: 9,
    text: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2
  },
  {
    id: 10,
    text: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2
  },
  {
    id: 11,
    text: "Which country is home to the Great Barrier Reef?",
    options: ["Brazil", "Indonesia", "Thailand", "Australia"],
    correctAnswer: 3
  },
  {
    id: 12,
    text: "Who invented the telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Albert Einstein"],
    correctAnswer: 0
  },
  {
    id: 13,
    text: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: 2
  },
  {
    id: 14,
    text: "Which planet is closest to the Sun?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    correctAnswer: 2
  },
  {
    id: 15,
    text: "What is the capital of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: 2
  },
  {
    id: 16,
    text: "Who painted 'The Starry Night'?",
    options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dalí"],
    correctAnswer: 1
  },
  {
    id: 17,
    text: "What is the main component of the Sun?",
    options: ["Oxygen", "Carbon", "Helium", "Hydrogen"],
    correctAnswer: 3
  },
  {
    id: 18,
    text: "Which is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correctAnswer: 1
  },
  {
    id: 19,
    text: "What is the capital of South Korea?",
    options: ["Seoul", "Busan", "Incheon", "Daegu"],
    correctAnswer: 0
  },
  {
    id: 20,
    text: "Who wrote '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
    correctAnswer: 0
  }
];