import { Avatar } from '@mui/material'
import React from 'react'
import Slider from 'react-slick';

const storyData = [
    {
        name: "Jaydip Patel",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNTBiIBka08VQlJa_2LMCkrZKqZ7fT-PV_zw&usqp=CAU",
        description: "Apologies Aren’t Enough, We Need Reparations",
        date: '3 day ago'
    },
    {
        name: "Mansi Joshi",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2AnKOLhLgzlFjwD4nLP21BDjglT43XsVwJQ&usqp=CAU",
        description: "Apologies Aren’t Enough, We Need Reparations",
        date: '4 day ago'
    },
    {
        name: "Disha Sathwara",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWkh-FmK4k2h4a0dVk9FDO14869w7TjqwyA&usqp=CAU",
        description: "Apologies Aren’t Enough, We Need Reparations",
        date: '3 day ago',
    },
    {
        name: "Dhruv Sathwara",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXiKxCdCFAZverAZZPHT77HqndAlgTEtncg&usqp=CAU",
        description: "Apologies Aren’t Enough, We Need Reparations",
        date: '3 day ago'
    },
    {
        name: "Karan Pujara",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTScPSEyda4ZdKgzlMZpIjmCoa6Hyt8xVBNeg&usqp=CAU",
        description: "Apologies Aren’t Enough, We Need Reparations",
        date: '3 day ago'
    },
    {
        name: "Web3Builder",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQGFlovSwUJsdCOFZYqKxiGTy9aBjCLmQVw&usqp=CAU",
        description: "Apologies Aren’t Enough, We Need Reparations",
        date: '3 day ago'
    },
    {
        name: "CryptoYard",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIuplMPz5muZkszIGtUUO0H7XkCw5gxhTew&usqp=CAU",
        description: "21 GIFs From the Second Truss–Sunak Tory Leadership Debate",
        date: '3 day ago'
    },
    {
        name: "CrypticDev",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4meNTJr3kzXWPMkCAjzkTNXeD3Ys8LBfGPziN_epUuBsbmG9PTCMux02sno7Tm6TKspA&usqp=CAU",
        description: "Apologies Aren’t Enough, We Need Reparations Apologies Aren’t Enough, We Need Reparations"
    },
    {
        name: "CryptoPunk",
        img: "https://g.foolcdn.com/art/companylogos/square/link.png",
        description: "Apologies Aren’t Enough, We Need Reparations",
        date: '3 day ago'
    },
    {
        name: "Vitalik",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbJbf16Wo-44LjPMWnx9UPvA11MzO8_0igDw&usqp=CAU",
        description: "Apologies Aren’t Enough, We Need Reparations",
        date: '3 day ago'
    },
    {
        name: "Polygon",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB9Rv-Q2c3sp_1N-bKK0EspLRtR5Y45iJUA&usqp=CAU",
        description: "A Showdown Over Abortion Access Is Unfolding In Kansas",
        date: '3 day ago'
    }
]

function TopCreators() {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };


    return (
        <div className='container mt-5' >
            <div className='row'>
                <div className='col mt-5'>
                    <div className="d-flex justify-content-between">
                        <h5>Top Memers</h5>
                        <h5>View All</h5>
                    </div>
                    <Slider {...settings}>
                        {
                            storyData.map((e) => {
                                return (
                                    <div key={e.name}>
                                       <div className="story" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${e.img})`}}>
                                            <Avatar  src={e.img} className="storyAvatar" />
                                            <h4>{e.name}</h4>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>

        </div>
 
    )
}

export default TopCreators