import './Home.scss';
import ThemeToggleButton from '../../ui/ThemeToggleButton/ThemeToggleButton';
import DefaultTransparentClock from '../../ui/Clocks/DefaultTransparent/DefaultTransparentClock';

export default function Home() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-gray-300 p-10 dark:bg-slate-800">
      <div className="general-shadow clock relative z-20 flex h-full flex-1 items-center justify-center rounded-[3rem]">
        <ThemeToggleButton />

        <DefaultTransparentClock />
      </div>
    </div>
  );
}
