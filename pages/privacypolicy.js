import { css } from "emotion";
import Link from "next/link";
import React, { Component } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { setLanguage, setUser } from "../store";
import parseCookie from "../utils/parseCookie";

class PrivacyPolicy extends Component {
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
    document.title = "Kebijakan Privasi";
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
        <h1>Kebijakan Privasi</h1>
        <p>
          Kebijakan Privasi ini menjelaskan bagaimana Igfluencer.id
          mengumpulkan, menggunakan, memproses dan melindungi informasi yang
          Anda (pengguna) berikan sehubungan dengan layanan Igfluencer.id yang
          tersedia melalui situs web di www.igfluencer.id. Dengan mengunjungi
          atau menggunakan situs Igfluencer.id, Anda sepakat dan menyetujui
          pengumpulan, penggunaan, dan pemrosesan data pribadi Anda sesuai
          dengan Kebijakan Privasi ini dan/atau Syarat dan Ketentuan
          Igfluencer.id. Jika Anda tidak setuju dengan Kebijakan Privasi di
          bawah ini, silahkan segera tinggalkan situs.
        </p>
        <p>
          Harap diketahui bahwa Igfluencer.id dapat mengubah, memodifikasi,
          menambah dan menghapus Kebijakan Privasi ini sewaktu-waktu tanpa
          pemberitahuan sebelumnya. Dengan terus menggunakan situs ini setelah
          perubahan terhadap Kebijakan Privasi, Anda sebagai pengguna situs
          sepakat dan menyetujui perubahan.
        </p>
        <h2>1. Informasi yang Kami Kumpulkan</h2>
        <p>
          Kami mengumpulkan data pribadi mengenai Anda yang diberikan kepada
          kami saat menggunakan situs. Data pribadi tersebut termasuk namun
          tidak terbatas pada nama dan alamat e-mail Anda. Kami juga
          mengumpulkan informasi non-pribadi yang teridentifikasi (yang tidak
          dapat digunakan untuk mengidentifikasi Anda), termasuk namun tidak
          terbatas pada alamat protokol internet ("IP") Anda, data lokasi
          geografis, jenis sistem pengoperasian, begitu pula data umum lainnya
          terkait penggunaan Internet.
        </p>
        <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
        <p>
          Kami dapat menggunakan data pribadi Anda dan informasi lainnya yang
          dikumpulkan melalui situs untuk tujuan berikut:
          <ul>
            <li>
              mendaftar, mengelola dan/atau mengurus penggunaan dan/atau akses
              situs;
            </li>
            <li>
              mengelola, mengoperasikan, mengurus dan memberikan Anda layanan
              yang ditawarkan di situs;
            </li>
            <li>
              menghubungi Anda mengenai hal-hal yang berkaitan dengan penggunaan
              Anda dan/atau akses situs serta layanan di situs, dan setiap
              pertanyaan dan/atau permintaan yang diajukan oleh Anda melalui
              situs atau sebaliknya;
            </li>
            <li>
              mengukur dan meningkatkan pengalaman dan kepuasan pelanggan;
            </li>
            <li>menegakkan Syarat dan Ketentuan;</li>
            <li>
              menyelesaikan sengketa atau pengaduan, mengumpulkan pembayaran
              atau biaya, atau memecahkan masalah; dan/atau untuk tujuan lain
              yang diberitahukan kepada Anda pada saat pengumpulan.
            </li>
          </ul>
        </p>
        <h2>3. Berbagi dan Mentransfer Data Pribadi Anda</h2>
        <p>
          Data pribadi Anda akan/dapat disingkapkan oleh Igfluencer.id kepada
          perusahaan afiliasi Igfluencer.id. Igfluencer.id (dan/atau perusahaan
          afiliasinya) juga dapat menyingkap data pribadi Anda kepada penyedia
          layanan pihak ketiga, pemasok atau agen untuk satu atau lebih tujuan
          di atas dari waktu ke waktu. Layanan pihak ketiga termasuk namun tidak
          terbatas pada hosting situs web, analisis data, dan penyediaan
          layanan.
        </p>
        <p>
          Harap dicatat bahwa Igfluencer.id dapat menyingkap data pribadi Anda
          dalam situasi berikut:
          <ul>
            <li>
              untuk mengadakan atau membela terhadap klaim atau gugatan apa pun;
            </li>
            <li>
              untuk mematuhi perintah pengadilan, proses peradilan, permintaan
              yang sah, surat perintah atau setara oleh pejabat penegak hukum
              atau pihak yang berwenang;
            </li>
            <li>
              untuk menyelidiki penipuan atau kesalahan lainnya, atau seperti
              yang dipersyaratkan lainnya atau diperlukan dalam rangka mematuhi
              hukum yang berlaku, atau untuk melindungi kepentingan sah kami;
            </li>
            <li>
              untuk pembeli sehubungan dengan penjualan, pekerjaan, atau
              pengalihan lain dari semua atau bagian dari bisnis atau perusahaan
              kami;
            </li>
            <li>
              untuk menegakkan atau menerapkan syarat dan ketentuan yang berlaku
              bagi produk dan layanan kami;
            </li>
            <li>
              untuk melindungi hak, properti atau keamanan Igfluencer.id,
              Pengguna situs lainnya, atau orang lain manapun sesuai dengan
              kebijaksanaan Igfluencer.id; dan
            </li>
            <li>untuk setiap situasi lain yang diperbolehkan menurut hukum.</li>
          </ul>
        </p>
        <h2>4. Persetujuan</h2>
        <p>
          Sebagaimana dinyatakan di atas, dengan menjelajah dan menggunakan
          situs, atau dengan memesan layanan dari situs, atau dengan
          mendaftarkan untuk atau menggunakan layanan di situs Anda menyetujui
          Igfluencer.id dan/atau perusahaan afiliasi Igfluencer.id mengumpulkan,
          menggunakan, menyingkap dan/atau mengolah data pribadi yang disebutkan
          di atas untuk tujuan seperti yang dijelaskan di atas.
        </p>
        <h2>5. Penarikan Persetujuan</h2>
        <p>
          Anda dapat menarik persetujuan terhadap pengumpulan, penggunaan atau
          penyingkapan kami atas data pribadi Anda setiap saat, dengan
          memberikan kami pemberitahuan yang beralasan. Jika Anda ingin menarik
          persetujuan Anda, harap beritahu kami dengan mengirimkan surat
          elektronik ke alamat {email}. Kami akan berhenti mengumpulkan,
          menggunakan atau menyingkap data pribadi Anda setelah pemberitahuan,
          kecuali diwajibkan oleh hukum atau jika kami memiliki bisnis yang sah
          atau tujuan hukum untuk mempertahankannya. Harap memperhatikan bahwa
          dengan menarik persetujuan Anda terhadap pengumpulan, penggunaan atau
          penyingkapan kami atas data pribadi Anda, kami mungkin tidak dapat
          terus memberikan layanan kami kepada Anda, dan Anda setuju bahwa kami
          tidak akan bertanggung jawab kepada Anda atas setiap kerugian atau
          kerusakan yang timbul dari atau terkait penghentian layanan tersebut.
        </p>
        <h2>6. Kebijakan Cookie</h2>
        <p>
          <i>"Cookie"</i> adalah pengidentifikasi alfanumerik yang kami transfer
          ke hard drive atau kartu memori Anda melalui web browser ketika Anda
          mengunjungi situs kami. Hal ini memungkinkan sistem milik kami sendiri
          untuk mengenali Anda ketika Anda kembali mengunjungi situs kami dan
          meningkatkan layanan kami kepada Anda. Informasi ini digunakan untuk
          melacak penggunaan pengunjung situs dan mengkompilasi laporan
          statistik mengenai aktivitas situs. Untuk informasi lebih lanjut
          tentang <i>cookie</i>, kunjungi www.aboutcookies.org atau
          www.allaboutcookies.org. <i>Cookie</i> juga dapat digunakan untuk
          mengkompilasi informasi keseluruhan tentang area situs kami yang
          paling sering dikunjungi. Informasi lalu lintas ini dapat digunakan
          untuk meningkatkan konten situs kami dan membuat penggunaan Anda
          menjadi lebih mudah. Jika Anda ingin menolak <i>cookie</i> kami, Anda
          dapat mengkonfigurasi browser Anda untuk melakukannya. Namun, beberapa
          fitur situs kami mungkin tidak berfungsi jika Anda menghapus{" "}
          <i>cookie</i> dari browser Anda. Jika Anda tidak mengaktifkan{" "}
          <i>cookie</i>, Anda mungkin tidak dapat mengakses fungsi atau fitur
          penting pada situs ini, dan Anda mungkin hanya dapat menggunakan situs
          secara terbatas.
        </p>
        <h2>7. Melindungi Data Pribadi Anda</h2>
        <p>
          Kami melindungi data pribadi di bawah kepemilikan atau kendali kami
          dengan mempertahankan pengaturan keamanan yang wajar, termasuk
          prosedur fisik, teknis dan organisasi, untuk mencegah akses,
          pengumpulan, penggunaan, penyingkapan, penyalinan, modifikasi,
          penghapusan yang tidak sah atau risiko yang sama.
        </p>
        <h2>8. Tautan ke Situs Lain</h2>
        <p>
          Situs kami dapat berisi tautan ke situs-situs lain yang menarik.
          Namun, setelah Anda menggunakan tautan tersebut untuk meninggalkan
          situs kami, Anda harus mengetahui bahwa kami tidak memiliki kendali
          atas situs web lain tersebut. Harap diketahui bahwa kami tidak
          bertanggung jawab atas praktik privasi situs web lain tersebut dan
          menyarankan Anda untuk membaca pernyataan privasi dari masing-masing
          situs web yang Anda kunjungi yang mengumpulkan informasi pribadi.
        </p>
        <h2>9. Pendaftaran dan Keanggotaan</h2>
        <p>
          Situs ini memungkinkan Anda untuk membuat satu akun pengguna dengan
          mendaftar keanggotaan, berdasarkan data yang Anda berikan. Dengan
          memberikan data, mendaftar, dan membuat akun, Anda menjamin bahwa:
          <ol>
            <li>Anda setidaknya berusia 18 tahun;</li>
            <li>
              Informasi tentang Anda adalah benar, akurat, terkini dan lengkap;
            </li>
            <li>
              Anda akan memperbarui Data Pendaftaran ini agar selalu benar,
              akurat dan lengkap.
            </li>
          </ol>
        </p>
        <p>
          Selanjutnya, Anda setuju bahwa Igfluencer.id tidak bertanggung jawab
          atas kehilangan atau kerusakan yang mungkin diderita oleh kami, Anda
          atau pihak ketiga manapun, yang kerugian atau kerusakan tersebut
          disebabkan oleh ketidakakuratan atau tidak lengkapnya informasi yang
          diberikan oleh Anda. Setelah mendaftar, Anda akan menerima token akses
          sebagai identifikasi pengguna. Anda bertanggung jawab untuk menjaga
          kerahasiaan token akses, dan Anda bertanggung jawab penuh atas semua
          kegiatan terkait token akses tersebut. Untuk keamanan yang lebih
          bagus, harap pastikan bahwa Anda logout atau keluar dari akun setelah
          setiap kali penggunaan situs ini. Anda setuju bahwa Igfluencer.id
          tidak akan bertanggung jawab atas setiap kerugian atau kerusakan yang
          diderita oleh kami, Anda atau pihak ketiga yang timbul akibat
          kegagalan Anda untuk mematuhi ketentuan ini.
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

export default PrivacyPolicy;
