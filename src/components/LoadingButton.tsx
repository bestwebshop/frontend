import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

const LoadingButton = (props:any) => {
    const [isLoading, setLoading] = useState(false);
    const respFct = props.respFct;
    useEffect(() => {
        if (isLoading) {
            axios.get('https://api.exchangeratesapi.io/latest').then((response) => {
                setLoading(false);
                respFct(JSON.stringify(response.data))
                console.log(response.data);  //  console.log(response.status);        console.log(response.statusText);        console.log(response.headers);        console.log(response.config);
            });
        }
    }, [isLoading, respFct]);

    const handleClick = () => setLoading(true);

    return (
        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : () => {
            }}
        >
            {isLoading ? 'Loading…' : 'Click to load'}
        </Button>
    );
}

export default LoadingButton;