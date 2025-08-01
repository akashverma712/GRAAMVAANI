import { useUser, UserButton } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-black transition-all flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-xl w-full p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome, {user?.fullName || 'User'}!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Email: {user?.primaryEmailAddress?.emailAddress}
        </p>
        <div className="flex justify-center">
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
