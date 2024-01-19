import {Sidebar} from "@/components/Sidebar/Sidebar";
import {Button, FormControl, FormHelperText, FormLabel, Input, SimpleGrid, useDisclosure, useToast, Box, Textarea, Select, Flex} from "@chakra-ui/react";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {faTrash, faArrowUpFromBracket, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ConfirmDialog} from "@/components/ConfirmDialog";
import {LoadingPage} from "@/components/LoadingPage";
import {VideoType} from "@/interfaces/VideoType";
import parse from "html-react-parser";

const resizeIframe = (url: string, newWidth: string, newHeight: string) => url.replace(/width=['"](\d+)['"]\s+height=['"](\d+)['"]|height=['"](\d+)['"]\s+width=['"](\d+)['"]/g, `width='${newWidth}' height='${newHeight}'`)

const getDimensions = (url: string) => url.match(/width='(\d+)'\s*height='(\d+)'/)

const New = () => {
  const router = useRouter();
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure()

  const [dataForm, setDataForm] = useState({
    url: "",
    title: "",
    id_video_type: 0,
  })

  const [dataFormError, setDataFormError] = useState({
    url: false,
    title: false,
    id_video_type: false,
  })

  const [widthHeight, setWidthHeight] = useState({
    width: "",
    height: ""
  })

  const [eventTypes, setEventTypes] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/video_type", {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(res => {
        setEventTypes(res.data.response);
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const loadData = (id: string) => {
      axios.get(`/api/v1/video/${id}`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
        .then(res => {
          setDataForm(res.data.response);

          const match = getDimensions(res.data.response.url)

          if (match) {
            setWidthHeight({
              width: match[1],
              height: match[2]
            })
          }
        })
        .catch(err => {
          toast({
            title: "Error",
            description: err.response.data.message,
            status: "error",
            duration: 5000
          })
        })
    }

    if (router.query.id && typeof router.query.id === "string") loadData(router.query.id);
  }, [router.query, toast]);

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    value = value.replaceAll(/"/g, "'")

    setDataForm({...dataForm, [name]: value});
    setDataFormError({...dataFormError, [name]: value.length === 0})

     if (name === "url") {
      const match = getDimensions(value)

      if (match) {
        setWidthHeight({
          width: match[1],
          height: match[2]
        })
      }
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    axios.post("/api/v1/video", {
      ...dataForm,
      url: resizeIframe(dataForm.url, widthHeight.width, widthHeight.height)
    }, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(async res => {
        toast({
          title: "Video creado",
          description: res.data.message,
          status: "success",
          isClosable: true,
          position: "top-right"
        });
        await router.push("/admin/videos");
      })
      .catch(err => {
        setIsLoading(false);

        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          isClosable: true,
          position: "top-right"
        });
      })
  }

  const handleUpdate = (id: string) => {
    setIsLoading(true);

    axios.put(`/api/v1/video/${id}`, {
      ...dataForm,
      url: resizeIframe(dataForm.url, widthHeight.width, widthHeight.height)
    }, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(async res => {
        toast({
          title: "Video actualizado",
          description: res.data.message,
          status: "success",
          isClosable: true,
          position: "top-right"
        });
        await router.push("/admin/videos");
      })
      .catch(err => {
        setIsLoading(false);

        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          isClosable: true,
          position: "top-right"
        });
      })
  }

  const handleDelete = (id: string) => {
    setIsLoading(true);

    axios.delete(`/api/v1/video/${id}`, {headers: {Authorization: `${process.env.NEXT_PUBLIC_TOKEN_WEB}`}})
      .then(async res => {
        toast({
          title: "Video eliminado",
          description: res.data.message,
          status: "success",
          isClosable: true,
          position: "top-right"
        });
        await router.push("/admin/videos");
      })
      .catch(err => {
        setIsLoading(false);

        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          isClosable: true,
          position: "top-right"
        });
      })
  }

  return (
    <Sidebar title={"Video"}>
      {
        loading
          ? (<LoadingPage/>)
          : (<form onSubmit={handleSubmit}>
            <SimpleGrid
              columns={{base: 1, md: 2}}
              spacing={{base: 4, md: 8}}
            >
              <FormControl>
                <FormLabel>Título</FormLabel>
                <Input name="title" onChange={handleChange} value={dataForm.title} type={"text"} borderColor={"blackAlpha.500"} isRequired/>
                {dataFormError.title && <FormHelperText color={"red"} fontSize={"sm"}>Este campo es obligatorio</FormHelperText>}
              </FormControl>
              <FormControl>
                <FormLabel>Tipo de video</FormLabel>
                <Select
                  borderColor={"blackAlpha.500"}
                  value={dataForm.id_video_type}
                  name="id_video_type"
                  onChange={handleChange}
                  isRequired
                >
                  {
                    eventTypes.map(eventType => (<option key={eventType.id} value={eventType.id}>{eventType.type}</option>))
                  }
                </Select>
                {dataFormError.id_video_type && <FormHelperText color={"red"} fontSize={"sm"}>Este campo es obligatorio</FormHelperText>}
              </FormControl>
              <FormControl>
                <FormLabel>Url</FormLabel>
                <Textarea name="url" onChange={handleChange} value={dataForm.url} borderColor={"blackAlpha.500"} isRequired/>
                {dataFormError.url && <FormHelperText color={"red"} fontSize={"sm"}>Este campo es obligatorio</FormHelperText>}
              </FormControl>
              {
                dataForm.url && dataForm.url !== ""
                && (<>
                  <FormControl>
                    <FormLabel>Dimensiones (Ancho - Alto)</FormLabel>
                    <Flex
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <Input type="number" borderColor={"blackAlpha.500"} isRequired value={widthHeight.width} name="width" onChange={({target: {name, value}}) => setWidthHeight({...widthHeight, [name]: value})} w={20}/>
                      <Input type="number" borderColor={"blackAlpha.500"} isRequired value={widthHeight.height} name="height" onChange={({target: {name, value}}) => setWidthHeight({...widthHeight, [name]: value})} w={20}/>
                    </Flex>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Video</FormLabel>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      direction="column"
                    >
                      {(parse(resizeIframe(dataForm.url, widthHeight.width, widthHeight.height)))}
                    </Flex>
                  </FormControl>
                </>)
              }
            </SimpleGrid>
            {
              (router.query.id && typeof router.query.id === "string")
                ? (<>
                  <Button
                    colorScheme={"green"}
                    my={5}
                    onClick={() => typeof router.query.id === "string" && handleUpdate(router.query.id)}
                    isLoading={isLoading}
                    rightIcon={<FontAwesomeIcon icon={faArrowUpFromBracket}/>}
                  >
                    Actualizar
                  </Button>
                  <Button
                    colorScheme={"red"}
                    ml={5}
                    onClick={onOpen}
                    isLoading={isLoading}
                    rightIcon={<FontAwesomeIcon icon={faTrash}/>}
                  >
                    Eliminar
                  </Button>
                  <ConfirmDialog
                    isOpen={isOpen}
                    onConfirm={handleDelete}
                    id={router.query.id}
                    onClose={onClose}
                    buttonAlertDialog={"Eliminar"}
                    titleAlertDialog={"Eliminar Video"}
                    messageAlertDialog={"¿Está seguro que desea eliminar este Video?"}
                  />
                </>)
                : (<Button
                  type={"submit"}
                  colorScheme={"green"}
                  my={5}
                  isLoading={isLoading}
                  rightIcon={<FontAwesomeIcon icon={faSave}/>}
                >
                  Guardar
                </Button>)
            }
          </form>)
      }
    </Sidebar>
  )
}

export default New;