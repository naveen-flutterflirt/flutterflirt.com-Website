import Navbar from "@/components/Navbar";
import OurStory from "@/components/OurStory";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Story — FlutterFlirt",
  description:
    "From a single room to six global offices. The story of how FlutterFlirt became a world-class enterprise technology consultancy.",
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <OurStory />
      <Footer />
    </>
  );
}
