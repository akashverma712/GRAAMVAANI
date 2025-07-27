import { SignUp } from '@clerk/clerk-react';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 transition-all">
      <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-all w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center dark:text-white">Create Your Account</h2>
        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
          Sign up to access the dashboard
        </p>
        <SignUp
          redirectUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default Signup;
