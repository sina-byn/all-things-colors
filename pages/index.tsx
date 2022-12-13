import type { NextPage } from 'next';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  return (
    <>
      <header className='h-[50px] sticky top-0 bg-gray-100 py-3'>
        <div className='header-content container flex items-center justify-between px-6 -mt-0.5 mx-auto'>
          <h1 className='text-xl font-bold overflow-hidden'>
            <span className='text-orange-red'>A</span>ll&nbsp;
            <span className='text-orange-red'>T</span>hings&nbsp;
            <span className='text-orange-red'>C</span>olors
          </h1>
          <Navbar />
        </div>
      </header>
      <main className='container px-6 mx-auto'>
      </main>
    </>
  );
};

export default Home;
