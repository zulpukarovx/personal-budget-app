import React from 'react'

import logomark from "../assets/logomark.svg"
import { Form, NavLink } from 'react-router-dom'

import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'




const Nav = ({userName}) => {
  return (
    <nav>
        <NavLink
            to="/"
            area-label="Go to home"
        >
            <img src={logomark} alt="" height={30} />
            <span>MyBudget</span>
        </NavLink>
        {
            userName && (
                <Form
                    method='post'
                    action="logout"
                    onSubmit={(e) => {
                        if(!confirm("Delete the user and all data?")){
                            e.preventDefault()
                        }
                    }}
                >
                    <button 
                        type='submit' 
                        className='btn btn--warning'
                    >
                       <span>Log Out</span>
                       <ArrowLeftStartOnRectangleIcon width={20} />
                    </button>
                </Form>
            )
        }
    </nav>
  )
}

export default Nav