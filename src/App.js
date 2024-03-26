import './style.css';
import React, {Component} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from './Routes/Form.js';
import Utama from '../src/Component/utama'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion' 
import Gallery from './Component/gallery';


class App extends Component {
  render() {
    return (
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.9}}
      >

      <div className='head'><hr />
        <Link to="/" className='link' >Beranda</Link>{' '}
        <Link to="/About" className='link'>About</Link>{' '}
        <Link to="/Karya" className='link'>Karya</Link>{' '}
        <Link to="/Kontak" className='link'>Kontak</Link>{' '}
        <Link to="/Gallery" className='link'>Gallery</Link>{' '}
        <Link to="/Cart" className='link'>Cart</Link>{' '}
        <Link to="/Pegawai" className='link'>Pegawai</Link>{' '}<hr/>
        <p><Utama /></p>
      </div>
      </motion.div>
    )
  }
}

export default App;
