import React from 'react';
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SelectType from './selectType';
import SelectBuyLimit from './selectBuyLimit';
import logoIcon from '../assets/rs3exch_nav_logo.png';
import '../spreadsheets/nav.css';

export default function Navigation() {

    return (
        <div className="left-container">
            <div className="header">
                <Link to='/'>
                    <Image src={logoIcon} className="header-image" />
                </Link>
            </div>

            <Button variant="dark" className='link-nav'>
                    <a href='/rising'>Rising in Price</a>
            </Button>

            <Button variant="dark" className='link-nav'>
                <a href='/falling'>Falling in Price</a>
            </Button>

            <SelectBuyLimit />
            <SelectType />
        </div>
    )
}