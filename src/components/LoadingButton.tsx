import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import KeyValueList from "../datatypes/KeyValueList";
import KeyValue from "../datatypes/KeyValue";

const LoadingButton = (props:{currencyApiResp:Function}) => {
    const [isLoading, setLoading] = useState(false);
    const currencyApiResp = props.currencyApiResp;
    useEffect(() => {
        if (isLoading) {
            axios.get('https://api.exchangeratesapi.io/latest').then((response) => {
                setLoading(false);
                //creating a list of KeyValueLists (e.g. products, categories and users -> Composite Server)
                let resp : KeyValueList[] = [];
                for (const key in response.data) {
                    let item_list: KeyValue[] = [];
                    for(const item_key in response.data[key]) {
                        item_list.push({
                            key: item_key,
                            value: response.data[key][item_key]
                        })
                    }
                    resp.push({
                        name: key,
                        list: item_list
                    })
                }
                currencyApiResp(resp)
                //console.log(response.data);
                //console.log(resp);
            });
        }
    }, [isLoading, currencyApiResp]);

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