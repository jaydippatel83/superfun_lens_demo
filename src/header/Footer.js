import React from 'react'

function Footer() {
    return (
        <div className='container-fluid' style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex justify-content-between' style={{height:'60px'}}>
                        <p className='align-self-center m-0'>© Copyright 2022. All Rights Reserved.</p>
                        <p className='align-self-center m-0'> Made with Superfun.social</p>
                        <p className='align-self-center m-0'>social Icons</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer