import {Flex, FlexProps, useBreakpointValue} from '@chakra-ui/react'
import {Navbar} from "@/components/Layout/Navbar";
import {Footer} from "@/components/Layout/Footer";
import {AnnouncementsRight} from "@/components/Layout/AnnouncementsRight";
import React, {useEffect} from "react";
import axios from "axios";
import {AnnouncementsLeft} from "@/components/Layout/AnnouncementsLeft";
import {Placeholder} from "@/components/Layout/Placeholder";
import ConvertidorMoneda from "@/components/Layout/Badge";

interface Props extends FlexProps {
}

export const LayoutDouble = (props: Props) => {
  const isDesktop = useBreakpointValue({base: false, lg: false, xl:true})
  const {children} = props

  useEffect(() => {
    axios.post("/api/v1/visits", {}, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}}).then()
  }, [])

  return (
    <>
      <Flex
        direction="column"
        flex="1"
        bgImage="url('/assets/icons/background.svg')"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        color={"white"}
      >
        <Navbar/>

        <ConvertidorMoneda/>

        <Flex
          direction={{base: "column", md: "column", lg:"column",xl:"row" }}
          color="white"
        >
          {
            isDesktop
            && (<AnnouncementsLeft/>)
          }
          <Flex
            as="main"
            role="main"
            direction="column"
            flex="1"
            w={{base: "100%", md: "100%"}}
            px={{base: 4, md: 8}}
            {...props}
          >
            <Placeholder bg="bg-accent" minH="md">
              {children}
            </Placeholder>
          </Flex>
          {
            !isDesktop
            && (<AnnouncementsLeft/>)
          }
          <AnnouncementsRight/>
        </Flex>
        <Footer/>
      </Flex>
    </>
  )
}


