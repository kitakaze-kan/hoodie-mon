import {FC} from 'react'

type BaseModalProps = {
    titleText?: string
    mainText?: string
    acceptBtnText?: string
    showCancelBtn?: boolean
    onClickAcceptBtn: (()=>void)
    onClickCloseModal: (()=>void)
}

export const BaseModal:FC<BaseModalProps> = ({titleText, mainText, acceptBtnText, showCancelBtn, onClickAcceptBtn, onClickCloseModal}) => {

    return (
        <dialog className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center">
            <div className="bg-white flex rounded-lg w-full md:w-1/2">
                    <div className="flex flex-col items-start w-full">
                        <div className="p-7 flex items-center w-full">
                            {titleText && (
                                <div className="text-gray-900 font-bold text-lg">{titleText}</div>
                            )}
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={onClickCloseModal}
                            >
                                <span className="text-gray-700 h-6 w-6 text-2xl block outline-none">×</span>
                            </button>
                        </div>
                        {mainText && (
                            <div className="px-7 overflow-x-hidden overflow-y-auto max-h-40">
                                <p>{mainText}</p>
                            </div>
                        )}
                        <div className="p-7 flex justify-end items-center w-full">
                            <button type="button" onClick={onClickAcceptBtn} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                                {acceptBtnText ? acceptBtnText : 'Got it.'}
                            </button>
                            {showCancelBtn && (
                                <button type="button" onClick={onClickCloseModal} className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
        </dialog>
    )
}