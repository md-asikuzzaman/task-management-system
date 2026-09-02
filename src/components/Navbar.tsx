import Container from "./Container";

const Navbar = () => {
  return (
    <header className="">
      <Container className="mt-3 md:mt-4">
        <h1 className="heading-page">Tasks</h1>
        <p className="paragraph-lg">Manage and track your team's work</p>
      </Container>
    </header>
  );
};

export default Navbar;
