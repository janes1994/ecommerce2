import React, {Component} from 'react';
import '../CSS/Checkout.css'
import { NavLink } from 'react-router-dom';


export default class Checkout extends Component {
    constructor(){
        super();
        this.state = {
            gantiAlamat: false,
            tambahAlamat: false,
            modalBayar: false,
            pilihanBank: false,
            berhasilBayarModal: false,
            alamat: null,
            alamatMasuk: null,
            user: null
        }
    }

    gantiAlamat = () => {
        this.setState({
            gantiAlamat: !this.state.gantiAlamat
        });
    }

    modalBayar = () => {
        this.setState({
            modalBayar: !this.state.modalBayar
        })
    }

    tambahAlamat = () => {
        this.setState({
            tambahAlamat: !this.state.tambahAlamat,
            gantiAlamat: !this.state.gantiAlamat
        });
    }

    pilihanBank = () => {
        this.setState({
            pilihanBank: !this.state.pilihanBank,
            tambahAlamat:!this.state.modalBayar,
            // modalBayar: !this.state.modalBayar
        })
    }

    berhasilBayarfunc = () => {
        this.setState({
            pilihanBank: !this.state.pilihanBank,
            modalBayar: !this.state.modalBayar,
            berhasilBayarModal: !this.state.berhasilBayarModal
        })
    }

    cekUser = () => {
        const username = {username: this.props.username}
        fetch('http://localhost:5000/cekuser',{
            method: "POST",
            header: {"Content-Type": "application/json"},
            body: JSON.stringify(username)
        })
        .then(res => res.json())
        .then(res => {
            this.setState({user: res});
            // console.log(this.state.user)
        })
        .catch(err => console.log(err))
    }

    cekAlamat(){
        const data = {username: this.props.username}
        fetch(`http://localhost:5000/searchalamat`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => this.setState({
            alamat: {
                labelAlamat: res[0].labelAlamat,
                namaPenerima: res[0].namaPenerima ,
                nomorHP: res[0].nomorHP,
                kota: res[0].kota,
                kodepos: res[0].kodepos,
                jalan: res[0].jalan,
                userlistId: res[0].userlistId,
            }
        }))
        .catch(err=> console.log(err))
    }

