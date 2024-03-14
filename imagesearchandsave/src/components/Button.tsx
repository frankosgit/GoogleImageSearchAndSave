import { Link } from "react-router-dom";

interface IButton {
    size: string;
    color: string;
    margin?: string;
    text: string
    children: React.ReactNode
    link: string

}

export const Button = ({ link, size, color, children, margin, text }: IButton) => {

    return (
        <Link to={link}>
            <button
                className={`btn btn-${size} btn-outline btn-${color} text-${text} ${margin}`}
            > {children}
            </button>
        </Link>
    )
}