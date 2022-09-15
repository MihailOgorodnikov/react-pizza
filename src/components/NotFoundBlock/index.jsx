import React from "react";

import stylse from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
    return (
            <h1 className={stylse.root}>
                <span></span>
                <br/>
                Ничего не найдено 
            </h1>
    );
};

export default NotFoundBlock;