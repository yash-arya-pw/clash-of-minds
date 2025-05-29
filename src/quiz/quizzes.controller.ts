import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizService: QuizService) {}

  @ApiOperation({
    summary: 'Create a new quiz',
    description: 'Creates a new quiz with the provided details.',
  })
  @ApiBody({ type: CreateQuizDto })
  @ApiResponse({
    status: 201,
    description: 'Quiz created successfully.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        questions: {
          type: 'array',
          items: { type: 'string' },
        },
        difficulty: { type: 'string' },
        timeLimit: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
  })
  @Post()
  create(@Body() dto: CreateQuizDto) {
    return this.quizService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all quizzes',
    description: 'Retrieves a list of all available quizzes.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of quizzes retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          questions: {
            type: 'array',
            items: { type: 'string' },
          },
          difficulty: { type: 'string' },
          timeLimit: { type: 'number' },
        },
      },
    },
  })
  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @ApiOperation({
    summary: 'Get quiz by ID',
    description: 'Retrieves a specific quiz by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the quiz to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        questions: {
          type: 'array',
          items: { type: 'string' },
        },
        difficulty: { type: 'string' },
        timeLimit: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Quiz not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findById(id);
  }

  @ApiOperation({
    summary: 'Update quiz',
    description: 'Updates a specific quiz with the provided details.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the quiz to update',
  })
  @ApiBody({ type: UpdateQuizDto })
  @ApiResponse({
    status: 200,
    description: 'Quiz updated successfully.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        questions: {
          type: 'array',
          items: { type: 'string' },
        },
        difficulty: { type: 'string' },
        timeLimit: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Quiz not found.',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuizDto) {
    return this.quizService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete quiz',
    description: 'Deletes a specific quiz.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the quiz to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Quiz not found.',
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.quizService.delete(id);
  }
}
