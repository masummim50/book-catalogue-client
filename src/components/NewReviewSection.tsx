import React, { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";

interface ReviewProps {
  reviews: [
    { user: { _id: string; name: string }; review: string; _id: string }
  ]; // This should match the type of 'review' you are passing.
}

const NewReviewSection: React.FC<ReviewProps> = ({ reviews }) => {
    const {id:bookId} = useParams()
    const user = useAppSelector((state:RootState)=> state.user.user)
    const [postReview, {isSuccess:reviewPostSuccess, data:newlyPostedReview}] = useAddReviewMutation();

    const [myReview, setMyReview] = useState(reviews.find(review=> review.user._id === user._id));

    
  const [review, setReview] = useState("");
    const handleAddReview = () => {
        const reviewObject = { review };
        postReview({ id:bookId, review: reviewObject });
      };


  return (
    <div className="mt-3">
        {
            myReview ? <p>{myReview.review}</p> : 
            <>
          <textarea
            onChange={(e)=> setReview(e.target.value)}
            placeholder="Enter Review here"
            className="border-purple-600 border p-4 min-w-[300px] focus:outline-none focus:borer-purple-800"
          />
          <br />
          <button
            onClick={() => handleAddReview()}
            className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2"
          >
            Add A Review+
          </button>
        </>
        }
    </div>



    // <div className="mt-3">
    //   <>
    //     <textarea
    //       id="reviewArea"
    //       className="border border-2 rounded min-w-[300px] min-h-[100px] bg-purple-100"
    //     />
    //     <br />

    //     <button className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2">
    //       <BiEditAlt />
    //     </button>

    //     <button className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2">
    //       Update Review
    //     </button>

    //     <button className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2">
    //       Delete Review
    //     </button>
    //   </>
    //   <>
    //     <textarea
    //       placeholder="Enter Review here"
    //       className="border-purple-600 border p-4 min-w-[300px] focus:outline-none focus:borer-purple-800"
    //     />
    //     <br />
    //     <button className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2">
    //       Add A Review+
    //     </button>
    //   </>
    // </div>
  );
};

export default NewReviewSection;
