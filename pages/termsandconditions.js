import { css } from "emotion";
import Link from "next/link";
import React, { Component } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { setLanguage, setUser } from "../store";
import parseCookie from "../utils/parseCookie";

class TermsAndConditions extends Component {
  static getInitialProps({ req, store }) {
    if (req) {
      // server-rendered
      const { user, accessToken, language } = parseCookie(req.headers.cookie);
      store.dispatch(setLanguage(language));
      if (user) {
        // user is logged in,  save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
      }
    }
  }

  componentDidMount() {
    document.title = "Terms and Conditions";
  }

  render() {
    const email = "igfluencer.id@gmail.com";
    return (
      <main className={styles.root}>
        <div className={styles.alignCenter}>
          <Link href="/">
            <a className={styles.logo}>
              <FaCameraRetro /> igfluencer.id
            </a>
          </Link>
        </div>
        <h1>Syarat dan Ketentuan</h1>
        <p>
          SYARAT PENGGUNAAN DI BAWAH INI HARUS DIBACA SEBELUM MENGGUNAKAN SITUS
          INI. PENGGUNAAN SITUS INI MENUNJUKKAN PENERIMAAN DAN KEPATUHAN
          TERHADAP SYARAT DAN KETENTUAN DI BAWAH INI.
        </p>
        <p>
          Harap diketahui bahwa Igfluencer.id dapat mengubah, memodifikasi,
          menambah dan menghapus Syarat dan Ketentuan ini sewaktu-waktu tanpa
          pemberitahuan sebelumnya. Dengan terus menggunakan situs ini setelah
          perubahan terhadap Syarat dan Ketentuan, Anda sebagai pengguna situs
          sepakat dan menyetujui perubahan.
        </p>
        <h2>1. Layanan</h2>
        <p>
          Melalui situs, Igfluencer.id menyediakan platform <i>online</i> untuk
          mempertemukan <i>Advertiser</i> dan <i>Influencer</i>. Pengguna situs
          dapat melihat data kumpulan <i>Influencer</i> Instagram yang telah
          dibuat oleh Igfluencer.id. Igfluencer.id membuat data kumpulan{" "}
          <i>Influencer</i> berdasarkan informasi publik yang tertera pada situs
          Instagram (instagram.com). Jika Anda tidak bersedia untuk dimasukkan
          ke dalam data kumpulan <i>Influencer</i> milik Igfluencer.id Anda
          dipersilahkan untuk mengirimkan permintaan penghapusan melalui surat
          elektronik ke alamat {email} dengan menyertakan bukti kepemilikan
          akun.
        </p>
        <h2>2. Pendaftaran</h2>
        <p>
          Untuk menggunakan situs, pengguna diwajibkan untuk melakukan
          pendaftaran baik sebagai <i>Advertiser</i> atau sebagai{" "}
          <i>Influencer</i>. Pendaftaran akun <i>Advertiser</i> membutuhkan akun
          Gmail (gmail.com) dan pendaftaran akun <i>Influencer</i> membutuhkan
          akun Instagram (instagram.com). Dengan melakukan pendaftaran sebagai{" "}
          <i>Influencer</i> Anda akan secara otomatis menjadi bagian dari data
          kumpulan <i>Influencer</i> milik Igfluencer.id.
        </p>
        <h2>3. Kelengkapan Data</h2>
        <p>
          Data kumpulan <i>Influencer</i> milik Igfluencer.id didapatkan dari
          informasi publik yang tertera di situs Instagram (instagram.com) dan
          terus diperbarui secara berkala. Pengelola situs Igfluencer.id dapat
          memperbarui/melengkapi informasi yang tidak tertera di situs Instagram
          (instagram.com). Pemilik akun <i>Influencer</i> juga dapat
          memperbarui/melengkapi informasi pada akun masing-masing.
          Igfluencer.id terus berupaya untuk memberikan informasi yang terbaru
          dan akurat namun Igfluencer.id tidak dapat menjamin bahwa seluruh
          informasi yang tersedia sepenuhnya terbaru dan akurat.
        </p>
        <h2>4. Tanggung Jawab</h2>
        <p>
          Igfluencer.id hanya menyediakan data kumpulan <i>Influencer</i> yang
          bersifat publik. Segala bentuk penyalahgunaan data kumpulan{" "}
          <i>Influencer</i> tersebut tidak menjadi tanggung jawab dari
          Igfluencer.id. Igfluencer.id tidak akan bertanggungjawab atas setiap
          kerusakan atau kerugian yang terjadi di luar situs Igfluencer.id.
          Segala bentuk perselisihan atau penipuan yang terjadi antara pihak{" "}
          <i>Advertiser</i> dan <i>Influencer</i> merupakan tanggung jawab dari
          pihak masing-masing.
        </p>
        <h2>5. Pembayaran</h2>
        <p>
          Pembayaran transaksi untuk fitur premium yang dilakukan pada situs
          Igfluencer.id bersifat permanen dan tidak dapat dibatalkan atau
          dikembalikan.
        </p>
        <h2>6. Tentang Igfluencer.id</h2>
        <p>
          Jika Anda memiliki pertanyaan lebih lanjut, silahkan kirimkan
          pertanyaan anda melalui surat elektronik ke alamat {email}.
        </p>
        <p className={styles.alignCenter}>
          <br />
          Igfluencer.id 2018
        </p>
      </main>
    );
  }
}

const styles = {
  root: css({
    width: "100%",
    maxWidth: 720,
    margin: "50px auto",
    padding: "0 20px"
  }),
  alignCenter: css({
    textAlign: "center"
  }),
  logo: css({
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#181a28",
    color: "#fff",
    textDecoration: "none",
    borderRadius: 3,
    fontWeight: 600,
    "& svg": {
      marginRight: 10
    }
  })
};

export default TermsAndConditions;
