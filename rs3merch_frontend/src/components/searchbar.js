import React, { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Searchbar() {

    const [keyword, setKeyword] = useState('');

    const handleSearchText = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearchLink = (e) => {
        if (e.key === 'Enter') {
            window.location.assign(`/search/${e.target.value}`)
        }
    }

    return (
        <Container className='search'>
            <Row className='searchRow'>
                <Col className='inputCol'>
                    <input type="text" placeholder="Search for an item..." onChange={handleSearchText} onKeyUp={handleSearchLink}></input>
                </Col>
                <Col>
                    <Button variant="dark"><Link className='searchText' to={{ pathname: `/search/${keyword}` }}>Search</Link></Button>
                </Col>
            </Row>
        </Container>
    )

}