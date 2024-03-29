import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {Category} from "@/interfaces/Category";
import {useRouter} from "next/router";

interface Props {
  handleClickNav: (url: string) => void;
  category: Category;
}

export const NavbarItem = ({handleClickNav, category: {children, id, name, url}}: Props) => {
  const router = useRouter()

  return (
    <Menu key={id}>
      {
        children.length <= 0
          ? (<Button
            size={"md"}
            variant="unstyled"
            textDecoration={router.query.category === url || router.pathname === url ? "underline" : "none"}
            colorScheme={"blackAlpha.500"}
            onClick={() => handleClickNav(name === "Inicio" ? "/" : `/${url}`)}
          >
            {name}
          </Button>)
          : (<>
            <MenuButton
              as={Button}
              size={"md"}
              rightIcon={children.length > 0 ? <FontAwesomeIcon icon={faChevronDown}/> : <FontAwesomeIcon icon={faChevronDown}/>}
              textDecoration={router.query.category === url || router.pathname === url ? "underline" : "none"}
              variant="unstyled"
              colorScheme={"blackAlpha.500"}
            >
              {name}
            </MenuButton>
            <MenuList>
              {children.map(({name, id, url}) => (
                <MenuItem
                  as={Button}
                  key={id}
                  variant={"ghost"}
                  size={"lg"}
                  textDecoration={router.query.category === url || router.pathname === url ? "underline" : "none"}
                  onClick={() => handleClickNav(name === "Inicio" ? "/" : `/${url}`)}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "#B3D3F4"
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </MenuList>
          </>)
      }
    </Menu>
  )
}