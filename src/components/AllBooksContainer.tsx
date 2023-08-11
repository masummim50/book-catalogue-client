
import BookCard from './BookCard';
import { useGetBooksQuery } from '../redux/features/book/bookApi';
import CardSkeleton from '../ui/loadingSkeletons/CardSkeleton';
import { IBook } from '../interfaces/book.interface';

const AllBooksContainer = () => {
    
  const {isLoading, data} = useGetBooksQuery(undefined);
    return (
        <div className='max-w-[1100px] m-auto mt-6 min-h-[50vh]'>
            <h2 className='text-[25px] font-bold mb-5'>All Books</h2>
            <div className="grid  grid-cols-4">
                {
                    isLoading && Array(10).fill("").map(()=> (
                        <CardSkeleton/>
                    ))
                }
                {
                    data?.data?.map((book:IBook)=> (
                        <BookCard book={book}/>
                    ))
                }
            </div>
        </div>
    );
};

export default AllBooksContainer;