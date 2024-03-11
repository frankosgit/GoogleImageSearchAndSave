import { Link } from "react-router-dom";

interface ISearchButton {
    size: string;
    color: string;
    text: string;
    margin?: string;

}

export const SearchButton = ({ size, color, text, margin }: ISearchButton) => {

    return (
        <Link to="/">
            <button
                className={`btn btn-${size} btn-outline btn-${color} text-${text} ${margin}`}
            > Search
            </button>
        </Link>
    )
}