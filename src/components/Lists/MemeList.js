import { Box, Button, Divider} from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../../header/Header'
import Search from '../Search' 
import { useNavigate } from 'react-router-dom';
import { LensAuthContext } from '../../context/LensContext';

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

function MemeList() {
    const navigate = useNavigate(); 

 
    const handleNavigate = (e) => { 
        navigate(`/${e.name}`)
    }

  


    return (
        <>
            <Header />
            <div style={{ marginTop: '100px' }}>
                <Search />
                <div className='container'>
                    <div className='row mt-5'>
                        {
                            storyData && storyData.map((e) => {
                                return (
                                    <div className='col-12 col-sm-6 col-md-4 col-lg-4' key={e.name}>
                                        <Box style={{ margin: '10px  ', background: 'rgba(255,255,255,0.1)', padding: '20px' }}>
                                        <div className='text-center' onClick={()=> handleNavigate(e)}>
                                            <img src={e.img} width="100" height="100" style={{ borderRadius: '50%' }} alt={e.name} />
                                            <h5 className='pt-4' style={{ fontWeight: '600' }}>{e.name}</h5>
                                            <h6 className='' style={{ fontWeight: '600' }}>{`@${e.name.trim().toLowerCase()}`}</h6>
                                            <p>{e.description}</p>
                                            <Button variant='outlined'>Follow</Button>
                                        </div>
                                        {/* <Divider flexItem orientation="horizontal" style={{border:'1px solid white',margin :'10px 10px'}} /> */}

                                        <div className='d-flex justify-content-around text-left mt-4'>
                                            <div className='p-0 m-0'>
                                                <p className='p-0 m-0'>Followers</p>
                                                <h4 className='p-0 m-0'>101</h4>

                                            </div>
                                            <Divider flexItem orientation="vertical" style={{ border: '1px solid white', margin: '0 10px' }} />
                                            <div className='p-0 m-0'>
                                                <p className='p-0 m-0'>Following</p>
                                                <h4 className='p-0 m-0'>56</h4>

                                            </div>
                                        </div>
                                        {/* <Divider flexItem orientation="horizontal" style={{border:'1px solid white',margin :'10px 10px'}} /> */}

                                        <div className='d-flex justify-content-around text-left mt-4'>
                                            <Button variant='outlined'>Hire Me</Button>
                                            <Button variant='outlined'>Send Message</Button>
                                        </div>
                                    </Box>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemeList