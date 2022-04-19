import { Link, useMatch } from "react-router-dom"

const Customlink = ({children, to, ...props}) => {

    const match = useMatch(to);
    console.log({match});

    return (
        <Link 
            to={to}
            className={ match ? "opened-page link" : "link"}
            {...props}
        >
            {
                children
            }
        </Link>
    );
}

export default Customlink;
