import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import Page from 'src/components/Page';
import type { Theme } from 'src/types/theme';
import { Grid, Box, Typography, CardActions, Container, FormControl, InputLabel, Select, MenuItem, Button, Paper } from '@mui/material';
// import { useEthersState } from 'src/contexts/EthereumContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { OpthyCard } from "src/components/Card";
import makeStyles from '@mui/styles/makeStyles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { formatUnits } from '@ethersproject/units';

const useStyles = makeStyles((theme: Theme) => ({
    customContainer: {       
        minWidth: '100%'        
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
}));

interface buyContract {
    status: boolean,
    message: string
}


const BuyContract: FC = () => {
    // const { userCurrentAddress } = useEthersState();
    const classes = useStyles();
    const [buyable, setBuyable] = React.useState<buyContract>({status: false, message: "Please approve before Buy."})

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query: any = useQuery();
    const opthyData: any = JSON.parse(query.get("opthyDetails"));

    // contractAddress=0x1Da9c71671f292819aE4680DA58d0a410BD1a009&expiration=10000000000&balanceT0=10000000000000000000&balanceT1=0&rT0=10000000000000000000&rT1=3333333333333333&opthyDetails={%22address%22:%220x1Da9c71671f292819aE4680DA58d0a410BD1a009%22,%22expiration%22:%2296650%20days%2013h.%2020m.%201s.%22,%22token0%22:{%22name%22:%22DAI%20Test%20Token%22,%22symbol%22:%22DAI%22,%22decimals%22:18,%22address%22:%220x7Af456bf0065aADAB2E6BEc6DaD3731899550b84%22,%22balance%22:{%22type%22:%22BigNumber%22,%22hex%22:%220x8ac7230489e80000%22},%22r%22:{%22type%22:%22BigNumber%22,%22hex%22:%220x8ac7230489e80000%22}},%22token1%22:{%22name%22:%22Wrapped%20Ether%22,%22symbol%22:%22WETH%22,%22decimals%22:18,%22address%22:%220xc778417E063141139Fce010982780140Aa0cD5Ab%22,%22balance%22:{%22type%22:%22BigNumber%22,%22hex%22:%220x00%22},%22r%22:{%22type%22:%22BigNumber%22,%22hex%22:%220x0bd7a625405555%22}},%22liquidityProviderDetails%22:{%22name%22:%22DAI%20Test%20Token%22,%22symbol%22:%22DAI%22,%22decimals%22:18,%22address%22:%220x9d23e5D38C31DF9FF11512e40f43a2a4Fa7a3b41%22,%22feeAmount%22:{%22type%22:%22BigNumber%22,%22hex%22:%220x00%22},%22token%22:%220x7Af456bf0065aADAB2E6BEc6DaD3731899550b84%22},%22swapperDetails%22:{%22name%22:%22DAI%20Test%20Token%22,%22symbol%22:%22DAI%22,%22decimals%22:18,%22address%22:%220x9d23e5D38C31DF9FF11512e40f43a2a4Fa7a3b41%22,%22feeAmount%22:{%22type%22:%22BigNumber%22,%22hex%22:%220x0de0b6b3a7640000%22},%22token%22:%220x7Af456bf0065aADAB2E6BEc6DaD3731899550b84%22},%22fixedSwapRate0%22:0.0003333333333333333,%22fixedSwapRate1%22:3000,%22bar1%22:100,%22bar2%22:0}
    
    const opthyDetails: {} = {
        balanceT0: query.get("balanceT0"),
        balanceT1: query.get("balanceT1"),
        expiration: query.get("expiration"),
        liquidityProvider: opthyData.liquidityProviderDetails.address,
        liquidityProviderFeeAmount: opthyData.liquidityProviderDetails.feeAmount,
        liquidityProviderFeeToken: opthyData.liquidityProviderDetails.token,
        opthy: query.get("contractAddress"),
        rT0: query.get("rT0"),
        rT1: query.get("rT1"),
        swapper: opthyData.swapperDetails.address,
        swapperFeeAmount: opthyData.swapperDetails.feeAmount,
        swapperFeeToken: opthyData.swapperDetails.token,
        token0: opthyData.token0.address,
        token1: opthyData.token1.address
    };

    // Expire Calculation
    const now = Math.floor(Date.now() / 1000);
    const expire = parseInt(query.get("expiration"));
    let delta = expire - now;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = delta % 60;
    opthyData.expiration = days +' days ' + hours + 'h. ' + minutes + 'm. ' + seconds + 's.';

    // function isInt(n: number){
    //     return Number(n) === n && n % 1 === 0;
    // }
    function isFloat(n: number){
        return Number(n) === n && n % 1 !== 0;
    }

    const clickBuyContract = () => {
        if(buyable?.status === true){

        } else {
            alert(buyable?.message);
        }
    }

    return (
        <Page title="Buy Contract">
            <Box m={2} mt={10}>
                <Grid container spacing={2}>
                    <Grid item xs={12} m={1}>
                        <Typography variant="h5" sx={{display: 'inline-block'}}>Contract &nbsp;</Typography>
                        <Box
                            component="span"
                            sx={{
                            display: 'inline-block',
                            visibility: 'visible',
                            my: 2,
                            p: 1,
                            bgcolor: (theme) =>
                                theme.palette.mode === 'dark' ? '#0f69b78c' : 'grey.100',
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            border: '1px solid',
                            borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            }}
                        >
                            {query.get("contractAddress")}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box m={2}>
                <Grid container spacing={2}>                   
                    {/* Opthy card loop  */}
                    <Grid item xs={12} md={4}>
                        <OpthyCard data={opthyDetails} calledFrom="buyContract" buyableProp={buyable}/>
                    </Grid>
                    {/* Opthy card loop  */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ m: 1, borderRadius: '10px' }}>
                            <Box className={classes.boxHeader} sx={{backgroundColor: 'success.dark'}}></Box>
                            <CardContent>
                                <Typography align="center" variant="h5">Providing Liquidity</Typography>
                                <Divider />
                                <Typography align="center" variant="h5">BTC/DAI</Typography>
                                
                                <Grid container spacing={2} mt={0}>
                                    <Grid item xs={12}>
                                        <Paper elevation={0} className={classes.paperTransparent}>
                                            <Typography variant="body2" color="text.secondary">Value at Maturity, minimum * between: </Typography>
                                            <Box p={1}>
                                                <Typography gutterBottom variant="body2">{Number(formatUnits(query.get("rT0"), opthyData.token0.decimals))} {opthyData.token0.symbol}</Typography>
                                                <Typography gutterBottom variant="body2">{ parseFloat(formatUnits(query.get("rT1"), opthyData.token1.decimals)).toFixed(isFloat(Number(formatUnits(query.get("rT1"), opthyData.token1.decimals))) === true ? 4 : 2) } {opthyData.token1.symbol}</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt={1}>
                                    <Grid item xs={12}>
                                        <Paper elevation={0} className={classes.paperTransparent}>
                                            <Typography variant="body2" color="text.secondary">Matures In: </Typography>
                                            <Box p={1}>
                                                <Typography gutterBottom variant="body2">{opthyData.expiration}</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={2} mt={0} justifyContent="center">
                                    <Grid item>
                                        <Button onClick={clickBuyContract} size="medium" sx={{ m: 1 }} variant="contained" color="primary">Buy</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>        
                </Grid>
            </Box>
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} m={1}>
                        <Typography variant="h6">Buy this Contract?</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>             
                    {/* Opthy card loop  */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ m: 1, borderRadius: '10px' }}>
                            <Box className={classes.boxHeader2} sx={{backgroundColor: 'success.dark'}}>
                                <Typography align="center" style={{lineHeight: "2.0"}} variant="h6">SWAPPER</Typography>
                            </Box>
                            <CardContent>
                                <Box m={5}>
                                    <Divider />
                                </Box>
                                <Box textAlign='center' m={5}>

                                { Number(formatUnits(opthyData.swapperDetails.feeAmount, opthyData.swapperDetails.decimals)) > 0 ? 
                                    <>
                                    <Typography align="center" variant="h5">Pay { parseFloat(formatUnits(opthyData.swapperDetails.feeAmount, opthyData.swapperDetails.decimals)).toFixed(2)} {opthyData.swapperDetails.symbol}</Typography>
                                    <Typography align="center">to become the Swapper</Typography>

                                    <Button size="medium" sx={{ m: 3 }} variant="contained" color="primary">Approve {opthyData.swapperDetails.symbol} to Buy</Button>
                                    </>
                                :   <>
                                    <Typography align="center" variant="h5">The Swapper Role</Typography>
                                    <Typography align="center">is not on offer</Typography>
                                    </>
                                }
                                </Box>
                                <Box m={5}>
                                    <Divider />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ m: 1, borderRadius: '10px', minHeight: 386 }}>
                            <Box className={classes.boxHeader2} sx={{backgroundColor: 'warning.dark'}}>
                                <Typography align="center" style={{lineHeight: "2.0"}} variant="h6">LIQUIDITY PROVIDER</Typography>
                            </Box>
                            <CardContent>
                                <Box m={5}>
                                    <Divider />
                                </Box>
                                <Box textAlign='center' m={5}>
                                { Number(formatUnits(opthyData.liquidityProviderDetails.feeAmount, opthyData.liquidityProviderDetails.decimals)) > 0 ? 
                                    <>
                                    <Typography align="center" variant="h5">Pay { parseFloat(formatUnits(opthyData.liquidityProviderDetails.feeAmount, opthyData.liquidityProviderDetails.decimals)).toFixed(2)} {opthyData.liquidityProviderDetails.symbol}</Typography>
                                    <Typography align="center">to become the Liquidity Provider</Typography>
                                    <Button size="medium" sx={{ m: 3 }} variant="contained" color="primary">Approve {opthyData.liquidityProviderDetails.symbol} to Buy</Button>
                                    </>
                                :   <>
                                    <Typography align="center" variant="h5">The Liquidity Provider Role</Typography>
                                    <Typography align="center">is not on offer</Typography>
                                    </>
                                }
                                </Box>
                                <Box m={5}>
                                    <Divider />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>                 
                    {/* Opthy card loop  */}                   
                </Grid>
            </Box>
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} m={1}>
                        <Typography variant="h6">Contract History</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} m={1}>
                    <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                    {/* {[1, 2, 3].map((value) => ( */}
                        <ListItem
                        key={1}
                        >
                            <ListItemText sx={{ width: 100 }} primary={`2022-05-04`} />
                            <ListItemText sx={{ width: 100 }} primary={`17:46`} />
                            <ListItemText sx={{
                                width: 600,
                                padding: '4px 15px 4px 15px',
                                border: '1px solid',
                                bgcolor: (theme) =>
                                theme.palette.mode === 'dark' ? '#0f69b78c' : 'grey.100', 
                                borderRadius: 2,
                                fontSize: '0.875rem',
                                fontWeight: '700',
                                color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            }} primary={`Contract bought by: 45ab5471485cfaadeccabdef25631aef`} />
                        </ListItem>
                        <ListItem
                        key={2}
                        >
                            <ListItemText sx={{ width: 100 }} primary={`2022-05-04`} />
                            <ListItemText sx={{ width: 100 }} primary={`17:46`} />
                            <ListItemText sx={{ 
                                width: 600,
                                padding: '4px 15px 4px 15px',
                                border: '1px solid',
                                bgcolor: (theme) =>
                                theme.palette.mode === 'dark' ? '#0f69b78c' : 'grey.100', 
                                borderRadius: 2,
                                fontSize: '0.875rem',
                                fontWeight: '700',
                                color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            }} primary={`Contract created by you as a seller`} />
                        </ListItem>
                        
                    {/* ))} */}
                    </List>
                    </Grid>
                </Grid>
            </Box>
        </Page>
    )
}

export default BuyContract;