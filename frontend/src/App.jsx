import Home from "./pages/Home.jsx";
import Team from "./pages/Team.jsx";
import Blogs from "./pages/Blogs.jsx";
import FAQ from "./pages/FAQ.jsx";
import { Route, Routes } from "react-router-dom";
import WhyChooseUs from "./pages/WhyChooseUs.jsx";
import Services from "./pages/Services.jsx";
import Meditation from "./pages/Meditation.jsx";
import MeditationDetail from "./pages/MeditationDetail.jsx";
import MoodTracker from "./pages/MoodTracker.jsx";
import Contact from "./pages/Contact.jsx";
import ChooseTherapist from "./pages/ChooseTherapist.jsx";
import TherapistDetail from "./pages/TherapistDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/team" element={<Team />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/why-choose-us" element={<WhyChooseUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/meditation" element={<Meditation />} />
      <Route path="/meditation/:slug" element={<MeditationDetail />} />
      <Route path="/mood-tracker" element={<MoodTracker />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/choose-therapist" element={<ChooseTherapist />} />
      <Route path="/therapist/:id" element={<TherapistDetail />} />
    </Routes>
  );
}

export default App;
