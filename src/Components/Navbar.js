import {useRef} from "react";
import {FaBars, FaTimes} from "react-icons/fa";

function Navbar(){
    const navRef = useRef();
    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return(
        <header>
            <h3>Blog Corzo/Piñeros</h3>
            <nav ref={navRef}>
                <a href="/BlogPost">BLOG POST</a>
                <a href="/BlogList">BLOG LIST</a>
                <a href="/FavoriteView">FAVORITES</a>
                <a href="/WaitView">EN LISTA DE ESPERA</a>
                <button className="nb ncb" onClick={showNavBar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nb" onClick={showNavBar}>
                <FaBars/>
            </button>
        </header>
    );
}


export {Navbar};