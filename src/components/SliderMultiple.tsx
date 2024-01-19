import {Box, Text, HStack, Image, useBreakpointValue, Flex} from '@chakra-ui/react';
import {motion, AnimatePresence} from 'framer-motion';
import {useState, useEffect} from 'react';
import {useRouter} from "next/router";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  category: string,
  category_name: string,
}

interface Props {
  posts: PropsPost[];
}

const MotionBox = motion(Box);

export const SliderMultiple = ({posts}: Props) => {
  const isDesktop = useBreakpointValue({base: false, lg: true})

  const steps = isDesktop ? 4 : 1;
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (posts.length > steps) {
        setCurrent((prev) => ((prev + steps) % posts.length));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length, steps]);

  const handlePrevImage = () => (current === 0) ? setCurrent(0) : setCurrent((prev) => prev - steps);

  const handleNextImage = () => (current + steps >= posts.length) ? setCurrent(0) : setCurrent((prev) => prev + steps);


  return (
    <HStack
      overflow="hidden"
      textAlign="center"
      spacing={1}
      my={2}
      minH={{xl:"500px", md: "400px"}}
    >
      <Image
        src="/assets/icons/LogoArrow.png"
        alt="arrow-left"
        w={5}
        h={5}
        onClick={handlePrevImage}
        cursor="pointer"
        transform="scaleX(-1)"
      />

      {/*<AnimatePresence>*/}
        {
          posts.slice(current, current + steps).map((post) => (
            <MotionBox
              key={post.id}
              initial={{opacity: 0, x: 50}}
              animate={{opacity: 1, x: 20}}
              w="100%"
            >
              <Image
                src={post.img}
                alt={post.title}
                w="95%"
                h="100%"
                objectFit="cover"
                cursor="pointer"
                onClick={() => router.push(`/category/${post.category}/post/${post.id}`)}
              />
              <Text
                mb={4}
                fontSize="md"
              >
                {post.title.slice(0, 40)}
                {post.title.length > 40 ? "..." : ""}
              </Text>
            </MotionBox>
          ))
        }
      {/*</AnimatePresence>*/}

      {/* Right Button */}
      <Image
        src="/assets/icons/LogoArrow.png"
        alt="arrow-left"
        w={5}
        h={5}
        onClick={handleNextImage}
        cursor="pointer"
      />
    </HStack>
  );
};

