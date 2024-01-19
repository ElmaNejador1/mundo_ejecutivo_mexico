import {Image} from '@chakra-ui/react'
import {useRouter} from "next/router";

interface Props {
  w?: string
  alt?: boolean
}

export const Logo = ({w, alt}: Props) => {
  const router = useRouter()
  const handleClick = async () => await router.push(`/`)

  return (
    // <Image
    //   onClick={handleClick}
    //   _hover={{
    //     cursor: "pointer",  Comentado ORS
    //   }}
    //   w={w ? `${w}px` : "200px"}
    //   src={alt ? "/assets/icons/logoAlt.png" : "/assets/icons/logoCDMX.png"}
    //   alt="logo"
    //   p={alt ? 2 : 0}
    // />
    <Image
      onClick={handleClick}
      _hover={{
        cursor: "pointer",
    }}
    w={{ base: "100px", md: w ? `${w}px` : "200px" }}
    src={alt ? "/assets/icons/cdmxME.svg" : "/assets/icons/cdmxME.png"}
    alt="logo"
    p={alt ? 2 : 0}
    />
  )
}