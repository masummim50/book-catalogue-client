import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
} from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";

interface ReviewProps {
  reviews: [
    { user: { _id: string; name: string }; review: string; _id: string }
  ]; // This should match the type of 'review' you are passing.
}

const ReviewSection: React.FC<ReviewProps> = ({ reviews }) => {
  const { id: bookId } = useParams();

  // redux functions and selectors
  const user = useAppSelector((state: RootState) => state.user.user);
  const [
    postReview
  ] = useAddReviewMutation();
  const [deleteReview] =
    useDeleteReviewMutation();

  // const [myReview, setMyReview] = useState(
  //   reviews.find((review) => review.user._id === user._id)
  // );

  const [reviewText, setReviewText] = useState("");

  const handleAddReview = async (reviewString: string) => {

    console.log(reviewString);
    await postReview({ id: bookId, review: { review: reviewString } });
    setReviewText("")
  };

  const handleDeleteReview = () => {
    setReviewText("")
    deleteReview({
      id: bookId,
      review: reviews.find((review) => review.user._id === user._id),
    });
  };



  return (
    <div className="mt-3">
      {reviews.find((review) => review.user._id === user._id) ? (
        <>
          <p>My review: </p>
          <textarea
            disabled
            id="reviewArea"
            defaultValue={reviews.find((review) => review.user._id === user._id)?.review}
            className=" border-2 rounded min-w-[300px] min-h-[100px] bg-purple-100"
          />
          <br />
            <button
              onClick={() => handleDeleteReview()}
              className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2"
            >
              Delete My Review
            </button>
        </>
      ) : (
        <>
          <textarea
          defaultValue={""}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Enter Review here"
            className="border-purple-600 border p-4 min-w-[300px] focus:outline-none focus:borer-purple-800"
          />
          <br />
          <button
            onClick={() => handleAddReview(reviewText)}
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
