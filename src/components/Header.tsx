import React from 'react';
import {Link } from "react-router-dom"

const navlinks = [
    {
        linkUrl: "/add-book",
        linkTitle: "Add Book"
    },
    {
        linkUrl: "/",
        linkTitle: "All Books"
    },
    {
        linkUrl: "/",
        linkTitle: "Sign Up"
    },
    {
        linkUrl: "/",
        linkTitle: "Log in"
    },
]

const Header = () => {
    return (
        <div className='flex justify-between w-100 items-center bg-purple-200 py-6 px-2 rounded-b'>
            <div className=" text-center">Logo</div>
            <div className="search">
                <input type="text" className='border focus:outline-none py-2 px-4 rounded' placeholder='Enter search item'/>
                <button className='border py-2 px-4 rounded hover:bg-purple-400 transition-all'>Search</button>
            </div>
            <div className="flex">
                {
                    navlinks.map(link => (
                        <Link className='px-6 py-1 border border-purple-400 rounded ml-2 bg-purple-400 hover:bg-purple-600 hover:text-white transition-all' to={`${link.linkUrl}`}>{link.linkTitle}</Link>
                    ))
                }
                
            </div>
        </div>
    );
};

export default Header;