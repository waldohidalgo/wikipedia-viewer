import RandomSection from "./components/RandomSection";
import QuerySection from "./components/QuerySection";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <header className="py-9 bg-gray-300">
        <h1 className="text-3xl font-bold underline text-center">
          Wikipedia Viewer
        </h1>
        <p className="text-center mt-4 max-w-[400px] mx-auto">
          The Wikipedia viewer allows you to display a random Wikipedia page or
          search for pages using the form below.
        </p>
      </header>
      <main className="py-9 bg-yellow-50">
        <RandomSection />
        <QuerySection />
      </main>
      <Footer />
    </>
  );
}
