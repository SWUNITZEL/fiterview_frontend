import { FolderPlusIcon } from "@heroicons/react/24/solid";
import LoadingModal from '../../components/LoadingModal';
import { usePdfUpload } from '../../hooks/usePdfUpload'; // 경로 주의!

const PreUploadBanner = () => {

    const { getRootProps, getInputProps, isUploading } = usePdfUpload({
        onSuccess: (data) => {
            console.log('업로드 성공!', data);
        },
        onError: (err) => {
            console.log('업로드 실패', err);
        }
    });

    return (
        <div className="center-both child-row preupload-banner">
            {isUploading && <LoadingModal />}
            <div className='preupload-banner-container'>
                <h1 className='title-32-bold' style={{ textAlign: "center", color: "var(--nuetral-10)" }}>
                    생기부 문서업로드
                </h1>
                <div {...getRootProps()} className="dropzone drop-shadow-small">
                    <input {...getInputProps()} />
                    <FolderPlusIcon width="102px" color="var(--primary-60)" marginBottom="10px" style={{ transform: 'scaleY(0.8)' }} />
                    <p className="subtitle-20-medium" style={{ marginTop: "0px", marginBottom: "0px" }}>
                        파일을 업로드 하세요
                    </p>
                    <p className="body-14-medium" style={{ marginTop: "8px", marginBottom: "0px", color: "var(--nuetral-80)" }}>
                        클릭 혹은 파일을 이곳에 올려주세요.
                    </p>
                    <p className="body-14-medium" style={{ marginTop: "2px", marginBottom: "0px", color: "var(--primary-60)" }}>
                        *파일당 최대 40MB
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PreUploadBanner;
