import express from "express";
import { getFeedPosts, getUserPosts, likePost , deletePost , addComment , deleteComment} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

// DELETE THE POST
router.delete("/:id", verifyToken, deletePost);

//ADD THE COMMENTS
router.post("/:id/comment" , verifyToken , addComment);

//DELETE THE COMMENTS
router.delete("/:id/comment/:commentId" , verifyToken , deleteComment);

export default router;
