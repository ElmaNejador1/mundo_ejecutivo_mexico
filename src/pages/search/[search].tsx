import {useRouter} from "next/router";
import {Box, Image, Flex, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {LoadingPage} from "@/components/LoadingPage";
import {Pagination} from "@/components/Pagination";
import {LayoutSingle} from "@/components/Layout/LayoutSingle";
import {Post} from "@/interfaces/Post";

const Search = () => {
  const router = useRouter()

  const {search} = router.query

  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [data, setData] = useState<Post[]>([])

  useEffect(() => {
    if (!search) return;

    axios.get(`/api/v1/search?page=${currentPage}&search=${search}`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then((res) => {
        setData(res.data.response.product)
        setTotalPages(res.data.response.total)
      })
      .finally(() => setLoading(false))
  }, [search, currentPage])

  return (<LayoutSingle title={typeof search === "string" ? `${search} | Hidalgo` : "Hidalgo"}>
    {
      loading
        ? (<LoadingPage/>)
        : (<Box>
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
            mb={5}
          >
            Resultados de búsqueda para: {search}
          </Heading>

          <SimpleGrid
            spacing={10}
            columns={{base: 1, md: 3}}
          >
            {
              data.map((row) => (
                <Flex
                  key={row.id}
                  boxShadow="dark-lg"
                  p={5}
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  cursor="pointer"
                  onClick={() => router.push(`/category/${row.category}/post/${row.id}`)}
                  borderRadius={"md"}
                >
                  <Image
                    src={row.img && row.img != "" ? row.img : '/assets/images/placeholderImg.jpg'}
                    alt="Imagen"
                  />

                  <Heading
                    as="h2"
                    size="md"
                    pb={4}
                  >
                    {row.title.slice(0, 50)}
                    {row.title.length > 50 ? "..." : ""}
                  </Heading>

                  <Text>
                    {row.content.slice(0, 50)}
                    {row.content.length > 50 ? "..." : ""}
                  </Text>
                </Flex>
              ))
            }
          </SimpleGrid>

          {
            totalPages > 0
              ? (<Pagination
                total={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />)
              : (<Flex
                direction={"column"}
                alignItems={"center"}
              >
                <Heading>
                  Aún no hay publicaciones en esta categoría
                </Heading>
                <Image
                  mt={5}
                  src={"/assets/images/placeholderImg.jpg"}
                  alt={"404"}
                  w={"50%"}
                />
              </Flex>)
          }
        </Box>)
    }
  </LayoutSingle>)
}

export default Search