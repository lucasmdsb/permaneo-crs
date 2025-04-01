import { RHFUploadBox } from '@/shared/components/UploadBox';
import { Avatar } from '@mui/material';

interface UploadAvatarProps {
  onDrop: (acceptedFiles: File[]) => void;
  avatarUrl?: string;
  name: string;
  sx?: any;
}

export function UploadAvatar({
  onDrop,
  avatarUrl,
  name,
  sx,
}: UploadAvatarProps) {
  return (
    <RHFUploadBox
      name={name}
      sx={{ all: 'unset' }}
      accept={{ 'image/jpeg': ['.jpeg', '.png', '.jpg'] }}
      onDrop={onDrop}
      placeholder={
        <Avatar
          src={avatarUrl}
          alt="image"
          sx={{
            mx: 'auto',
            cursor: 'pointer',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            bgcolor: (theme) => theme.palette.grey[100],
            border: (theme) => `solid 2px ${theme.palette.grey[200]}`,
            ...sx,
          }}
        />
      }
    />
  );
}
