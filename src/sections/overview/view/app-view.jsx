/* eslint-disable spaced-comment */
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Stack, Snackbar, TextField } from '@mui/material';

import { getSalesByDate, getStatisticsMonth } from 'src/services/sales-service';

import Toast from 'src/components/toast/toast';

import AppWidgetSummary from '../app-widget-summary';
import AppHistogramaSales from '../app-histogramSales';
import AppCircularDiagram from '../app-circular-diagram';


// ----------------------------------------------------------------------

export default function AppView() {

  const [statistics, setStatistics] = useState([{}]);
  // eslint-disable-next-line no-unused-vars
  const [salesData, setSalesData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00.000
    return today;
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Mensaje por defecto');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const monthNumber = today.getMonth() + 1;
        const response = await getStatisticsMonth(monthNumber);
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
        setSnackbarMessage('Error al cargar las estadisticas');
        setSnackbarSeverity('error');
        showAlert();
      }
    };

    fetchData();
  }, []);

  const showAlert = () => {
    setOpenSnackbar(true);
  };

  useEffect(() => {

    const formattedDate = currentDate.toISOString().split('T')[0];
    getSalesByDate(formattedDate)
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => console.error('Error fetching sales:', error));

  }, [currentDate]);


  const renderInputDate = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Fecha</Typography>
      <TextField
        type="date"
        defaultValue={currentDate.toISOString().split('T')[0]} // Mantén el formato ISO para el defaultValue
        label="Valor"
        variant="outlined"
        onChange={(e) => {
          const selectedDate = new Date(e.target.value);
          // Ajusta la fecha a la zona horaria local y luego extrae la fecha sin la zona horaria
          const adjustedDate = new Date(selectedDate.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
          setCurrentDate(adjustedDate);
        }}
      />
    </Stack>
  );
  

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Estadisticas
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={`Ventas del mes: ${String(statistics.totalSales)}`}
            total={`$ ${statistics.totalAmount}`}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />


        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Productos vendidos"
            total={String(statistics.totalProductsSold)}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={`Producto mas vendido: ${statistics.mostSoldProduct ? statistics.mostSoldProduct.quantity : 'N/A'}`}
            total={statistics.mostSoldProduct ? statistics.mostSoldProduct.productName : "N/A"}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />

        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={`Producto menos vendido: ${statistics.leastSoldProduct ? statistics.leastSoldProduct.quantity : 'N/A'}`}
            total={statistics.leastSoldProduct ? statistics.leastSoldProduct.productName : "N/A"}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />

        </Grid>

        <Grid xs={12} sm={11.9} md={12}>

          {renderInputDate}

        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppHistogramaSales
           title={`Ventas del ${currentDate.toLocaleDateString()}`}
           subheader="Análisis de las ventas en la fecha seleccionada"
            chart={{
              series: salesData.map((sale) => ({
                label: sale.productName,
                value: sale.quantity,
              })),
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCircularDiagram
            title={`Ventas del ${currentDate.toLocaleDateString()}`}
            chart={{
              series: salesData.map((sale) => ({
                label: sale.productName,
                value: sale.quantity,
              })),
            }}
          />
        </Grid>


    
      </Grid>


      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Toast
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      </Snackbar>

    </Container>
  );
}
