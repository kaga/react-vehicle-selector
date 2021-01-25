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

export function AutocompleteOptions<OptionType extends Option>(props: AutocompleteOptionsProps<OptionType>) {
  const classes = useStyles();
  return (
    <Autocomplete
      autoComplete={true}
      autoSelect={true}
      autoHighlight
      disabled={props.disabled || false} 
      className={classes.control}
      options={props.options}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => {
        return option.key === value.key;
      }}
      renderInput={(params) => <TextField {...params} label={props.title} variant="outlined" />}
      onChange={(_, value) => {
        if (value) {
          props.onSelected(value);
        }
      }}
    />
  );
}

type AutocompleteOptionsProps<OptionType extends Option> = {
  disabled?: boolean;
  title: string;
  options: OptionType[];

  onSelected(option: OptionType): void;
};

export interface Option {
  key: string;
  label: string;
}
