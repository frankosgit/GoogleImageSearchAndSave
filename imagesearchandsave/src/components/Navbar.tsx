import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { SearchButton } from "./SearchButton";

const Navbar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (

        <div className="navbar bg-primary">
            <div className="flex-1">
                <a href="/userprofile" className="btn btn-ghost text-xl text-white">PhotoHive</a>
            </div>
            <div className="flex-none gap-2">

                <div className="dropdown dropdown-end">
                    <SearchButton
                        size="md"
                        color="secondary"
                        text="md"
                        margin="mr-4"
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
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar