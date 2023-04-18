import { Router } from "express";
import { makeReview, getReviews } from "@/controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter
    .post('/add/:game_id', makeReview)
    .get('/', getReviews)

export default reviewRouter;