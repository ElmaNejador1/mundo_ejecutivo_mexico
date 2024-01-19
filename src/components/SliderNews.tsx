import {Box, Button, Heading, HStack, Image, Skeleton, Stack, VStack} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {News} from "@/interfaces/News";
import axios from "axios";
import {useRouter} from "next/router";

const MotionBox = motion(Box);

export const SliderNews = () => {
  const router = useRouter()

  const steps = 1
  const [current, setCurrent] = useState(0);

  const [data, setData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/v1/news`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setData(res.data.response);
      })
      .finally(() => setLoading(false))
  }, []);

  const handlePrevImage = () => (current === 0) ? setCurrent(data.length - steps) : setCurrent((prev) => prev - steps);

  const handleNextImage = () => (current + steps >= data.length) ? setCurrent(0) : setCurrent((prev) => prev + steps);


  return (<>
    {
      loading
        ? (<Stack>
          <Skeleton height='100px'/>
          <Skeleton height='100px'/>
        </Stack>)
        : (<Box
          my={data.length > 0 ? 10 : 0}
          borderRadius={"md"}
          p={1}
        >
          <HStack
            overflow="hidden"
            textAlign="center"
            spacing={2}
            my={data.length > 0 ? 5 : 0}
          >
            {
              data.length > 0
              && (<Image
                src="/assets/icons/LogoArrow.png"
                alt="arrow-left"
                w={5}
                h={5}
                onClick={handlePrevImage}
                cursor="pointer"
              />)
            }
              <Box>{
                data.length > 0
                ? (
                  
                    data.slice(current, current + steps).map((item) => (
                      <MotionBox
                        key={item.url}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5}}
                        w="100%"
                        onClick={() => router.push(`/news/${item.id}`)}
                      >
                        <Image
                          src={item.cover_url}
                          alt={item.date}
                          w="100%"
                          h="80%"
                          objectFit="cover"
                          cursor="pointer"
                        />
                      </MotionBox>
                    ))
                  
                )
                : (<Box>
                  {/*<Image*/}
                  {/*  src="/assets/images/revista.jpg"*/}
                  {/*  alt="revista"*/}
                  {/*/>*/}
                </Box>)}
              </Box>
            

            {/* Right Button */}
            {
              data.length > 0
              && (<Image
                src="/assets/icons/LogoArrow.png"
                alt="arrow-right"
                w={5}
                h={5}
                onClick={handleNextImage}
                cursor="pointer"
              />)
            }
          </HStack>

          <VStack
            spacing={5}
          >
            <Heading
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"white"}
            >
              Enterate de las últimas noticias
            </Heading>

            <Button
              colorScheme={"red"}
              textTransform={"uppercase"}
              onClick={() => window.open("https://issuu.com/hidalgomundoejecutivo", "_blank")}
            >
              Suscríbete
            </Button>
          </VStack>
        </Box>)
    }
  </>);
};

