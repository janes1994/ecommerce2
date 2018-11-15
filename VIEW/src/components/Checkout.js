import React, {Component} from 'react';
import '../CSS/Checkout.css'
// import Bayar from './Checkout Modal/Bayar';

export default class Checkout extends Component {
    constructor(){
        super();
        this.state = {
            gantiAlamat: false,
            tambahAlamat: false,
            modalBayar: false,
            pilihanBank: false
        }
        this.modalAlamatRef = React.createRef();
        this.modalTambahAlamat = React.createRef();
        this.checkoutBayar = React.createRef();
        this.pilihanBankRef = React.createRef();
    }

    pilihanBank = () => {
        this.setState({pilihanBank: !this.state.pilihanBank})
    }

    modalBayar = () => {
        this.setState({
            modalBayar: !this.state.modalBayar
        })
    }

    gantiAlamat = () => {
        this.setState({
            gantiAlamat: !this.state.gantiAlamat
        });
    }

    tambahAlamat = () => {
        this.setState({
            tambahAlamat: !this.state.tambahAlamat
        });
    }

    componentDidUpdate(){
        let gantiAlamat = this.state.gantiAlamat;
        let modalAlamat = this.modalAlamatRef.current

        let tambah = this.state.tambahAlamat;
        let modalTambahAlamat = this.modalTambahAlamat.current;

        // modal
        if (gantiAlamat === true) {
            modalAlamat.style.display = "block"
            if (tambah === true) {
                modalAlamat.style.display = "none"
                modalTambahAlamat.style.display = "block"
            } else {
                modalTambahAlamat.style.display = "none"
            }
        } else {
            modalAlamat.style.display = "none"
        }

        // modal 
        if (this.state.modalBayar === true) {
            this.checkoutBayar.current.style.display = "block"
        } else {
            this.checkoutBayar.current.style.display = "none"
        }

        // modal pilihan bank
        if (this.state.pilihanBank === true) {
            this.checkoutBayar.current.style.display = "none"
            this.pilihanBankRef.current.display = "block";
        } else {
            this.checkoutBayar.current.style.display = "block"
            this.pilihanBankRef.current.display = "none";
        }
    }


    render(){
        return(
            <div>

                <div ref={this.modalTambahAlamat} className="modal-tambah-alamat">

                    <div className="content-tambah-alamat">
                        <div onClick={this.tambahAlamat} className="modal-close">&times;</div>
                        <div className="modal-tambah-title">Tambah Alamat Baru</div>
                        <form className="form-tambah-alamat">
                            <label>Label Alamat</label>
                            <input type="text" placeholder="Rumah" />
                            <span>Contoh: Alamat Rumah, Alamat Kantor, Apartemen, Dropship</span>

                            <div className="modal-tambah-split">
                            <label className="modal-tambah-penerima">Nama Penerima
                                <input type="text" placeholder="Janes" />
                            </label>

                            <label className="modal-tambah-telfon">Nomor HP
                                <input type="text" placeholder="Rumah" />
                                <span>Angka [0-9], Contoh: 081234567890</span>
                            </label>
                            </div>

                            <div className="modal-tambah-split">
                            <label className="modal-tambah-kota-kecamatan">Kota atau kecamatan
                                <input type="text" placeholder="Masukan Kota / Kecamatan tujuan pengirim" />
                            </label>

                            <label className="modal-tambah-kodepos">Kode Pos
                                <input type="text" placeholder="Kode Pos" />
                            </label>
                            </div>

                            <label className="modal-tambah-alamatlengkap">Alamat</label>
                            <textarea className="modal-tambah-textarea" placeholder="Isi dengan nama jalan, nomor rumah, nama kompleks, nama gedung, lantai atau nomor unit."></textarea>
                            
                            <div className="modal-tambah-submit-options">
                                <input onClick={this.tambahAlamat} type="button" value="Batal"/>
                                <input type="submit" value="Tambah"/>
                            </div>
                            
                        </form>
                    </div>

                </div>
                
            <div ref={this.modalAlamatRef} className="modal-alamat">
                <div className="modal-content">
                    <div onClick={this.gantiAlamat} className="modal-close">&times;</div>
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
                        <div className="alamat-ubah">Ubah</div>
                    </div>
                    <div className="alamat-pilih">
                        <div className="alamat-tambah-baru" onClick={this.tambahAlamat}>Tambah Alamat Baru</div>
                        <div className="alamat-pakai-ini">Pakai Alamat Ini</div>
                    </div>
                </div>
            </div>

             <div className="check-out-page">

                     <div className="checkout-alamat-pengiriman">
                         <h4>Alamat Pengiriman</h4>
                         <div className="checkout-alamat-pengiriman-alamat">
                             <p className="nama-pengirim">Yanes Reksandi</p>
                             <p className="telfon-pengirim">085718666045</p>
                             <p className="alamat-pengirim">Jl. Atang Sanjaya No 373 RT 04 RW 09 Semplak, Bogor Barat</p>
                             <p className="kodepos-pengirim">16114</p>
                             <p className="kota-pengirim">Bogor Barat, Kota Bogor, 16114</p>
                             <div onClick={this.gantiAlamat} className="ganti-alamat">Ganti Alamat</div>
                         </div>
                     </div>

                     <div className="ringkasan-belanja">
                         <h4>Ringkasan Belanja</h4>
                         <div className="ringkasan-data">
                             <div className="ringkasan-detail">
                                 <div className="ringkasan-total">Total Harga</div><br/>
                                 <div className="ringkasan-harga">Rp 25.000.000</div>
                             </div>
                         </div>
                     </div>

                     <div onClick={this.modalBayar} className="bayar">Bayar</div>
             </div>
            

             <div ref={this.checkoutBayar} className="modal-checkout-bayar">

                <div className="modal-checkout-bayar-content">
                    <div onClick={this.modalBayar} className="modal-checkout-bayar-close">&times;</div>
                    <div className="modal-checkout-bayar-title">Pilih Metode Pembayaran</div><hr/>

                    <div onClick={this.pilihanBank} className="pilihan-bank">
                        <div className="pilihan pilihan1">
                            <img className="logo-bank" src="/images/bank/bca.jpg" alt="logobank" />
                            <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                            <div>></div>
                        </div><hr/>

                        <div onClick={this.pilihanBank} className="pilihan pilihan2">
                            <img className="logo-bank" src="/images/bank/mandiri.png" alt="logobank" />
                            <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                            <div>></div>
                        </div><hr/>

                        <div onClick={this.pilihanBank} className="pilihan pilihan3">
                            <img className="logo-bank" src="/images/bank/bni.png" alt="logobank" />
                            <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                            <div>></div>
                        </div><hr/>

                        <div onClick={this.pilihanBank} className="pilihan pilihan4">
                            <img className="logo-bank" src="/images/bank/bri.png" alt="logobank" />
                            <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                            <div>></div>
                        </div><hr/>

                        <div onClick={this.pilihanBank} className="pilihan pilihan5">
                            <img className="logo-bank" src="/images/bank/cimb.jpg" alt="logobank" />
                            <div className="nama-bank">Bank BCA <p>Diverifikasi setelah 07.00 WIB</p></div>
                            <div>&#62;</div>
                        </div><hr/>
                    </div>
                </div>
             </div>

             <div ref={this.pilihanBankRef} className="modal-pilihan-bank">
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

                    <input type="button" value="Bayar"/>
                </div>
             </div>
            
            
            </div>
        )
    }
}

