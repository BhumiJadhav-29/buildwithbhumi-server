import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    message: {
      type: String,
      required: true,
    },

    approved: {
  type: Boolean,
  default: true,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Feedback", feedbackSchema);