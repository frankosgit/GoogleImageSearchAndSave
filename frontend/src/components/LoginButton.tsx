import { useAuth0 } from "@auth0/auth0-react";

interface ILoginButton {
    size: string;
    color: string;
    text: string;
}

const LoginButton = ({ size, color, text }: ILoginButton) => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button
            className={`btn btn-${size} btn-outline btn-${color} text-${text}`}
            onClick={() => loginWithRedirect()}
        > Login
        </button>
    )
}

export default LoginButton;