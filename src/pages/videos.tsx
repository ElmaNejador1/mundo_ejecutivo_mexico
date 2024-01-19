import {Box, Flex, Heading, SimpleGrid, VStack} from "@chakra-ui/react";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import {useEffect, useState} from "react";
import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import parse from "html-react-parser";

const getDimensions = (url: string) => url.match(/width='(\d+)'\s*height='(\d+)'/)

interface Video {
  id: number
  title: string
  url: string
  type?: string
  width?: number
  height?: number
}

const Videos = () => {
  const [video, setVideo] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/v1/video`, {
      params: {category: true},
      headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}
    })
      .then((res) => {
        setVideo(res.data.response)

        res.data.response.map((video: Video) => {
          const match = getDimensions(video.url)

          if (match) {
            video.width = parseInt(match[1])
            video.height = parseInt(match[2])
          }
        })
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <LayoutSingle title={"Videos"} blur={"true"}>
      {
        isLoading
          ? (<LoadingPage/>)
          : (<VStack
            spacing={10}
          >
            {
              video.map((video) =>
                <Flex
                  key={video.id}
                  w={`calc(${video.width} / ${video.height} * 60%)`}
                  h={"100%"}
                  alignItems={"center"}
                  direction={"column"}
                  p={5}
                  boxShadow={"lg"}
                >
                  <Heading
                    as={"h3"}
                    size={"md"}
                    mb={5}
                  >
                    {video.title}
                  </Heading>
                  {
                    parse(video.url)
                  }
                </Flex>
              )
            }
          </VStack>)
      }
    </LayoutSingle>
  )

}
export default Videos