    masukanAlamat = (e) => {
        e.preventDefault();
        this.setState({
            tambahAlamat: false,
            gantiAlamat: false,
            alamatMasuk: {
                labelAlamat: e.target.labelAlamat.value,
                namaPenerima: e.target.namaPenerima.value,
                nomorHP: e.target.nomorHP.value,
                kota: e.target.kota.value,
                kodepos: e.target.kodepos.value,
                jalan: e.target.jalan.value,
                userlistId: this.state.user.id
            }
        });
        const data = this.state.alamatMasuk;
        fetch('http://localhost:5000/insertalamat',{
            method: "POST",
            header: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.cekAlamat();
        this.cekUser();
        // console.log(this.state.alamat)
        console.log(this.state.user)

    }

    componentDidUpdate(){
        // console.log(this.state.alamatMasuk)
        // console.log(this.state.alamat)
        console.log(this.state.user)
    }

    render(){
        return(
            <div>
                <CheckoutPage 
                    gantiAlamat={this.gantiAlamat}
                    modalBayar={this.modalBayar}
                    username={this.props.username}
                    price={this.props.price}
                    alamat={this.state.alamat}
                    tambahAlamat={this.tambahAlamat}
                />
                <ModalAlamat 
                    gantiAlamat={this.gantiAlamat}
                    tambahAlamat={this.tambahAlamat}
                    showModal={this.state.gantiAlamat}
                />
                <TambahAlamat
                    showModal={this.state.tambahAlamat}
                    tambahAlamat={this.tambahAlamat}
                    masukanAlamat={this.masukanAlamat}
                />
                <ModalCheckoutBayar
                    showModal={this.state.modalBayar}
                    pilihanBank={this.pilihanBank}
                    modalBayar={this.state.modalBayar}
                    closeModal={this.modalBayar}
                />
                <ModalPilihanBank
                    pilihanBank={this.state.pilihanBank}
                    closeModal={this.pilihanBank}
                    berhasilBayarfunc={this.berhasilBayarfunc}
                />
                <BerhasilBayar
                    berhasilBayarModal={this.state.berhasilBayarModal}
                />
            </div>
        )
    }
}


// Halaman Awal
const CheckoutPage = (props) => {
    return (
        <div className="check-out-page">
            <div className="checkout-alamat-pengiriman">
                <h4>Alamat Pengiriman</h4>
                {
                    props.alamat === null ?
                    <div className="checkout-alamat-pengiriman-alamat">
                        <p className="nama-pengirim">{props.username}</p>
                        <div className="ganti-alamat" onClick={props.tambahAlamat}>Tambah Alamat Pengiriman</div>
                    </div>
                    :
                    <div className="checkout-alamat-pengiriman-alamat">
                        <p className="nama-pengirim">{props.username}</p>
                        <p>{props.alamat.labelAlamat}</p>
                        <p>{props.alamat.namaPenerima}</p>
                        <p className="telfon-pengirim">{props.alamat.nomorHP}</p>
                        <p className="alamat-pengirim">{props.alamat.jalan}</p>
                        <p className="kodepos-pengirim">{props.alamat.kodepos}</p>
                        <p className="kota-pengirim">{props.alamat.kota}</p>
                        {/* <div onClick={props.gantiAlamat} className="ganti-alamat">Ganti Alamat</div> */}
                        <div onClick={props.tambahAlamat} className="ganti-alamat">Ganti Alamat</div>
                    </div>
                }
            </div>

            <div className="ringkasan-belanja">
                <h4>Ringkasan Belanja</h4>
                <div className="ringkasan-data">
                    <div className="ringkasan-detail">
                        <div className="ringkasan-total">Total Harga</div><br/>
                        <div className="ringkasan-harga">Rp {props.price}</div>
                    </div>
                </div>
            </div>
            <div onClick={props.modalBayar} className="bayar">Bayar</div>
        </div>
    )
}

// Modal Tombol ganti alamat dari halaman awal
const ModalAlamat = (props) => {
    return (
        <div className="modal-alamat" style={{display: props.showModal ? 'block' : 'none'}}>
            <div className="modal-content">
                <div onClick={props.gantiAlamat} className="modal-close">&times;</div>
                <h1>Pilih Alamat Pengiriman</h1>
                <div className="modal-form">
                    <input type="text" placeholder="Tulis nama alamat / kota / kecamatan tujuan pengiriman/"/>
                </div>
                <div className="alamat-lama">
                    <div className="radiobutton">
                        <input type="radio"/>
                    </div>
                    <div className="alamat-content">
                        <p className="alamat-nama">Yanes Reksandi</p>
                        <p className="alamat-telfon">085718666045</p>
                        <p className="alamat-jalan">Jl. Atang Sanjaya No 373 RT 04 RW 09 Semplak, Bogor Barat. 16114</p>
                        <p className="alamat-kota">Bogor Barat, Kota Bogor, 16114</p>
                    </div>
                    <div className="alamat-ubah" onClick={props.tambahAlamat}>Ubah</div>
                </div>
                <div className="alamat-pilih">
                    <div className="alamat-tambah-baru" onClick={props.tambahAlamat}>Tambah Alamat Baru</div>
                    <div className="alamat-pakai-ini">Pakai Alamat Ini</div>
                </div>
            </div>
        </div>
    )
}

const TambahAlamat = (props) => {
    return (
        <div className="modal-tambah-alamat" style={{display: props.showModal ? 'block' : 'none'}}>
            <div className="content-tambah-alamat">
                <div onClick={props.tambahAlamat} className="modal-close">&times;</div>

                <div className="modal-tambah-title">Tambah Alamat Baru</div>
                    <form className="form-tambah-alamat" onSubmit={props.masukanAlamat}>
                        <label>Label Alamat</label>
                        <input type="text" placeholder="Rumah" name="labelAlamat"/>
                        <span>Contoh: Alamat Rumah, Alamat Kantor, Apartemen, Dropship</span>

                        <div className="modal-tambah-split">
                        <label className="modal-tambah-penerima">Nama Penerima
                            <input type="text" placeholder="Janes" name="namaPenerima"/>
                        </label>

                        <label className="modal-tambah-telfon">Nomor HP
                            <input type="text" placeholder="Rumah" name="nomorHP"/>
                            <span>Angka [0-9], Contoh: 081234567890</span>
                        </label>
                        </div>

                        <div className="modal-tambah-split">
                        <label className="modal-tambah-kota-kecamatan">Kota atau kecamatan
                            <input type="text" placeholder="Masukan Kota / Kecamatan tujuan pengirim" name="kota"/>
                        </label>

                        <label className="modal-tambah-kodepos">Kode Pos
                            <input type="text" placeholder="Kode Pos" name="kodepos"/>
                        </label>
                        </div>

                        <label className="modal-tambah-alamatlengkap">Alamat</label>
                        <textarea name="jalan" className="modal-tambah-textarea" placeholder="Isi dengan nama jalan, nomor rumah, nama kompleks, nama gedung, lantai atau nomor unit."></textarea>
                        
                        <div className="modal-tambah-submit-options">
                            <input onClick={props.tambahAlamat} type="button" value="Batal"/>
                            <input type="submit" value="Tambah"/>
                        </div>      
                    </form>
            </div>
        </div>
    )
}

const ModalCheckoutBayar = (props) => {
    return (
        <div className="modal-checkout-bayar" style={{display: props.modalBayar ? 'block' : 'none'}}>
            <div className="modal-checkout-bayar-content">
                <div onClick={props.closeModal} className="modal-checkout-bayar-close">&times;</div>
                <div className="modal-checkout-bayar-title">Pilih Metode Pembayaran</div><hr/>

                <div onClick={props.pilihanBank} className="pilihan-bank">
                    <div className="pilihan pilihan1">
                        <img className="logo-bank" src="/images/bank/bca.jpg" alt="logobank" />
                        <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                        <div>></div>
                    </div><hr/>

                    <div onClick={props.pilihanBank} className="pilihan pilihan2">
                        <img className="logo-bank" src="/images/bank/mandiri.png" alt="logobank" />
                        <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                        <div>></div>
                    </div><hr/>

                    <div onClick={props.pilihanBank} className="pilihan pilihan3">
                        <img className="logo-bank" src="/images/bank/bni.png" alt="logobank" />
                        <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                        <div>></div>
                    </div><hr/>

                    <div onClick={props.pilihanBank} className="pilihan pilihan4">
                        <img className="logo-bank" src="/images/bank/bri.png" alt="logobank" />
                        <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                        <div>></div>
                    </div><hr/>

                    <div onClick={props.pilihanBank} className="pilihan pilihan5">
                        <img className="logo-bank" src="/images/bank/cimb.jpg" alt="logobank" />
                        <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                        <div>&#62;</div>
                    </div><hr/>
                </div>
            </div>
        </div>
    )
}

const ModalPilihanBank = (props) => {
    return (
        <div className="modal-pilihan-bank" style={{display: props.pilihanBank ? 'block' : 'none'}}>
            <div className="modal-pilihan-bank-content">
                <div className="modal-pilihan-bank-content-back"></div>
                <div className="modal-pilihan-bank-content-title">Pembayaran</div><hr/>
                <div className="modal-pilihan-bank-content-harga">Rp 25.000.000</div>

                <div className="modal-pilihan-bank-content-detail">
                    <div className="modal-pilihan-nama">Transfer Bank BCA</div>
                    <img className="logo-bank" src="/images/bank/bca.jpg" alt="logobank"/>
                </div>

                <div className="modal-pilihan-rekening">
                    <label>No. Rekening Anda <br/>
                        <input type="text" />
                        <p className="pilihan-underline">Masukan nomor rekening sesuai kebutuhan anda</p>
                    </label>

                    <label>Nama Pemilik Rekening <br/>
                        <input type="text" /> 
                        <p className="pilihan-underline">Masukan nama pemilik rekening sesuai buku tabungan</p>
                    </label>

                    <p className="pilihan-underline note">Jika melalui Teller, Isi Nama Pemilik Rekening dengan nama Penyetor dan Nomor Rekening dengan 0000</p>
                    <p className="pilihan-underline note">Demi keamanan transaksi Anda, pastikan untuk tidak menginformasikan bukti dan data pembayaran kepada pihak manapun kecuali Tokopedia.</p>
                </div>

                <div className="rata-button-pilihan">
                    <input type="button" value="Batal" onClick={props.closeModal}/>
                    <input type="button" value="Bayar" onClick={props.berhasilBayarfunc}/>
                </div>
            </div>
        </div>
    )
}

const BerhasilBayar = (props) => {
    return(
        <div className="modal-pilihan-bank" style={{display: props.berhasilBayarModal ? "block" : "none"}}>
            <div className="modal-pilihan-bank-content berhasil-bayar">
                <h1>Pembayaran berhasil</h1><hr/>
                <div className="wrapper-icon">
                    <img className="icon-shop" src="/images/shop/macbook.jpg" alt="logobank" />                    
                    <div>
                    <span className="success-title">Macbook Pro</span><br/>
                    <span className="success-price">Rp 25.000.000</span>
                    </div>
                </div>
                <NavLink exact to="/" className="route home">Kembali berbelanja</NavLink>
                <NavLink exact to="/" className="route akun">Masuk halaman akun</NavLink>
            </div>
        </div>
    )
}