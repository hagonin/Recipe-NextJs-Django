import { useForm } from 'react-hook-form';
import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { InputField, TextAreaField } from '../FormControl';
import PreviewImg from './Preview';
import { useAuthContext } from '@context/auth-context';
import { useEffect } from 'react';

function UpdateProfileForm({
	username,
	first_name,
	last_name,
	bio,
	avatar,
	onSubmit,
}) {
	const { errors } = useAuthContext();
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		setError,
		formState: { defaultValues, isSubmitting, errors: formError },
	} = useForm({
		defaultValues: {
			'account.username': username,
			'account.last_name': last_name,
			'account.first_name': first_name,
			'account.bio': bio,
			'account.avatar': { file: null, name: null },
		},
	});

	const handleReset = () => {
		reset({ ...defaultValues });
	};

	const handleBeforeSubmit = ({ account }) => {
		const { avatar, bio, ...personal } = account;

		const formAvatar = new FormData();
		avatar.file && formAvatar.append('avatar', avatar.file, avatar.name);

		return onSubmit({ personal, bio: bio, avatar: formAvatar });
	};

	const handleOnChangeImg = (e) => {
		const [file] = e.target.files;
		setValue('account.avatar', {
			file: file,
			name: file.name,
		});
	};

	useEffect(() => {
		errors?.account?.username &&
			setError('account.username', {
				type: 'custom',
				message: errors?.account?.username,
			});
		errors?.account?.first_name &&
			setError('account.first_name', {
				type: 'custom',
				message: errors?.account?.first_name,
			});
	}, [errors]);

	console.log(errors);

	return (
		<form
			className="grid md:grid-cols-12 grid-cols-1 md:gap-4 lg:gap-6 gap-6"
			noValidate={true}
			onSubmit={handleSubmit(handleBeforeSubmit)}
		>
			<div className="md:col-span-4 flex flex-col items-center ">
				<PreviewImg
					avatar={avatar}
					handleOnChangeImg={handleOnChangeImg}
				/>
				<input
					type="text"
					{...register('account.avatar')}
					className="invisible"
				/>
			</div>
			<div className="flex flex-col gap-4 md:col-span-8">
				<InputField
					label="First Name"
					name="account.first_name"
					type="text"
					register={register}
					error={formError?.account?.first_name}
				/>
				<InputField
					label="Last Name"
					name="account.last_name"
					type="text"
					register={register}
					error={formError?.account?.last_name}
				/>
				<InputField
					label="User Name"
					name="account.username"
					type="text"
					register={register}
					error={formError?.account?.username}
				/>

				<TextAreaField
					label="Bio"
					name="account.bio"
					type="text"
					register={register}
					rows={6}
					error={formError?.account?.bio}
				/>
				<div className="flex lg:gap-6 md:gap-4 max-md:flex-col mt-7 ">
					<Button
						type="submit"
						className="lg primary w-full"
					>
						{isSubmitting && <Loader type="submitting" />}
						Save
					</Button>
					<Button
						className="lg w-full reset"
						onClick={handleReset}
					>
						Reset
					</Button>
				</div>
			</div>
		</form>
	);
}

export default UpdateProfileForm;
