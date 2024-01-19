import {Button} from "@chakra-ui/react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";

export const FloatingSocialMedia = () => {
  return (
    <>
      <Button
        onClick={() => window.open('https://www.facebook.com/profile.php?id=61554972307150')}
        colorScheme="facebook"
        size="sm"
        mb={2}
        leftIcon={<FontAwesomeIcon icon={faFacebook}/>}
      >
        Mundo Ejecutivo CDMX
      </Button>
      <Button
        onClick={() => window.open('https://twitter.com/MundoE_CDMX')}
        colorScheme="twitter"
        size="sm"
        mb={2}
        leftIcon={<FontAwesomeIcon icon={faTwitter}/>}
      >
        @MundoE_CDMX
      </Button>
      <Button
        onClick={() => window.open('https://www.instagram.com/mundoejecutivocdmx/')}
        bg="#702459"
        _hover={{
          bg: '#702459'
        }}
        color={'white'}
        size="sm"
        mb={2}
        leftIcon={<FontAwesomeIcon icon={faInstagram}/>}
      >
        @mundoejecutivocdmx
      </Button>
    </>
  )
}