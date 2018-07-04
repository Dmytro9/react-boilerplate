import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarContent = () => (
  <ul>
    <li>
      <NavLink
        to='/crud/list'
        className='nav_btn'
        activeClassName='active_link'
      >
        List
      </NavLink>
    </li>
    <li>
      <NavLink
        to='/crud/add-new'
        className='nav_btn'
        activeClassName='active_link'
      >
        Add New Item
      </NavLink>
    </li>
  </ul>
)

export default SidebarContent
