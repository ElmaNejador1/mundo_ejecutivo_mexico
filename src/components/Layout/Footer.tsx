import {Box, BoxProps, Button, ButtonGroup, Flex, Heading, HStack, IconButton, Text, VStack} from '@chakra-ui/react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons"
import {Logo} from "@/components/Logo";

const redes = [
  {
    name: "Facebook",
    icon: <FontAwesomeIcon fontSize="1.5rem" icon={faFacebook}/>,
    url: "https://www.facebook.com/profile.php?id=61554972307150"
  },
  {
    name: "Instagram",
    icon: <FontAwesomeIcon fontSize="1.5rem" icon={faInstagram}/>,
    url: "https://www.instagram.com/mundoejecutivocdmx"
  },
  {
    name: "Twitter",
    icon: <FontAwesomeIcon fontSize="1.5rem" icon={faTwitter}/>,
    url: "https://twitter.com/MundoE_CDMX"
  },
]

const directory = [
  {
    name: "Director General",
    person: "Eduardo Rivera Santamaria"
  },
  {
    name: "Redes Sociales",
    person: "Fabiola Ortega"
  },
  {
    name: "Asistente Editorial",
    person: "Israel Ortega"
  },
]

export const Footer = (props: BoxProps) => {
  return (
    <Box as="footer" role="contentinfo" px={{base: '8'}} py={{base: 5, md: 0}} bg={"black"} {...props}>
      <Flex
        direction={{base: "column",  xl:"row"}}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={{base: "100%", md: "100%", lg: "100%"}}
        my={"8"}
      >
        <Logo/>

        <VStack
          color={"white"}
        >
          <Heading
            size={"sm"}
          >
            Contacto
          </Heading>

          <Text
            onClick={() => window.open("mailto:globalmediamexico1@gmail.com")}
            cursor={"pointer"}
          >
            globalmediamexico1@gmail.com
          </Text>
          <Text
            cursor={"pointer"}
            onClick={() => window.open("tel:5544978919")}
          >
            55 2541 7830
          </Text>
        </VStack>

        <VStack
          color={"white"}
          spacing={5}
        >
          <Heading
            textAlign={"center"}
            fontSize={"xl"}
            fontWeight={"bold"}
          >
            Suscríbete al newsletter
          </Heading>

          <Button
            colorScheme={"red"}
            textTransform={"uppercase"}
            onClick={() => window.open("https://issuu.com/mundoejecutivocdmx", "_blank")}
          >
            Suscríbete
          </Button>
        </VStack>

        <VStack
          my={{base: 8, md: 2}}
        >
          <Heading
            size={"sm"}
            color={"white"}
          >
            Directorio
          </Heading>

          <VStack
            alignItems={"flex-start"}
          >
            {
              directory.map(({name, person}, index) => (
                <HStack
                  key={index}
                  color={"white"}
                >
                  <Text
                    fontWeight={"bold"}
                  >
                    {name}:
                  </Text>
                  <Text>
                    {person}
                  </Text>
                </HStack>
              ))
            }
          </VStack>
        </VStack>

        <VStack
          color={"white"}
          spacing={5}
        >
          <Heading
            size={"sm"}
          >
            Se parte de nuestra comunidad
          </Heading>
          <ButtonGroup variant="ghost" spacing={5}>
            {
              redes.map(({name, url, icon}) => (
                <IconButton
                  color="white"
                  variant="link"
                  target={"_blank"}
                  key={name}
                  as="a"
                  href={url}
                  aria-label={name}
                  icon={icon}
                />
              ))
            }
          </ButtonGroup>
        </VStack>
      </Flex>
    </Box>
  )
}
