
import { CancelOutlined } from '@mui/icons-material';
import { toast } from 'react-hot-toast';

const CustomToastBar = ({ icon, message, position, duration }) => {
    return (
        <div className={`toast ${position}`}>
            {icon}
            {message}
            <CancelOutlined style={{ marginLeft: '2rem' }} onClick={() => toast.dismiss()} />
            {/* / <button style={{ marginLeft: '2rem', padding: '10px', borderRadius: "50%" }} type='button' >X</button> */}
            <div className="progress-bar" style={{ animationDuration: `${duration}ms` }} />
        </div>
    );
};

export default CustomToastBar