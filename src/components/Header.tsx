// import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const headerStyles =
  "px-6 py-1 border border-purple-400 rounded ml-2 bg-purple-400 hover:bg-purple-600 hover:text-white transition-all";

const Header = () => {
  const user = useAppSelector((state: RootState) => state.user.user.name);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(removeUser(undefined));
    navigate("/login");
  };

  return (
    <div
      id="header"
      className="flex justify-between w-100 items-center bg-purple-200 py-6 px-2 rounded-b"
    >
      <Link to="/" className=" text-center">
        Logo
      </Link>
      <div className="search">
        <input
          type="text"
          className="border focus:outline-none py-2 px-4 rounded"
          placeholder="Enter search item"
        />
        <button className="border py-2 px-4 rounded bg-purple-300 hover:bg-purple-400 transition-all">
          Search
        </button>
      </div>
      <div className="flex">
        {/* {navlinks.map((link) => (
          <Link
            className={headerStyles}
            to={`${link.linkUrl}`}
          >
            {link.linkTitle}
          </Link>
        ))} */}
        <Link className={headerStyles} to="/add-book">
          Add Book
        </Link>

        <Link className={headerStyles} to="/">
          All Books
        </Link>
        {!user && (
          <Link className={headerStyles} to="/login">
            Login
          </Link>
        )}
        {!user && (
          <Link className={headerStyles} to="/signup">
            Sign up
          </Link>
        )}

        {user && (
          <div className={headerStyles + " " + "relative group bg-purple-500"}>
            <div className="absolute top-[110%] right-0 invisible group-hover:visible">
              <Link className={headerStyles + " " + "block mt-2"} to="/books">
                My Reading List
              </Link>

              <Link className={headerStyles + " " + "block mt-2"} to="/books">
                My Wishlist
              </Link>
              <div
                className={headerStyles + " " + "block mt-2"}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
            ME
          </div>
        )}
        {/* <div
            onClick={()=> handleLogout()}
            className="px-6 py-1 border border-purple-400 rounded ml-2 bg-purple-400 hover:bg-purple-600 hover:text-white transition-all"
            
          >
            Log Out
          </div> */}
      </div>
    </div>
  );
};

export default Header;
