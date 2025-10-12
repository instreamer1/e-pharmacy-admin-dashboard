const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-gray-700 mb-6">
        You do not have permission to view this page.
      </p>
      <a
        href="/login"
        className="text-blue-600 hover:underline"
      >
        Return to login
      </a>
    </div>
  );
};

export default UnauthorizedPage;