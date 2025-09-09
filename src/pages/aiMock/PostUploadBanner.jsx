import { 
    Button, 
    Container 
} from "@mui/material";
import { ChevronRightIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import LoadingModal from '../../components/LoadingModal';

const PostUploadBanner = ({ userName, getRootProps, getInputProps, isUploading, navigate, grades }) => {
    const firstKey = grades && Object.keys(grades).length > 0 ? Object.keys(grades)[0] : null;
    const firstValue = firstKey ? grades[firstKey] : null;

    return (
        <Container maxWidth={false} style={{
            backgroundColor: "var(--background-color)",
            height: "520px",
            minHeight: "520px",
            padding: "0",
            overflow: "hidden",
            display: "flex",
            backgroundImage: "url(/images/ai_mock/banner/banner02.png)",
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}>
            {isUploading && <LoadingModal />}
            <div className='side-margin'></div>
            <div style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                margin: "auto",
                marginTop:"0px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: "120px"
            }}>
                <div className="child-column">
                    <h1 className='title-32-bold'>등록한 생기부로
                        <br />모의면접 하러가기</h1>
                    <span 
                    onClick={() => {navigate()}}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: "var(--primary-60)",
                        fontSize: "18px",
                        fontWeight: "500",
                        cursor: "pointer"
                    }}>
                        바로시작 <ChevronRightIcon style={{ height: "24px" }} />
                    </span>
                </div>
                <div className="child-column">
                    <div {...getRootProps()} className="doc-card">
                        <input {...getInputProps()} />
                        <h4 className='subtitle-20-semibold' style={{ marginTop: "0", marginBottom: "0" }}>{userName}님의 생기부</h4>
                        <p className="body-16-regular" style={{ marginTop: "0" }}>업로드</p>
                        <div style={{
                            display: firstValue && firstValue.length<5?"block":"none",
                            width: "100%",
                            height: "82px",
                            background: "var(--error-10)",
                            borderRadius: "8px",
                            padding: "18px 24px"
                        }}>
                            <p className="subtitle-16-semibold" 
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                color: "var(--error-40)",
                                marginTop: "0",
                                marginBottom: "0"
                            }}>
                                <ExclamationCircleIcon style={{ height: "20px" }} />&nbsp;FITERVIEW 제안
                            </p>
                            <p className="body-16-regular" style={{ color: "var(--error-40)", marginTop: "0", marginBottom: "0" }}>
                                {firstValue && firstValue.length<3?"1":firstValue && firstValue.length<5?"2":"3"}학년 {firstValue && firstValue.length % 2 === 0?"2":"1"}학기까지의 정보만 들어있어요!
                            </p>
                        </div>
                        <Button
                            sx={{
                                width: "calc(100% - 80px)",
                                padding: '12px',
                                position: 'absolute',
                                height: '48px',
                                bottom: '34px',
                                backgroundColor: 'var(--primary-60)',
                                borderRadius: '8px',
                                color: "var(--background-color)",
                                fontSize: "16px",
                                fontWeight: "500",
                                '&:hover': {
                                    backgroundColor: 'var(--primary-80)',
                                },
                            }}
                        >
                            생활기록부 재업로드
                        </Button>
                    </div>
                </div>
            </div>
            <div className='side-margin'></div>
        </Container>
    );
};

export default PostUploadBanner;
