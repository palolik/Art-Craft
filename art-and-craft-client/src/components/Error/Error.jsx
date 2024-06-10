import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="flex flex-col justify-center items-center text-4xl ">
            <h2 >Oops!!!</h2>
            <p>{error.statusText || error.message}</p>
            {
                error.status === 404 && <div className="flex flex-col justify-center items-center">
                    <h3 >Page not found</h3>
                    <p>Go back where you from</p>
                    <Link to="/"><button>Home</button></Link>
                </div>
            }
        </div>
    );
};

export default ErrorPage;