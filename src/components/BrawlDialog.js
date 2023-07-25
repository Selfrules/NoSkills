// BrawlDialog.js
import { Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BrawlDialog = ({ open, handleClose, csvUrl, data }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="brawl-dialog-title">
      <DialogTitle id="brawl-dialog-title">{csvUrl}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell>Fray</TableCell>
                <TableCell>Total Battles</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Win Rate (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                const winRate = row["Total Battles"] > 0 
                  ? ((row.Wins / row["Total Battles"]) * 100).toFixed(2) 
                  : 0;
                let color;
                if (winRate > 80) {
                  color = 'gold';
                } else if (winRate >= 60) {
                  color = 'green';
                } else {
                  color = 'red';
                }
                return (
                  <TableRow key={index}>
                    <TableCell>{row.Player}</TableCell>
                    <TableCell>{row.Fray}</TableCell>
                    <TableCell>{row["Total Battles"]}</TableCell>
                    <TableCell>{row.Wins}</TableCell>
                    <TableCell>{row.Losses}</TableCell>
                    <TableCell style={{ color: color }}>{winRate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default BrawlDialog;
