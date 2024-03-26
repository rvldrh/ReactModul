import React from 'react'
import '../utama.css'
import {Route, Switch, useLocation} from 'react-router-dom'

import Beranda from './beranda'
import About from './about'
import Kontak from './kontak'
import Karya from './karya'
import Gallery from './gallery'
import Cart from './cart'
import Pegawai from './pegawai'

import {} from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

export default function AnimateRoute() {
    const location = useLocation();
  return (
    <AnimatePresence>
      <div className='nav'>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={Beranda} />
          <Route path='/about' component={About} />
          <Route path='/karya' component={Karya} />
          <Route path='/kontak' component={Kontak} />
          <Route path='/Gallery' component={Gallery} />
          <Route path='/Cart' component={Cart} />
          <Route path='/Pegawai' component={Pegawai} />
        </Switch>
      </div>
    </AnimatePresence>
  )
}
