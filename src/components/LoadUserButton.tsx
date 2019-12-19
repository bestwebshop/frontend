import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import User from "datatypes/User";

const LoadUserButton = (props:{userApiResp:Function}) => {
    const [isLoading, setLoading] = useState(false);
    const userApiResp = props.userApiResp;
    useEffect(() => {
        if (isLoading) {
            axios.get('http://bestwebshop.tech:9203/user/1').then((response) => {
                setLoading(false);
                //creating a list of KeyValueLists (e.g. products, categories and users -> Composite Server)
                let loadedUser : User = {
                  id: response.data.id,
                  lastname: response.data.lastname,
                  firstname: response.data.firstname,
                  username: response.data.username,
                  password: response.data.password,
                  role: {
                    id: response.data.role.id,
                    typ: response.data.role.typ,
                    level: response.data.role.level
                  }
                }
                userApiResp(loadedUser)
                //console.log(response.data);
                //console.log(resp);
            });
        }
    }, [isLoading, userApiResp]);

    const handleClick = () => setLoading(true);

    return (
        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : () => {
            }}
        >
            {isLoading ? 'Loading User…' : 'Click to load User'}
        </Button>
    );
}

export default LoadUserButton;