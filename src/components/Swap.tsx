import React from "react";
import type { FC } from "react"
import { Button, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import type { Theme } from 'src/types/theme';
import makeStyles from '@mui/styles/makeStyles';
import { useEthersState } from 'src/contexts/EthereumContext';
import {ContractInterface, ethers} from "ethers";
import { CURRENCY_CONVERT } from "src/utils/helpers";
import { formatUnits, parseEther, parseUnits } from '@ethersproject/units';

declare let window:any
// const { address, ABI } = ERC20(ChainId.RinkebyTestnet);

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        minHeight: '100%',
        padding: theme.spacing(3)
    },
    boxHeader: {
        height: '8px'
    },
    boxHeader2: {
        height: '40px'
    },
    paperTransparent:{
        backgroundColor: "transparent !important" ,
    },
    customProgress:{
        "& .MuiLinearProgress-bar": {
            borderRadius: "5px 0px 0px 5px !important",           
            borderRight: "3px solid" + theme.palette.background.default,
        },
    },
    loadingClass: {
        marginTop: '10% !important',
        textAlign: 'center'
    }
}));

interface SwapProps {
    data: any;
}

export const Swap: FC<SwapProps> = ({ data }: SwapProps) => {
    // console.log("data = ", data);
    const classes = useStyles();
    const { userCurrentAddress } = useEthersState();
    let { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const [dai, setDai] = React.useState<string>('');
    const [dai2, setDai2] = React.useState<string>('');
    const [open, setOpen] = React.useState<boolean>(false);
    const [open2, setOpen2] = React.useState<boolean>(false);
    const [userBalance, setUserBalance] = React.useState<string | undefined>()

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setDai(event.target.value);
        setDai2(((event.target.value === data.token0.symbol) ? data.token1.symbol: data.token0.symbol));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange2 = (event: { target: { value: React.SetStateAction<string> } }) => {
        setDai2(event.target.value);
        setDai(((event.target.value === data.token0.symbol) ? data.token1.symbol: data.token0.symbol));
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const convertToken0Cur = CURRENCY_CONVERT(data.token0.symbol);
    const convertToken1Cur = CURRENCY_CONVERT(data.token1.symbol);
    provider.getBalance(userCurrentAddress)
    .then((result)=> {
        setUserBalance(ethers.utils.formatEther(result))
    });

    return (
        <>
        <Box m={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} m={1}>
                    <Typography variant="h6">Swap at the Fixed Rate?</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>              
                {/* Opthy card loop  */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ m: 1, borderRadius: '10px', minHeight: 209 }}>
                        <Box className={classes.boxHeader} sx={{backgroundColor: 'success.dark'}}></Box>
                        <CardContent sx={{padding: '0px 0px 0px 155px'}}>
                            <Grid container spacing={2} mt={0}>
                                <Grid item xs={12}>
                                    <Typography m={1}> From </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{ m: 1, width: 350 }}>
                                        <InputLabel id="demo-controlled-open-select-label">{data.token0.symbol}</InputLabel>
                                        <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={dai}
                                        label="DAI"
                                        onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Choose From</em>
                                            </MenuItem>
                                            <MenuItem value={data.token0.symbol}>{data.token0.symbol}</MenuItem>
                                            <MenuItem value={data.token1.symbol}>{data.token1.symbol}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Box>
                                        <Typography m={1} sx={{display: 'inline-block'}}>Quantity: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                        <Typography sx={{display: 'inline-block'}} gutterBottom variant="body2">~ $670,000.00 USD</Typography>
                                    </Box>
                                    <FormControl sx={{ m: 1, width: 350 }}>
                                        <InputLabel id="demo-controlled-open-select-label">DAI</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={dai}
                                            label="DAI"
                                            onChange={handleChange}
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>DAI</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                            </Grid>
                            {/* <Box m={1}>
                                <Typography gutterBottom variant="body2">Use Max 1000,000.00 DAI limited by wallet balance</Typography>
                            </Box> */}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ m: 1, borderRadius: '10px' }}> {/*, minHeight: 325*/}
                        <CardContent sx={{padding: '0px 0px 0px 155px'}}>
                            <Grid container spacing={2} mt={0}>
                                <Grid item xs={12}>
                                    <Typography m={1}> To </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Typography m={1} sx={{display: 'inline-block'}}>Quantity: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                        <Typography sx={{display: 'inline-block'}} gutterBottom variant="body2">~ ${((dai2 === data.token0.symbol) ? convertToken0Cur?.currencyIsValidating ? 0 : (Number(formatUnits(data.token0.balance, data.token0.decimals)) * convertToken0Cur?.convertResult?.Price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'): convertToken1Cur?.currencyIsValidating ? 0 : (Number(formatUnits(data.token1.balance, data.token1.decimals)) * convertToken1Cur?.convertResult?.Price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))} USD</Typography>
                                    </Box>
                                    <FormControl sx={{ m: 1, width: 350 }}>
                                        <InputLabel id="demo-controlled-open-select-label2">{data.token1.symbol}</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label2"
                                            id="demo-controlled-open-select2"
                                            open={open2}
                                            onClose={handleClose2}
                                            onOpen={handleOpen2}
                                            value={dai2}
                                            label="DAI"
                                            onChange={handleChange2}
                                        >
                                            <MenuItem value="">
                                                <em>Choose To</em>
                                            </MenuItem>
                                            <MenuItem value={data.token0.symbol}>{data.token0.symbol}</MenuItem>
                                            <MenuItem value={data.token1.symbol}>{data.token1.symbol}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>                 
                {/* Opthy card loop  */}                   
            </Grid>
        </Box>
        <Box m={2} mt={-2}>
            <Grid container spacing={2} justifyContent="center"> 
                <Grid item xs={12} >
                    <Card sx={{ m: 1, borderRadius: '10px' }}>
                        <CardContent>
                            <Typography m={1} variant="body2" align="center" > User Balance after: {userBalance} ETH </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                                    
            </Grid>
            
        </Box>
        {/* <Box m={2} mt={-1}>
            <Grid container justifyContent="center">
                <Grid item>
                    <Button size="medium" variant="contained" color="primary">Approve DAI to Buy</Button>
                </Grid>
            </Grid>
        </Box> */}
        </>
    )
}