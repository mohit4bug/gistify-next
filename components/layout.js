import Navbar from "./navbar"


export default function Layout({ children }) {
    return (
        <div className="h-screen w-full overflow-auto scrollbar-hide">
            <Navbar />
            {children}
        </div>
    )
}
