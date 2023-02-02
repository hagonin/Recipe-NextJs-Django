import { useRouter } from 'next/router';
import { useState } from 'react';

import LoginForm from '@components/Form/LoginForm';
import Img from '@components/UI/Image';

function Login() {
	const router = useRouter();
	const [error, setError] = useState(false);
	const onSubmit = (data) => {
		const fetchFake = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					status: 'login successfully',
					data: data,
				});
				// reject('Login is failed. Please try again.');
			}, 2000);
		});

		return fetchFake
			.then((data) => {
				console.log(data);
				router.push('/user/username.js');
			})
			.catch((error) => setError(error));
	};
	return (
		<div className="bg-primaryLight">
			<div className="container py-14 grid md:grid-cols-2 grid-cols-1 gap-8">
				<LoginForm onSubmit={onSubmit} />
				<div className="flex flex-col items-center justify-center max-md:-order-1">
					{error && <span>{error}</span>}
					<h1>Welcome back</h1>
					<p className="text-center">
						It's nice to see you again. Log in to continue to your
						account.
					</p>
					<Img
						alt="login"
						src="/static/images/girl-cooking-1.png"
						className="w-full h-72 mt-10"
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
