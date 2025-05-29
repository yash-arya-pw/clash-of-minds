import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({
    summary: 'Create a new question',
    description: 'Creates a new quiz question with the provided details.',
  })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        text: { type: 'string' },
        options: {
          type: 'array',
          items: { type: 'string' },
        },
        correctAnswerIndex: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
  })
  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all questions',
    description: 'Retrieves a list of all available quiz questions.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of questions retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          text: { type: 'string' },
          options: {
            type: 'array',
            items: { type: 'string' },
          },
          correctAnswerIndex: { type: 'number' },
        },
      },
    },
  })
  @Get('')
  findAll() {
    return this.questionService.findAll();
  }

  @ApiOperation({
    summary: 'Get question by ID',
    description: 'Retrieves a specific quiz question by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Question retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        text: { type: 'string' },
        options: {
          type: 'array',
          items: { type: 'string' },
        },
        correctAnswerIndex: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Question not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findById(id);
  }

  @ApiOperation({
    summary: 'Update question',
    description: 'Updates a specific quiz question with the provided details.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question to update',
  })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully.',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        text: { type: 'string' },
        options: {
          type: 'array',
          items: { type: 'string' },
        },
        correctAnswerIndex: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Question not found.',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete question',
    description: 'Deletes a specific quiz question.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the question to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Question deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Question not found.',
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
