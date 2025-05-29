"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAttemptService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const question_schema_1 = require("./schemas/question.schema");
const quiz_attempt_schema_1 = require("./schemas/quiz-attempt.schema");
const quiz_schema_1 = require("./schemas/quiz.schema");
let QuizAttemptService = class QuizAttemptService {
    constructor(attemptModel, quizModel, questionModel) {
        this.attemptModel = attemptModel;
        this.quizModel = quizModel;
        this.questionModel = questionModel;
    }
    async getQuestionsForQuiz(quizId) {
        const quiz = await this.quizModel
            .findById(quizId)
            .populate('questions')
            .lean();
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        return quiz.questions.map((q) => ({
            _id: q._id,
            text: q.text,
            options: q.options,
        }));
    }
    async submitAttempt(userId, quizId, dto) {
        const existing = await this.attemptModel.findOne({
            user: userId,
            quiz: quizId,
        });
        if (existing) {
            throw new common_1.BadRequestException('You have already submitted this quiz.');
        }
        const quiz = await this.quizModel
            .findById(quizId)
            .populate('questions')
            .lean();
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        let score = 0;
        const responseMap = dto.responses.reduce((acc, r) => {
            acc[r.question] = r.selectedAnswerIndex;
            return acc;
        }, {});
        const responses = quiz.questions.map((q) => {
            const qAny = q;
            const selected = responseMap[qAny._id.toString()];
            const isAnswered = selected !== undefined;
            const isCorrect = isAnswered && selected === qAny.correctAnswerIndex;
            if (isCorrect)
                score++;
            return {
                question: qAny._id,
                selectedAnswerIndex: isAnswered ? selected : -1,
                isCorrect,
            };
        });
        return this.attemptModel.create({
            user: userId,
            quiz: quizId,
            responses,
            score,
            isCompleted: true,
            completedAt: new Date(),
            startedAt: new Date(),
        });
    }
    async getUserQuizLogs(userId) {
        const attempts = await this.attemptModel
            .find({ user: userId })
            .populate({
            path: 'quiz',
            select: 'title questions',
            populate: {
                path: 'questions',
                select: 'text options correctAnswerIndex',
            },
        })
            .populate({
            path: 'responses.question',
            select: 'text options correctAnswerIndex',
        })
            .select('quiz score completedAt responses')
            .sort({ completedAt: -1 })
            .lean();
        return attempts.map((attempt) => {
            const quizQuestions = attempt.quiz.questions || [];
            const responseMap = {};
            (attempt.responses || []).forEach((resp) => {
                responseMap[resp.question._id.toString()] = resp;
            });
            const questions = quizQuestions.map((q) => {
                const resp = responseMap[q._id.toString()];
                return {
                    questionId: q._id,
                    text: q.text,
                    options: q.options,
                    correctAnswerIndex: q.correctAnswerIndex,
                    selectedAnswerIndex: resp ? resp.selectedAnswerIndex : -1,
                    isCorrect: resp ? resp.isCorrect : false,
                };
            });
            return {
                quizId: attempt.quiz._id,
                quizTitle: attempt.quiz.title,
                score: attempt.score,
                completedAt: attempt.completedAt,
                questions,
            };
        });
    }
    async getAttemptDetails(userId, quizId) {
        const attempt = await this.attemptModel
            .findOne({ user: userId, quiz: quizId })
            .populate({
            path: 'responses.question',
            select: 'text options correctAnswerIndex',
        })
            .lean();
        if (!attempt)
            throw new common_1.NotFoundException('No attempt found');
        return {
            quizId,
            score: attempt.score,
            responses: attempt.responses.map((r) => ({
                question: r.question.text,
                options: r.question.options,
                selectedAnswerIndex: r.selectedAnswerIndex,
                correctAnswerIndex: r.question.correctAnswerIndex,
                isCorrect: r.isCorrect,
            })),
        };
    }
};
exports.QuizAttemptService = QuizAttemptService;
exports.QuizAttemptService = QuizAttemptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quiz_attempt_schema_1.QuizAttempt.name)),
    __param(1, (0, mongoose_1.InjectModel)(quiz_schema_1.Quiz.name)),
    __param(2, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], QuizAttemptService);
//# sourceMappingURL=quiz-attempt.service.js.map