import  { useRef, useEffect  } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ItemCard from "../../Shared/ItemCard/ItemCard";
import ItemCardCategory from "../../Shared/ItemCard/ItemCardCategory";
import {Link,  useLoaderData } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'
import { Fade } from "react-awesome-reveal";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './homepage.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const HomePage = () => {
  useEffect(() => {
    document.title = 'ArtsHouse';
  }, []);
  const crafts = useLoaderData();
  const { categoryResult , craftResult } = crafts;
    const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
    return (
        <div>
              <div className='lg:h-[700px]'>
              <Swiper 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide ><div className='bg-red-400 h-full w-full'><img src="https://www.chalkola.com/cdn/shop/articles/impasto-acrylic-painting_fd4bd315-32ad-4fc2-b22f-96f10130deac_1600x.jpg?v=1619113156" alt="" /></div></SwiperSlide>
        <SwiperSlide><img src="https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Aa4c161aa-5365-458d-b5b0-e03c98eb1e78?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://images.unsplash.com/photo-1488806374796-a4071c52353b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JhZnRzfGVufDB8fDB8fHww" alt="" /></SwiperSlide>
 
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
                   
      </div>
      <div>
      <div  className="font-bold text-5xl p-3 text-center my-10"><Fade>ARts Necessity in Life</Fade></div>
<div className=' text-center m-20 text-xl'><p><Fade>Here's a description about the necessity of art in life:
Art isn't just a decoration or a pastime; it's a fundamental thread woven into the fabric of human experience. It's a powerful force that nourishes our souls, expands our minds, and enriches our lives in countless ways.
Emotional Connection Art allows us to express and connect with a wide range of emotions. Whether it's the joy of a vibrant painting, the sorrow of a haunting melody, or the thought-provoking nature of a sculpture, art speaks to us on a deep level. It provides an outlet for our feelings and helps us understand the emotions of others.
Spark of Imagination: Art ignites our creativity and imagination. It transports us to new worlds, inspires innovation, and encourages us to see things from different perspectives. Whether we're captivated by a captivating story or mesmerized by a dancer's movement, art expands our view of the possible.
Sense of Beauty: Art awakens our appreciation for beauty. It refines our senses, allowing us to find beauty in the ordinary and the extraordinary. From the intricate details of a masterpiece to the harmonious rhythm of a song, art helps us see the world with fresh eyes.
Understanding the World: Art reflects our history, culture, and values. It provides a window into the past, offering insights into different societies and their perspectives. By engaging with art, we gain a deeper understanding of the world around us and our place within it.
Personal Growth: Art fosters personal growth and self-discovery. Engaging with art forms, whether as a creator or an observer, can be a journey of self-exploration. It allows us to connect with our inner selves, challenge our perceptions, and develop a sense of who we are.
In conclusion, art isn't a luxury; it's a necessity. It enriches our lives, broadens our horizons, and connects us to something larger than ourselves. So, embrace the power of art, explore its vast forms, and let it color your world with beauty, meaning, and inspiration.
</Fade></p></div>
      </div>
      <div  className="font-bold text-5xl p-3 text-center my-10">Arts and Crafts  </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {
          craftResult.map(craft => <ItemCard key={craft._id} craft={craft}></ItemCard>)
      }
      </div>
      <div  className="font-bold text-5xl p-3 text-center my-10">Art Categories Like <Typewriter
            words={['Landscape Painting', 'Portrait Drawing', 'Watercolour Painting', 'Oil Painting','Charcoal Sketching','Cartoon Drawing',]}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={5}
            
          /></div>
      <div className="flex flex-wrap justify-center gap-5 w-full">
          {
              categoryResult.map(category => <Link key={category._id} to={`/category/${category.subcategory_name}`}>
                  <ItemCardCategory category={category}></ItemCardCategory>
              </Link>)
          }
      </div>
        </div>
    );
};

export default HomePage;
