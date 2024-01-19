import {HStack, Img, Skeleton, Stack, useBreakpointValue, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Downloadable} from "@/interfaces/Downloadable";

export const MundoEjecutivoDownloadable = () => {
  const isDesktop = useBreakpointValue({base: false, lg: true})

  const [data, setData] = useState<Downloadable[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/v1/downloadable?home=true', {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
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
                    <Stack
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
                      <Img
                        src={post.cover_url}
                        alt={post.url}
                        height={"160px"}
                        width={"100%"}
                      />

                      <p
                        style={{
                          fontSize: "sm",
                          fontWeight: "bold",
                          textAlign: "center"
                        }}
                      >
                        {post.title}
                      </p>
                    </Stack>
                  ))
                }
              </HStack>)
              : (<VStack
                my={5}
              >
                {
                  data.map((post, index) => (
                    <Stack
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
                      <Img
                        src={post.cover_url}
                        alt={post.url}
                        height={"160px"}
                        width={"100%"}
                      />

                      <p
                        style={{
                          fontSize: "sm",
                          fontWeight: "bold",
                          textAlign: "center"
                        }}
                      >
                        {post.title}
                      </p>
                    </Stack>
                  ))
                }
              </VStack>)
          }
        </>)
    }
  </>)
}