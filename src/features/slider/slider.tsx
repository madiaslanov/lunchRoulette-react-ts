import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SliderSizes() {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                size="small"
                defaultValue={15000}
                min={0}
                max={30000}
                step={500}
                aria-label="Small"
                valueLabelDisplay="auto"
            />
            <Slider
                defaultValue={15000}
                min={0}
                max={30000}
                step={500}
                aria-label="Default"
                valueLabelDisplay="auto"
            />
        </Box>
    );
}