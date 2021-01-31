import { makeStyles, Theme, createStyles, Box, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      // position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
      minHeight: 300,
    },
  }),
);

export function SearchableList<ListOptionType extends ListOption>({
  disabled = false,
  title,
  searchQuery,
  selectedOption,
  options,
  getOptionLabel,
  onSearchQueryUpdated,
  onSelectedOptionUpdated,
}: SearchableListProps<ListOptionType>) {
  const classes = useStyles();

  const items = options?.map((option) => {
    return (
      <ListItem
        key={`${title}-${option.id}`}
        selected={option.id === selectedOption?.id}
        button
        disabled={disabled}
        onClick={(_event) => onSelectedOptionUpdated?.(option)}
      >
        <ListItemText primary={getOptionLabel?.(option)} />
      </ListItem>
    );
  });

  return (
    <Box className={classes.root}>
      <TextField
        disabled={disabled}
        value={searchQuery}
        label={title}
        margin="dense"
        onChange={(event) => onSearchQueryUpdated?.(event.target.value)}
      ></TextField>
      <List className={classes.list}>{items}</List>
    </Box>
  );
}

export interface SearchableListProps<ListOptionType extends ListOption> {
  disabled?: boolean;
  title?: string;

  searchQuery?: string;
  onSearchQueryUpdated?: (query: string) => void;

  selectedOption?: ListOptionType;
  options?: ListOptionType[];
  getOptionLabel?: (option: ListOptionType) => string;
  onSelectedOptionUpdated?: (option: ListOptionType) => void;
}

export interface ListOption {
  id: number;
}
