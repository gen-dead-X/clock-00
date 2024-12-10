import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import DefaultTransparentClock from '@/ui/Clocks/DefaultTransparent/DefaultTransparentClock';

export default function HomeCarousel() {
  const pages = [
    <DefaultTransparentClock key={1} />,
    <div key={2} className="flex h-full items-center justify-center">
      Hello
    </div>,
  ];

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
  //   return (
  //     <Swiper>
  //       {/* {pages.map((page, index) => (
  //           <SwiperSlide key={index}>{page}</SwiperSlide>
  //         ))} */}
  //       {Array.from({ length: 3 }).map((_, index) => (
  //         <SwiperSlide key={index}>
  //           <div className="w-dvh flex h-dvh items-center justify-center p-10">
  //             <div
  //               className="flex h-full w-full items-center justify-center rounded-xl"
  //               style={{
  //                 backgroundColor: `#${index}${index}8${index}c${index}`,
  //               }}
  //             >
  //               Hello {index + 1}
  //             </div>
  //           </div>
  //         </SwiperSlide>
  //       ))}
  //       {/* <Pagination /> */}
  //       {/* <Navigation /> */}
  //     </Swiper>
  //   );
}
