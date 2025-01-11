const OpenAI = require('openai');
const dotenv = require('dotenv'); 
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to send text to the LLM and parse tasks
const parseAssignments = async (text) => {
  try {
    const prompt = `
    You are an AI assistant that extracts tasks or general to-do's from a syllabus. 
    Identify tasks with:
    - Task name (e.g., Homework, Exam)
    - start date (if available)
    - Deadline (if available)
    - Estimated weekly time commitment (hours)
    
    If no clear assignments are found, look for key topics or objectives of the syllabus and return them in a similar format.
    
    Input:
    ${text}
    
    Respond with a JSON array of tasks in the format:
    [{ "name": "Task Name", "start": "YYYY-MM-DD", "deadline": "YYYY-MM-DD", "duration": 2 }]
    If no assignments or tasks are found, but topics or learning objectives exist, list them as \`"topic": "Topic Name"\`.
    If no relevant information is found, return an empty array: []
    If any field is missing data, if its a date return '2099-12-31' and if its weekly hours just return 3.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4', 
      messages: [
        { role: 'system', content: prompt },
      ],
    });


   

    const result = response.choices[0].message.content;
    return JSON.parse(result); // Parse the LLM's output into JSON
  } catch (error) {
    console.error('Error parsing assignments:', error);
    throw error; // Rethrow error for debugging
  }
};

module.exports = { parseAssignments };
