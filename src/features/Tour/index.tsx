import React from 'react'
import Modal from '../../features/Modal'
import { AiFillBulb } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi'
import temp from '../../assets/demo_1.png'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { closeTour } from './tourSlice'

type Props = {}

const Tour = (props: Props) => {

    const [step, setStep] = React.useState(0)
    const opened = useAppSelector(state => state.tour.opened)
    const dispatch = useAppDispatch()

    return (
        <Modal opened={opened} onClose={() => dispatch(closeTour())}
            components={[1, 2, 3, 4, 5]}
        >
            <div className="flex-1 w-full h-full overflow-hidden">
                <img src={temp} alt="" className="w-full rounded-xl" />
                <div className="mt-4">
                    <h1 className="font-bold text-xl">Welcome to GraphFlow !</h1>
                    <p className="text-sm text-gray-500 my-2">
                        GraphFlow is a tool to help you visualize your data in a graph
                        format. You can use it to create a graph, edit it, and share it
                        with your friends.
                    </p>
                    <div className="
            group
            cursor-pointer
            flex items-center justify-between
            mt-2
            p-2
            rounded-lg
            bg-gray-100
            dark:bg-dark-tertiary
            hover:scale-[0.98]
            hover:bg-gray-100 hover:text-black
            dark:hover:bg-dark-quaternary dark:hover:text-white
            transition duration-300 ease-in-out
            text-gray-500
            ">
                        <div className="flex items-center space-x-2">

                            <AiFillBulb className="text-yellow-300 dark:text-yellow-500 group-hover:text-yellow-300 mr-2" />
                            <p className="text-sm">
                                Let us show you how to use GraphFlow with a guided tour.
                            </p>
                        </div>
                        <BiChevronRight className="" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Tour