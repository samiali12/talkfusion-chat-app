
const UserBox = () => {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    Neil Sims
                </p>
                <p className="text-sm text-gray-500 truncate">
                    email@windster.com
                </p>
            </div>
            <div className="inline-flex text-base font-semibold text-gray-900">
                <img className="w-4 h-4 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" />
            </div>
        </div>
    )
}

export default UserBox;