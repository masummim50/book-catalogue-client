import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/hooks";

const navlinks = [
  {
    linkUrl: "/add-book",
    linkTitle: "Add Book",
  },
  {
    linkUrl: "/",
    linkTitle: "All Books",
  },
  {
    linkUrl: "/signup",
    linkTitle: "Sign Up",
  },
  {
    linkUrl: "/login",
    linkTitle: "Log in",
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = ()=> {
    dispatch(removeUser());
    navigate("/login")
  }
  return (
    <div className="flex justify-between w-100 items-center bg-purple-200 py-6 px-2 rounded-b">
      <div className=" text-center">Logo</div>
      <div className="search">
        <input
          type="text"
          className="border focus:outline-none py-2 px-4 rounded"
          placeholder="Enter search item"
        />
        <button className="border py-2 px-4 rounded hover:bg-purple-400 transition-all">
          Search
        </button>
      </div>
      <div className="flex">
        {navlinks.map((link) => (
          <Link
            className="px-6 py-1 border border-purple-400 rounded ml-2 bg-purple-400 hover:bg-purple-600 hover:text-white transition-all"
            to={`${link.linkUrl}`}
          >
            {link.linkTitle}
          </Link>
        ))}
        <div
            onClick={()=> handleLogout()}
            className="px-6 py-1 border border-purple-400 rounded ml-2 bg-purple-400 hover:bg-purple-600 hover:text-white transition-all"
            
          >
            Log Out
          </div>
      </div>
    </div>
  );
};

export default Header;
