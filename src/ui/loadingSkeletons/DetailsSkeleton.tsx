import React from 'react';

import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const DetailsSkeleton = () => {
    return (
        <SkeletonTheme>
                <Skeleton className='mb-2' height={40}></Skeleton>
                <Skeleton className='mb-2' height={200}></Skeleton>
                <div className="flex">

                <Skeleton className='mr-2' height={30} width={120}></Skeleton>
                <Skeleton className='mb-2' height={30} width={120}></Skeleton>
                </div>
                <div className="flex w-full gap-1">
                    <div className="flex-1">
                        <Skeleton height={100}/>
                    </div>
                    <div className="flex-1">
                        <Skeleton height={100}/>
                    </div>
                    <div className="flex-1">
                        <Skeleton height={100}/>
                    </div>
                    <div className="flex-1">
                        <Skeleton height={100}/>
                    </div>
                </div>
            </SkeletonTheme>
    );
};

export default DetailsSkeleton;