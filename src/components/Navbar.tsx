import Container from "./Container";

const Navbar = () => {
  return (
    <header className="">
      <Container className="py-3">
        <h1 className="heading-page">Tasks</h1>
        <p className="paragraph-lg">Manage and track your team's work</p>
      </Container>
    </header>
  );
};

export default Navbar;
