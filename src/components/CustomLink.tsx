import { Link, useMatch } from "react-router-dom";

type CustomLinkProps = {
    children: any;
    to: any;
};

export const CustomLink:React.FC<CustomLinkProps> = ({children, to, ...props}) => {
    
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
