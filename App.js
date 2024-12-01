import { Navigation } from "./components/Navigation.jsx";
import { AuthProvider } from "./contexts/Auth.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
