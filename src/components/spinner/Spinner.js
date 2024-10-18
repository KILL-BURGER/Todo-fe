import {useEffect, useState} from "react";

const Spinner = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() =>
            setLoading(false), 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <p>콘텐츠가 로드되었습니다!</p>
            )}
        </div>
    );
}

export default Spinner;