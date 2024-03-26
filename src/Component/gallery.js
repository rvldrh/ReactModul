  import React, { Component } from "react";
  import Card from "./card";
  import { Modal } from "bootstrap";
  import {motion} from 'framer-motion'

  export default class Gallery extends Component {
    constructor() {
      super();
      this.state = {
        buku: [
          {
            isbn: "12345",
            judul: "Bulan",
            penulis: "Tere Liye",
            penerbit: "CV Harapan Kita",
            harga: 90000,
            cover:
              "https://cdn.gramedia.com/uploads/items/img20220905_11324048.jpg",
          },
          {
            isbn: "12346",
            judul: "Anak Badai",
            penulis: "Tere Liye",
            penerbit: "CV Nusa Bangsa",
            harga: 80000,
            cover: "https://cdn.gramedia.com/uploads/items/9786239607425.jpg",
          },
          {
            isbn: "54321",
            judul: "Bumi",
            penulis: "Tere Liye",
            penerbit: "CV Nusa Bangsa",
            harga: 70000,
            cover:
              "https://www.gramedia.com/blog/content/images/2021/04/bumi.jpg",
          },
        ],
        action: "",
        isbn: "",
        judul: "",
        penulis: "",
        penerbit: "",
        harga: 0,
        cover: "",
        selectedItem: null,
        keyword: "", // Added keyword state for search
      };
    }

    componentDidMount() {
      // Initialize Bootstrap modal
      const modal = new Modal(document.getElementById("modal_buku"), {
        backdrop: "static",
      });
      this.setState({ modal });

      this.setUser();
    }

    Add = () => {
      this.setState({
        isbn: Math.random(1, 10000000),
        judul: "",
        penulis: "",
        penerbit: "",
        cover: "",
        harga: 0,
        action: "insert",
      });
      this.state.modal.show();
    };

    Edit = (item) => {
      this.setState({
        isbn: item.isbn,
        judul: item.judul,
        penulis: item.penulis,
        penerbit: item.penerbit,
        cover: item.cover,
        harga: item.harga,
        action: "update",
        selectedItem: item,
      });
      this.state.modal.show();
    };

    Save = (event) => {
      event.preventDefault();
      // menampung data state buku
      let tempBuku = [...this.state.buku];

      if (this.state.action === "insert") {
        // menambah data baru
        tempBuku.push({
          isbn: this.state.isbn,
          judul: this.state.judul,
          penulis: this.state.penulis,
          penerbit: this.state.penerbit,
          cover: this.state.cover,
          harga: this.state.harga,
        });
      } else if (this.state.action === "update") {
        // menyimpan perubahan data
        let index = tempBuku.findIndex(
          (item) => item === this.state.selectedItem
        );
        tempBuku[index] = {
          isbn: this.state.isbn,
          judul: this.state.judul,
          penulis: this.state.penulis,
          penerbit: this.state.penerbit,
          cover: this.state.cover,
          harga: this.state.harga,
        };
      }

      this.setState({ buku: tempBuku });
      this.state.modal.hide();
    };

    Drop = (item) => {
      // beri konfirmasi untuk menghapus data
      if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // menghapus data
        let tempBuku = [...this.state.buku];
        // posisi index data yg akan dihapus
        let index = tempBuku.indexOf(item);

        // hapus data
        tempBuku.splice(index, 1);

        this.setState({ buku: tempBuku });
      }
    };

    setUser = () => {
      // cek eksistensi dari session storage
      if (sessionStorage.getItem("user") === null) {
        // kondisi jika session storage "user" belum dibuat
        let prompt = window.prompt("Masukkan Nama Anda", "");
        if (prompt === null || prompt === "") {
          // jika user tidak mengisikan namanya
          this.setUser();
        } else {
          // jika user telah mengisikan namanya

          // simpan nama user ke session storage
          sessionStorage.setItem("user", prompt);

          // simpan nama user ke state.user
          this.setState({ user: prompt });
        }
      } else {
        // kondisi saat session storage "user" telah dibuat

        // akses nilai dari session storage "user"
        let name = sessionStorage.getItem("user");
        this.setState({ user: name });
      }
    };

    // Handle search input
    handleSearch = (event) => {
      this.setState({ keyword: event.target.value });
    };

    // Perform search
    searchBooks = () => {
      const { buku, keyword } = this.state;
      return buku.filter((book) => {
        const lowerKeyword = keyword.toLowerCase();
        return (
          (book.judul && book.judul.toLowerCase().includes(lowerKeyword)) ||
          (book.penulis && book.penulis.toLowerCase().includes(lowerKeyword)) ||
          (book.penerbit && book.penerbit.toLowerCase().includes(lowerKeyword))
        );
      });
    };

    addToCart = (selectedItem) => {
      // membuat sebuah variabel untuk menampung cart sementara
      let tempCart = []; // cek eksistensi dari data cart pada localStorage

      if (localStorage.getItem("cart") !== null) {
        tempCart = JSON.parse(localStorage.getItem("cart")); // JSON.parse() digunakan untuk mengonversi dari string -> array object
      } // cek data yang dipilih user ke keranjang belanja

      let existItem = tempCart.find((item) => item.isbn === selectedItem.isbn);

      if (existItem) {
        // jika item yang dipilih ada pada keranjang belanja
        window.alert("Anda telah memilih item ini");
      } else {
        // user diminta memasukkan jumlah item yang dibeli
        let promptJumlah = window.prompt("Masukkan jumlah item yang beli", "");
        if (promptJumlah !== null && promptJumlah !== "") {
          // jika user memasukkan jumlah item yg dibeli

          // menambahkan properti "jumlahBeli" pada item yang dipilih
          selectedItem.jumlahBeli = promptJumlah; // masukkan item yg dipilih ke dalam cart
          tempCart.push(selectedItem); // simpan array tempCart ke localStorage

          localStorage.setItem("cart", JSON.stringify(tempCart));

          // Alert buku berhasil ditambahkan
          window.alert("Buku berhasil ditambahkan ke cart!")
          window.location.href = "/Cart";
        }
      }
    }

    render() {
      const filteredBooks = this.searchBooks();
      return (
        
        <div className="container">
          <h4 className="text-info my-2">Nama Pengguna: {this.state.user}</h4>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Pencarian"
            value={this.state.keyword}
            onChange={this.handleSearch}
            />
          {/* <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.9}}
          > */}
          <div className="row">
            {filteredBooks.map((item, index) => (
              <Card
              key={index}
              judul={item.judul}
              penulis={item.penulis}
              penerbit={item.penerbit}
              harga={item.harga}
              cover={item.cover}
              onEdit={() => this.Edit(item)}
              onDrop={() => this.Drop(item)}
              onCart={() => this.addToCart(item)}
              />
              ))}
          </div>
              {/* </motion.div> */}

          <button className="btn btn-success" onClick={this.Add}>
            Tambah Data
          </button>

          {/* component modal sbg control manipulasi data */}
          <div className="modal" id="modal_buku">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* modal header */}
                <div className="modal-header">Form Buku</div>

                {/* modal body */}
                <div className="modal-body">
                  <form onSubmit={this.Save}>
                    <div className="mb-3">
                      <label htmlFor="judul" className="form-label">
                        Judul:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="judul"
                        value={this.state.judul}
                        onChange={(e) => this.setState({ judul: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="penulis" className="form-label">
                        Penulis:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="penulis"
                        value={this.state.penulis}
                        onChange={(e) =>
                          this.setState({ penulis: e.target.value })
                        }
                        />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="penerbit" className="form-label">
                        Penerbit:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="penerbit"
                        value={this.state.penerbit}
                        onChange={(e) =>
                          this.setState({ penerbit: e.target.value })
                        }
                        />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="harga" className="form-label">
                        Harga:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="harga"
                        value={this.state.harga}
                        onChange={(e) => this.setState({ harga: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cover" className="form-label">
                        Cover (URL):
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cover"
                        value={this.state.cover}
                        onChange={(e) => this.setState({ cover: e.target.value })}
                        />
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        >
                        Tutup
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
