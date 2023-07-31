import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useAddReviewMutation } from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";

interface ReviewProps {
  reviews: [{user: {_id:string, name:string}; review: string }]; // This should match the type of 'review' you are passing.
}

const ReviewSection: React.FC<ReviewProps> = ({ reviews }) => {

    const [postReview] = useAddReviewMutation()
    const {id} = useParams()

  const user = useAppSelector((state: RootState) => state.user.user);

  const [review, setReview] = useState("");

  const handleAddReview = ()=> {
    const reviewObject = {review};
    postReview({id, review:reviewObject})
  }

  return (
    <div className="mt-3">
      {reviews.find((review) => review.user._id === user._id) ? (
        <>
            
          <button className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2">
            Edit Your Review
          </button>
        </>
      ) : (
        <>
        <textarea onChange={(e)=> setReview(e.target.value)} placeholder="Enter Review here" className="border-purple-600 border p-4 min-w-[300px] focus:outline-none focus:borer-purple-800"/>
        <br/>
        <button onClick={()=> handleAddReview()} className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2">
          Add A Review+
        </button>
        </>
      )}
    </div>
  );
};

export default ReviewSection;
