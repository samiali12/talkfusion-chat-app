'use client';

import useConversations from "@/app/hooks/useConversations";
import useRoutes from "@/app/hooks/useRoutes";
import MobileSidebarItems from "./MobileSidebarItems";

const MobileSidebar = () => {

    const routes = useRoutes();
    const { isOpen } = useConversations();



    return (

        <div
            className="lg:hidden
        bg-red 
        fixed 
        z-40 
        bottom-0
        flex 
        justify-between 
        items-center 
        w-full
        border-t-[1px]
         border-gray-300">
            <ul className="flex w-full justify-between items-center">            {
                routes.map((items) =>
                    <MobileSidebarItems
                        key={items.label}
                        label={items.label}
                        href={items.href}
                        icon={items.icon}
                        active={items.active}
                        onClick={items.onClick}
                    />
                )
            }
            </ul>


        </div>

    )
}

export default MobileSidebar;