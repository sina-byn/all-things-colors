import { FC } from 'react';

interface SectionHeaderProps {
    title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title }) => {
    return (
        <header className='section-header grid grid-cols-[auto,_1fr] items-center relative my-5'>
            <h3 className='text-[1.15rem] font-bold pr-4'>
                {title}
            </h3>
            <div className="line h-[7px] bg-gradient-to-r from-orange-red via-orange-red to-transparent mt-1" />
        </header>
    );
};

export default SectionHeader;