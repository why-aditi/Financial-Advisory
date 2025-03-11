import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import logo from "../Assets/Images/logo.svg";
import "./Nav.css";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Bob World Logo" className="logo" />
      </a>
      <div className="">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <SignInButton>
              <button className="btn btn-primary">Login</button>
            </SignInButton>
            <SignUpButton>
              <button className="btn btn-outline-primary ml-2">Signup</button>
            </SignUpButton>
          </>
        )}
      </div>
    </nav>
  );
}
