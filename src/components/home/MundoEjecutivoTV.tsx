import {Flex, HStack, Image, Skeleton, Stack, Text, useBreakpointValue, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {TV} from "@/interfaces/TV";

export const MundoEjecutivoTV = () => {
  const isDesktop = useBreakpointValue({base: false, lg: true})

  const [data, setData] = useState<TV[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/v1/tv?home=true', {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setData(res.data.response)
      })
      .finally(() => setLoading(false))

  }, [])

  return (<>
    {
      loading
        ? (<Stack>
          <Skeleton height='100px'/>
        </Stack>)
        : (<>
          {
            isDesktop
              ? (<HStack
                my={5}
              >
                <Flex
                  w={"70%"}
                  cursor={"pointer"}
                  direction={"column"}
                  _hover={{
                    color: "white"
                  }}
                  mr={5}
                  onClick={() => window.open(data[0].url, "_blank")}
                >
                  <Image
                    src={data[0].img}
                    alt={data[0].title}
                    w={"100%"}
                    h={"100%"}
                    mb={4}
                  />
                  <Text
                    mb={4}
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {data[0].title}
                  </Text>
                </Flex>
                <VStack
                  w={"30%"}
                  spacing={5}
                >
                  {
                    data.slice(1, 5).map((post, index) => (
                      <Flex
                        key={index}
                        cursor={"pointer"}
                        _hover={{
                          color: "white"
                        }}
                        onClick={() => window.open(post.url, "_blank")}
                        alignItems={"center"}
                        w={"100%"}
                      >
                        <Image
                          src={post.img}
                          alt={post.title}
                          w={"150px"}
                          objectFit={"cover"}
                        />

                        <Text
                          fontSize={"xs"}
                          ml={2}
                        >
                          {post.title}
                        </Text>
                      </Flex>
                    ))
                  }
                </VStack>
              </HStack>)
              : (<VStack
                my={5}
              >
                {
                  data.map((post, index) => (
                    <Flex
                      key={index}
                      w={"100%"}
                      cursor={"pointer"}
                      direction={"column"}
                      _hover={{
                        color: "white"
                      }}
                      mr={5}
                      onClick={() => window.open(post.url, "_blank")}
                    >
                      <Image
                        src={post.img}
                        alt={post.title}
                        h={"160px"}
                        mb={4}
                      />

                      <Text
                        mb={4}
                        fontSize={"sm"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                      >
                        {post.title}
                      </Text>
                    </Flex>
                  ))
                }
              </VStack>)
          }
        </>)
    }
  </>)
}