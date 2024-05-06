import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import HomePage from './pages/home/HomePage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
	const { data, isLoading } = useQuery({
		queryKey: ['authUser'],
		queryFn: async () => {
			try {
				const res = await fetch('/api/auth/me');
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) throw new Error(data.error || 'Something went wrong');
				console.log('authUser is here: ', data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}
	return (
		<div className='flex max-w-6xl mx-auto'>
			{data && <Sidebar />}
			<Routes>
				<Route
					path='/'
					element={data ? <HomePage /> : <Navigate to='/login' />}
				/>
				<Route
					path='/signup'
					element={!data ? <SignUpPage /> : <Navigate to='/' />}
				/>
				<Route
					path='/login'
					element={!data ? <LoginPage /> : <Navigate to='/' />}
				/>
				<Route
					path='/notifications'
					element={data ? <NotificationPage /> : <Navigate to='/login' />}
				/>
				<Route
					path='/profile/:username'
					element={data ? <ProfilePage /> : <Navigate to='/login' />}
				/>
			</Routes>
			{data && <RightPanel />}
			<Toaster />
		</div>
	);
}

export default App;
