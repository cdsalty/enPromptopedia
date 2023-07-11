import Prompt from '@models/prompt';
import { connectToDatabase } from '@utils/database';

export const POST = async (req, res) => {
  // first, grab the things that were passed in the post body(in the page)
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDatabase();
    const newPrompt = await Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save(); // Save the prompt to the database
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response('Failed to create a new prompt', {
      status: 500,
    });
  }
};
