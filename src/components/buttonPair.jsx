import { Button, Box } from '@mui/material';

const ButtonPair = ({
  leftText = null,
  rightText = null,
  onLeftClick = () => {},
  onRightClick = () => {},
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',  
        alignItems: 'center',
        gap: '24px',  
        marginTop: '0px',
        marginBottom: '120px',
      }}
    >
      {leftText?<Button
        onClick={onLeftClick}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 24px',
          gap: '10px',
          color: 'var(--nuetral-80)',
          fontSize: '18px',
          fontWeight: 400,
          border:"1px solid var(--nuetral-50)",
          backgroundColor: 'var(--background-color)',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'var(--nuetral-20)',
          },
        }}
      >
        {leftText}
      </Button>:""}

      {rightText?<Button
        onClick={onRightClick}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 24px',
          gap: '10px',
          color: 'var(--background-color)',
          fontSize: '18px',
          fontWeight: 400,
          backgroundColor: 'var(--primary-60)',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'var(--primary-80)',
          },
        }}
      >
        {rightText}
      </Button>:""}
    </Box>
  );
};

export default ButtonPair;
