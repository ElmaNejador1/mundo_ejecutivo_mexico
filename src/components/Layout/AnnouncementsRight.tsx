import {Box, Divider, Flex, Heading, Image, Skeleton, Stack, Text, SimpleGrid} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {SliderMundoEjecutivo} from "@/components/SliderMundoEjecutivo";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {SliderNews} from "@/components/SliderNews";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  category: string,
  category_name: string,
}

interface PropsAnnouncements {
  mostRead: PropsPost[],
  opinion: PropsPost[],
}

export const AnnouncementsRight = () => {
  const router = useRouter()

  const [data, setData] = useState<PropsAnnouncements>({
    mostRead: [],
    opinion: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/api/v1/announcements", {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setData(res.data.response)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Flex
      as="aside"
      direction="column"
      w={{base: "100%", md: "100%", lg:"100%", xl:"20%"}}
      pr={{base: 8, md: 2}}
      pl={{base: 8, md: 2}}
      pt={{base: 0, md: 3}}
    >
       <SliderNews/>

   <Box
       mb={5}
     >
       <Heading
         as="h1"
         fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }} 
         color={"white"}
         textAlign={"center"}
       >
         Lo mas leído
       </Heading>
       <Divider borderColor="black" borderWidth="2px" mt={2}/>
     </Box>
        
      {
        loading
        ? (
           <Stack>
            <Skeleton height='100px'/>
            <Skeleton height='100px'/>
            <Skeleton height='100px'/>
            <Skeleton height='100px'/>
            <Skeleton height='100px'/>
           </Stack>
          )
        : (
           <SimpleGrid columns={{base: 1, md: 3, lg: 3, xl:1}}>
             {
               data.mostRead.map((post, index) => (
                 <Stack
                   key={index}
                   mb={5}
                   cursor={"pointer"}
                   direction={{base: "column", lg: "row"}}
                   onClick={() => router.push(`/category/${post.category}/post/${post.id}`)}
                   alignItems={"center"}
                  >
                    <Image src={post.img} alt={post.title} w={40} />
                    <Text size="xs">
                      {post.title.slice(0, 30)}
                      {post.title.length > 30 ? "..." : ""}
                    </Text>
                  </Stack>
               ))
             }
           </SimpleGrid>
        )
      }

<Box
        mb={5}
      >
        <Heading
          as="h1"
          fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
          color={"white"}
          textAlign={"center"}
        >
          Empresarios
        </Heading>
        <Divider borderColor="black" borderWidth="2px" mt={2}/>
      </Box>

      {
        loading
          ? (<Stack>
            <Skeleton height='100px'/>
            <Skeleton height='100px'/>
            <Skeleton height='100px'/>
            <Skeleton height='100px'/>
            <Skeleton height='100px'/>
          </Stack>)
          : (<SimpleGrid columns={{base: 1, md: 3, lg: 3, xl:1}}>
            {
              data.opinion.map((post, index) => (
                <Stack
                  key={index}
                  mb={5}
                  cursor={"pointer"}
                  direction={{base: "column", lg: "row"}}
                  onClick={() => router.push(`/category/${post.category}/post/${post.id}`)}
                  alignItems={"center"}
                 >
                   <Image src={post.img} alt={post.title} w={40} />
                   <Text size="xs">
                     {post.title.slice(0, 30)}
                     {post.title.length > 30 ? "..." : ""}
                   </Text>
                 </Stack>
              ))
            }
          </SimpleGrid>)
      }
      <SliderMundoEjecutivo/>
    </Flex>
  )
}

