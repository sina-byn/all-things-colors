import { Dispatch, FC, SetStateAction, useState } from 'react';

// * components
import Card from './Card';
import Button from './Button';
import Spinner from './Spinner';

// * interfaces
interface LoadMoreProps {
  data: any[];
  setData: Dispatch<SetStateAction<any>>;
  initialLength: number;
}

const LoadMore: FC<LoadMoreProps> = ({ data, setData, initialLength }) => {
  const [currLength, setCurrLength] = useState<number>(initialLength);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMoreHandler = () => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setData((prev: any) => [
        ...prev,
        ...data.slice(currLength, currLength + 5),
      ]);
      setCurrLength(prev => (prev += 5));
      setLoading(false);
      clearTimeout(timeout);
    }, 1000);
  };

  if (currLength >= data.length) return null;

  return (
    <Card className='col-span-4 mt-5'>
      <Button
        onClick={loadMoreHandler}
        {...{ disabled: loading }}
        className='w-fit flex items-center justify-center gap-x-4 text-gray-200 font-medium bg-zinc-700 rounded-lg px-6 py-3 mx-auto transition-all duration-100 hover:bg-zinc-800 active:scale-95 disabled:scale-100'
      >
        Load More
        {loading && <Spinner className='w-6 border-t-blue-500' />}
      </Button>
    </Card>
  );
};

export default LoadMore;
