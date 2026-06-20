import { SignIn, useUser, useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      signOut(); // force logout if already signed in
    }
  }, [isLoaded, isSignedIn, signOut]);

  return (
    <div className="h-screen w-full flex font-sans">
      {/* Left Side */}
      <div className="w-1/2 bg-green-700 text-white flex flex-col justify-center items-center p-12">
        <h1 className="text-5xl font-bold mb-4 tracking-wide">GRAAMVAANI</h1>
        <p className="text-xl text-center leading-relaxed">
          Empowering Voices, <br /> Enabling Change.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="w-[350px]">
          <SignIn
            redirectUrl="/dashboard"
            signUpUrl={null} // disables tab switch to SignUp
            appearance={{
              elements: {
                footer: "hidden", // hide bottom footer
                footerAction: "hidden", // hide "Don't have an account" link
                formButtonPrimary: "bg-green-700 hover:bg-green-800 text-white",
              },
              variables: {
                colorPrimary: "#047857", // Clerk highlight color match (green-700)
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
