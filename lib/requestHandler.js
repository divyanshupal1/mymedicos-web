/**
 * Handles HTTP requests with loading and error state management.
 * 
 * @param {(req: import("axios").AxiosInstance) => Promise<any>} req - The Axios request.
 * @param {(data: any) => void} clb - Callback to handle successful response data.
 * @param {Object} [options] - Optional configuration.
 * @param {(loading: boolean) => void} [options.setLoading] - Function to set loading state.
 * @param {(error: any) => void} [options.setError] - Function to set error state.
 * @returns {Promise<{ success: boolean; data?: any; error?: any }>}
 */
export const requestHandler = async (req, clb, options = {}) => {
    const { setLoading, setError } = options;

    // Set initial states
    setLoading?.(true);
    setError?.(null);

    try {
        const res = await req;
        if (res.data.success) {
            clb(res.data);
            return { success: true, data: res.data };
        } else {
            return { success: false, error: res.data.error };
        }
    } catch (err) {
        setError?.(err);
        return { success: false, error: err };
    } finally {
        setLoading?.(false);
    }
}