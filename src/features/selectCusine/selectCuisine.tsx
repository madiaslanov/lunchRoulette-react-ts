import { Autocomplete, TextField } from "@mui/material";

interface CuisineOption {
    label: string;
}

interface CuisineSelectProps {
    value: string | null;
    onChange: (value: string | null) => void;
}

const cuisineOptions: CuisineOption[] = [
    { label: "Тайская" },
    { label: "Европейская" },
    { label: "Китайская" },
    { label: "Японская" },
    { label: "Грузинская" },
    { label: "Азиатская" },
    { label: "Восточная" },
    { label: "Казахская" },
    { label: "Кавказская" },
    { label: "Турецкая" },
    { label: "Арабская" },
    { label: "Южно-корейская" },
    { label: "Средиземноморская" },
    { label: "Паназиатская" },
    { label: "Восточно-европейская" },
    { label: "Авторская" },
    { label: "Фьюжн-кухня" },
];

const CuisineSelect = ({ value, onChange }: CuisineSelectProps) => {
    return (
        <Autocomplete
            disablePortal
            options={cuisineOptions}
            getOptionLabel={(option) => option.label}
            value={cuisineOptions.find((c) => c.label === value) || null}
            onChange={(_, newValue) => onChange(newValue ? newValue.label : null)} // Теперь передается string | null
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Кухня"
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'wheat',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'wheat',
                            },
                            '&:hover fieldset': {
                                borderColor: 'wheat',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'wheat',
                            },
                        },
                        '& input': {
                            color: value || params.inputProps?.value ? 'white' : 'black',
                        },
                    }}
                />
            )}
            sx={{ width: '100%', marginBottom: 2 }}
        />
    );
};

export default CuisineSelect;
