import { Schema, model, models } from 'mongoose';
// checked
const UserSchema = new Schema({
  // we pass in the options object
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
  },
});

// Since the route only runs when it is getting called, we need to first look into the 'models.User' and see if it's there. If it is, we use it. If it's not, we create it.
const User = models.User || model('User', UserSchema);

export default User;

/*
// if we were working with express, we would do something like this:
// const User = mongoose.model('User', UserSchema);
// export default User;

---------------------
The "models" object is provided by the Mongoose library and stores all the registered models.

If a model named "User" already exist in the "models" object, it assigns that existing model to the "User" variable. 
** This prevents redefining the model and ensures that the existing model is reused. **

If a model named "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model.

The newly created model is then assigned to the 

---------------------
*/
