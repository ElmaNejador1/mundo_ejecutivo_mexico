import {Box, Divider, Heading, HStack, Image, useBreakpointValue, VStack} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import moment from "moment";

interface New {
  id: number;
  url: string;
  cover_url: string;
  date: string;
}

const MotionBox = motion(Box);

const ItemSlider = ({id, date, cover_url}: New, temp: boolean) => {
  const router = useRouter();

  return (
    <MotionBox
      key={`slider-${id}${temp ? "-temp" : ""}`}
      initial={{opacity: 0, x: 1000}}
      animate={{opacity: 1, x: 0}}
      color={"black"}
      w="100%"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      borderRadius={"lg"}
      cursor={"pointer"}
      _hover={{
        bg: "blackAlpha.200",
      }}
      p={5}
      onClick={() => router.push(`/news/${id}`)}
    >
      <Image
        src={cover_url}
        alt={"Producto"}
        borderRadius={"lg"}
        objectFit={"cover"}
      />

      <VStack
        spacing={3}
        mt={2}
      >
        <Heading
          size={"md"}
          textAlign={"justify"}
          color={"white"}
        >
          {
            moment(date).format("MMMM YYYY").toUpperCase()
          }
        </Heading>
      </VStack>
    </MotionBox>
  )
}

export const SliderMultipleNews = () => {
  const isDesktop = useBreakpointValue({base: false, lg: true})

  const [products, setProducts] = useState<New[]>([])

  const steps = isDesktop ? 2 : 1;
  const [current, setCurrent] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/v1/news`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setProducts(res.data.response);
      })
      .finally(() => setLoading(false))
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent(prev => {
  //       return prev >= products.length - (isDesktop ? 3 : 1) ? 0 : prev + 1;
  //     });
  //   }, 5000);
  //
  //   return () => clearInterval(interval);
  // }, [products.length, isDesktop]);

  const handlePrevImage = () => (current <= 0) ? setCurrent(products.length - 1) : setCurrent((prev) => prev - 1);

  const handleNextImage = () => (current >= products.length - (isDesktop ? 3 : 1)) ? setCurrent(0) : setCurrent((prev) => prev + 1);

  return (
    <>
      {
        loading
          ? (<LoadingPage/>)
          : (<Box>
            {
              products.length > 0
              && (<>
                <Divider borderColor="black" borderWidth="1px"/>

                <Heading
                  textAlign={"center"}
                  color={"white"}
                  my={2}
                  py={2}
                  fontSize={"2xl"}
                >
                  Revista
                </Heading>

                <Divider borderColor="black" borderWidth="1px" w={"25%"} mx={"auto"}/>
              </>)
            }

            <HStack
              overflow="hidden"
              textAlign="center"
              spacing={2}
              my={5}
            >
              {/* Left Button */}
              {/*<IconButton*/}
              {/*  aria-label="Previous Image"*/}
              {/*  icon={<FontAwesomeIcon icon={faChevronLeft}/>}*/}
              {/*  onClick={handlePrevImage}*/}
              {/*  variant="ghost"*/}
              {/*/>*/}

              {/*<AnimatePresence>*/}
                {
                  products.slice(current, current + steps).map((product) => (ItemSlider(product, false)))
                }

                {/*{*/}
                {/*  (3 - products.slice(current, current + steps).length > 0) && products.slice(0, 1 - products.slice(current, current + steps).length).map((product) => (ItemSlider(product, true)))*/}
                {/*}*/}
              {/*</AnimatePresence>*/}

              {/* Right Button */}
              {/*<IconButton*/}
              {/*  aria-label="Next Image"*/}
              {/*  icon={<FontAwesomeIcon icon={faChevronRight}/>}*/}
              {/*  onClick={handleNextImage}*/}
              {/*  variant="ghost"*/}
              {/*/>*/}
            </HStack>
          </Box>)
      }
    </>
  );
};

