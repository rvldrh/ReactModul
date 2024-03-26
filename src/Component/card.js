import React, { Component } from "react";
import { motion } from 'framer-motion';

export default class Card extends Component {
  render() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="col-lg-6 col-sm-12 p-2">
          <div className="card mx-auto text-center">
            <div className="card-body row">
              {/* menampilkan Gambar / cover */}
              <div className="col-5">
                <img src={this.props.cover} className="img" height="200" alt="Cover" />
              </div>

              {/* menampilkan deskripsi */}
              <div className="col-7 d-flex align-items-center">
                <div>
                  <h5 className="text-info">{this.props.judul}</h5>
                  <h6 className="text-dark">Penulis: {this.props.penulis}</h6>
                  <h6 className="text-dark">Penerbit: {this.props.penerbit}</h6>
                  <h6 className="text-danger">Harga: Rp {this.props.harga}</h6>

                  {/* button untuk mengedit */}
                  <button
                    className="btn btn-sm btn-primary m-1"
                    onClick={this.props.onEdit}
                  >
                    Edit
                  </button>

                  {/* button untuk menghapus */}
                  <button
                    className="btn btn-sm btn-danger m-1"
                    onClick={this.props.onDrop}
                  >
                    Hapus
                  </button>
                  <button
                    className="btn btn-sm btn-success m-1"
                    onClick={this.props.onCart}
                  >
                    Tambahkan ke keranjang belanja
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}
