import ShopNavBar from "../../../../layouts/frontend/shop/ShopNavBar";
import Slider from "../Slider";
import Categories from "../Categories";
import Products from "../Products";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import ProductListPage from "./ProductListPage";

function ShopHomePage() {
  return (
    <div>
      <ShopNavBar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default ShopHomePage;
