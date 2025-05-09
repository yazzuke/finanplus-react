import video1 from "../../assets/howtouse.mp4";


const HeroSection = () => {
  return (
    <div className="flex flex-col border-b border-neutral-800  items-center  mb-4 mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Toma el control de tus
        <span className="bg-gradient-to-r from-green-600 to-green-900 text-transparent bg-clip-text">
          {" "}
          Finanzas
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
       Finanplus te permite gestionar tus ingresos, gastos y ahorros de
        acuerdo con metodologías reconocidas como el método 50/30/20 y bola de
        nieve. Crea una cuenta y da el primer paso hacia una mejor salud
        financiera!
      </p>
      <div className="flex justify-center my-10">
        <a
          href="/login"
          className="bg-gradient-to-r from-green-900 to-green-700 py-3 px-4 mx-3 rounded-md"
        >
         Crear una cuenta
        </a>
      </div>
      <div className="flex mt-5 justify-center"></div>
      <p className="text-lg text-center text-neutral-500 max-w-4xl">
       Como usar Finaplus
      </p>
      <video
          autoPlay
          loop
          muted
          controls
          className="rounded-lg w-1/2 border border-green-700 shadow-sm shadow-green-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </div>
  );
};

export default HeroSection;
