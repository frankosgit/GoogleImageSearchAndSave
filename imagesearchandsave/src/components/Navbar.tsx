import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { Button } from "./Button";

const Navbar = () => {
    const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();

    const handleLogout = () => {
        logout();
    }
    const handleLogIn = () => {
        loginWithRedirect();
    }


    return (

        <div className="navbar bg-primary">
            <div className="flex-1">
                <a href={isAuthenticated ? "/userprofile" : "/"} className="btn btn-ghost text-xl text-white">PhotoHive</a>
            </div>
            <div className="flex-none gap-2">

                <div className="dropdown dropdown-end">
                    {isAuthenticated &&
                        <Button
                            size="md"
                            color="secondary"
                            text="md"
                            margin="mr-4"
                            children="Profile"
                            link="/userprofile"
                        />
                    }
                    <Button
                        size="md"
                        color="secondary"
                        text="md"
                        margin="mr-4"
                        children="Search"
                        link="/"
                    />
                    {isAuthenticated ?
                        <LogoutButton
                            size="md"
                            color="secondary"
                            text="md"
                        /> :
                        <LoginButton
                            size="md"
                            color="secondary"
                            text="md"
                        />
                    }
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="../../public/hivephoto.png" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        {isAuthenticated && <li>
                            <a href="/userprofile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        }
                        {isAuthenticated ?
                            <li onClick={handleLogout}><a>Logout</a></li> : <li onClick={handleLogIn}><a>Login</a></li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar