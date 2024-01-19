import {Box, Flex, IconButton, SimpleGrid, useBreakpointValue, useDisclosure} from '@chakra-ui/react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import {useRouter} from "next/router";
import axios from "axios";
import {NavbarMobile} from "@/components/Layout/NavbarMobile";
import React, {useEffect, useState} from "react";
import {Category} from "@/interfaces/Category";
import {NavbarItem} from "@/components/Layout/NavbarItem";
import {Logo} from "@/components/Logo";
import {Search} from "@/components/Layout/Search";


export const Navbar = () => {
  const router = useRouter()
  const isDesktop = useBreakpointValue({base:false, lg:false,xl: true})
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [pages, setPages] = useState<Category[]>([])

  const handleClickNav = async (url: string) => {
    switch (url) {
      case "/":
        await router.push("/")
        break
      case "/videos":
        await router.push("/videos")
        break
      default:
        await router.push(`/category${url}`)
    }
  }

  useEffect(() => {
    axios.get('/api/v1/categories', {
      params: {navbar: true,},
      headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}
    })
      .then(res => {
        if (res.data.response.length > 0) {

          setPages([
            ...res.data.response,
            {
              id: 0,
              name: "Videos",
              active: true,
              date_update: "2023-02-15T06:00:00.000Z",
              time_update: "11:47:41",
              father: null,
              url: "videos",
              father_name: null,
              children: [],
            }
          ])
        }
      })
  }, [])

  return (
    <>
      <Box as="section">
        <Box as="nav" bg="bg-surface" boxShadow="sm">
          <Flex
            bg={"black"}
            px={{base: "5", lg: "10"}}
            alignItems="center"
            justify="space-between"
          >
            <Logo/>

            {
              !isDesktop && (<Search/>)
            }


            {isDesktop
              ? (<Flex>
                <SimpleGrid
                  columns={{lg:5, xl:pages.length}}
                >
                  {pages.map((page, index) => (
                    <NavbarItem
                      key={index}
                      category={page}
                      handleClickNav={handleClickNav}
                    />
                  ))}
                </SimpleGrid>
              </Flex>)
              : (<IconButton
                variant="ghost"
                icon={<FontAwesomeIcon icon={faBars}/>}
                size={"150px"}
                aria-label="Open Menu"
                onClick={onOpen}
              />)
            }
    
            {
              isDesktop && (<Search/>)
            }
            
          </Flex>
        </Box>
      </Box>
      <NavbarMobile
        isOpen={isOpen}
        onClose={onClose}
        handleClickNav={handleClickNav}
        pages={pages}
      />
    </>
  )
}
