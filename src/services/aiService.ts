import { GoogleGenerativeAI } from '@google/generative-ai';

class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async compareCases(case1: string, case2: string): Promise<{ differences: string; result: string }> {
    const prompt = `Compare these two cases:
    Case 1: ${case1}
    Case 2: ${case2}
    
    Format your response exactly like this:
    Main differences:
    [list the key differences]

    Result:
    [provide a clear conclusion]`;

    const result = await this.model.generateContent(prompt);
    const response = result.response.text();
    
    const [differences, result_text] = response.split('Result:');
    
    return {
      differences: differences.replace('Main differences:', '').trim(),
      result: result_text.trim()
    };
  }

  async continueChat(context: string, message: string): Promise<string> {
    const prompt = `Context: ${context}\n\nUser message: ${message}\n\nProvide a helpful analysis based on the context.`;
    
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}

export const aiService = new AIService(); 