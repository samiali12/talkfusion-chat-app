import Link from "next/link";

interface DesktopSidebarItemsProps {
    label: String;
    href: string;
    icon: Icon;
    active?: boolean;
    onClick?: () => Promise<undefined>;
}


const DesktopSidebarItems: React.FC<DesktopSidebarItemsProps> = ({
    label, href, icon: Icon, active, onClick }) => {

    const handleClicks = () => {
        if(onClick){
            return onClick()
        }
    }

    if(active){
        active = true
    }

    return (
    

       
            <Link onClick={handleClicks}
                href={href}
                className={`flex items-center 
                flex-col text-sm text-gray-600  ${active ? 'bg-gray-200': ''}
                hover:bg-gray-100 p-3 rounded transition-all`}
                onClick={onClick}>
                <Icon className="w-6 h-6 shrink-0" />
                <span className="">{label}</span>
            </Link>
            
    )
}

export default DesktopSidebarItems;