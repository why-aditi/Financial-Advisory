import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="signup-container">
      <SignUp afterSignUpUrl="/dashboard" />
    </div>
  );
}
