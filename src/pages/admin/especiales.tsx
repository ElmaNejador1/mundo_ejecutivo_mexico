 import {Box, Button, Divider, Flex, Heading} from "@chakra-ui/react";
import {Sidebar} from "@/components/Sidebar/Sidebar";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
 import {TableSpecials} from "@/components/Specials/TableSpecials";

const Tv = () => {
  const router = useRouter();

  return (
    <Sidebar title={"Mundo Ejecutivo Especiales"}>
      <Box pb={10}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h1" size="lg">
            Especiales
          </Heading>
          <Button
            onClick={() => router.push("/admin/especiales/new")}
            colorScheme="blue"
            variant="solid"
            size="sm"
            mx={5}
            rightIcon={<FontAwesomeIcon icon={faPlus}/>}
          >
            Agregar Especial
          </Button>
        </Flex>
        <Divider borderColor="black" borderWidth="1px"/>
      </Box>

      <TableSpecials/>
    </Sidebar>
  )
}

export default Tv;