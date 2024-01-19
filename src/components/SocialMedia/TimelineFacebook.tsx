import {useEffect, useState} from "react";
import axios from "axios";
import {Avatar, Box, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {LoadingPage} from "@/components/LoadingPage";
import moment from "moment/moment";

const accessToken = "EAAVsr9NeVN4BO7QievxuRD1o1HVfC7sJgO7oNzC9piuOaCZAUoMq9kKlWHfwxfON263gCrIvRZAFkOfmfJVDFiYuRjM1QNY5ebeRtrNmdGmLwMxPNzbQ373J14x3SZCQisQ83LZBPTBNypE2jCjQld9ZCAGHUlBar7QSd8Ft1z4pMTr2cHcK0Jb51hm70meJZCowZDZD"

interface Post {
  id: string;
  message?: string;
  created_time: string;
}

interface Profile {
  name: string;
  picture: string;
}

export const TimelineFacebook = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [profile, setProfile] = useState<Profile>({
    name: "Mundo Ejecutivo CDMX",
    picture: "/assets/icons/logoRRSS.png",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://graph.facebook.com/v16.0/me/accounts?access_token=${accessToken}`)
      .then(res => {
        const {access_token} = res.data.data[0]

        axios.get(`https://graph.facebook.com/v16.0/me?fields=name,picture&access_token=${access_token}`)
          .then(res => {
            const {name, picture: {data: {url}}} = res.data

            setProfile({
              name,
              picture: url,
            })
          })

        axios.get(`https://graph.facebook.com/v16.0/me/feed?access_token=${access_token}`)
          .then(res => {
            setPosts(res.data.data)
          })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (<Box>
    {
      isLoading
        ? (<LoadingPage/>)
        : (<Box
          border="1px"
          borderColor="gray.200"
          borderRadius="2xl"
        >
          <HStack
            p={2}
            borderBottom="1px"
            borderColor="gray.200"
            _hover={{
              cursor: "pointer",
              backgroundColor: "gray.100",
              textDecoration: "underline",
            }}
            onClick={() => window.open("https://www.facebook.com/profile.php?id=61554972307150", "_blank")}
          >
            <Avatar
              size="md"
              name={profile.name}
              src={profile.picture}
            />
            <Heading as="h1" size="md">{profile.name}</Heading>
          </HStack>

          <Box
            scrollBehavior="smooth"
            height="50vh"
            overflowY="scroll"
          >
            {
              posts.map(({id, created_time, message}) =>
                message && (<Box
                  key={id}
                  borderBottom={"1px"}
                  borderColor="gray.200"
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(`https://www.facebook.com/${id}`, "_blank")}
                >
                  <Box
                    p={2}
                    m={2}
                  >
                    <HStack>
                      <Avatar
                        size="sm"
                        name={profile.name}
                        src={profile.picture}
                      />
                      <VStack
                        spacing={0}
                      >
                        <Heading size="sm">{profile.name}</Heading>
                        <Text
                          fontSize="xs"
                        >
                          {
                            moment(created_time).format("DD/MM/YYYY h:mm A")
                          }
                        </Text>
                      </VStack>
                    </HStack>
                    <Text>{message}</Text>
                  </Box>
                </Box>))
            }
          </Box>
        </Box>)
    }
  </Box>)
}