import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black transition-all">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Please sign in to continue
        </p>

        <div className="mt-6">
          <SignIn
            path="/login"
            routing="path"
            redirectUrl="/dashboard"
            afterSignInUrl="/dashboard"
            signUpUrl="/signup"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
