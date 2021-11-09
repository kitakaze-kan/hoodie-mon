import { FC } from 'react'

export const LoadingModal:FC = () => {

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 opacity-90 flex flex-col items-center justify-center">
            <div className="flex justify-center items-center">
                <div
                    className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"
                ></div>
            </div>
        </div>
    )
}