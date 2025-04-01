import {
  Button,
  Dialog as DialogMUI,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogProps as DialogPropsMUI,
} from '@mui/material';

export interface DialogProps extends Omit<DialogPropsMUI, 'title' | 'content'> {
  title?: React.ReactNode;
  content?: React.ReactNode;
  action?: React.ReactNode;
  onClose: VoidFunction;
}

export function Dialog({
  title,
  content,
  action,
  open,
  onClose,
  ...rest
}: DialogProps) {
  return (
    <DialogMUI fullWidth maxWidth="xs" open={open} onClose={onClose} {...rest}>
      {title && <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>}
      {content && (
        <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>
      )}
      {action && (
        <DialogActions>
          <Button variant="text" color="inherit" onClick={onClose}>
            Voltar
          </Button>
          {action}
        </DialogActions>
      )}
    </DialogMUI>
  );
}
