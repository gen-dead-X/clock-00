import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import DefaultTransparentClock from '@/ui/Clocks/DefaultTransparent/DefaultTransparentClock';
import WeatherWrapper from '@/ui/Weather/WeatherWrapper/WeatherWrapper';

export default function HomeCarousel() {
  const pages = [<DefaultTransparentClock key={1} />, <WeatherWrapper key={2} />];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="h-full"
        spaceBetween={50}
        slidesPerView={1}
      >
        {pages.map((page, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full cursor-grab active:cursor-grabbing">{page}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
