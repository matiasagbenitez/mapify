import reactLogo from "../logo.svg";

export const ReactLogo = () => {
  return (
    <img
      src={reactLogo}
      alt="logo"
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        width: "100px",
      }}
    />
  );
};
