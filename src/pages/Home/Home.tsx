import './Home.scss';
import ThemeToggleButton from '../../ui/ThemeToggleButton/ThemeToggleButton';
import HomeCarousel from '@/ui/Global/HomeCarousel/HomeCarousel';

export default function Home() {
  return (
    <div className="home-wrapper flex h-dvh w-dvw items-center justify-center bg-gray-300 p-10 dark:bg-slate-800">
      <div className="home-clock-wrapper general-shadow clock relative z-20 flex h-full w-full flex-1 items-center justify-center rounded-[3rem]">
        <ThemeToggleButton />

        <HomeCarousel />
      </div>
    </div>
  );
}
