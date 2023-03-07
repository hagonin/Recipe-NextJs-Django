import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import {
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_READ,
	EXIST_RECIPE,
} from '@utils/constants';

import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import api from '@services/axios';
import noCache from '@utils/noCache';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import AddUpdateRecipeForm from '@components/Form/RecipeForm/AddUpdateRecipeForm';
import handleIngredientFromArr from '@utils/handleIngredientFromArr';

function Update() {
	const [initValue, setInitValue] = useState(null);
	const [cancel, setCancel] = useState(false);
	const router = useRouter();
	const { slug } = router?.query;
	const { configAuth } = useAuthContext();
	const { setLoading, mutateRecipes } = useRecipeContext();

	const onSubmitUpdate = useCallback(async (data) => {
		await api
			.put(`${ENDPOINT_RECIPE_DETAIL}${slug}/`, data, configAuth())
			.then(async (res) => {
				await mutateRecipes();
				toast.success('Update recipe success');
				router.push(`/user/recipe/${res?.data?.slug}`);
			})
			.catch(({ _error }) => {
				if (_error.ingredients) {
					toast.error('Ingredient title must be unique set.');
				}
			});
	});

	const handleInstructions = useCallback((instructions) => {
		let ins = instructions.split('<p>');
		ins.shift();
		ins = ins.map((item) => item.split('</p>'));
		ins = ins.map((item) => ({ content: item[0] }));
		return ins;
	});

	const handleKeyWord = useCallback((key) => key.replace(/'/g, ''));

	const handleError = useCallback((err) => {
		// console.log(err);
		if (err.ingredients) {
			toast.error('Ingredient title must make a unique set.');
		}
	});

	useEffect(() => {
		setLoading(true);
		api.get(`${ENDPOINT_RECIPE_READ}${slug}/${noCache()}`)
			.then(({ data }) => {
				if (data) {
					if (data.instructions) {
						data.instructions = handleInstructions(
							data.instructions
						);
					}

					if (data.ingredients) {
						data.ingredients = handleIngredientFromArr(
							data.ingredients
						);
					}
					if (data.notes === 'null') {
						data.notes = JSON.parse(data.notes);
					}

					if (data.search_vector) {
						data.search_vector = handleKeyWord(data.search_vector);
					}

					setInitValue({ ...data });
				}
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const toggleCancel = useCallback(() => {
		setCancel(!cancel);
	});

	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-end justify-center mb-4">
				<h1 className="ml-4 mb-14">Update Recipe</h1>
			</div>

			{initValue ? (
				<AddUpdateRecipeForm
					onSubmit={onSubmitUpdate}
					handleCancel={toggleCancel}
					initValues={initValue}
					isUpdate
				/>
			) : null}
		</div>
	);
}

export default Update;

Update.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
