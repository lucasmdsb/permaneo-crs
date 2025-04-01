import Box from '@mui/material/Box';
import { Image } from '../../../Image';

interface SingleFilePreviewProps {
  imgUrl?: string;
}

const SingleFilePreview = ({ imgUrl = '' }: SingleFilePreviewProps) => {
  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      <Image
        alt="file preview"
        src={imgUrl}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
        }}
      />
    </Box>
  );
};

export default SingleFilePreview;
