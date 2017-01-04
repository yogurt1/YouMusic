import * as React from "react"
import styled from "styled-components"
import {Link} from "react-router"
import Media from "react-media"
import {Dropdown} from "semantic-ui-react"
import {Flex} from "app/components/ui/Grid"

const MenuWrapper = styled.div`float:right;`
const MenuItem = styled(Link)`
    padding: 5px;
    display: block;
    font-size: 11pt;
    color: white;
    text-decoration: none;
`

const DropdownMenu: React.StyledComponent = ({links}) => (
    <Dropdown text="More" basic>
        <Dropdown.Menu as="div">
            {links.map((link, key) => (
                <Dropdown.Item as={Link} key={key} to={link.to}>
                    {link.name}
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown>
)

export interface Props {
    links: Array<any>
}

const Menu: React.StatelessComponent<Props> = ({links}) => (
    <MenuWrapper>
        <Media query={{maxWidth: "764px"}}>
            {m => m ? (
                <DropdownMenu links={links} />
            ) : (
                <Flex>
                    {links.map((link, key) => (
                        <MenuItem
                            key={key}
                            to={link.to}>
                            {link.name}
                        </MenuItem>
                    ))}
                </Flex>
            )}
        </Media>
    </MenuWrapper>
)

export default Menu
