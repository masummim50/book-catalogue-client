// import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { bookGenres } from "./AddBookForm";
import { useGetYearsQuery } from "../redux/features/book/bookApi";
import { useEffect } from "react";
import { resetFilter, setGenre, setSearchText, setYear } from "../redux/features/book/bookSlice";

const headerStyles =
  "px-6 py-1 border border-purple-400 rounded ml-2 bg-purple-400 hover:bg-purple-600 hover:text-white transition-all";

const Header = () => {
  const filter = useAppSelector((state:RootState)=> state.filter)
  const { data } = useGetYearsQuery(undefined);
  const location = useLocation();
  const user = useAppSelector((state: RootState) => state.user.user.name);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(removeUser(undefined));
    localStorage.clear();
  };

  useEffect(() => {
    console.log("years", data?.data);
  }, [data]);
  const navigate = useNavigate();
  const searchText = useAppSelector((state:RootState)=> state.filter.searchText);

  const handleSearch = ()=> {
    navigate(`/search/${searchText}`)
  }

  const handleSearchInputChange = (e)=> {
    console.log(e.target.value)
    if(e.key === "Enter"){
      handleSearch()
    }else{
      dispatch(setSearchText(e.target.value))

    }
  }

  return (
    <div
      id="header"
      className="flex justify-between w-100 items-center bg-purple-200 px-2 rounded-b"
    >
      <Link to="/" className=" text-center">
        Logo
      </Link>
      <div className="search flex-1 p-4 text-center">
        <input
          type="text"
          className="border focus:outline-none py-2 px-4 rounded"
          placeholder="Enter search item"
          onKeyUp={(e)=> handleSearchInputChange(e)}
        />
        <button onClick={()=>handleSearch()} className="border py-2 mb-2 px-4 rounded bg-purple-300 hover:bg-purple-400 transition-all">
          Search
        </button>
        <br />
        {(location.pathname === "/" || location.pathname === "/books" || location.pathname === `/search/${searchText}`) && (
          <>
          <select onChange={(e)=> dispatch(setGenre(e.target.value))} className="border rounded focus:outline-none py-2">

            <option hidden value="">
              Select Genre
            </option>
            {bookGenres.map((genre) => (
              <option selected={filter.genre === genre} value={genre}>{genre}</option>
            ))}
          </select>
         {/* )} */}

        {/* // {(location.pathname === "/" || location.pathname === "/books" || location.pathname === `/search/${searchText}`) && ( */}
          <select onChange={(e)=> dispatch(setYear(e.target.value))} className="border rounded focus:outline-none py-2">
            <option hidden value="">
              Select Year
            </option>
            {data?.data.map((year:{year:string}) => (
              <option selected={filter.year == year.year.toString()} value={year.year}>{year.year}</option>
            ))}
          </select>
         {/* )} */}
         {/* {(location.pathname === "/" || location.pathname === "/books" || location.pathname === `/search/${searchText}`) && */}
          <button className="bg-white px-3 py-2" onClick={()=>dispatch(resetFilter())}>Reset Filter</button>
          </>
        )
        }
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

        <Link className={headerStyles} to="/books">
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
