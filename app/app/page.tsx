import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>
          Surfboards at Your Fingertips,{" "}
          <span className="text-primary">Waves Await</span>
        </h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          MyLocalBoard is the ultimate global marketplace for surfboard rentals,
          connecting surfers with the perfect board at any surf beach in the
          world. Whether you&apos;re a seasoned pro or a beginner, we make it
          easy to find and rent the board you need to catch the perfect wave.
        </p>
      </div>
      {/* <ProductRow category="templates" /> */}
      <Link href="/u/shop/5b96a4bb-b85f-4354-a832-68988ee20747">
        <div className="block text-center text-primary mt-12 font-semibold text-lg">
          View One Company
        </div>
      </Link>
    </section>
  );
}
