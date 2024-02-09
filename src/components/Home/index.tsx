import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/_234f906a-b997-4ae2-ac5c-8682c5d468d1-fotor-bg-remover-20240207122312.png";
import Cards from "../common/Cards";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

function Home() {
  const [books, setBooks] = useState([]);
  const [javabooks, setJavaBooks] = useState([]);
  const { inputValue } = useSelector((state) => state.input);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBooks();
    getJavaBooks();
  }, [inputValue]);

  const getBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputValue}:keyes&key=AIzaSyCLXhh9IMFimbQLUEYXQPUBTtc5zz4uzaU`
      );
      console.log(response?.data?.items);
      setBooks(response?.data?.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getJavaBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=java&maxResults=10&key=AIzaSyCLXhh9IMFimbQLUEYXQPUBTtc5zz4uzaU`
      );
      console.log(response?.data?.items);
      setJavaBooks(response?.data?.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="w-full h-[80vh] flex justify-center flex-col leading-none items-center font-zinc-900 text-[2vw]  animate-pulse ">
        <img src={logo} alt="logo" className="w-[12vw] animate-pulse" />
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="w-full mt-[2vw]">
        <h1 className="text-[3vw] mx-14 pb-3 mb-5 border-b-[1px] border-zinc-900">
          Top Books
        </h1>
        <Swiper
          spaceBetween={5}
          slidesPerView={3}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {books.map((book, index) => (
            <SwiperSlide key={index}>
              {" "}
              <Cards book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full mt-[2vw]">
        <h1 className="text-[3vw] mx-14 pb-3 mb-5 border-b-[1px] border-zinc-900">
          Top Java Book
        </h1>
        <Swiper
          spaceBetween={5}
          slidesPerView={3}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {javabooks.map((book, index) => (
            <SwiperSlide key={index}>
              {" "}
              <Cards book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
