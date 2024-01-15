import CitiesSection from '../../components/CitiesSection';
import ContactSection from '../../components/contactSection';
import GuiedsSection from '../../components/GuidesSection';
import SliderForPages from '../../components/slider/slider';
import CultureSection from '../../components/CultureSection';


function Home() {
  
    return (
      <div >
        <SliderForPages/>
        <CitiesSection/>
        <CultureSection/>
        <ContactSection/>
        <GuiedsSection/>
      </div>
    );
  }
  
  export default Home;