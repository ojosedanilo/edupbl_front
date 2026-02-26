import { useTheme } from '@/shared/utils/ThemeContext';
import Login from '@/routes/Login.tsx';

export default function App() {
    const { setTheme } = useTheme();

    return (
        Login()
    );
}