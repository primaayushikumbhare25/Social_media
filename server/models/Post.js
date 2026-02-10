import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema( 
  { userId: 
    { type: String,
      required: true
    }, 
    text: {
      type: String, 
      required: true
    }, 
    createdAt: { 
      type: Date, 
      default: Date.now
    },
    }, { _id: true } );

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
