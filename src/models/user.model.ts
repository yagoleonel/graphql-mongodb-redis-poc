import { randomUUID } from "crypto";
import mongoose, { Schema } from "mongoose";
const { Types } = Schema

const userSchema = new Schema({
  id: {
    type: Types.String,
    required: true,
    default: randomUUID
  },
  name: {
    type: Types.String,
    required: true
  },
  email: {
    type: Types.String,
    required: true
  }
});
userSchema.index({ id: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema);

export const usersToInsert = () => {
  const data = [
    {
      name: "Yago Leonel",
      email: "yagoleonel@gmail.com",
    },
    {
      name: "Yago Test",
      email: "yagotest@gmail.com",
    },    
  ];
  
  // Generate 30 more data objects
  for (let i = 0; i < 30; i++) {
    data.push({
      name: `User${i + 1}`,
      email: `user${i + 1}@example.com`,
    });
  }

  return data
}
