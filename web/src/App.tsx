import Nav from "./components/ui/Nav";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import ThreeModalities from "./components/ThreeModalities";
import Pipeline from "./components/Pipeline";
import NREMetric from "./components/NREMetric";
import PatientCards from "./components/PatientCards";
import IndividualVariation from "./components/IndividualVariation";
import BiomarkersTable from "./components/BiomarkersTable";
import MLResults from "./components/MLResults";
import Limitations from "./components/Limitations";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Problem />
        <ThreeModalities />
        <Pipeline />
        <NREMetric />
        <PatientCards />
        <IndividualVariation />
        <BiomarkersTable />
        <MLResults />
        <Limitations />
        <Footer />
      </main>
    </div>
  );
}
