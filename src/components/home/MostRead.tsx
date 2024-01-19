import {Box, Flex, HStack, Image, Stack, Text, useBreakpointValue, VStack} from "@chakra-ui/react";
import {LastVideo} from "@/components/LastVideo";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  category: string,
  category_name: string,
}

interface Props {
  mostRead: PropsPost[],
  handleClickPost: (category: string, id: number) => void;
}

export const MostRead = ({mostRead, handleClickPost}: Props) => {
  const isDesktop = useBreakpointValue({base: false, lg: true})

  return (<>
    {
      isDesktop
        ? (<HStack
          mb={5}
        >
          <Stack
            w={"30%"}
            direction={"column"}
            spacing={2}
            h={"full"}
          >
            <Box>
              <LastVideo id_video_type={1}/>
            </Box>
            {
              mostRead.slice(1, 4).map((post, index) => (
                <HStack
                  key={index}
                  cursor={"pointer"}
                  _hover={{
                    color: "white"
                  }}
                >
                  <Image
                    src={post.img}
                    alt={post.title}
                    w={"50%"}
                    h={"100%"}
                    objectFit={"cover"}
                    onClick={() => handleClickPost(post.category, post.id)}
                  />

                  <Text
                    w={"50%"}
                    fontSize={"sm"}
                  >
                    {post.title.slice(0, 50)}
                    {post.title.length > 50 ? "..." : ""}
                  </Text>
                </HStack>
              ))
            }
          </Stack>
          <Flex
            w={"70%"}
            onClick={() => handleClickPost(mostRead[0].category, mostRead[0].id)}
            cursor={"pointer"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            bg={"rgba(0,0,0,0.5)"}
          >
            <Image
              src={mostRead[0].img}
              alt={"Most Read"}
            />
            <Text
              color={"white"}
              m={2}
              fontSize={"2xl"}
              fontWeight={"bold"}
            >
              {mostRead[0].title.slice(0, 80)}
              {mostRead[0].title.length > 80 ? "..." : ""}
            </Text>
          </Flex>
        </HStack>)
        : (<VStack
          mb={5}
        >
          {
            mostRead.map((post, index) => (
              <Stack
                key={index}
                w={"100%"}
                direction={"column"}
                spacing={2}
                h={"full"}
              >
                <HStack
                  cursor={"pointer"}
                  _hover={{
                    color: "white"
                  }}
                  onClick={() => handleClickPost(post.category, post.id)}
                >
                  <Image
                    src={post.img}
                    alt={post.title}
                    w={"50%"}
                    h={"100%"}
                    objectFit={"cover"}
                  />

                  <Text
                    w={"50%"}
                    fontSize={"sm"}
                  >
                    {post.title.slice(0, 50)}
                    {post.title.length > 50 ? "..." : ""}
                  </Text>
                </HStack>
              </Stack>
            ))
          }
        </VStack>)
    }
  </>)
}