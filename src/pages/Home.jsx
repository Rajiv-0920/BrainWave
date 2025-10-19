import Hero from "../components/Hero";
import Features from "../components/Features";
import NewsLetter from "../components/NewsLetter";
import FaqSection from "../components/FaqSection";

function Home() {
  const faqs = [
    {
      question: "What is BrainWave?",
      answer:
        "EduConnect is an online learning platform offering a wide variety of courses taught by expert instructors. Our mission is to make quality education accessible to everyone, everywhere.",
    },
    {
      question: "Who are the instructors?",
      answer:
        "Our instructors are industry experts, professionals, and experienced educators who are passionate about sharing their knowledge and helping students achieve their goals.",
    },
    {
      question: "Can I get a certificate?",
      answer:
        "Yes, upon successful completion of any course, you will receive a verifiable certificate that you can share on your resume, LinkedIn profile, or with your professional network.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Many of our courses offer free introductory lessons so you can experience the content and teaching style before you decide to enroll. We also have several completely free courses available.",
    },
  ];

  return (
    <>
      <Hero />
      <Features />
      <FaqSection faqs={faqs} />
      <NewsLetter />
    </>
  );
}

export default Home;
