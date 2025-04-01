import { Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TablePaginationMUI, {
  TablePaginationProps as TablePaginationPropsMUI,
} from '@mui/material/TablePagination';
import { CountQueuingStrategy } from 'node:stream/web';

type TablePaginationProps = {
  sx?: SxProps<Theme>;
} & TablePaginationPropsMUI;

export function TablePagination({ sx, ...rest }: TablePaginationProps) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePaginationMUI
        labelDisplayedRows={() => {
          return null;
        }}
        labelRowsPerPage="Resultados por página"
        component="div"
        {...rest}
        sx={{
          borderTopColor: 'transparent',
        }}
      />
    </Box>
  );
}
