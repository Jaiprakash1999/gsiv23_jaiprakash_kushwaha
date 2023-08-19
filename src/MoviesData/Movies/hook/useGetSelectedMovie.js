import axios from "axios";
import { useEffect, useState } from "react";

const useGetSelectedMovie = ({ movieId }) => {
    const [searchResult, setSearchResult] = useState({});
    const [creditData, setCreditData] = useState({});
    const [loadingSearchResult, setLoadingSearchResult] = useState(true);

    const getSearchResult = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=be3ee1b68f89d61c2300f82023585fbc`
            );
            setSearchResult(response?.data);
            const creditResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=be3ee1b68f89d61c2300f82023585fbc`
            );
            setCreditData(creditResponse?.data);
            setLoadingSearchResult(false);
        } catch (error) {
            console.error(error, "Oops! Somthing went wrong");
            setLoadingSearchResult(false);
        }
    };

    useEffect(() => {
        getSearchResult();
    }, [movieId]);

    return {
        loadingSearchResult,
        searchResult,
        creditData,
    };
};
export default useGetSelectedMovie;