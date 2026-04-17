import Banner from "../../components/Banner/Banner";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import ChooseSection from "../../components/ChooseSection/ChooseSection";
import QuoteSection from "../../components/QuoteSection/QuoteSection";

function Home() {
    return (
        <div>
          <Banner/>
          <ServicesSection/>
          <ChooseSection/>
          <QuoteSection/>
        </div>
    )
}

export default Home