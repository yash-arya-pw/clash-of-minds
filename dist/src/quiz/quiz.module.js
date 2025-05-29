"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const question_schema_1 = require("./schemas/question.schema");
const quiz_schema_1 = require("./schemas/quiz.schema");
const quiz_attempt_schema_1 = require("./schemas/quiz-attempt.schema");
const question_service_1 = require("./question.service");
const quiz_service_1 = require("./quiz.service");
const quiz_attempt_service_1 = require("./quiz-attempt.service");
const quiz_attempts_controller_1 = require("./quiz-attempts.controller");
const questions_controller_1 = require("./questions.controller");
const quizzes_controller_1 = require("./quizzes.controller");
let QuizModule = class QuizModule {
};
exports.QuizModule = QuizModule;
exports.QuizModule = QuizModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema },
                { name: quiz_schema_1.Quiz.name, schema: quiz_schema_1.QuizSchema },
                { name: quiz_attempt_schema_1.QuizAttempt.name, schema: quiz_attempt_schema_1.QuizAttemptSchema },
            ]),
        ],
        controllers: [questions_controller_1.QuestionsController, quizzes_controller_1.QuizzesController, quiz_attempts_controller_1.QuizAttemptsController],
        providers: [question_service_1.QuestionService, quiz_service_1.QuizService, quiz_attempt_service_1.QuizAttemptService],
        exports: [mongoose_1.MongooseModule, question_service_1.QuestionService, quiz_service_1.QuizService, quiz_attempt_service_1.QuizAttemptService],
    })
], QuizModule);
//# sourceMappingURL=quiz.module.js.map