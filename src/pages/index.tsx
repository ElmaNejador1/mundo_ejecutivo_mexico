import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import {Box, Divider, Heading} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {SliderMultiple} from "@/components/SliderMultiple";
import {MostRead} from "@/components/home/MostRead";
import {MundoEjecutivoSpecials} from "@/components/home/MundoEjecutivoSpecials";
import {SliderMultipleNews} from "@/components/SliderMultopleNews";
import {MundoEjecutivoTV} from "@/components/home/MundoEjecutivoTV";

interface PropsPost {
  id: number,
  title: string,
  img: string,
  category: string,
  category_name: string,
}

interface PropsData {
  lastNews: PropsPost[],
  mostRead: PropsPost[],
  mujerEjecutiva: PropsPost[],
  mundoPolitico: PropsPost[],
  mundoEmpresarial: PropsPost[],
}

const Index = () => {
  const router = useRouter()
  const [data, setData] = useState<PropsData>({
    lastNews: [],
    mostRead: [],
    mujerEjecutiva: [],
    mundoPolitico: [],
    mundoEmpresarial: [],
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/v1/home', {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setData(res.data.response)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleClickPost = async (category: string, id: number) => await router.push(`/category/${category}/post/${id}`)

  return (
    <LayoutSingle title={"Mundo Ejecutivo CDMX"}>
      {
        isLoading
          ? (<LoadingPage/>)
          : (<>
            {
              data.mostRead.length > 0
              && (<MostRead
                mostRead={data.mostRead}
                handleClickPost={handleClickPost}
              />)
            }

            {
              data.mundoPolitico.length > 0
              && (<Box>
                <Divider borderColor="black" borderWidth="1px"/>

                <Heading
                  textAlign={"center"}
                  color={"white"}
                  my={2}
                  py={2}
                  fontSize={"2xl"}
                >
                  Mundo Político
                </Heading>

                <Divider borderColor="black" borderWidth="1px" w={"25%"} mx={"auto"}/>

                <SliderMultiple
                  posts={data.mundoPolitico}
                />
              </Box>)
            }

            {
              data.mujerEjecutiva.length > 0
              && (<Box>
                <Divider borderColor="black" borderWidth="1px"/>

                <Heading
                  textAlign={"center"}
                  color={"white"}
                  my={2}
                  py={2}
                  fontSize={"2xl"}
                >
                  Mujer Ejecutiva
                </Heading>

                <Divider borderColor="black" borderWidth="1px" w={"25%"} mx={"auto"}/>

                <SliderMultiple
                  posts={data.mujerEjecutiva}
                />
              </Box>)
            }

            {
              data.mundoEmpresarial.length > 0
              && (<Box>
                <Divider borderColor="black" borderWidth="1px"/>

                <Heading
                  textAlign={"center"}
                  color={"white"}
                  my={2}
                  py={2}
                  fontSize={"2xl"}
                >
                  Mundo Empresarial
                </Heading>

                <Divider borderColor="black" borderWidth="1px" w={"25%"} mx={"auto"}/>

                <SliderMultiple
                  posts={data.mundoEmpresarial}
                />
              </Box>)
            }

            {
              data.lastNews.length > 0
              && (<Box>
                <Divider borderColor="black" borderWidth="1px"/>

                <Heading
                  textAlign={"center"}
                  color={"white"}
                  my={2}
                  py={2}
                  fontSize={"2xl"}
                >
                  Ultimas Noticias
                </Heading>

                <Divider borderColor="black" borderWidth="1px" w={"25%"} mx={"auto"}/>

                <SliderMultiple
                  posts={data.lastNews}
                />
              </Box>)
            }

            <SliderMultipleNews/>

            <Box>
              <Divider borderColor="black" borderWidth="1px"/>

              <Heading
                textAlign={"center"}
                color={"white"}
                my={2}
                py={2}
                fontSize={"2xl"}
              >
                Mundo Ejecutivo TV
              </Heading>

              <Divider borderColor="black" borderWidth="1px" w={"25%"} mx={"auto"}/>

              <MundoEjecutivoTV/>
            </Box>

            <Box>
              <Divider borderColor="black" borderWidth="1px"/>

              <Heading
                textAlign={"center"}
                color={"white"}
                my={2}
                py={2}
                fontSize={"2xl"}
              >
                Especiales
              </Heading>

              <Divider borderColor="black" borderWidth="1px" w={"25%"} mx={"auto"}/>

              <MundoEjecutivoSpecials/>
            </Box>

            {/*<Box>*/}
            {/*  <Divider borderColor="black" borderWidth="1px"/>*/}

            {/*  <Heading*/}
            {/*    textAlign={"center"}*/}
            {/*    color={"white"}*/}
            {/*    my={2}*/}
            {/*    py={2}*/}
            {/*    fontSize={"2xl"}*/}
            {/*  >*/}
            {/*    Descargables*/}
            {/*  </Heading>*/}

            {/*  <Divider borderColor="black" borderWidth="1px" w={"25%"} mx={"auto"}/>*/}

            {/*  <MundoEjecutivoDownloadable/>*/}
            {/*</Box>*/}
          </>)
      }
    </LayoutSingle>
  )
}

export default Index