"use client"

import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Scissors, Syringe, CarTaxiFront, Hotel, Clock } from 'lucide-react'
import { WhatsappLogoIcon } from "@phosphor-icons/react"

const services = [

    {
        title: "Banho e Tosa",
        description: "Aqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosa",
        duration: "1h",
        prince: "$50",
        icon: <Scissors />,
        linkText: "Aqui é outra descrição."

    },
    {
        title: "Corte e Cabela",
        description: "Aqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosa",
        duration: "1h",
        prince: "$50",
        icon: <Scissors />,
        linkText: "Aqui é outra descrição."

    },

    {
        title: "Hotelzinho",
        description: "Aqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosa",
        duration: "1h",
        prince: "$50",
        icon: <Scissors />,
        linkText: "Aqui é outra descrição."

    },
    {
        title: "Hotelzinho",
        description: "Aqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosa",
        duration: "1h",
        prince: "$50",
        icon: <Scissors />,
        linkText: "Aqui é outra descrição."

    },
    {
        title: "Hotelzinho",
        description: "Aqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosa",
        duration: "1h",
        prince: "$50",
        icon: <Scissors />,
        linkText: "Aqui é outra descrição."

    },
    {
        title: "Hotelzinho",
        description: "Aqui é uma descrição do item banco e tosaAqui é uma descrição do item banco e tosa",
        duration: "1h",
        prince: "$50",
        icon: <Scissors />,
        linkText: "Aqui é outra descrição."

    },

]


export function Services() {

    const [emblaRef, emblaApi] = useEmblaCarousel({

        loop: false,
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width:768px)": { slidesToScroll: 3 }
        }
    })


    function scrollPrev() {
        emblaApi?.scrollPrev();
    }

    function scrollNext() {
        emblaApi?.scrollNext();
    }


    return (
        <section className="bg-white py-16">

            <div className="container mx-auto px-4">

                <h2 className="text-4xl font-bold mb-12">Services</h2>

                <div className="relative">

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {services.map((item, index) => (
                                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(100%/3)] px-3">
                                    <article className="bg-[#1e293b] text-white rounded-2xl p-6 space-y-4 
                                        h-full flex flex-col">
                                        <div className="flex-1 flex items-start justify-between">
                                            <div className="flex gap-3">

                                                <span className="text-3xl">{item.icon}</span>
                                                <div>
                                                    <h3 className="font-bold text-xl my-1">{item.title}</h3>
                                                    <p className="text-gray-400 text-sm select-none">
                                                        {item.description}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="w-4 h-5" />
                                                <span>{item.duration}</span>
                                            </div>
                                            <a
                                                href="#"
                                                className="flex items-center justify-center 
                                                    gap-2 hover:bg-red-500 px-4 py-1 rounded-md duration-300"

                                            > <WhatsappLogoIcon className="w-5 h-5" />
                                                Entrar em contato
                                            </a>

                                        </div>

                                    </article>

                                </div>

                            ))}

                        </div>

                        

                    </div>

                    <button className="bg-white flex items-center justify-center rounded-full 
                       shadow-lg w-10 h-10 absolute left-3 -translate-y-1/2 -translate-x-1/2 top-1/2 z-10"
                            onClick={scrollPrev}
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>

                    <button className="bg-white flex items-center justify-center rounded-full 
                       shadow-lg w-10 h-10 absolute -right-6 -translate-y-1/2 -translate-x-1/2 top-1/2 z-10"
                            onClick={scrollNext}
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>    

                </div>

            </div >
        </section >

    )
}