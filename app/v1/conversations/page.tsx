'use client'

import EmptyState from "@/app/(site)/components/EmptyState/EmptyState"

export default  function page () {
    return (
        <div className="lg:block lg:pl-80 h-full">
            <EmptyState />
        </div>
    )
}