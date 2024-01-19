import Head from "next/head";
import {Box, Button, Center, Image} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useState} from "react";

const NotFound = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await router.push("/")
  }

  return (<>
    <Head>
      <title>Pagina no encontrada</title>
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

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Image
        width="60%"
        src="/assets/images/404NotFound.png"
        alt="logo"
      />
      <Center>
        <Button
          onClick={handleClick}
          colorScheme="blue"
          isLoading={isLoading}
        >
          Ir al inicio
        </Button>
      </Center>
    </Box>
  </>);
};

export default NotFound;