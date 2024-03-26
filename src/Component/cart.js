import React, { Component } from "react";
import {motion} from 'framer-motion'

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [], // untuk menyimpan list cart
      user: "", // untuk menyimpan data nama user
      total: 0, // untuk menyimpan data total belanja
    };
  }

  initCart = () => {
    // memanggil data cart pada localStorage
    let tempCart = [];
    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"));
    }
    // memanggil data user pada localStorage
    let userName = localStorage.getItem("user");
    // kalkulasi total harga
    let totalHarga = 0;
    tempCart.forEach((item) => {
      totalHarga += item.harga * item.jumlahBeli;
    });
    // memasukkan data cart, user, dan total harga pada state
    this.setState({
      cart: tempCart,
      user: userName,
      total: totalHarga,
    });
  };

  componentDidMount() {
    this.initCart();
  }

  render() {
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.9}}
        >

      <div className="container">
        <div className="card col-12 mt-2">
          <div className="card-header bg-primary text-white">
            <h4>Data Keranjang Belanja</h4>
          </div>
          <div className="card-body">
            <h5 className="text-primary">Nama User: {this.state.user}</h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Nama Item</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.judul}</td>
                      <td>Rp {item.harga.toLocaleString()}</td>
                      <td>{item.jumlahBeli}</td>
                      <td>Rp {(item.harga * item.jumlahBeli).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 className="text-danger">Total Harga: Rp {this.state.total.toLocaleString()}</h4>
          </div>
        </div>
      </div>
                  </motion.div>
    );
  }
}
