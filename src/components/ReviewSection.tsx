import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useAddReviewMutation } from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";

interface ReviewProps {
  reviews: [{ user: { _id: string; name: string }; review: string }]; // This should match the type of 'review' you are passing.
}

const ReviewSection: React.FC<ReviewProps> = ({ reviews }) => {
  const [postReview] = useAddReviewMutation();
  const { id } = useParams();

  const user = useAppSelector((state: RootState) => state.user.user);

  const [review, setReview] = useState("");

  const handleAddReview = () => {
    const reviewObject = { review };
    postReview({ id, review: reviewObject });
  };
  const myReview = reviews.find((review) => review.user._id === user._id);
  console.log("my review ", myReview);

  const [postedReview, setPostedReview] = useState(myReview?.review);
  const [isdisabled, setisdisabled] = useState(true);

  return (
    <div className="mt-3">
      {myReview ? (
        <>
          <textarea
            disabled={isdisabled}
            onChange={(e) => setPostedReview(e.target.value)}
            value={postedReview}
            autoFocus
            className="border border-2 rounded min-w-[300px] min-h-[100px] bg-purple-100"
          />
          <br />

          {postedReview === myReview.review ? (
            <button
              onClick={() => setisdisabled(false)}
              className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2"
            >
              Edit Review
            </button>
          ) : (
            <button
              disabled={postedReview === myReview.review}
              className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2"
            >
              Update Review
            </button>
          )}
        </>
      ) : (
        <>
          <textarea
            onChange={(e) => setReview(e.target.value)}
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
      )}
    </div>
  );
};

export default ReviewSection;
