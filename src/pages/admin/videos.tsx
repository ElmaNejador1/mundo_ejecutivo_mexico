import {Box, Button, Divider, Flex, Heading} from "@chakra-ui/react";
import {Sidebar} from "@/components/Sidebar/Sidebar";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {TableVideos} from "@/components/Videos/TableVideos";

const Usuarios = () => {
  const router = useRouter();

  return (
    <Sidebar title={"Videos"}>
      <Box pb={10}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h1" size="lg">Videos</Heading>
          <Button
            onClick={() => router.push("/admin/videos/new")}
            bg={"#5d3a63"}
            _hover={{
              bg: '#8e5896'
            }}
            color="white"
            size="sm"
            mx={5}
            rightIcon={<FontAwesomeIcon icon={faPlus}/>}
          >
            Agregar Video
          </Button>
        </Flex>
        <Divider borderColor="black" borderWidth="1px"/>
      </Box>

      <TableVideos/>
    </Sidebar>
  )
}

export default Usuarios;