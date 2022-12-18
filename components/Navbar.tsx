import { FC, MouseEvent } from 'react';

// * components
import Button from './Button';

const navButtonClassName = `
    nav-btn relative font-medium
    after:content-[''] after:absolute after:left-0 after:top-full
    after:w-full after:h-[2px] after:bg-orange-red after:scale-x-0
    after:transition-all duration-300 hover:after:scale-x-100
`;

const Navbar: FC = () => {
  const clickHandler = (e: MouseEvent) => {
    const navButton = e.target as HTMLElement;
    const sectionId = navButton.dataset.sectionId;
    const section = document.querySelector(`.${sectionId}`);

    console.log(sectionId);

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
      <ul className='flex items-center gap-x-4'>
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
    </nav>
  );
};

export default Navbar;
