import React, { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useAddReviewMutation, useUpdateReviewMutation } from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";
import {BiEditAlt} from "react-icons/bi"

interface ReviewProps {
  reviews: [{ user: { _id: string; name: string }; review: string , _id:string}]; // This should match the type of 'review' you are passing.
}

const ReviewSection: React.FC<ReviewProps> = ({ reviews }) => {
  const [postReview, {isSuccess:reviewPostSuccess}] = useAddReviewMutation();
  const { id } = useParams();
  const [updateReview] = useUpdateReviewMutation()

  const user = useAppSelector((state: RootState) => state.user.user);

  const [review, setReview] = useState("");

  const handleAddReview = () => {
    const reviewObject = { review };
    postReview({ id, review: reviewObject });
  };
  const myReview = reviews.find((review) => review.user._id === user._id);


  const [postedReview, setPostedReview] = useState(myReview?.review);
  const [isdisabled, setisdisabled] = useState(true);

  const handleEdit = async()=> {
    setisdisabled(false);
    const area = await document.getElementById("reviewArea");
    area?.focus();
    const length = area?.value?.length;
  area?.setSelectionRange(length, length);
  }

  const handleUpdateReview = ()=> {
    const updatedReview = {...myReview, review:postedReview}
    console.log(updatedReview);
    console.log(postedReview);
    const reviewObject = { ...updatedReview };
    updateReview({ id, review: reviewObject });
    setisdisabled(true)
  }

  return (
    <div className="mt-3">
      {myReview ? (
        <>
          <textarea
            id="reviewArea"
            disabled={isdisabled}
            onChange={(e) => setPostedReview(e.target.value)}
            value={postedReview}
            
            className="border border-2 rounded min-w-[300px] min-h-[100px] bg-purple-100"
          />
          <br />

          {(postedReview === myReview.review || reviewPostSuccess) ? (
            <button
              onClick={() => handleEdit()}
              className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2"
            >
              <BiEditAlt/>
            </button>
          ) : (
            <button
              disabled={postedReview === myReview.review}
              className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2"
              onClick={()=> handleUpdateReview()}
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
