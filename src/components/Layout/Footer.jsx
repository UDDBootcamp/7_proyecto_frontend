import logo from "../../assets/images/logo.svg";

const Footer = () => {
  return (
    <div className="container-fluid bg-secondary">
      <div className="container">
    <div className="text-center py-5">
        <figure className="m-0 pb-5">
          <img className="img-fluid logo-footer" src={logo} alt="logo batman" />
        </figure>
        <p>Proyecto 7 Fullstack - Boostcamp UDD</p>
      </div>
    </div>
    </div>
  );
};

export default Footer;
