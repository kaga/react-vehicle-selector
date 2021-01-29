import React from 'react';
import { TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    control: {
      padding: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

export function GraphqlSelect(props: SelectProps) {
  const classes = useStyles();
  const { loading, data } = useQuery(props.query, {
    variables: props.variables,
    skip: props.disabled || false,
  });

  let disabled = true;
  let isLoading = loading;
  let children: Option[] = [];

  if (data) {
    disabled = false;
    children = props.onReceivedData(data);
  }

  return (
    <Autocomplete
      autoComplete={true}
      autoSelect={true}
      autoHighlight
      disabled={disabled}
      className={classes.control}
      options={children}
      getOptionLabel={(option) => option.label}
      loading={isLoading}
      getOptionSelected={(option, value) => {
        return option.key === value.key;
      }}
      renderInput={(params) => <TextField {...params} label={props.title} variant="outlined" />}
      onChange={(_event, newValue, _reason) => {
        props.onSelect(newValue || undefined);
      }}
    />
  );
}

type SelectProps = {
  disabled?: boolean;
  query: any;
  variables?: any;
  title: String;
  onReceivedData: (data: any) => Option[];
  onSelect: (option?: Option) => void;
};

export interface Option {
  key: string;
  label: string;
}
