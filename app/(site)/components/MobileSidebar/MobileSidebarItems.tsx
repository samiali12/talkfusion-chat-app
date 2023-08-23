import Link from "next/link";

interface DesktopSidebarItemsProps {
    label: String;
    href: string;
    icon: Icon;
    active?: boolean;
    onClick?: () => Promise<undefined>;
}

const MobileSidebarItems: React.FC<DesktopSidebarItemsProps> = ({
    label, href, icon: Icon, active, onClick }) => {

    const handleClicks = () => {
        if(onClick){
            return onClick()
        }
    }

    return (
        <li onClick={handleClicks}>
            <Link
                href={href}
                className="flex items-center w-full
                gap-x-3
                flex-col text-sm text-gray-600 
                hover:text-black hover:bg-gray-100 p-4 rounded transition-all"
                onClick={onClick}>
                <Icon className="w-6 h-6 shrink-0" />
                <span className="">{label}</span>
            </Link>

        </li>
    )
}

export default MobileSidebarItems;