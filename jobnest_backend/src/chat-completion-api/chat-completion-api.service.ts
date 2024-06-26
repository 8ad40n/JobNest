import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  GetChatCompletionAnswerInputDTO,
  GetChatCompletionAnswerOutputDTO,
} from './dto/chat-completion-answer.dto';
import { ChatHistoryManager } from './dto/chat-history-manager';

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;




// const OPENAI_API_KEY = "demo";

// const OPENAI_API_KEY = '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';

@Injectable()
export class ChatCompletionApiService {
  private readonly chatHistory: ChatHistoryManager;
  private readonly chat: ChatOpenAI;

  constructor() {
    this.chatHistory = new ChatHistoryManager();
    
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: OPENAI_API_KEY,
      modelName: DEFAULT_MODEL,
    });
  }

  async getAiModelAnswer(data: GetChatCompletionAnswerInputDTO) {
    this.chatHistory.addHumanMessage(data.message);
    const result = await this.chat.predictMessages(
      this.chatHistory.chatHistory,
    );

    const aiMessage = result.content;

    this.chatHistory.addAiMessage(aiMessage);

    return GetChatCompletionAnswerOutputDTO.getInstance(aiMessage);
  }
}
