// src/components/navbar/Navbar.tsx
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "react-router-dom"

export default function Navbar() {

    const navItems: { label: string; to: string }[] = [
        { label: "AI PDF Tagger",         to: "/ai-pdf-tagger" },
        ]
    return (
        <nav className="w-full flex justify-center py-4 px-4 md:px-8 bg-gray-100">
        <div
            className="
            w-full max-w-screen-xl
            bg-white
            border-2 border-gray-300
            shadow-2xl
            rounded-2xl
            flex items-center justify-between
            px-6 py-3
            "
        >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-black">
                <AvatarImage src="" alt="logo" />
                <AvatarFallback className="text-white bg-black">A</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-base">Accessible PDF AI</span>
            </Link>

            {/* Links & Buttons */}
            <div className="flex items-center gap-6 text-sm md:text-base text-gray-700">
                {navItems.map(({ label, to }) => (
                <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                    `transition hover:underline ${
                    isActive
                        ? "text-black underline"
                        : "hover:text-black text-gray-700"
                    }`
                }
                >
                {label}
                </NavLink>
            ))}

            {/* <Button className="bg-black text-white px-4 py-1 rounded-full hover:opacity-90 transition">
                Log in
            </Button> */}
            </div>
        </div>
        </nav>
    )
}
