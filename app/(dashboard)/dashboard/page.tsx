export default function DashboardPage() {
  return (
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome to Synkup Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of your activities, analytics, or quick links can go here. 
          Use the sidebar to navigate between different sections such as 
          Organizations, Billing, and Reports.
        </p>
      </div>
    </div>
  );
}
