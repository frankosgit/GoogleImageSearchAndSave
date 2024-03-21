import { useAuth0 } from "@auth0/auth0-react";

interface ILogoutButton {
    size: string;
    color: string;
    text: string;

}

const LogoutButton = ({size, color, text}: ILogoutButton) => {
    const { logout } = useAuth0();

    return (
        <button
        className={`btn btn-${size} btn-outline btn-${color} text-${text}`}
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        > Log out
        </button>
    )
}

    export default LogoutButton;