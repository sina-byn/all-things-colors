import { FC, MouseEvent, useState } from 'react';

// * components
import Button from './Button';

const navButtonClassName = `
    nav-btn relative font-medium
    after:content-[''] after:absolute after:left-0 after:top-full
    after:w-full after:h-[2px] after:bg-orange-red after:scale-x-0
    after:transition-all duration-300 hover:after:scale-x-100
`;

const Navbar: FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const expandToggler = () => setExpanded(prev => !prev);
  const clickHandler = (e: MouseEvent) => {
    const navButton = e.target as HTMLElement;
    const sectionId = navButton.dataset.sectionId;
    const section = document.querySelector(`.${sectionId}`);

    if (!section || !sectionId) return;

    const top = window.scrollY + section.getBoundingClientRect().top;

    window.scrollTo({ top: top > 200 ? top - 100 : 0, behavior: 'smooth' });

    const navButtons = Array.from(document.querySelectorAll('.nav-btn'));

    navButtons.forEach(btn => {
      btn.classList.remove('after:scale-x-100');
      btn.classList.add('after:scale-x-0');
    });
    navButton.classList.add('after:scale-x-100');
    navButton.classList.remove('after:scale-x-0');
  };

  return (
    <nav>
      <i
        onClick={expandToggler}
        className='fa-solid fa-bars fa-xl block lg:hidden cursor-pointer hover:text-orange-red'
      />
      <ul
        className={`
        flex flex-col lg:flex-row items-center gap-x-4 gap-y-6
        fixed lg:static top-0 right-0 z-[150]
        h-screen lg:h-auto bg-gray-100 lg:bg-transparent
        px-10 lg:px-0 shadow-2xl lg:shadow-none
        lg:translate-x-0 transition-transform duration-300
        ${expanded ? '' : 'translate-x-full'}
      `}
      >
        <li className='lg:hidden w-fit self-end mt-3.5 mb-5 -mr-3'>
          <i
            onClick={expandToggler}
            className='fa-solid fa-close fa-xl cursor-pointer hover:text-orange-red'
          />
        </li>
        <li>
          <Button
            onClick={clickHandler}
            data-section-id='gradients-section'
            className={navButtonClassName.concat('after:scale-x-100')}
          >
            Gradients
          </Button>
        </li>
        <li>
          <Button
            onClick={clickHandler}
            data-section-id='tints-and-shades-section'
            className={navButtonClassName}
          >
            Tints and Shades
          </Button>
        </li>
        <li>
          <Button
            onClick={clickHandler}
            data-section-id='color-palette-section'
            className={navButtonClassName}
          >
            Color Palette
          </Button>
        </li>
        <li>
          <Button
            onClick={clickHandler}
            data-section-id='image-color-palette-section'
            className={navButtonClassName}
          >
            Image Palette
          </Button>
        </li>
        <li>
          <Button
            onClick={clickHandler}
            data-section-id='color-mixer-section'
            className={navButtonClassName}
          >
            Color Mixer
          </Button>
        </li>
      </ul>
      <div
        onClick={expandToggler}
        className={`
        overlay block lg:hidden fixed inset-0 w-screen h-screen bg-black/60
        transition-transform duration-300
        ${expanded ? '' : '-translate-x-full'}
        `}
      />
    </nav>
  );
};

export default Navbar;
