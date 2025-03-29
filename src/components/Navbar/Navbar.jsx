import logo from "../../assets/logo.png"

function Navbar() {
    return (<>
        <div className="container mx-auto py-6">
            <img src={logo} style={{width: '70px', heigh:'70px', position:'relative', zIndex: 1000000}} alt="logo" />
        </div>
    </>);
}

export default Navbar;