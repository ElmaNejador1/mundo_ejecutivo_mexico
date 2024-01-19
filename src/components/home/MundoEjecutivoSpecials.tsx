import {Flex, HStack, Image, Skeleton, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Specials} from "@/interfaces/Specials";

export const MundoEjecutivoSpecials = () => {
  const isDesktop = useBreakpointValue({base: false, lg: true})

  const [data, setData] = useState<Specials[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/v1/specials?home=true', {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
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
                      width={"250px"}
                      onClick={post.url !== "" ? () => window.open(post.url, "_blank") : () => console.log("no url")}
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
              </HStack>)
              : (<Stack
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
                      onClick={post.url !== "" ? () => window.open(post.url, "_blank") : () => console.log("no url")}
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
              </Stack>)
          }
        </>)
    }
  </>)
}