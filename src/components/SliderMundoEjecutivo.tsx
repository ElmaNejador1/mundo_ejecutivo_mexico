import {Box, Center, Heading, HStack, Image} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from 'react';

const mundoEjecutivo = [
  {
    img: "/assets/images/mundoEjecutivo/ME_quintana_roo.jpg",
    url: "https://quintana-roo.mundoejecutivo.com.mx/",
    title: "Quintana Roo",
  },
  {
    img: "/assets/images/mundoEjecutivo/ME_queretaro.jpg",
    url: "https://queretaro.mundoejecutivo.com.mx/",
    title: "Querétaro",
  },
  {
    img: "/assets/images/mundoEjecutivo/ME_nuevo_leon.jpg",
    url: "https://nuevo-leon.mundoejecutivo.com.mx/",
    title: "Nuevo León",
  },
  {
    img: "/assets/images/mundoEjecutivo/ME_jalisco.jpg",
    url: "https://jalisco.mundoejecutivo.com.mx/",
    title: "Jalisco",
  },
  {
    img: "/assets/images/mundoEjecutivo/ME_guanajuato.jpg",
    url: "https://guanajuato.mundoejecutivo.com.mx/",
    title: "Guanajuato",
  },
  {
    img: "/assets/images/mundoEjecutivo/ME_centroamerica.jpg",
    url: "https://centroamerica.mundoejecutivo.com.mx/",
    title: "Centroamérica",
  },
  {
    img: "/assets/images/mundoEjecutivo/ME_baja_california_sur.jpg",
    url: "https://baja-california.mundoejecutivo.com.mx/",
    title: "Baja California",
  },
]

const MotionBox = motion(Box);

export const SliderMundoEjecutivo = () => {
  const steps = 1
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => ((prev + steps) % mundoEjecutivo.length));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => (current === 0) ? setCurrent(mundoEjecutivo.length - steps) : setCurrent((prev) => prev - steps);

  const handleNextImage = () => (current + steps >= mundoEjecutivo.length) ? setCurrent(0) : setCurrent((prev) => prev + steps);


  return (<Box
    my={10}
    borderRadius={"md"}
    p={1}
  >
    <Heading
      textAlign={"center"}
      fontSize={"md"}
    >
      Descubre las últimas noticias y tendencias empresariales en:
    </Heading>
    <HStack
      overflow="hidden"
      textAlign="center"
      spacing={2}
      my={5}
    >
      
      <Box w={{base:300,md:700,lg:"90%"}} h={500}
      py={10}
      pl={10}
      >
      {/*<Image
        src="/assets/icons/LogoArrow.png"
        alt="arrow-left"
        w={5}
        h={5}
        onClick={handlePrevImage}
        cursor="pointer"
        transform="scaleX(-1)"
  />*/}
        <AnimatePresence>
        {
          mundoEjecutivo.slice(current, current + steps).map((item, index) => (
            <MotionBox
              key={item.url}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.5}}
              w="100%"
              onClick={() => window.open(item.url, "_blank")}
            >
              <Image
                src={item.img}
                alt={item.title}
                w="100%"
                h="80%"
                objectFit="cover"
                cursor="pointer"
              />
            </MotionBox>
          ))
        }
      </AnimatePresence>
      {/* Right Button */}
      {/*<Image
        src="/assets/icons/LogoArrow.png"
        alt="arrow-left"
        w={5}
        h={5}
        onClick={handleNextImage}
        cursor="pointer"
      />*/}
      </Box>
      
    </HStack>
  </Box>);
};

