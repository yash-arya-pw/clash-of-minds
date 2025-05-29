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
exports.QuizAttemptsController = void 0;
const common_1 = require("@nestjs/common");
const quiz_attempt_service_1 = require("./quiz-attempt.service");
const submit_quiz_attempt_dto_1 = require("./dto/submit-quiz-attempt.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let QuizAttemptsController = class QuizAttemptsController {
    constructor(quizAttemptService) {
        this.quizAttemptService = quizAttemptService;
    }
    async getQuestionsForQuiz(quizId) {
        return this.quizAttemptService.getQuestionsForQuiz(quizId);
    }
    async submitQuizAttempt(quizId, dto, req) {
        const userId = req.user._id;
        return this.quizAttemptService.submitAttempt(userId, quizId, dto);
    }
    async getUserQuizLogs(req) {
        const userId = req.user._id;
        return this.quizAttemptService.getUserQuizLogs(userId);
    }
    async getUserAttemptHistory(quizId, req) {
        const userId = req.user._id;
        return this.quizAttemptService.getAttemptDetails(userId, quizId);
    }
};
exports.QuizAttemptsController = QuizAttemptsController;
__decorate([
    (0, common_1.Get)(':quizId/questions'),
    __param(0, (0, common_1.Param)('quizId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizAttemptsController.prototype, "getQuestionsForQuiz", null);
__decorate([
    (0, common_1.Post)(':quizId/submit'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_quiz_attempt_dto_1.SubmitQuizAttemptDto, Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptsController.prototype, "submitQuizAttempt", null);
__decorate([
    (0, common_1.Get)('user/logs'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptsController.prototype, "getUserQuizLogs", null);
__decorate([
    (0, common_1.Get)(':quizId/history'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptsController.prototype, "getUserAttemptHistory", null);
exports.QuizAttemptsController = QuizAttemptsController = __decorate([
    (0, common_1.Controller)('quiz-attempts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [quiz_attempt_service_1.QuizAttemptService])
], QuizAttemptsController);
//# sourceMappingURL=quiz-attempts.controller.js.map