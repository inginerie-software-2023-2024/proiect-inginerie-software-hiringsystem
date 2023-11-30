import axios from '@/lib/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('v1/auth/refresh-token', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(response.data);
            return {
                ...prev,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;