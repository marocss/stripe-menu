import React from 'react';


import { Container, DropdownStyles } from './styles';
import { DropdownOption, DropdownProvider, DropdownRoot } from '../Dropdown'
import { Products, Developers, Company } from '../Content'

const dropdownOptions = [
  "Produtos",
  "Desenvolvedores", 
  "Empresa"
]

function Navbar() {
  return(
    <DropdownProvider>
      <DropdownStyles>
        <Container>
          <ul>
            <li>
              <DropdownOption
                name={dropdownOptions[0]}
                content={Products}
                backgroundHeight={286}
                />
            </li>
            <li>
              <DropdownOption
                name={dropdownOptions[1]}
                content={Developers}
                backgroundHeight={167}
                />
            </li>
            <li>
              <DropdownOption
                name={dropdownOptions[2]}
                content={Company}
                backgroundHeight={215}
                />
            </li>
          </ul>
        </Container>
        <DropdownRoot />
      </DropdownStyles>
    </DropdownProvider>
  )
}

export default Navbar;