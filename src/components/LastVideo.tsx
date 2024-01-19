import {Box} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import parse from "html-react-parser"
import {Video} from "@/interfaces/Video";

interface Props {
  id_video_type: number;
  w?: string;
  h?: string;
}

export const LastVideo = ({id_video_type}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState<Video>({
    id: 0,
    title: '',
    url: '',
  });

  useEffect(() => {
    axios.get(`/api/v1/last_video?id_video_type=${id_video_type}`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then((res) => {
        setVideo(res.data.response)
        setIsLoading(false)
      })
  }, [id_video_type])

  return (<Box>
    {
       isLoading
         ? (<LoadingPage/>)
         : (<Box
         >
           {
             parse(video.url)
           }
         </Box>)
     }
   </Box>)
  
}