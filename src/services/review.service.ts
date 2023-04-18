import errors from "@/errors/index.js";
import { reviewRepository } from "@/repositories/review.repository.js";


type ReviewEntity = {
    game_id: number,
    user_id: number,
    review: string,
    grade: number,
}

async function postReview(game_id: number, user_id: number, review: string, grade: number){

    const entry = await reviewRepository.makeReview(game_id, user_id, review, grade);

    return entry;
}

async function getReviews(){
    const reviews = await reviewRepository.findAllReviews();
    if (!reviews) throw errors.notFoundError();
    return reviews
}

export default {
    getReviews,
    postReview
}