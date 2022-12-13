import type { NextPage } from 'next';
import GradientCard from '../components/GradientCard';

// * components
import Navbar from '../components/Navbar';
import SectionHeader from '../components/SectionHeader';

// * data
import GRADIENTS_DATA from '../data/gradients.json';

const Home: NextPage = () => {
  return (
    <>
      <header className='h-[50px] sticky top-0 bg-gray-100 py-3'>
        <div className='header-content container flex items-center justify-between px-6 -mt-0.5 mx-auto'>
          <h1 className='text-2xl font-bold overflow-hidden'>
            <span className='text-orange-red'>A</span>ll&nbsp;
            <span className='text-orange-red'>T</span>hings&nbsp;
            <span className='text-orange-red'>C</span>olors
          </h1>
          <Navbar />
        </div>
      </header>
      <main className='container px-6 mx-auto'>
        <SectionHeader title='Gradients' />
        <section className='gradients-section grid grid-cols-5 gap-5'>
          <GradientCard.Random />
          {GRADIENTS_DATA.map(gradient => (
            <GradientCard.Static
              id={gradient.id}
              key={gradient.id}
              stops={gradient.stops}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
