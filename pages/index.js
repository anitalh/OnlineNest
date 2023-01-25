import Header from '../components/header/';
import Footer from "../components/footer";
import styles from '@/styles/Home.module.scss'
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import db from "../utils/db";
import Main from "../components/home/main";
import FlashDeals from "../components/home/flashDeals";
import Category from "../components/home/category";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "../components/productsSwiper";
import Product from "../models/Product";
import ProductCard from "../components/productCard";

export default function home({ country, products }) {
  console.log("products", products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div className={styles.container}>
      <Header country={country}/>
      <div className={styles.home}>
      <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country}/>
    </div>
  )
}
export async function getServerSideProps() {
  // db.connectDb();
  // let products = await Product.find().sort({ createdAt: -1 }).lean();
  let data = await axios
    .get("https://api.ipregistry.co/?key=s43da9fv9td7hish")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(data);
    });
  return {
    props: {
      // products: JSON.parse(JSON.stringify(products)),
      //country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: "United states",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
      },
    },
  };
}
