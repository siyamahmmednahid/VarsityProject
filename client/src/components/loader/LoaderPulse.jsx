import PulseLoader from "react-spinners/PulseLoader"
const LoaderPulse = () => {
    return (
        <div>
            <PulseLoader
                color="#7367f0"
                loading
                margin={5}
                size={15}
                speedMultiplier={1}
            />
        </div>
    )
}
export default LoaderPulse;