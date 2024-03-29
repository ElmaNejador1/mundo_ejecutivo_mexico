import {Box, Flex, FlexProps, Link, useDisclosure} from '@chakra-ui/react';
import {NavbarSidebar} from "@/components/Sidebar/NavbarSidebar";
import {Logo} from "@/components/Logo";
import {useRouter} from "next/router";
import {SidebarMobile} from "@/components/Sidebar/SidebarMobile";
import Head from "next/head";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {pagesSidebar} from "@/data/pagesSidebar";
import {LoadingPage} from "@/components/LoadingPage";

interface Props extends FlexProps {
}

interface User {
  id: number;
  username: string;
  id_rol: number;
}

export function Sidebar(props: Props) {
  const {children, title} = props

  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter();

  const handleClickNav = async (dir: string) => await router.push(dir)

  const [pages, setPages] = useState(pagesSidebar)

  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    id_rol: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/v1/profile", {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setUser(res.data.response);

        switch (res.data.response.id_rol) {
          case 1:
            setPages(pagesSidebar.filter(inicialPage => inicialPage.admin));
            break;
          case 2:
            setPages(pagesSidebar.filter(inicialPage => inicialPage.editor));
            break;
        }

        Cookies.set('user', JSON.stringify(res.data.response));
        setLoading(false);
      })
      .catch(() => {
        location.reload();
      })
  }, []);

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

      {
        loading
          ? (<LoadingPage/>)
          : (<Box minH="100vh">
            <Box
              w={60}
              borderRight={"1px solid rgba(0, 0, 0, 0.1)"}
              pos="fixed"
              h="full"
              display={{base: 'none', md: 'block'}}
            >
              <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
              >
                <Logo alt={true}/>
              </Flex>

              {
                pages.map(({icon, dir, name}, index) => (
                  <Link
                    key={index}
                    style={{textDecoration: "none"}}
                    onClick={() => handleClickNav(dir)}
                  >
                    <Flex
                      p="4"
                      m="1"
                      borderRadius="lg"
                      cursor="pointer"
                      color={router.pathname.search(dir) >= 0 ? 'white' : 'gray.700'}
                      bg={router.pathname.search(dir) >= 0 ? 'red' : 'white'}
                    >
                      <Box mr={4}>{icon}</Box>{name}
                    </Flex>
                  </Link>
                ))
              }
            </Box>

            <SidebarMobile
              isOpen={isOpen}
              onClose={onClose}
              handleClickNav={handleClickNav}
              pages={pages}
            />

            <NavbarSidebar onOpen={onOpen} username={user.username}/>

            <Box ml={{base: 0, md: 60}} p="4">
              {children}
            </Box>
          </Box>)
      }
    </>
  );
}
