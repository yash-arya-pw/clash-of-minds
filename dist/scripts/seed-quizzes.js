"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const faker_1 = require("@faker-js/faker");
const quiz_schema_1 = require("../src/quiz/schemas/quiz.schema");
const question_schema_1 = require("../src/quiz/schemas/question.schema");
const MONGODB_URI = 'mongodb+srv://sourabhsahu:pwsourabhsahu@cluster0.knc9rzd.mongodb.net/clash-of-mind?retryWrites=true&w=majority&appName=Cluster0';
async function seed() {
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const QuizModel = mongoose_1.default.model('Quiz', quiz_schema_1.QuizSchema);
    const QuestionModel = mongoose_1.default.model('Question', question_schema_1.QuestionSchema);
    const quizzesToCreate = 5;
    const questionsPerQuiz = 10;
    for (let i = 0; i < quizzesToCreate; i++) {
        const quiz = new QuizModel({
            title: faker_1.faker.lorem.words(4),
            description: faker_1.faker.lorem.sentence(),
            isPublished: true,
            questions: [],
        });
        const questionIds = [];
        for (let j = 0; j < questionsPerQuiz; j++) {
            const questionWord = faker_1.faker.word.noun();
            const options = [
                `What is the plural of "${questionWord}"?`,
                `What is the synonym of "${questionWord}"?`,
                `What is the antonym of "${questionWord}"?`,
                `What is the meaning of "${questionWord}"?`,
            ];
            const correctAnswerIndex = faker_1.faker.number.int({ min: 0, max: 3 });
            const question = new QuestionModel({
                text: faker_1.faker.lorem.sentence(),
                options,
                correctAnswerIndex,
                quiz: quiz._id,
            });
            await question.save();
            questionIds.push(question._id);
        }
        quiz.questions = questionIds;
        await quiz.save();
        console.log(`Created quiz: ${quiz.title} with ${questionsPerQuiz} questions`);
    }
    console.log('✅ Seeding complete');
    await mongoose_1.default.disconnect();
}
seed().catch((err) => {
    console.error(err);
    mongoose_1.default.disconnect();
});
//# sourceMappingURL=seed-quizzes.js.map