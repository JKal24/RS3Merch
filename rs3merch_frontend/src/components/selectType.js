import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import api from '../config/api';

export default function SelectType() {

    const [types, setTypes] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function handleTypes() {
            setTypes((await api.get('/TypeListing')).data);
        }

        handleTypes();
        setLoaded(true);
    }, [])

    const Types = () => {
        return (
            <>
                {
                    loaded ?
                        types.map((type, index) => {
                            return (
                                <Dropdown.Item href={`/type/${type}`} className="type" key={index}>
                                    {type}
                                </Dropdown.Item>
                            );
                        })
                        :
                        <h3>Loading...</h3>
                }
            </>
        )
    }

    return (
        <div>
            <DropdownButton title="Types">
                <Types />
            </DropdownButton>
        </div>
    )

}