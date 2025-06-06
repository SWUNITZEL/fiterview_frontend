import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
const ReportHeader = ({ interviewTitle, reportTitle, timestamp, onDownload }) => {
  return (
    <div style={{ 
        width:"100%",
        padding:"120px 240px 0px",
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        // marginTop:"120px",
        marginBottom: '16px' }}>
      <p className="caption-14-regular" style={{marginTop:"0px", marginBottom:"8px"}}>{interviewTitle}({timestamp})</p>
      <h1 className="title-32-bold" style={{marginTop:"0px", marginBottom:"16px"}}>{reportTitle}</h1>
      <p
        className="body-14-semibold"
        onClick={onDownload}
        style={{
            marginTop: "0px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px"
        }}
        >
        <DocumentArrowDownIcon style={{ height: "16px", color: "var(--font-body)" }} />
        PDF로 다운 받기
        </p>
    </div>
  );
};

export default ReportHeader;
