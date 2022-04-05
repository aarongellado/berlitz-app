import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const font = "'Spartan', sans-serif"
const theme = createTheme({
  typography: {
    fontFamily: font,
    textTransform: "none",
    color: "#757575",
  }
}
);
function App() {
  const [value, setValue] = useState(0);
  const [imageVar, setImageVar] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState({ black: false, brown: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const btnDesc = { a: "ADD TO CART", v: "VIEW CART" }
  const largeScreen = useMediaQuery(useTheme().breakpoints.up('md'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleColorChange = (event) => {
    setImageVar(event.target.value);
  };

  const handleButtonClick = (e) => {
    if ((imageVar === 0 && isAdded.black === false) || (imageVar === 1 && isAdded.brown === false)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false)
        imageVar ? setIsAdded(isAdded => ({ ...isAdded, brown: true })) : setIsAdded(isAdded => ({ ...isAdded, black: true }))
      }, 2000)
    } else setIsModalOpen(true);
  }
  const handleClose = () => setIsModalOpen(false);

  const GridLeft = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: largeScreen ? "flex-start" : "center",
    marginLeft: largeScreen ? theme.spacing(5) : 0,
  }));
  const GridTopBorder = styled(Grid)(({ theme }) => ({
    width: "100%",
    display: 'flex',
    alignItems: largeScreen ? 'flex-start' : 'center',
    justifyContent: largeScreen ? 'flex-start' : 'center',
    paddingTop: theme.spacing(3),
    paddingLeft: largeScreen ? theme.spacing(5) : 0,
  }));

  const DetailsBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
      minHeight: '150px'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      minHeight: '230px'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      minHeight: '150px'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '270px'
    }
  }))
  const style = {
    position: 'center',
    minWidth: theme.spacing(20),
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: largeScreen ? "row" : "column",
    minWidth: theme.spacing(10),
  }));

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <DetailsBox>
            <Typography align={largeScreen ? 'left' : 'center'}>{children}</Typography>
          </DetailsBox>
        )}
      </div>
    );
  }


  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {!largeScreen && <Box >
          <Link href="#allProductsMobile" underline="hover" color="inherit" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', px: 3 }} ><ArrowBackIcon /><Typography variant='subtitle1' sx={{ py: 3 }}> All Products</Typography></Link>
        </Box>}

        <Box sx={{ flexGrow: 1 }}>
          <Grid container direction={largeScreen ? "row" : "column-reverse"}>


            <Grid item xs={12} md={6}>
              {largeScreen &&
                <Grid>
                  <Link href="#allProductsDesk" underline="hover" color="inherit" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', px: 3 }} ><ArrowBackIcon /><Typography variant='subtitle1' sx={{ py: 3 }}> All Products</Typography></Link>
                </Grid>}

              {/*Product title container */}
              <GridLeft direction="column" item sx={{ py: 5 }}>
                <Typography variant={largeScreen ? "h4" : "h5"} component="div" sx={{ fontWeight: 600 }}>Audio-Technica ATH-MSR7</Typography>
                <Typography variant='subtitle1' color="#bdbdbd" sx={{ fontWeight: 600 }}>2017 Best Headphones of the Year Award Winner</Typography>
              </GridLeft>

              {/*Tabs container */}
              <GridLeft direction="column" item>
                <Box>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="DESCRIPTION" {...a11yProps(0)} />
                    <Tab label="DETAILS" {...a11yProps(1)} />
                  </Tabs>
                </Box>
              </GridLeft>
              <Grid direction="column" item sx={{ borderTop: 1, borderColor: 'divider', width: "100%", display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', pt: 3, pl: largeScreen ? 5 : 3, pr: 3 }}>
                <TabPanel value={value} index={0}>
                  Amet commodo dolor aute cillum nisi pariatur id ullamco ea commodo laboris commodo. Duis fugiat ex duis sint Lorem excepteur deserunt ex Lorem incididunt do non. Laboris quis deserunt proident anim excepteur magna labore non dolor voluptate do dolore. Velit eiusmod veniam ex commodo. Elit labore cupidatat fugiat ad excepteur tempor amet pariatur laborum minim. Culpa id ullamco adipisicing occaecat pariatur.
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Velit incididunt consectetur commodo deserunt consequat sunt est. Duis occaecat quis labore et pariatur pariatur cupidatat consequat ullamco fugiat amet. Laborum cillum ea qui minim quis exercitation irure in non est dolore cupidatat adipisicing. Magna labore sit proident est veniam ea nostrud proident ipsum.
                </TabPanel>
              </Grid>
              <GridLeft direction="column">
                <Grid direction="row" sx={{ display: 'flex' }}>
                  <Typography variant={largeScreen ? 'h4' : 'h5'} sx={{ pb: 4, pr: 4, fontWeight: 600 }}>$59.99</Typography>
                  <Typography color="#bdbdbd" variant={largeScreen ? 'h4' : 'h5'} sx={{ pb: 4, textDecoration: 'line-through', fontWeight: 600 }}>$89.99</Typography>
                </Grid>
                <Typography variant='caption'>COLORS</Typography>
                <Select
                  value={imageVar}
                  defaultValue={0}
                  onChange={handleColorChange}
                >
                  <MenuItem value={0}>Black</MenuItem>
                  <MenuItem value={1}>Brown</MenuItem>
                </Select>
              </GridLeft>

              {/*Button container */}
              <GridTopBorder direction="column" item sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider', pb: 3, mt: 3 }}>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  onClick={handleButtonClick}
                  sx={{ py: 3, px: 5 }}
                >
                  <Typography sx={{ fontWeight: 600 }}>{imageVar ? isAdded.brown ? btnDesc.v : btnDesc.a : isAdded.black ? btnDesc.v : btnDesc.a}</Typography>
                </LoadingButton>
              </GridTopBorder>


            </Grid>
            {/*image container */}
            <Grid item xs={12} md={6}>
              <Box sx={{ minHeight: largeScreen ? '99.7%' : 400, border: 1, borderColor: 'divider', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: imageVar ? `url(${require('./assets/images/ath-msr7-brown.jpg')})` : `url(${require('./assets/images/ath-msr7-black.jpg')})` }}>
              </Box>

            </Grid>
          </Grid>
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', m: 10, justifyContent: 'center' }}
          >
            <Box sx={style}>
              <Stack spacing={2}>
                <Typography variant="h6">CART</Typography>
                {isAdded.black &&
                  <Item>
                    <Typography>Audio-Technica ATH-MSR7(black)</Typography>
                    <Button variant="contained" color="error" onClick={() => setIsAdded(isAdded => ({ ...isAdded, black: false }))}>
                      <Typography>REMOVE</Typography>
                    </Button>
                  </Item>}
                {isAdded.brown &&
                  <Item>
                    <Typography>Audio-Technica ATH-MSR7(brown)</Typography>
                    <Button variant="contained" color="error" onClick={() => setIsAdded(isAdded => ({ ...isAdded, brown: false }))}>
                      <Typography>REMOVE</Typography>
                    </Button>
                  </Item>}
              </Stack>
            </Box>
          </Modal>
        </Box>
      </div >
    </ThemeProvider>
  );
}

export default App;
