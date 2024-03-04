import React, {FC} from "react";
import {Backdrop, CircularProgress} from "@mui/material";

interface ILoadingContainerProps {
    withBackground?: boolean;
    position?: string;
    size?: string;
}

const LoadingContainer: FC<ILoadingContainerProps> = ({withBackground = true, position = 'fixed', size = '35px'}) => {
    return (
        <Backdrop
            sx={{
                background: withBackground ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                position
            }}
            open={true}
        >
            <CircularProgress color="primary" size={size}/>
        </Backdrop>
    )
}

export default LoadingContainer;
