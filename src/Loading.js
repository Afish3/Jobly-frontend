import React from "react";
import { Spinner } from 'reactstrap';
import './Loading.css';

const Loading = () => (
    <div className="Loading">
        <Spinner className="text-center">
            Loading...
        </Spinner>
    </div>
)

export default Loading;