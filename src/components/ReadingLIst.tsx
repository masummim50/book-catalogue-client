import React from "react";
import { useGetListsQuery } from "../redux/features/user/userApi";
import { Link } from "react-router-dom";

const ReadingList = () => {
  const { data: list, isLoading } = useGetListsQuery(undefined);
  console.log(list, "list");
  return (
    <div className="max-w-[1100px] m-auto mt-6  min-h-[60vh]">
      <h2 className="text-[25px] font-bold mb-5">My Reading List</h2>
      {
        isLoading && <div className="flex mt-6 justify-center items-center">
          <DotLoading size={"40px"}/>
        </div>
      }
      <div className="grid grid-cols-1">
        {
            list?.data?.reading.length <1 && <p className=" bg-gradient-to-r from-purple-200 via-white to-white text-[25px] font-bold p-4 rounded">
                Reading List is empty
            </p>
        }
        {
            list?.data?.reading.map(book=> (
                <Link to={`/book/${book._id._id}`} className="flex flex-col bg-gradient-to-r from-purple-300 via-white to-white p-3 rounded-lg hover:shadow hover:shadow-lg mb-4">
                     <p className="font-bold text-[25px]">{book._id.title}</p>
                     <p>{book._id.author}</p>
                </Link>
            ))
        }
      </div>
    </div>
  );
};

export default ReadingList;
