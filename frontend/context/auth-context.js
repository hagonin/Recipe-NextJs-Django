import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsAuthenticated(!!user);
	}, [user]);

	useEffect(() => {
		loadUser();
	}, []);

	const login = async ({ email, password, remember }) => {
		try {
			const response = await axios.post('/api/login', {
				email,
				password,
				remember,
			});
			const { success, user } = response.data;
			success && setUser(response.data.user);
			if (success) {
				setUser(user);
				router.push(`/user/${user.username}`);
			}
		} catch (error) {
			setErrors(error.response.data.error);
		}
	};

	const loadUser = () => {
		axios
			.get('/api/user')
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const logout = () => {};
	const signup = async ({
		username,
		firstname,
		lastname,
		password,
		email,
	}) => {
		try {
			const res = await api.post('/user/register/', {
				username,
				lastname,
				firstname,
				password,
				email,
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ errors, setErrors, user, isAuthenticated, login }}
		>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuthContext = () => {
	return useContext(AuthContext);
};
export default AuthProvider;
