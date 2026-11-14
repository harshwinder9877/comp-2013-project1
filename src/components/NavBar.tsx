
import logo from "../assets/images/logo.png";

interface NavbarProps {
    cartCount: number;
}

export default function Navbar({ cartCount }: NavbarProps) {
    return (
        <nav className="navbar">

            <div className="navLogo">
                <img src={logo} alt="Thrift Happens Logo" />
                <h1>Thrift Happens</h1>
            </div>

            <div className="navLinks">
                <a href="#products">Products</a>

                <a href="#checkout">
                    Checkout ({cartCount})
                </a>
            </div>

        </nav>
    );
}
