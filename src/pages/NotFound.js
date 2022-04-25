import { CustomLink } from "../components/CustomLink";

export const NotFound = () => {
    return (
        <div className="page not-found-page">
            Not Found
            <CustomLink to="/">На главную</CustomLink>
        </div>
    );
}

