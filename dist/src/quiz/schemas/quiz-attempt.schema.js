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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAttemptSchema = exports.QuizAttempt = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let QuizAttempt = class QuizAttempt {
};
exports.QuizAttempt = QuizAttempt;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], QuizAttempt.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Quiz', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], QuizAttempt.prototype, "quiz", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                question: { type: mongoose_2.Types.ObjectId, ref: 'Question', required: true },
                selectedAnswerIndex: { type: Number, required: true },
                isCorrect: { type: Boolean, default: false },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], QuizAttempt.prototype, "responses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], QuizAttempt.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], QuizAttempt.prototype, "isCompleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], QuizAttempt.prototype, "startedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], QuizAttempt.prototype, "completedAt", void 0);
exports.QuizAttempt = QuizAttempt = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], QuizAttempt);
exports.QuizAttemptSchema = mongoose_1.SchemaFactory.createForClass(QuizAttempt);
//# sourceMappingURL=quiz-attempt.schema.js.map