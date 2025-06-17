import Navbar from "../../components/navbar";
import HeroSection from "../../components/heroSection";
import ValueSection from "../../components/value-section";
import SocialProofSection from "../../components/trust-signals-section";
import EmailCaptureForm from "../../components/call-to-action-section";
import Footer from "../../components/footer";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <ValueSection />
            <SocialProofSection />
            <EmailCaptureForm />
            <Footer />
            {/* <BackgroundBeamsWithCollision>
                <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                    Looking for school management app?{" "}
                    <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                            <span className="">Ulearning.</span>
                        </div>
                    </div>
                </h2>
            </BackgroundBeamsWithCollision> */}
        </>
    )
}