// BrawlButton.js
import { Button } from '@mui/material';

const BrawlButton = ({ file, handleOpen }) => {
  return (
    <Button variant="contained" color="primary" onClick={() => handleOpen(file)}>
      {file.replace('.csv', '')}
    </Button>
  );
}

export default BrawlButton;
