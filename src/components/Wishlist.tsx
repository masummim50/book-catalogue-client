import React from 'react';
import { useGetListsQuery } from '../redux/features/user/userApi';

const Wishlist = () => {
    const {data:list} = useGetListsQuery(undefined);
    console.log(list, "list")
    return (
        <div>
            wish
        </div>
    );
};

export default Wishlist;