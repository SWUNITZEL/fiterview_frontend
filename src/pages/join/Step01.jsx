import { useState } from 'react';
import { Container, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import './Join.css';

const Step01 = ({onNext}) => {

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleChange = (name) => (event) => {
    const updated = { ...agreements, [name]: event.target.checked };
    if (name === 'all') {
      updated.terms = event.target.checked;
      updated.privacy = event.target.checked;
      updated.marketing = event.target.checked;
    } else {
      updated.all = updated.terms && updated.privacy && updated.marketing;
    }
    setAgreements(updated);
  };

  const canProceed = agreements.terms && agreements.privacy;

  return (
    <Container
      maxWidth={false}
      style={{
        width:"100%",
        backgroundColor: "var(--background-color)",
        minHeight: "auto",
        paddingTop: "120px",
        overflow: "hidden",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
      }}
    >
        <div style={{display:"flex", width:"480px", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={agreements.all} onChange={handleChange('all')} />}
                    label="전체동의: 내용을 확인하였으며, 모두 동의합니다."
                />
                <FormControlLabel
                    control={<Checkbox checked={agreements.terms} onChange={handleChange('terms')} />}
                    label="(필수) FIterview 이용약관 동의"
                />
                <FormControlLabel
                    control={<Checkbox checked={agreements.privacy} onChange={handleChange('privacy')} />}
                    label="(필수) 개인정보 수집 및 이용 동의"
                />
                <FormControlLabel
                    control={<Checkbox checked={agreements.marketing} onChange={handleChange('marketing')} />}
                    label="(선택) 이벤트 및 서비스 안내 수신 동의"
                />
            </FormGroup>
            <Button
            variant="contained"
            color="primary"
            onClick={onNext}
            disabled={!canProceed}
            sx={{
                borderRadius:"8px",
                marginTop: '96px',
                width: '200px',
                height: '48px',
                backgroundColor: canProceed ? 'var(--primary-60)' : '#e5e7eb',
                color: canProceed ? 'white' : '#9ca3af'
            }}
            >
            다음
            </Button>
        </div>
    </Container>
  );
};

export default Step01;
