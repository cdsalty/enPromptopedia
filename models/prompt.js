import { Schema, model, models } from 'mongoose';
// checked
const PromptSchema = new Schema({
  // the creator will be a document id in the database, a user type
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', // referencing the User model; this is a one to many relationship; One user will be able to create many prompts
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});
// get the prompt that already exist at models.Prompt or if it doesn't exist, create a new one based on the PromptSchema
const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;
