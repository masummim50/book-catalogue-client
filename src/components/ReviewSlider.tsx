import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface ReviewProps {
    reviews: [{user: {_id:string, name:string}; review: string }]; // This should match the type of 'review' you are passing.
  }

interface IReview {
    user: {
        _id:string,
        name:string
    },
    review: string
}

const ReviewSlider: React.FC<ReviewProps> = ({ reviews }) => {
  return (
    <Swiper slidesPerView={4} loop={true} className="mt-5">
      {reviews
        .map((review:IReview) => (
          <SwiperSlide className="bg-purple-100 rounded-lg p-4 mr-2">
            <div className="flex items-center">
                <div className="bg-purple-400 p-4 mr-2 rounded-[50%] text-white font-bold">{review.user.name.slice(0,1).toUpperCase()}</div>
                <div>

                <div className="font-bold">{review.user.name}</div>
                <div className="text-black font-thin text-[12px] break-all inline-block">{review.review}</div>
                </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ReviewSlider;
