import Dashboard from './Components/Dashboard';
import MainLayout from './Components/MainLayout';
import { SearchProvider } from './Components/SearchContext'; // Adjust the path based on your folder structure

export default function App() {
  return (
    <SearchProvider>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </SearchProvider>
  );
}
