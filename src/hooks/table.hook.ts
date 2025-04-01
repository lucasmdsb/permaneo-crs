import { useState, useCallback } from 'react';

interface TableProps {
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  selected: string[];
  onSort: (property: string) => void;
  onSelectRow: (id: string) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  onResetPage: VoidFunction;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

type ReturnType = TableProps;

interface UseTableProps {
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
}

const useTable = (props?: UseTableProps): ReturnType => {
  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');

  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage || 10,
  );

  const [order, setOrder] = useState<'asc' | 'desc'>(
    props?.defaultOrder || 'asc',
  );

  const [selected, setSelected] = useState<string[]>(
    props?.defaultSelected || [],
  );

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected],
  );

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const onSelectAllRows = useCallback(
    (checked: boolean, inputValue: string[]) => {
      if (checked) {
        setSelected(inputValue);
        return;
      }
      setSelected([]);
    },
    [],
  );

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onResetPage = () => {
    setPage(0);
  };

  const onSort = (property: string) => {
    setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setOrderBy(property);
  };

  return {
    order,
    page,
    orderBy,
    rowsPerPage,
    selected,
    onSort,
    onSelectRow,
    onSelectAllRows,
    onChangePage,
    onResetPage,
    onChangeRowsPerPage,
    setPage,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage,
  };
};

export { useTable };
