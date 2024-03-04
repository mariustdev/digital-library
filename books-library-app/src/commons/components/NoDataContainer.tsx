import {FC} from "react";
import {Stack, Typography} from "@mui/material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

interface INoDataContainerProps {
    text?: string;
}

const NoDataContainer: FC<INoDataContainerProps> = ({text = 'No data'}) =>
<Stack alignItems="center" justifyContent="center" minHeight={300}>
    <ManageSearchIcon sx={{width: '50px', height: '50px'}}/>
    <Typography>{text}</Typography>
</Stack>;

export default NoDataContainer;
