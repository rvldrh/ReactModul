import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import { motion } from 'framer-motion';

export default class Pegawai extends Component {
  constructor() {
    super();
    this.state = {
      pegawai: [],
      nip: '',
      nama: '',
      alamat: '',
      action: '',
      search: '',
      modal: null,
    };
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Add = () => {
    this.setState({
      nip: '',
      nama: '',
      alamat: '',
      action: 'insert',
    });
    this.state.modal.show();
  };

  Edit = (item) => {
    this.setState({
      nip: item.nip,
      nama: item.nama,
      alamat: item.alamat,
      action: 'update',
    });
    this.state.modal.show();
  };

  getPegawai = () => {
    axios.get(`http://localhost:2000/pegawai`)
      .then(res => {
        const pegawai = res.data.pegawai;
        this.setState({ pegawai });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  findPegawai = (event) => {
    if (event.keyCode === 13) {
      let form = {
        nama: this.state.search,
      };
      axios
        .post(`http://localhost:2000/pegawai`, form)
        .then((response) => {
          this.setState({ pegawai: response.data.pegawai });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  SavePegawai = (event) => {
    event.preventDefault();
    let url = '';
    let method = '';

    if (this.state.action === 'insert') {
      url = 'http://localhost:2000/pegawai/save';
      method = 'POST';
    } else if (this.state.action === 'update') {
      url = 'http://localhost:2000/pegawai/update';
      method = 'POST';
    }

    let form = {
      nip: this.state.nip,
      nama: this.state.nama,
      alamat: this.state.alamat,
    };

    axios({
      method: method,
      url: url,
      data: form,
    })
      .then((response) => {
        this.getPegawai();
        this.setState({
          nip: '',
          nama: '',
          alamat: '',
          action: '',
        });
        // Menutup modal dengan Bootstrap
        this.state.modal.hide();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  Drop = (nip) => {
    let url = `http://localhost:2000/pegawai/${nip}`;
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios
        .delete(url)
        .then((response) => {
          this.getPegawai();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  closeModal = () => {
    this.setState({
      nip: '',
      nama: '',
      alamat: '',
      action: '',
    });
    this.state.modal.hide();
  };

  

  componentDidMount() {
    const modal = new Modal(document.getElementById('exampleModal'), {
      backdrop: 'static',
      keyboard: false, // Disable closing modal with Esc key or clicking outside
    });
    this.setState({ modal });
    this.getPegawai(); // Memanggil fungsi untuk mengambil data pegawai dari backend
  }

  render() {
    return (
      <div className="m-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="card">
            <div className="card-header bg-info text-white">Data Pegawai</div>
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-2"
                name="search"
                value={this.state.search}
                onChange={this.bind}
                onKeyUp={this.findPegawai}
                placeholder="Pencarian..."
              />
              <table className="table">
                <thead>
                  <tr>
                    <th>NIP</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(this.state.pegawai) && this.state.pegawai.length > 0 ? (
                    this.state.pegawai.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.nip}</td>
                          <td>{item.nama}</td>
                          <td>{item.alamat}</td>
                          <td>
                            <button className="btn btn-sm btn-info m-1" onClick={() => this.Edit(item)}>
                              Edit
                            </button>
                            <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.nip)}>
                              Hapus
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">Tidak ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button className="btn btn-success" onClick={this.Add}>
                Tambah Data
              </button>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {this.state.action === 'insert' ? 'Tambah Data Pegawai' : 'Edit Data Pegawai'}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={this.SavePegawai}>
                  <div className="modal-body">
                    {this.state.action === 'insert' && (
                      <div className="form-group">
                        <label htmlFor="nip">NIP</label>
                        <input
                          type="number"
                          className="form-control"
                          id="nip"
                          name="nip"
                          value={this.state.nip}
                          onChange={this.bind}
                          required
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="nama">Nama</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nama"
                        name="nama"
                        value={this.state.nama}
                        onChange={this.bind}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="alamat">Alamat</label>
                      <input
                        type="text"
                        className="form-control"
                        id="alamat"
                        name="alamat"
                        value={this.state.alamat}
                        onChange={this.bind}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {this.state.action === 'insert' ? 'Simpan' : 'Update'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
}
