import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    control: {
      padding: theme.spacing(2),
      minWidth: 300,
    },
  }),
);

export function FilterSelect<OptionType extends Option>(props: FilterSelectProps<OptionType>) {
  const classes = useStyles();
  let [value, setValue] = React.useState<OptionType | undefined | null>(props.selectedOption);
  let [inputValue, setInputValue] = React.useState('');
  let loading = true;

  //TODO - Clear Selection
  
  return (
    <Autocomplete
      autoComplete={true}
      autoSelect={true}
      autoHighlight
      disabled={props.disabled || false}
      className={classes.control}
      options={props.options}
      getOptionLabel={(option) => option.label}
      loading={loading}
      getOptionSelected={(option, value) => {
        return option.key === value.key;
      }}
      value={props.selectedOption}
      renderInput={(params) => <TextField {...params} label={props.title} variant="outlined" />}
      onChange={(_, newValue, reason) => {
        props.onSelected(newValue);
        setValue(value);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
    />
  );
}

type FilterSelectProps<OptionType extends Option> = {
  disabled?: boolean;
  title: string;
  options: OptionType[];
  selectedOption?: OptionType | null;

  onSelected(option: OptionType | null): void;
};

export interface Option {
  key: string;
  label: string;
}
