import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { QuizSchema } from '../src/quiz/schemas/quiz.schema';
import { QuestionSchema } from '../src/quiz/schemas/question.schema';
const MONGODB_URI =
  'mongodb+srv://yasharya:clash-of-minds@cluster0.ruoznmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const QuizModel = mongoose.model('Quiz', QuizSchema);
  const QuestionModel = mongoose.model('Question', QuestionSchema);

  const quizzesToCreate = 5;
  const questionsPerQuiz = 10;

  for (let i = 0; i < quizzesToCreate; i++) {
    const quiz = new QuizModel({
      title: faker.lorem.words(4),
      description: faker.lorem.sentence(),
      isPublished: true,
      questions: [],
      //   createdBy: new mongoose.Types.ObjectId(), // or a real user id
    });

    const questionIds = [];

    for (let j = 0; j < questionsPerQuiz; j++) {
      // Generate a simple English question and options
      const questionWord = faker.word.noun();
      const options = [
        `What is the plural of "${questionWord}"?`,
        `What is the synonym of "${questionWord}"?`,
        `What is the antonym of "${questionWord}"?`,
        `What is the meaning of "${questionWord}"?`,
      ];
      const correctAnswerIndex = faker.number.int({ min: 0, max: 3 });

      const question = new QuestionModel({
        text: faker.lorem.sentence(),
        options,
        correctAnswerIndex,
        quiz: quiz._id,
      });

      await question.save();
      questionIds.push(question._id);
    }

    quiz.questions = questionIds;
    await quiz.save();
    console.log(
      `Created quiz: ${quiz.title} with ${questionsPerQuiz} questions`,
    );
  }

  console.log('✅ Seeding complete');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
