import {
  Grid,
  Typography,
  Stack,
  Divider,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  useTheme,
  Box,
  Button,
  Tooltip,
  Alert,
} from '@mui/material';

import {
  IconChevronRight,
  IconCircleCheckFilled,
  IconClipboardText,
  IconCurrencyDollar,
  IconInfoCircle,
  IconInfoCircleFilled,
  IconPhone,
  IconX,
} from '@tabler/icons-react';

import { Dialog } from '@/shared/components/Dialog';
import { Avatar } from '@/shared/components/Avatar';
import { formatDate, formatPhone, formatPrice } from '@/shared/lib/format';
import {
  Enrollment,
  EnrollmentProgress,
  Opportunity,
  RecruitmentPhase,
} from '@/schema';
import { MainCard } from '@/shared/components/MainCard';
import { translate } from '@/shared/translate';
import { useBoolean } from '@/hooks/tools/boolean.tool';
import { useEffect, useState } from 'react';
import { CurriculumView } from '@/app/(candidate)/curriculum/view';
import { FormProvider } from '@/shared/components/Form';
import { RHFTextField } from '@/shared/components/TextField';
import { LoadingButton } from '@mui/lab';
import { RHFSelect } from '@/shared/components/Select';
import { useForm } from 'react-hook-form';
import { api } from '@/api';
import { enqueueSnackbar } from 'notistack';
import { useParams, useRouter } from 'next/navigation';
import {
  getOpportunityRefusedMessage,
  opportunityReasonRefused,
} from '@/config/opportunity';
import { RHFCheckbox } from '@/shared/components/Checkbox';

interface ShowEnrollmentDialogProps {
  open: boolean;
  onClose: VoidFunction;
  opportunity: Opportunity;
  enrollment: Enrollment;
  loadData: () => Promise<void>;
}

export function ShowToAcquireDialog({onClose, open}: any) {
  const theme = useTheme();
  const params = useParams<{ enrollmentId: string }>();
  const openPhaseDetails = useBoolean(false);
  const openCurriculum = useBoolean(false);
  const [progressData, setProgressData] = useState<EnrollmentProgress>();
  const [openApproved, setOpenApproved] = useState(false);
  const [openRefused, setOpenRefused] = useState(false);
  const [currentRecruitmentPhase, setRecruitmentPhase] =
    useState<RecruitmentPhase>();
  const router = useRouter();
  const refuseMethods = useForm();
  const approveMethods = useForm({
    defaultValues: {
      mail: false,
      feedbackMessage: '',
      internalMessage: '',
    },
  });

  const {
    handleSubmit: handleSubmitRefuse,
    watch,
    setValue: setRefuseValue,
    formState: { isSubmitting: isRefuseSubmitting },
  } = refuseMethods;
  const {
    handleSubmit: handleSubmitApprove,
    formState: { isSubmitting: isApproveSubmitting },
  } = approveMethods;

  const watchReason = watch('reason');

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        maxWidth="md"
        content={
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: 3,
                  borderWidth: 1,
                  borderColor: theme.palette.grey[300],
                  borderStyle: 'dashed',
                  borderRadius: 3,
                }}
              >
                <Stack flexDirection="row" justifyContent="space-between">
                  <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Stack>
                      <Typography fontSize={18} fontWeight="bold">
                        ***PASSO A PASSO API DE INTEGRAÇÃO***
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ px: 5 }}
                      onClick={() => onClose()}
                    >
                        Finalizar
                      </Button>
                  </Stack>
                </Stack>
                <Grid pt={2} alignItems="center" container spacing={2}>
                <Grid item xs={6}>
                    <Stack flexDirection="row" gap={1} alignItems="center">
                      <IconPhone size={18} />
                      <Typography>Nome no cartão</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    Lucas dos Santos Brito
                  </Grid>
                  <Grid item xs={6}>
                    <Stack flexDirection="row" gap={1} alignItems="center">
                      <IconPhone size={18} />
                      <Typography>Numero do cartão</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    2342 5345 3123 1323
                  </Grid>
                  <Grid item xs={6}>
                    <Stack flexDirection="row" gap={1} alignItems="center">
                      <IconClipboardText size={18} />
                      <Typography>Data de validade</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    08/31
                  </Grid>
                  <Grid item xs={6}>
                    <Stack flexDirection="row" gap={1} alignItems="center">
                      <IconCurrencyDollar size={18} />
                      <Typography>Cvv</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    ***
                  </Grid>
                </Grid>
                <Divider sx={{ paddingTop: 1 }} />
                  <Typography variant="subtitle1" pt={4}>
                    Parcelas
                  </Typography>
                  <Typography variant="subtitle2" pt={1}>
                    4x
                  </Typography>
              </Box>
            </Grid>
          </Grid>
        }
      />
    </>
  );
}
