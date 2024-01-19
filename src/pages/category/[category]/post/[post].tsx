import {Avatar, Box, Center, Divider, Flex, Heading, HStack, Image, SimpleGrid, Text} from "@chakra-ui/react";
import {Post} from "@/interfaces/Post";
import moment from "moment/moment";
import {LayoutDouble} from "@/components/Layout/LayoutDouble";
import Head from "next/head";
import process from "process";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {LoadingPage} from "@/components/LoadingPage";
import parse from "html-react-parser";

interface Props {
  post: Post
}

const Post = ({post}: Props) => {
  const router = useRouter()
  const [lastPosts, setLastPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/v1/last_posts`, {
      params: {actualPost: post.id,},
      headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}
    })
      .then(res => {
        setLastPosts(res.data.response)
        setLoading(false)
      })
  }, [post])

  return (<>
      <Head>
        <title>{post.title}</title>
        <link rel="shortcut icon" href="/assets/icons/favicon.ico"/>
        <meta property="og:title" content="Mundo Ejecutivo CDMX"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://mundoejecutivomexico.com"/>
        <meta property="og:description" content="Mundo Ejecutivo CDMX"/>
        <meta property="og:site_name" content="Mundo Ejecutivo CDMX"/>
        <meta property="og:locale" content="es_ES"/>
        <meta name="description" content="Mundo Ejecutivo CDMX"/>
        <meta name="keywords" content="Mundo Ejecutivo CDMX, Mundo Ejecutivo, CDMX, Noticias, Noticias CDMX, Noticias Mundo Ejecutivo, Noticias Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX, Noticias de Mundo Ejecutivo, Noticias de Mundo Ejecutivo CDMX, Noticias de CDMX"/>
        <meta name="robots" content="index, follow"/>
        <meta name="googlebot" content="index, follow"/>
        <meta name="google" content="notranslate"/>
        <meta name="author" content="Mundo Ejecutivo CDMX"/>
        <meta property="og:image" content={post.img ? post.img : "https://mundoejecutivomexico.com/assets/icons/logo.png"}/>
      </Head>

      <LayoutDouble>
        <Flex
          justifyContent='center'
        >
          <Flex
            w={"100%"}
            direction='column'
            alignItems='center'
          >
            <Center><Heading as={"h2"}>{post.title}</Heading></Center>
            <HStack
              m={5}
              spacing={5}
            >
              <Avatar
                size='md'
                name={post.author}
                src={post.photo_author}
              />
              <Text>
                {
                  post.author
                }
              </Text>
              <Text opacity={0.5}>
                {
                  moment(`${post.date_update} ${post.time_update}`).format('DD/MM/YYYY - hh:ss a')
                }
              </Text>
            </HStack>
            {
              post.img && post.img !== ""
              && (<Image
                objectFit='cover'
                maxW={{base: '100%', sm: '100%'}}
                src={post.img}
                alt='Imagen'
              />)
            }
            <Box
              my={10}
              px={5}
            >
              {parse(post.content.replace(/color:\s*rgb\([^)]*\)/g, 'color: white'))}
            </Box>
            <Box>
              <Heading as="h1" size="lg">MAS CONTENIDO</Heading>
              <Divider borderColor="white" borderWidth="1px"/>
            </Box>
          </Flex>

        </Flex>

        {
          loading
            ? (<LoadingPage/>)
            : (<SimpleGrid
              columns={{base:1,md:2,lg:2,xl:2}}
              spacing={3}
              mt={20}
            >
              {lastPosts.map((lastPost, index) => (
                <Box
                  key={index}
                  h={{base:300,md:350, lg:400}}
                  onClick={() => router.push(`/category/${lastPost.category}/post/${lastPost.id}`)}
                  cursor={"pointer"}
                >
                  <Image
                    src={lastPost.img}
                    alt={lastPost.title}
                    w={{base:250,md:400,lg:400}}
                    h={{base:250, md:300,lg:380}}
                    objectFit={"cover"}
                    objectPosition={"center"}
                    borderRadius={"md"}
                    overflow={"hidden"}
                  />
                  <Text
                    h={100}
                  >
                    {
                      lastPost.title.slice(0, 30)
                    }
                    {
                      lastPost.title.length > 30
                      && "..."
                    }
                  </Text>
                </Box>
              ))}

            </SimpleGrid>)
        }

      </LayoutDouble>
    </>
  )
};

export async function getServerSideProps(context: any) {
  const {params: {post}} = context;

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/posts/${post}`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}});
  const {response} = await res.json();

  return {
    props: {
      post: response,
    },
  };
}

export default Post