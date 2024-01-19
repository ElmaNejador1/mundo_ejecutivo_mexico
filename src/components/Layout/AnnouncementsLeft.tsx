import {Box, Divider, Flex, Heading} from "@chakra-ui/react";
import {TimelineTwitter} from "@/components/SocialMedia/TimelineTwitter";
import React from "react";

export const AnnouncementsLeft = () => {
  return (<Flex
      as="aside"
      direction="column"
      //w={{base: "100%", md: "100%", xl:"50%"}}
      w={{base: "100%", md: "100%", lg:"100%", xl:"20%"}}
      pr={{base: 8, md: 2}}
      pl={{base: 8, md: 2}}
      pt={{base: 0, md: 3}}
    >
      <Box
        mb={5}
      >
        <Heading as="h1" size="lg">:::::</Heading>
        <Divider borderColor="black" borderWidth="1px"/>
      </Box>

      <TimelineTwitter/>
      <Divider my={5} borderColor="gray.200" borderWidth="1px"/>

      {/*<TimelineFacebook/>*/}
      {/*<Divider my={5} borderColor="gray.200" borderWidth="1px"/>*/}
    </Flex>
  )
}

