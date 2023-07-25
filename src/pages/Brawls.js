// Brawls.js
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import BrawlDialog from '../components/BrawlDialog';
import BrawlButton from '../components/BrawlButton';
import SummaryTable from '../components/SummaryTable';
import { Container, Grid } from '@mui/material';

const Brawls = () => {
  const [datasets, setDatasets] = useState([]);
  const [players, setPlayers] = useState([]);
  const [open, setOpen] = useState(false);
  const [csvUrl, setCsvUrl] = useState('');

  const handleOpen = (url) => {
    setCsvUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const csvFiles = [
      'brawl_31-05-2023.csv',
      'brawl_05-06-2023.csv',
      'brawl_10-06-2023.csv',
      'brawl_15-06-2023.csv',
      'brawl_21-06-2023.csv',
      'brawl_26-06-2023.csv',
    ];

    const aggregateData = async () => {
      const datasets = await Promise.all(csvFiles.map(async (file) => {
        const result = await new Promise((resolve) => {
          Papa.parse('/csv/' + file, {
            download: true,
            header: true,
            complete: results => resolve(results.data)
          });
        });
        return { url: file, data: result };
      }));

      const players = {};
      let globalTotalBattles = 0;
      let globalTotalWins = 0;

      datasets.forEach(dataset => {
        dataset.data.forEach(row => {
          const playerName = row.Player;
          if (!players[playerName]) {
            players[playerName] = {
              name: playerName,
              totalBattles: 0,
              wins: 0,
              losses: 0
            };
          }
          players[playerName].totalBattles += parseInt(row["Total Battles"]);
          players[playerName].wins += parseInt(row.Wins);
          players[playerName].losses += parseInt(row.Losses);

          globalTotalBattles += parseInt(row["Total Battles"]);
          globalTotalWins += parseInt(row.Wins);
        });
      });

      const playersArray = Object.values(players).map(player => ({
        ...player,
        winRate: Math.floor((player.wins / player.totalBattles) * 100 * 100) / 100
      }));

      setDatasets(datasets);
      setPlayers(playersArray);
    };

    aggregateData();
  }, []);

  return (
    <Container>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Benvenuto alla pagina Brawls!</h1>
      </Grid>
      <Grid item xs={12}>
        <SummaryTable players={players} />
      </Grid>
      {datasets.map((dataset, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <BrawlButton file={dataset.url} handleOpen={handleOpen} />
        </Grid>
      ))}
    </Grid>
    <BrawlDialog open={open} handleClose={handleClose} csvUrl={csvUrl} data={datasets.find(dataset => dataset.url === csvUrl)?.data || []} />
  </Container>
  );
}

export default Brawls;
