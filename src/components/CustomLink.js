import { Link, useMatch } from "react-router-dom"

export const CustomLink = ({children, to, ...props}) => {
    const match = useMatch(to);
    
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
