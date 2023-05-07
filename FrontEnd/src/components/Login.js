import "../styles/login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  //export the function and make it as the file,
  // everything start with use is a hook
  const navigate = useNavigate();

  let data = {};
  let url = "http://localhost:3001";

  async function register() {
    if (!data.Username || !data.Password) return alert("Something is missing");

    let response = await fetch(url + "/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response = await response.json();
    console.log(response);
    if (response.error) alert(response.error);
    else {
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/Exchange");
    }
  }

  return (
    <div className="Login-Parent-Container">
      <div className="Login-Form-Container">
        <div className="Login-Form-Row-Container">
          <div className="Login-Form-Input-Container">
            Username:{" "}
            <input
              className="Login-Form-Input"
              onChange={(event) => (data.Username = event.currentTarget.value)}
            ></input>
          </div>
        </div>
        <div className="Login-Form-Row-Container">
          <div className="Login-Form-Input-Container">
            Password:{" "}
            <input
              className="Login-Form-Input"
              onChange={(event) => (data.Password = event.currentTarget.value)}
            ></input>
          </div>
        </div>
        <div className="Login-Form-Button-Container">
          <button className="Login-Form-Button" onClick={register}>
            Login
          </button>
        </div>
        <div className="Login-Form-Button-Container">
          <Link to={"/"}>Register</Link>
        </div>
      </div>
    </div>
  );
}
