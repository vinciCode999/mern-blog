import React from 'react'
import {Footer} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsTwitterX, BsLinkedin, BsGithub } from 'react-icons/bs'

export default function FooterComponent() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className='mt-4'>
            <Link to="/" className='self-center whitespace-nowrap text-lg 
              sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1  
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
            text-white
            '>Alerta</span>
              VIVA
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-4 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About"/>
              <Footer.LinkGroup col>
                <Footer.Link  
                   href='#'
                  target="_blank"
                  rel="noopener noreffer"
                >
                  maps
                </Footer.Link>
                <Footer.Link
                  href='#'
                  target="_blank"
                  rel="noopener noreffer"
                >
                  districts
                </Footer.Link>              
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow Us"/>
              <Footer.LinkGroup col>
                <Footer.Link
                  href='#'
                  target="_blank"
                  rel="noopener noreffer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href='http://www.linkedin.com/in/vincent610'
                  target="_blank"
                  rel="noopener noreffer"
                >
                  Linkedin
                </Footer.Link>              
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal"/>
              <Footer.LinkGroup col>
                <Footer.Link
                  href='#'
                >
                  privacy policy
                </Footer.Link>

                <Footer.Link
                  href='#'
                >
                  terms &amp; conditions
                </Footer.Link>              
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright by="made with ❤ by Vinci Denis" year={new Date().getFullYear()}/>
          <div className="flex gap-6 mt-5 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook}/>
              <Footer.Icon href="#" icon={BsTwitterX}/>
              <Footer.Icon href="#" icon={BsGithub}/>
              <Footer.Icon href="#" icon={BsLinkedin}/>
          </div>
        </div>
      </div>
    </Footer>
  )
}
