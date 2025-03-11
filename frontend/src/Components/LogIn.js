import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <SignIn 
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
        redirectUrl={window.location.origin}
      />
    </div>
  );
}
