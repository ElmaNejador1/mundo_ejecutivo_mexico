import {Flex, FlexProps} from '@chakra-ui/react'
import {Navbar} from "@/components/Layout/Navbar";
import {Footer} from "@/components/Layout/Footer";
import Head from "next/head";
import React, {useEffect} from "react";
import axios from "axios";
import {Placeholder} from "@/components/Layout/Placeholder";
import ConvertidorMoneda from "@/components/Layout/Badge";
import {AnnouncementsRight} from "@/components/Layout/AnnouncementsRight";

interface Props extends FlexProps {
  title: string;
}

export const LayoutSingle = (props: Props) => {
  const {children, title} = props

  useEffect(() => {
    axios.post("/api/v1/visits", {}, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}}).then()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
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

        <meta property="og:image" content="https://mundoejecutivomexico.com/assets/icons/logoMeta.jpg"/>
        <meta property="og:image/png" content="https://mundoejecutivomexico.com/assets/icons/logo.png"/>
        <meta property="twitter:title" content="Mundo Ejecutivo CDMX"/>
        <meta property="twitter:site" content="https://mundoejecutivomexico.com"/>
        <meta property="twitter:image" content="https://mundoejecutivomexico.com/assets/icons/logo.png"/>
      </Head>

      <Flex
        direction="column"
        flex="1"
        bgImage="url('/assets/icons/background.jpg')"
        //bgRepeat="no-repeat"
        //bgSize="cover"
        //bgPosition="center"
        color={"white"}
      >
        <Navbar/>

        <ConvertidorMoneda/>

        <Flex
          direction={{base: "column", xl: "row"}}
        >
          <Flex
            as="main"
            role="main"
            direction="column"
            flex="1"
            w={{base: "100%", md: "100%"}}
            {...props}
          >
            <Placeholder bg="bg-accent" minH="md">
              {children}
            </Placeholder>
          </Flex>
          <AnnouncementsRight/>
        </Flex>
        <Footer/>
      </Flex>
    </>
  )
}


