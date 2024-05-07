import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useFollow = () => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: async (userId) => {
			try {
				const res = await fetch(`/api/user/follow/${userId}`, {
					method: 'POST',
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || 'Something went wrong');
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ['suggestUsers'] }),
				queryClient.invalidateQueries({ queryKey: ['authUser'] }),
			]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { mutate, isPending };
};

export default useFollow;
