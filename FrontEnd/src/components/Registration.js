import Post from "../services";
import "../styles/register.css";
import { useNavigate, Link } from "react-router-dom";

export default function Registration() {
  //export the function and make it as the file,
  // everything start with use is a hook
  const navigate = useNavigate();

  let data = {};

  async function register() {
    if (
      !data.Email ||
      !data.Username ||
      !data.Password ||
      !data.USD ||
      !data.LBP
    )
      return alert("Something is missing");
    if (data.Password != data.ComfirmPassword)
      return alert("Password different than comfirm password");
    if (isNaN(parseFloat(data.USD)) || isNaN(parseFloat(data.LBP)))
      return alert("Currency Amount is not a number");
    if (parseFloat(data.USD) < 0 || parseFloat(data.LBP) < 0)
      return alert("Currency Amount is < 0");

    let response = await Post("/Register", data);
    if (response.error) alert(response.error);
    else navigate("/Login");
  }

  return (
    <div className="Register-Parent-Container">
      <div className="Register-Form-Container">
        <div className="Register-Form-Row-Container">
          <div className="Register-Form-Input-Container">
            Email:
            <input
              className="Register-Form-Input"
              onChange={(event) => (data.Email = event.currentTarget.value)}
            ></input>
          </div>
          <div className="Register-Form-Input-Container">
            Username:
            <input
              className="Register-Form-Input"
              onChange={(event) => (data.Username = event.currentTarget.value)}
            ></input>
          </div>
        </div>
        <div className="Register-Form-Row-Container">
          <div className="Register-Form-Input-Container">
            Password:
            <input
              className="Register-Form-Input"
              onChange={(event) => (data.Password = event.currentTarget.value)}
            ></input>
          </div>
          <div className="Register-Form-Input-Container">
            Comfirm Password:
            <input
              className="Register-Form-Input"
              onChange={(event) =>
                (data.ComfirmPassword = event.currentTarget.value)
              }
            ></input>
          </div>
        </div>
        <div className="Register-Form-Row-Container">
          <div className="Register-Form-Input-Container">
            LBP:
            <input
              className="Register-Form-Input"
              onChange={(event) => (data.LBP = event.currentTarget.value)}
            ></input>
          </div>
          <div className="Register-Form-Input-Container">
            USD:
            <input
              className="Register-Form-Input"
              onChange={(event) => (data.USD = event.currentTarget.value)}
            ></input>
          </div>
        </div>
        <div className="Register-Form-Button-Container">
          <button className="Register-Form-Button" onClick={register}>
            Register
          </button>
        </div>
        <div className="Register-Form-Button-Container">
          <Link to={"/Login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
