import appLogoUrl from '/assets/statsdraftlogo.png';

const AppBar = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        height: "8.5vh",
        backgroundColor: "#161635",
        textAlign: "center",
      }}
    >
      <img
        src={appLogoUrl}
        width="50"
        height="50"
        style={{ marginTop: "1vh" }}
      />
    </div>
  );
};
export default AppBar;
