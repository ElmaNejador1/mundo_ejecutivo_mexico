import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, HStack, Skeleton, Stack, Text, useBreakpointValue,Table, Thead, Tbody, Tr, Th, Td} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";


interface Currency {
  display: string,
  name: string,
  value: number
}

const convert = [
  {
    display: "DÓLAR",
    name: "SF43718",
    value: 0,
  },
  {
    display: "UDIS",
    name: "SP68257",
    value: 0
  },
  {
    display: "CCP",
    name: "SF286",
    value: 0
  },
  {
    display: "CCP-UDIS",
    name: "SF3368",
    value: 0
  },
  {
    display: "CPP",
    name: "SF285",
    value: 0
  },
  {
    display: "TIIE 28 DÍAS",
    name: "SF43783",
    value: 0
  },
  {
    display: "TIIE 91 DÍAS",
    name: "SF43878",
    value: 0
  },
  {
    display: "TIIE DE FONDEO",
    name: "SF331450",
    value: 0
  },
]

const Converter = ({currencies}: { currencies: Currency[] }) => {
  return (<Stack
    direction={{base: "column", md: "row"}}
    spacing={4}
    align="center"
    justify="space-evenly"
    borderBottom="2px"
    mb={5}
    p={6}
  >
    {
      currencies.map((currency, index) => (
        <HStack
          key={index}
          spacing={4}
        >
          <Text
            color="text"
          >
            {currency.display}
          </Text>

          <Badge
            variant='solid'
            colorScheme='red'
            borderRadius='md'
          >
            {currency.value}
            {
              (currency.display).includes("TIIE")
              && (" %")
            }
          </Badge>
        </HStack>
      ))
    }
  </Stack>)
}

const ConvertidorMoneda: React.FC = () => {
  const isDesktop = useBreakpointValue({base: false, lg: false, xl:true})

  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    axios.get(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${convert.map(currency => currency.name).join(",")}/datos?token=40ea37a2f9610284c8847063c4d3e5d7e1c28397c17742408c7ce8a69f8ea6b8`)
      .then(res => {
        const data = res.data.bmx.series;
        const tempCurrencies = [...convert]

        tempCurrencies.forEach((currency) => {
          const find = data.find((item: any) => item.idSerie === currency.name)

          if (find) currency.value = find.datos[find.datos.length - 1].dato
        });

        setCurrencies(tempCurrencies)
      })
      .finally(() => setLoading(false))
  }, []);
  return (
    <>
      {loading ? (
        <Stack>
          <Skeleton height='100px'/>
        </Stack>
      ) : (
        <>
          {isDesktop ? (
            <Converter currencies={currencies}/>
          ) : (
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='center'>
                      Tipo de cambio y tasas
                    </Box>
                    <AccordionIcon/>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Table variant="simple" size="sm" mb={5}>
                    <Thead>
                    <Tr>
                      <Th color={"red"}>Divisa / Accion</Th>
                      <Th color={"red"}>Valor</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {currencies.map((currency, index) => (
                    <Tr key={index}>
                      <Td>
                        <Text color="text" p={0}>
                        {currency.display}
                        </Text>
                      </Td>
                      <Td>
                        <Badge variant='solid' colorScheme='red' borderRadius='sm'>
                        {currency.value}
                        {(currency.display).includes("TIIE") && (" %")}
                        </Badge>
                      </Td>
                    </Tr>
                    ))}
                    </Tbody>
                  </Table>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </>
      )}
    </>
    );
}

export default ConvertidorMoneda;
