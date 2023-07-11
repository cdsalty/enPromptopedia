import Prompt from '@models/prompt';
import { connectToDatabase } from '@utils/database';

export const GET = async (req, { params }) => {
  console.log('params', params);
  // params coming from dynamic route
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({
      // to only get the post from the user/Creator
      creator: params.id,
    }).populate('creator');
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    // console.error(error);
    return new Response('failed to fetch all prompts', {
      status: 500,
    });
  }
};

// If you pass dynamic parameters to your route, you can access them through params.
